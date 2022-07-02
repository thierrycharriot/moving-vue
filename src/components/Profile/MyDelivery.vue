<template>
  <section>
    <h2 class="title-profile title-marg">Mes prestations</h2>
    <div class="style-card-deliveries">
      <div 
        class="style-card-delivery" 
        v-for="delivery in this.$store.state.user.deliveries" 
        :key="delivery"
        >
        <img class="img-delivery-profile" v-bind:src="delivery.pictures[1] ? delivery.pictures[1].link : ImgRoad" :alt="'Illustration pour ' + delivery.post_title" />
        <p>{{ delivery.post_title }}</p>
      </div>
    </div>
    <button class="button mt-20" @click="handleShowForm">Nouvelle prestation</button>
  </section>

  <!-- New Delivery Modal -->
  <div ref="modal" :style="{ display: this.showCreationModal ? 'block' : 'none'}" class="delivery-modal">
    <img class="pointer" :src="back" alt="" @click="unbindModal">
    <div class="delivery-modal__content">
      <h2>Nouvelle prestation</h2>
      <div class="delivery-modal__form">
        <Input 
          label="Titre"
          name="post_title"
          placeholder="Titre de la prestation"
          @onValueChange="handleFormType"
        />

        <Input
          label="Description"
          name="post_content"
          placeholder="Descriptif de la prestation"
          type="textarea"
          @onValueChange="handleFormType"
        />

        <FileInput 
          @onFileSelected="handleFileSelect"
        />

        <button class="button" @click="handleCreationSubmit">Créer</button>
      </div>
    </div>
  </div>

</template>

<script>
//import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import BaseRoad from "@/assets/images/road.jpg";
import back from '@/assets/icons/arrow-back-dark.svg'
import pin from '@/assets/icons/position.svg'
import calendar from '@/assets/icons/calendar.svg'
import star from '@/assets/icons/star.svg'
import Input from '@/components/Form/Input'
import FileInput from '@/components/Form/FileInput'
import DeliveryService from '@/service/DeliveryService'
import UploadService from '@/service/UploadService'
import { successToast } from '@/helpers/toasts'

export default {
  name: "MyDelivery",
  components: {
    Input,
    FileInput,
    //PerfectScrollbar
  },
  data() {
    return {
      screenWidth: window.innerWidth,
      ImgRoad: BaseRoad,
      showCreationModal: false,
      showEditionModal: false,
      back,
      pin,
      calendar,
      star,
      newDelivery: {
        post_title: '',
        post_content: ''
      },
      newDeliveryFile: null,
      deliveryDetailsToShow: null,
      deliveryToEdit: {
        post_title: '',
        post_content: ''
      }
    }
  },
  methods: {
    handleFileSelect: async function (file) {
      const { data, status } = await UploadService.upload(file)
      if (status === 201) {
        this.newDeliveryFile = data
      }
    }, 
    handleFormType: function (response) {
      this.newDelivery[response.name] = response.value
    },
    handleCreationSubmit: async function () {
      const { status, delivery } = await DeliveryService.create(this.$store.state.user.id, this.newDelivery)
      if (status ===  201) {
        const result = await DeliveryService.attach(this.$store.state.user.id, delivery.ID,this.newDeliveryFile.id)
        if (result.status === 200) {
          console.log('new delivery', result)
          this.$store.commit('setUser', { ... this.$store.state.user, deliveries: [ ... this.$store.state.user.deliveries, result.delivery ] })
          successToast("La prestation a correctement été créée !")
          this.unbindModal()
        }
      }
    },
    handleShowForm: function () {
      this.showCreationModal = !this.showCreationModal
      document.getElementById('app').classList.add('block-scroll')
      document.getElementById('app').style.top = window.pageYOffset
      this.$refs.modal.style.top = 'calc(' + window.pageYOffset + 'px + 5.125rem)'
      this.$refs.modal.classList.add('slide-rtl')
    },
    unbindModal: function () {
      this.$refs.modal.classList.add('slide-rtl-return')
      setTimeout(() => {
        this.$refs.modal.classList.remove('slide-rtl-return', 'slide-rtl')    
        document.querySelector('.block-scroll').classList.remove('block-scroll')
        this.showCreationModal = false
      }, 300)
    }
  },
};
</script>

<style>
</style>