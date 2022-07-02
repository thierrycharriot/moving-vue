<template>
  <section>
    <h2 class="title-itinerary title-marg">Mes itinéraires</h2>
    <p class="text-italic-profile">Vous seul-e pouvez voir cette section</p>
    <Itinerary 
      v-for="itinerary in itineraries"
      :key="itinerary"
      :itinerary="itinerary"
      @onEdit="handleItineraryEdited"
      @onDelete="handleItineraryDeleted"
    />
    <div class="pos-btn-itinerary">
      <button class="button" @click="this.createFormVisible = !this.createFormVisible">Nouvel itinéraire</button>
    </div>
    <ItineraryForm 
      v-if="this.createFormVisible"
      @onSubmit="handleItinerarySubmitted"
    />
  </section>
</template>

<script>
import Itinerary from "@/components/Itineraries/Itinerary"
import ItineraryForm from "@/components/Itineraries/ItineraryForm"
import ItineraryService from "@/service/ItineraryService.js"
import { errorToast, successToast } from "@/helpers/toasts.js"

export default {
  name: "MyItinerary",
  components: {
    Itinerary,
    ItineraryForm
  },
  data () {
    return {
      createFormVisible: false
    }
  },
  computed: {
    itineraries: function () {
      return this.$store.state.user.itineraries || []
    }
  },
  methods: {
    async handleItinerarySubmitted (itinerarySubmitted) {
      if (itinerarySubmitted.name.length === 0 || itinerarySubmitted.checkpoints[0].length === 0) {
        errorToast("Vous devez indiquer des informations valides pour cet itinéraire")
        return
      }
      const { status, itinerary } = await ItineraryService.create(this.$store.state.user.id, itinerarySubmitted)
      if (status === 201) {
        this.$store.commit('setUser', { ... this.$store.state.user, itineraries: [ ... this.$store.state.user.itineraries, itinerary ] })
        successToast("L'itinéraire a été créé !")
        this.createFormVisible = false
      }
    },
    handleItineraryEdited (itineraryEdited) {
      const copy = this.$store.state.user.itineraries.slice()
      const index = copy.indexOf(this.$store.state.user.itineraries.find(it  => it.id === itineraryEdited.id))
      index !== -1 && copy.splice(index, 1, itineraryEdited)
      this.$store.commit('setUser', { ... this.$store.state.user, itineraries: copy })
    },
    handleItineraryDeleted (deleted) {
      this.$store.commit('setUser', { ... this.$store.state.user, itineraries: this.$store.state.user.itineraries.filter(it => it.id !== deleted.id) })
    }
  }
};
</script>

<style>
</style>