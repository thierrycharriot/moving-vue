<template>
  <div class="activity-page">
      <p>Uniques Deliveries :</p>
      <p>{{ this.uniqueDeliveriesIds }}</p>
      <h2>Mes prestations en cours (Prestataire)</h2>
      <div 
        v-for="userDelivery in this.userDeliveriesAsProvider" 
        :key="userDelivery.id"
        class="activity__provider activity__card"
      >
          <p>{{ userDelivery }}</p>
      </div>

      <h2>Mes prestations en cours (Client)</h2>
      <div 
        v-for="userDelivery in this.userDeliveriesAsCustomer" 
        :key="userDelivery.id"
        class="activity__customer activity__card"
      >
          <p>{{ userDelivery }}</p>
      </div>
  </div>
</template>

<script>
import { errorToast } from '@/helpers/toasts'
import UserDeliveryService from '@/service/UserDeliveryService'

export default {
    name: 'Activity',
    data () {
        return {
            userDeliveries: [],
            userDeliveriesAsProvider: [],
            userDeliveriesAsCustomer: [],
            uniqueDeliveriesIds: [],
        }
    },
    methods: {
        async fetchUserDeliveriesInvolvedInto () {
            const userDeliveries = await UserDeliveryService.findAllForUser(this.$store.state.user.id)
            this.userDeliveries = userDeliveries
            this.userDeliveriesAsProvider = userDeliveries.filter(ud => this.isProvider(ud))
            this.userDeliveriesAsCustomer = userDeliveries.filter(ud => !this.isProvider(ud))
            this.findAllUniqueDeliveries()
        },
        findAllUniqueDeliveries () {
            let uniqueIds = []
            this.userDeliveries.forEach(ud => {
                if (!uniqueIds.includes(ud.delivery_id)) {
                    uniqueIds.push(ud.delivery_id)
                }
            })

            this.uniqueDeliveriesIds = uniqueIds
            console.log('uniques:', uniqueIds)
        },
        isProvider (userDelivery) {
            return userDelivery.provider_id == this.$store.state.user.id
        }
    },
    mounted () {
        if (!this.$store.state.token) {
            errorToast("Vous devez être connecté pour acccéder à cette page.")
            this.$router.push('/connexion')
        }
        this.fetchUserDeliveriesInvolvedInto()
    }
}
</script>

<style>

</style>