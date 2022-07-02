<template>
  <section class="bg404">
    <div class="content404">
      
          <h1>Oops ! </h1>

        <div class="container404">

          <div class="img404"></div>

            <div class="text404">

            <h2>Malheureusement, nous ne pouvons afficher la page que vous recherché.</h2>
            
            <p id="erreurCode">Code d'erreur : <span>404</span></p>

            <p>Voila une liste de liens qui pourrais vous interessez :</p>

            <nav class="links404">
              <div>
                <ul>
                  <li><router-link to="/">Accueil</router-link></li>
                  <li><router-link to="/inscription">S'inscrire</router-link></li>
                  <li><router-link to="/connexion">Se connecter</router-link></li>
                  <li><router-link to="/concept">Nous contacter</router-link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Page404',
}
</script>

<style>

</style>