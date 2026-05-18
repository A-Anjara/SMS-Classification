<script setup>
import { ref } from "vue";
import Login from "../Components/Login.vue";
import Signin from "@/Components/Signin.vue";
const emit = defineEmits(["success-auth"]);
const currentAuth = ref("signin");

function changeAuth(value){
    if(currentAuth.value != value){
        currentAuth.value = value;
    }
}

function successAuth(username){
    console.log("success");
    console.log(username);
    emit('success-auth',username);
}
</script>
<template>
  <div
    class="w-screen h-screen bg-[#181A18] flex-col flex pt-2 items-center"
  >
    <div class="flex items-center justify-center text-xs w-3/4">
        <button class="p-2 w-1/7" :class="[currentAuth=='signin'? ['bg-white','text-black']:['bg-black','text-white']]" @click="changeAuth('signin')">
            Inscrire
        </button>
        <button class="p-2 w-1/7" :class="[currentAuth=='login'? ['bg-white','text-black']:['bg-black','text-white']]" @click="changeAuth('login')">
            Connecter
        </button>
    </div>
    <div class="p-4"></div>
    <div class="flex justify-center items-stretch w-3/4">
      <Signin :show="currentAuth" @success="successAuth" />
      <Login :show="currentAuth" @success="successAuth" />
    </div>
  </div>
</template>
