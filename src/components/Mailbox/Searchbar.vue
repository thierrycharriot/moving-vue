<template>
  <div class="mailbox__searchbar">
      <div class="mailbox__field">
          <input type="text" placeholder="Recherchez par nom..." v-model="search">
          <img :src="magnifierIcon" @click="handleSearch">
      </div>
  </div>
</template>

<script>
import magnifierIcon from '@/assets/icons/magnifier-dark.svg'

export default {
    name: 'Searchbar',
    data () {
        return {
            magnifierIcon,
            search: ''
        }
    },
    methods: {
        handleSearch () {
            this.$emit('onSearchRequest', this.search)
        }
    }
}
</script>

<style>

</style>