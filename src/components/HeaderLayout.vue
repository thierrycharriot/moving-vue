<template>
  <header id="hero">
    <div id="banner"></div>
    <div class="container">
      <Navbar />
      <SearchDeliveryLayout v-if="path === '/'" />
      <LoginForm v-if="path === '/connexion'" />
      <RegisterForm v-if="path === '/inscription'" />
      <div class="hero__catchphrase">
        <h2>Vous voyagez ?</h2>
        <div class="catchphrase-content">
          <p class="catchphrase-main">Trouvez des</p>
          <div class="catchphrase-dropdown">
            <p>clients</p>
            <p>contacts</p>
            <p>amis</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'
import SearchDeliveryLayout from '@/components/SearchDeliveryLayout.vue'
import Navbar from "@/components/Navbar.vue"

export default {
  name: "HeaderLayout",
  computed: {
    path () {
      return this.$route.path
    }
  },
  components: {
    LoginForm,
    RegisterForm,
    SearchDeliveryLayout,
    Navbar
  },
};
</script>

<style>
</style>