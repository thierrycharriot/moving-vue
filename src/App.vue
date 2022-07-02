<template>
  <div>
    <HeaderLayout v-if="haveLargeHeaderPaths.includes(path)"/>
    <RegularNavbar v-else />
    <router-view />
    <FooterLayout v-if="haveLargeHeaderPaths.includes(path)"/>
  </div>

</template>

<script>
import HeaderLayout from '@/components/HeaderLayout.vue';
import FooterLayout from '@/components/FooterLayout.vue';
import RegularNavbar from '@/components/RegularNavbar.vue';

export default {
  name: 'App',
  components: {
    HeaderLayout,
    FooterLayout,
    RegularNavbar
  },
  data() {
    return {
      haveLargeHeaderPaths: [
        '/',
        '/connexion',
        '/inscription'
      ]
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>

<style>
@import './assets/css/main.css';
</style>