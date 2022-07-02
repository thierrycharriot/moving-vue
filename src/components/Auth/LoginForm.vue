<template>
  <main class="main-container">
    <fieldset>
      <Input
        label="Nom d'utilisateur"
        class="field field__first"
        placeholder="Nom d'utilisateur..."
        name="username"
        @onValueChange="handleInputChange"
      />
      <Input
        label="Mot de passe"
        class="field field__last"
        placeholder="Mot de passe..."
        name="password"
        type="password"
        @onValueChange="handleInputChange"
      />
      
    </fieldset>
    <div class="button-pos">
      <button class="button search-delivery" @click="handleLoginRequest">
        Connexion
      </button>
      <router-link to="/inscription">
        Pas encore inscrit ?
      </router-link>
    </div>
  </main>
</template>

<script>
import AuthService from '@/service/AuthService.js'
import Input from '@/components/Form/Input.vue'
import { successToast, errorToast } from '@/helpers/toasts.js'

export default {
    name: 'LoginForm',
    components: {
      Input
    },
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        handleInputChange (data) {
          this.credentials[data.name] = data.value
        },
        async handleLoginRequest () {
            if (this.credentials.username.length === 0 && this.credentials.password.length === 0) {
              errorToast('Le formulaire est vide !')
              return
            }

            const response = await AuthService.getToken(this.credentials)

            // If we get a token, so the call has been successful
            // So we set data in VueX
            if (response.token) {
              this.$store.commit('setToken', response.token)
              this.$store.commit('setUser', {
                id: response.id,
                displayName: response.displayName,
                nicename: response.nicename,
                roles: response.roles,
                profilePictures: response.profile_pictures,
                post: response.post,
                deliveries: response.deliveries,
                itineraries: response.itineraries
              })
              successToast("Yay ! Vous êtes connecté")

              setTimeout(() => {
                this.$router.push('/profil')
              }, 1200)
            }
        }
    }
}
</script>

<style>

</style>