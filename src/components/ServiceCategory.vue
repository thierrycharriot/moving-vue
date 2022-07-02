<template>

    <section class="template-serviceofyourneeds">

      <section class="service-category">

          <h2 id="h2-serv-category">
              Quelques catégories de prestations
          </h2>

          <nav v-if="screenWidth < 768">
            <section class="all-group-links-serv-category">
              <section class="group-links-serv-category">
                <ul>
                  <li><a href="#">Bricolage</a></li>
                  <li><a href="#">Mécanique</a></li>
                  <li><a href="#">Informatique</a></li>
                  <li><a href="#">Desing</a></li>
                  <li><a href="#">Animaux</a></li>
                  <li><a href="#">Cuisine</a></li>
                  <li><a href="#">Ecriture</a></li>
                  <li><a href="#">Sécurité</a></li>
                  <li><a href="#">Ameublement</a></li>
                </ul>
              </section>

              <section class="group-links-serv-category">
                <ul>
                  <li><a href="#">Santé</a></li>
                  <li><a href="#">Musique</a></li>
                  <li><a href="#">Spectacle</a></li>
                  <li><a href="#">Enseignement</a></li>
                  <li><a href="#">Administratif</a></li>
                  <li><a href="#">Illustration</a></li>
                  <li><a href="#">Aide à la personne</a></li>
                  <li><a href="#">Lorem ipsum</a></li>
                  <li><a href="#">Dolor sit amet</a></li>
                </ul>
              </section>

            </section>
        </nav>

        <nav v-else>
            <section class="all-group-links-serv-category">
              <section class="group-links-serv-category">
                <ul>
                  <li><a href="#">Bricolage</a></li>
                  <li><a href="#">Mécanique</a></li>
                  <li><a href="#">Informatique</a></li>
                  <li><a href="#">Desing</a></li>
                  <li><a href="#">Animaux</a></li>
                  <li><a href="#">Cuisine</a></li>
                </ul>
              </section>

              <section class="group-links-serv-category">
                <ul>
                  <li><a href="#">Santé</a></li>
                  <li><a href="#">Musique</a></li>
                  <li><a href="#">Spectacle</a></li>
                  <li><a href="#">Enseignement</a></li>
                  <li><a href="#">Administratif</a></li>
                  <li><a href="#">Illustration</a></li>
                </ul>
              </section>

              <section class="group-links-serv-category">
                <ul>
                  <li><a href="#">Ecriture</a></li>
                  <li><a href="#">Sécurité</a></li>
                  <li><a href="#">Ameublement</a></li>
                  <li><a href="#">Aide à la personne</a></li>
                  <li><a href="#">Lorem ipsum</a></li>
                  <li><a href="#">Dolor sit amet</a></li>
                </ul>
              </section>
            </section>
        </nav>

      </section>

    </section>

</template>


<script>
export default {
  name: 'ServiceCategory',
  data () {
    return {
      screenWidth: window.innerWidth
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount () {
    removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>

<style>

</style>