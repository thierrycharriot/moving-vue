<template>
  <div class="desc-profile-image">
    <div class="text-desc">
      <h1 class="title-profile first">
        {{ title }}
      </h1>
    </div>
    <div class="img-profile-zone">
      <img :src="photo" class="photo-icon" alt="Modifier la photo de profil" @click="this.$emit('onPictureEditingRequest')"> 
      <div class="img-profile-container">
        <img class="img-profile-user" v-bind:src="pictureToDisplay" />
      </div>
    </div>
  </div>
  <p class="padding-text" v-html="content" />
</template>

<script>
import photo from '@/assets/icons/photo.svg'

export default {
  name: "ProfileUser",
  props: {
    pictureToDisplay: String,
    title: String,
    content: String
  },
  data () {
    return {
      photo
    }
  },
  emits: ['onPictureEditingRequest']
};
</script>

<style>
</style>