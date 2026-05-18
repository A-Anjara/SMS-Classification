<script setup>
import {ref} from 'vue';
defineProps(["show"]);
const emit = defineEmits(["success"]);
const email = ref("");
const password = ref("");
const repassword = ref("");
const hasError = ref(false);
function submit(){
  if(email.value.length>0 && password.value.length>0 && repassword.value.length>0 && password.value == repassword.value){
    
    
    fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email': email.value,'password':password.value })
    })
    .then(res => res.json())
    .then(data => {
      if("message" in data){
        emit("success",email.value)
      }
      else{
        hasError.value = true;
      }
    });

  }
  else{
    hasError.value = true;
  }
}
</script>

<template>
  <div class="block p-16 pt-6 w-1/2 max-w-1/2 " :class="[(show=='signin') ? 'bg-white':'bg-black']">
    <div class="w-full" v-if="show == 'signin'">
      <div class="text-center text-2xl font-medium">Inscrivez-vous</div>
      <div class="p-4"></div>
      <div class="flex flex-col gap-2 items-start text-sm">
        <div class="w-full">
          <label for="email">Email</label>
          <input
            type="text"
            class="block w-full py-2 text-sm border-b border-[#888888] focus:outline-none"
            id="email"
            name="email"
            v-model="email"
          />
        </div>
        <div class="p-2"></div>
        <div class="w-full">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            class="block py-2 w-full text-sm border-b border-[#888888] focus:outline-none"
            name="password"
            id="password"
            v-model="password"
          />
        </div>
        <div class="p-2"></div>
        <div class="w-full">
          <label for="repassword">Vérifier Mot de passe</label>
          <input
            type="password"
            class="block py-2 w-full text-sm border-b border-[#888888] focus:outline-none"
            name="repassword"
            id="repassword"
            v-model="repassword"
          />
        </div>
      </div>
      <div class="p-4"></div>
      <div class="w-full flex justify-center">
        <button class="p-2 overflow-hidden border border-black active:bg-black active:text-white" @click="submit">Inscrire</button>
      </div>
      <div class="p-2"></div>
      <div class="text-[#FF0000] text-sm border-l px-4 border-[#FF0000] border-l-5" v-if="hasError">Il y a une erreur!</div>

    </div>
  </div>
</template>
