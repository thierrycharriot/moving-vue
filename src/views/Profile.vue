<template>
  <div class="bg">
    <div class="content profile-page">
      <div>
        <ProfileUserBadgeDesktop
          v-if="width >= 760"
          :pictureToDisplay="pictureToDisplay"
          @onPictureEditingRequest="handleProfilePictureClick"
        />
      </div>
      <ProfileUser
        v-if="width <= 760"
        :pictureToDisplay="pictureToDisplay"
        :title="postNameToDisplay"
        :content="postContentToDisplay"
        @onPictureEditingRequest="handleProfilePictureClick"
      />
      <div>
        <router-link to="/messages"> Aller à la messagerie </router-link>
        <FileInput hidden @onFileSelected="handleProfilePictureUpload" />
        <BadgeUser v-if="width <= 760" />
        <TextUserAndItinerary
          v-if="width > 760"
          :title="postNameToDisplay"
          :content="postContentToDisplay"
        />
        <MyItinerary v-if="width <= 760" />
        <MyDelivery />
        <ProfileComment />
      </div>
      <router-link to="/messages"> Aller à la messagerie </router-link>
    </div>
  </div>
</template>

<script>
import FileInput from "@/components/Form/FileInput.vue";
import ProfileUser from "@/components/Profile/ProfileUser.vue";
import BadgeUser from "@/components/Profile/BadgeUser.vue";
import MyItinerary from "@/components/Profile/MyItinerary.vue";
import MyDelivery from "@/components/Profile/MyDelivery.vue";

import ProfileUserBadgeDesktop from "@/components/Profile/ProfileUserBadgeDesktop.vue";
import TextUserAndItinerary from "@/components/Profile/TextUserAndItinerary.vue";

import UploadService from "@/service/UploadService";
import UserService from "@/service/UserService";
import ProfileComment from "@/components/Profile/ProfileComment.vue";

import baseProfile from "@/assets/images/cesar-profile.jpg";

export default {
  name: "Profile",
  components: {
    FileInput,
    ProfileUser,
    BadgeUser,
    MyItinerary,
    MyDelivery, 
    ProfileComment,
    ProfileUserBadgeDesktop,
    TextUserAndItinerary,
  },
  data() {
    return {
      width: window.innerWidth,
    };
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },

  unmounted() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      this.width = window.innerWidth;
    },
    handleProfilePictureClick: function () {
      document.querySelector("input[type=file]").click();
    },
    handleProfilePictureUpload: async function (file) {
      // First we are uploading the file into WordPress medias
      const { data, status } = await UploadService.upload(file);
      if (status === 201) {
        const pictureId = data.id;
        // Then, if uploading has been successful, we ask to WordPress to attach the new picture to the current user
        const response = await UserService.setProfilePicture(
          this.$store.state.user.id,
          pictureId
        );
        const pictureSrcSet = response.data.data;
        this.$store.commit("setUser", {
          ...this.$store.state.user,
          profilePictures: pictureSrcSet,
        });
      }
    },
  },
  mounted() {
    this.width = window.innerWidth;
    if (!this.$store.state.token) {
      // A décommenter lorsque l'on arrêtera de faire du debug
      this.$router.push("/connexion");
    }
  },
  computed: {
    pictureToDisplay: function () {
      if (this.$store.state.user?.profilePictures === undefined) {
        return baseProfile;
      }
      return this.$store.state.user?.profilePictures[0].link;
    },
    postNameToDisplay: function () {
      if (this.$store.state.user?.post === undefined) {
        return "";
      }
      return this.$store.state.user.post.post_title;
    },
    postContentToDisplay: function () {
      if (this.$store.state.user?.post === undefined) {
        return "";
      }
      return this.$store.state.user.post.post_content;
    },
  },
};
</script>

<style>
</style>