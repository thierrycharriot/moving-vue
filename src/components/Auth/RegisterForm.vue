<template>
  <main class="main-container">
    <fieldset class="register-column">
      <Input
        inputClass="register-input"
        label="Nom d'utilisateur"
        class="field field__first"
        placeholder="Nom d'utilisateur..."
        name="username"
        @onValueChange="handleInputChange"
      />
      <Input
        inputClass="input-email"
        label="Email"
        class="field"
        placeholder="Email..."
        name="email"
        type="email"
        @onValueChange="handleInputChange"
      />
      <Input
        inputClass="input-password"
        label="Mot de passe"
        class="field field__last"
        placeholder="Mot de passe..."
        name="password"
        type="password"
        @onValueChange="handleInputChange"
      />
    </fieldset>
    <div class="button-pos">
      <button class="button search-delivery" @click="handleRegistrationRequest">
        Inscription
      </button>
      <router-link to="/connexion"> Déjà inscrit ? </router-link>
    </div>
  </main>
</template>

<script>
import AuthService from "@/service/AuthService.js";
import Assert from "@/helpers/classes/Assert.js";
import Input from "@/components/Form/Input.vue";
import { successToast, errorToast } from "@/helpers/toasts.js";

export default {
  name: "LoginForm",
  components: {
    Input,
  },
  data() {
    return {
      credentials: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleInputChange(data) {
      this.credentials[data.name] = data.value;
    },
    async handleRegistrationRequest() {
      if (
        this.credentials.username.length === 0 &&
        this.credentials.password.length === 0 &&
        this.credentials.email.length === 0
      ) {
        errorToast("Le formulaire est vide !");
        return;
      }

      if (!Assert.email(this.credentials.email).isValid) {
        return;
      }

      const status = await AuthService.register(this.credentials);
      if (status === 201) {
        successToast("Vous voilà inscrit, félicitations !");
      }
    },
  },
};
</script>

<style>
</style>