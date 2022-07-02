<template>
  <main class="main-container">
    <fieldset>
      <Input 
        @onValueChange="handleSearchChange"
        label="Prestation"
        name="delivery"
        placeholder="Vous recherchez ..."
        class="field field__first"
        inputClass="field__input custom-input-search"
      />

      <Input 
        @onValueChange="handleLocationChange"
        label="Autour de"
        name="localisation"
        placeholder="Sélectionnez une localisation ..."
        class="field field__last"
        inputClass="field__input custom-input-delivery"
        
      /> 

      <ul class="search-results" v-if="this.placeSearchResults.length > 0">
        <h4>
          Résultats de recherche: 
          <span>Vous devez sélectionner un item pour continuer</span>
        </h4>
        <li 
          class="search-results__item"
          v-for="result in this.placeSearchResults" 
          :key="result"
          @click="()  => handleLocationSelected(result)"
        >
          {{ result.properties.label + ', ' + result.properties.postcode }}
        </li>
      </ul>
    </fieldset>
    <div class="button-pos">
      <button v-on:click="sendForm" class="button search-delivery">
        Rechercher
      </button>
    </div>
  </main>
</template>

<script>
import Input from '@/components/Form/Input.vue'
import PlaceLocatorService from '@/service/PlaceLocatorService'
import { errorToast } from '@/helpers/toasts'

export default {
  name: "SearchDeliveryLayout",
  components: {
    Input
  },
  data () {
    return {
      search: {
        delivery: '',
        localisation: ''
      },
      placeSearchResults: []
    }
  },
  methods: {
    handleSearchChange: function (data) {
      this.search[data.name] = data.value
    },
    handleLocationChange: async function (data) {
      const places = await PlaceLocatorService.findByNameLike(data.value)
      /*  places.features.map(({ geometry, properties }) => {
          // A result contains a geometry key which has itself a coordinates key (0:lon, 1:lat)
          // It also contains a properties key, which contains all place related infos such as postal code
          // and so on
          geometry = geometry
          properties = properties
      }) */
      this.placeSearchResults = places.features
      return
    },
    handleLocationSelected: function (place) {
      // Reinitialization of the results array
      this.placeSearchResults = []
      // We put the place stringified into the localStorage to retrieve it into the next page
      window.localStorage.setItem('research', JSON.stringify(place))
      // Then we set the search into data() 
      this.search.localisation = place.properties.label
      // We update the rendering of the field
      document.querySelector('.custom-input-delivery').value = place.properties.label
    },
    sendForm: async function () {
      if (this.search.delivery.length === 0 || this.search.localisation.length === 0) {
        errorToast("La recherche est invalide. Merci de vérifier les champs pour continuer")
        return
      }
      this.$router.push(`/recherche?delivery=${encodeURIComponent(this.search.delivery)}&around=${encodeURIComponent(this.search.localisation)}`)
    }
  }
};
</script>