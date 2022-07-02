<template>
    <div class="all-comment-profil">
        <h2 class="mt-20">Commentaires</h2>

        <section>
        
            <div class="contain-icon-name-date">

                <img id="img_profil" v-bind:src="img_profil"/>

                    <div class="profil-name-date">

                        <h3>Jeanne-Mireille</h3>
                        <p>25 Mars 2021</p>

                    </div>
                    
            </div>

            <div class="etoiles">
                <div class="rating">
                    <img class="star" v-bind:src="star"/>
                    <img class="star" v-bind:src="star"/>
                    <img class="star" v-bind:src="star"/>
                    <img class="star" v-bind:src="star"/>
                    <img class="star" v-bind:src="star"/>
                </div>
            </div>

            <p class="comment">Ben c’était une personne vachement cool, j’ai bien aimé perso !</p>
            
            

            <div class="contain-icon-name-date">

                <img id="img_profil" v-bind:src="img_profil"/>

                    <div class="profil-name-date">

                        <h3>Marion-Paulette</h3>
                        <p>23 Mars 2021</p>

                    </div>
                    
            </div>

            <div class="etoiles">
                <div class="rating">
                <img class="star" v-bind:src="star"/>
                <img class="star" v-bind:src="star"/>
                <img class="star" v-bind:src="star"/>
                <img class="star" v-bind:src="star"/>
                <img class="star" v-bind:src="star"/>
                </div>
            </div>

            <p class="comment">Le top du top, pour le coup ça m’impressionne tellement que j’écris des mots juste pour faire un commentaire sur trois lignes pour montrer comment ça rend *reprend son souffle*.</p>

        </section>

    </div>
</template>

<script>
import img_profil from "@/assets/images/profile_icon.png";
import star from "@/assets/icons/star.svg";

export default {
  name: 'ProfileComment',
  data() {
      return {
        img_profil: img_profil,
        star: star,
      }
    }

}
</script>

<style>

</style>