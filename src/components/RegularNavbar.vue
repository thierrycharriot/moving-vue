
<template>
  <div class="container-nav">
    <nav class="navbar regular" role="navigation" aria-label="main navigation">
      <div>
        <router-link class="logo-link-custom" to="/">
          <img class="logo-custom" v-bind:src="logo" />
          <h1>Moving Forward</h1>
        </router-link>
      </div>

      <div class="nav-icons">
        <router-link to="/connexion">
          <img class="icon-custom-user" v-bind:src="userIcon" />
        </router-link>
        <img
          class="icon-custom-burger"
          id="burger"
          v-bind:src="this.isOpen ? xIcon : hamburgerIcon"
          v-on:click="toogle"
        />

        <div
          :class="{
            'open-mobile': this.isOpen && width <= 760,
            'close-mobile': !this.isOpen && width <= 760,
            'open-desktop-regular': this.isOpen && width >= 760,
            'close-desktop-regular': !this.isOpen && width >= 760,
            'menu-mobile': width < 760,
            'menu-desktop': width >= 760,
          }"
        >
          <div class="center-nav height-90vh">
            <nav>
              <ul class="ul-style">
                <router-link to="/"> Accueil </router-link>
                <router-link to="/profil"> Profil </router-link>
                <router-link to="/messages"> Messagerie </router-link>
                <router-link to="/activite"> Activité </router-link>
                <router-link to="#"> Le concept </router-link>
                <router-link to="/contact"> Contact </router-link>
                <router-link to="/je-me-suis-perdu"> Et si je me perds ? </router-link>
              </ul>
            </nav>

            <div class="pos-btn-profile">
              <router-link to="/inscription">
                <button class="button">Inscription</button>
              </router-link>
              <router-link to="/connexion">
                <button class="button">Connexion</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import baseLogo from "@/assets/images/moving-forward.png";
import baseIconUserLogged from "@/assets/icons/user-logged.svg";
import baseIconBurgerMenu from "@/assets/icons/menu-regular-36.png";
import baseIconX from "@/assets/icons/x-regular-36.png";
import userIcon from "@/assets/icons/user-dark.svg";
import hamburgerIcon from "@/assets/icons/hamburger-dark.svg";

export default {
  name: "RegularNavbar",
  data() {
    return {
      logo: baseLogo,
      burgerMenuIcon: baseIconBurgerMenu,
      xIcon: baseIconX,
      isOpen: false,
      w: window.innerWidth,
      width: window.innerWidth,
      userIcon: this.$store.state.token ? baseIconUserLogged : userIcon,
      hamburgerIcon,
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },

  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  mounted: function () {
    this.hideElementOnLoad(); //method1 will execute at pageload
    this.width = window.innerWidth;
  },
  methods: {
    resizeHandler() {
      this.width = window.innerWidth;
    },

    hideElementOnLoad: function () {
      // hide class close, hide scroll verticaly ONLY when page load

      if (this.isOpen === false && this.width > 760) {
        const addClassHideDesktop = document.querySelector(".close-desktop-regular");
        addClassHideDesktop.classList.replace(
          "close-desktop-regular",
          "hide-class-close"
        );
      } else if (this.isOpen === false && this.width < 760) {
        const addClassHideMobile = document.querySelector(".close-mobile");
        addClassHideMobile.classList.replace(
          "close-mobile",
          "hide-class-close"
        );
      }
    },

    toogle: function () {
      this.isOpen = !this.isOpen;
      // let w = window.innerWidth;
      if (this.isOpen === true) {
        //when icon burger clicked mobile scroll hidden
        if (this.w < "760") {
          document.body.style.overflow = "hidden";
        }
      } else if (this.isOpen === false) {
        //when X icon clicked scroll initial
        document.body.style.overflow = "initial";
        if (this.w > "761") {
          document.body.style.overflow = "initial";
        }
      }
    },
  },
};
</script>

<style>
</style>