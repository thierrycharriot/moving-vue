<template>
    <!-- Edition form -->
    <div class="itinerary-form" v-if="this.localBaseData.name">
      <Input 
        label="Nom de l'itinéraire"
        name="name"
        placeholder="Saisissez le nom de votre nouvel itinéraire"
        @onValueChange="handleFormTyped"
        :defaultValue="localBaseData.name"
      />
      <Input v-for="(field, i) in this.localBaseData.checkpoints" :key="i"
        :label="this.translateNb(i) + 'destination'"
        name="checkpoints"
        placeholder="Saisissez le nom de votre destination"
        @onValueChange="(response) => handleFormTyped(response, i)"
        :defaultValue="field.city"
      />
      <button class="button" @click="handleSubmit">Modifier</button>
    </div>


    <!-- Creation form -->
    <div class="itinerary-form" v-else>
      <Input 
        label="Nom de l'itinéraire"
        name="name"
        placeholder="Saisissez le nom de votre nouvel itinéraire"
        @onValueChange="handleFormTyped"
      />
      <Input v-for="(field, i) in checkpointsFieldsToDisplay" :key="i"
        label="Première destination"
        name="checkpoints"
        placeholder="Saisissez le nom de votre destination"
        @onValueChange="(response) => handleFormTyped(response, i)"
      />
      <button class="button" @click="handleSubmit">Créer</button>
    </div>
</template>

<script>
import Input from '@/components/Form/Input'

export default {
components: {
    Input
  },
  props: {
      baseData: {
          type: Object,
          default: null
      }
  },
  data () {
    return {
      checkpointsFieldsToDisplay: 1,
      newItinerary: {
        name: '',
        checkpoints: []
      },
      localBaseData: {}
    }
  },
  methods: {
      handleFormTyped (response, i = undefined) {
       if (response.name === 'checkpoints') {
          this.newItinerary.checkpoints[i] = {
            city: response.value
          }
          return
      }
      this.newItinerary[response.name] = response.value
    },
    handleSubmit () {
        this.$emit('onSubmit', this.newItinerary)
    },
    translateNb(i) {
      switch (i) {
        case 0: return "Première "
        case 1: return "Deuxième "
        case 2: return "Troisième "
        case 3: return "Quatrième "
        case 4: return "Cinquième "
        case 5: return "Sixième "
        case 6: return "Septième "
        case 7: return "Huitième "
        case 8: return "Neuvième "
        case 9: return "Dixième "
        default: return "Destination suivante"
      }
    }
  },
  emits: ['onSubmit'],
  mounted () {
    console.log('hello')
      if (this.baseData) {
          this.localBaseData.name = this.baseData.name
          this.localBaseData.checkpoints = JSON.parse(this.baseData.checkpoints)
      }
  }
}
</script>

<style>

</style>