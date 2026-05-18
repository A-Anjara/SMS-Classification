<script setup>
import Auth from './pages/Auth.vue';
import { ref } from 'vue';
import Home from './pages/Home.vue';

const currentView = ref("home");
const email = ref("");

function navigateHome(email_from){
  email.value = email_from;
  currentView.value = "home"
}

function logout(){
  email.value = "";
}

function login(){
  currentView.value = "auth";
}


</script>

<template>
  <header class="sticky p-2 top-0 left-0 bg-white  flex items-center justify-between">
    <div class="flex items-end text-xs font-bold">
      <div class="size-[36px] bg-black"></div>
      <div class="inline-block ">SafeInbox</div>
    </div>
    <button class="text-sm p-2 hover:font-semibold" @click="logout" v-if="email.length>0">Déconnecter</button>
    <button class="text-sm p-2 hover:font-semibold" @click="login" v-else-if="email.length<1 && currentView=='home'">Connexion</button>

  </header>
  <div class="block">
    <Auth @success-auth="navigateHome" v-if="currentView == 'auth'" />
    <Home :email="email" v-else-if="currentView == 'home'"/>
  </div>
</template>

<style scoped></style>
