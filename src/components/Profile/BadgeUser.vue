<template>
  <section class="width-desktop">
    <div class="icon-and-title">
      <img v-bind:src="iconCar" alt="" />
      <p>Prestataire</p>
    </div>
    <p class="text-badge">
      Ce badge indique que cet-te utilisateur-ice possède le statut de
      prestataire
    </p>
    <div class="icon-and-title">
      <img v-bind:src="iconIdentityCard" alt="" />
      <p>CNI vérifiée</p>
    </div>
    <p class="text-badge">
      Ce badge indique que les documents d’identité de l’utilisateur-ice ont été
      vérifiés
    </p>
    <div class="icon-and-title">
      <img v-bind:src="iconTrust" alt="" />
      <p>Personne de confiance</p>
    </div>
    <p class="text-badge">
      Ce badge indique que la note globale sur ses prestations font de
      l’utilisateur-ice une personne fiable.
    </p>
  </section>
</template>

<script>
import baseIconCar from "@/assets/icons/car.svg";
import baseIconIdentityCard from "@/assets/icons/identity-card.svg";
import baseIconTrust from "@/assets/icons/trust.svg";

export default {
  name: "BadgeUser",
  data() {
    return {
      iconCar: baseIconCar,
      iconIdentityCard: baseIconIdentityCard,
      iconTrust: baseIconTrust,
    };
  },
};
</script>

<style>
</style>