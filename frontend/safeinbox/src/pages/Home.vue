<script setup>
import {ref,computed} from 'vue'
const props = defineProps(["email"])

const answer = ref("");
const text = ref("");
function verifier(){
    fetch('http://localhost:3000/api/verifier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'message':text.value,'email':props.email })
    })
    .then(res => res.json())
    .then(data => {
      if("message" in data){
        answer.value = data.reponse;
      }
      else{
        hasError.value = true;
      }
      fetchList();
    });
}
// const list = ref([{message:"ok everybody",resultat:"spam"},{message:"hello",resultat:"spam"}]);
const list = ref([]);
function fetchList(){
  if(props.email.length>0){
      
      fetch('http://localhost:3000/api/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': props.email})
      })
      .then(res => res.json())
      .then(data => {
        if("message" in data){
          list.value = data.reponse;
        }
        else{
          list.value = [];
        }
      });
  
      
  }

}
fetchList();
</script>
<template>
    <main class="bg-[#121212]  min-h-screen min-w-screen">
        <div class="p-4"></div>
        <section class="">
            <div class="p-8"></div>
            <div class="text-4xl text-white  text-center">Détectez des messages <span class="font-bold text-[#FF0000]">Indésirables</span></div>
            <div class="p-8"></div>
            <div class="flex flex-col justify-center items-center">
                <textarea name="message" id="message" rows="4" v-model="text" class="w-3/4 bg-[#FAFAFA] p-2 border-black border rounded-xl overflow-hidden focus:outline-none"></textarea>
                <div class="p-2"></div>
                <div class="flex items-center w-3/4">
                    <button class="shrink-0 block p-2 px-4 bg-white active:bg-black active:text-white" @click="verifier">Vérifier</button>
                    <div class="grow-1 font-bold medium text-center text-xl" :class="[answer=='spam' ? 'text-[#FF0000]':'text-[#00FF00]']">{{ answer }}</div>
                </div>
            </div>
        </section>
        <div class="p-8"></div>
        <div class="w-3/4 border-t-white border-t-1 m-auto"></div>
        <div class="p-2"></div>
        <section>
            <div class="text-2xl font-bold text-center text-white">Historique</div>
            <div class="p-6"></div>
            <table class="w-3/4 border-collapse mx-auto text-white">
                <thead class="text-center bg-black">
                    <th class="border border-gray-800 p-3 px-4 w-full">Message</th>
                    <th class="border border-gray-800 p-3 px-4 w-fit" >Resultat</th>
                </thead>
                <tbody class="text-sm bg-[#0A0A0A]" v-if="email.length>0">
                    <tr v-for="(value, key) in list" :key="key">
                        <td class="border border-gray-800 p-3 px-4 w-full">{{ value.message }}</td>
                        <td class="border border-gray-800 p-3 px-4 w-full text-center">{{ value.resultat }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="w-3/4 mx-auto text-white text-center text-sm py-2" v-if="email.length<1">Connectez-vous pour accéder l'historique</div>
        </section>
        <div class="p-4"></div>
    </main>
</template>
