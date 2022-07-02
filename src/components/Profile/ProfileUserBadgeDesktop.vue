<template>
  <div class="white-card">
    <div class="img-profile-zone">
      <img 
        :src="photo" 
        class="photo-icon" 
        alt="Modifier la photo de profil" 
        @click="this.$emit('onPictureEditingRequest')"> 
      <div class="img-profile-container">
        <img class="img-profile-user" v-bind:src="pictureToDisplay" />
      </div>
    </div>
    <p v-html="content" />
    <section>
      <div>
        <div class="flex">
          <img v-bind:src="iconCar" alt="" />
          <p>Prestataire</p>
        </div>
        <p class="text-badge">
          Ce badge indique que cet-te utilisateur-ice possède le statut de
          prestataire
        </p>
        <div class="flex">
          <img v-bind:src="iconIdentityCard" alt="" />
          <p>CNI vérifiée</p>
        </div>
        <p class="text-badge">
          Ce badge indique que les documents d’identité de l’utilisateur-ice ont
          été vérifiés
        </p>
        <div class="flex">
          <img v-bind:src="iconTrust" alt="" />
          <p>Personne de confiance</p>
        </div>
        <p class="text-badge">
          Ce badge indique que la note globale sur ses prestations font de
          l’utilisateur-ice une personne fiable.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import photo from "@/assets/icons/photo.svg";
import baseIconCar from "@/assets/icons/car.svg";
import baseIconIdentityCard from "@/assets/icons/identity-card.svg";
import baseIconTrust from "@/assets/icons/trust.svg";

export default {
  name: "ProfileUserBadgeDesktop",
  props: {
    pictureToDisplay: String,
    title: String,
    content: String,
  },
  data() {
    return {
      photo,
      iconCar: baseIconCar,
      iconIdentityCard: baseIconIdentityCard,
      iconTrust: baseIconTrust,
    };
  },
  emits: ["onPictureEditingRequest"],
};
</script>

<style>
.img-profile-zone {
  margin-bottom: 1.5rem
}
</style>