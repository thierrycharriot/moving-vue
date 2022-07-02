<template>
  <footer>
    <div class="footer-top">

      <h2 id="mov-footer-top">Moving Forward</h2>

      <nav >

          <section class="all-group">
            <div>
              <ul class="group-links-footer">
                <li><a href="#">Le concept</a></li>
                <li><a href="#">Qui sommes-nous ?</a></li>
                <li><a href="#">Nous contacter</a></li>
                <li>
                  <router-link to="/contact">Nous recruter</router-link>
                </li>
              </ul>
            </div>

            <div>
              <ul class="group-links-footer">
                <li><a href="#">Devenir prestataire</a></li>
                <li><a href="#">Conditions générales</a></li>
                <li><a href="#">Utilisations des données</a></li>
                <li><a href="#">Gestions des cookies</a></li>
              </ul>
            </div>

          </section>

      </nav>
	</div>
  
  <div class="footer-bottom">
    <p>© 2022 Moving Forward.</p>
  </div>
  


  </footer>
</template>

<script>
export default {
  name: 'FooterLayout'

}
</script>

<style>

</style>