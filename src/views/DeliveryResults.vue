<template>

  <div class="results-page">
    <div class="results-page__map">
        <MapsLeaflet/>    
    </div>
    <main class="results-container" v-if="results.length > 0">
        <DeliverySearchbar 
            :deliveryNameLike="deliveryNameLike"
            :around="around"
        />
        <h2>{{resultsHeading}}</h2>
        <Result 
            v-for="result in results" :key="result.id"
            :delivery="result"
            @onShowDetailsRequested="handleShowDeliveryDetails"
        />
    </main>
    <ResultDetails 
        v-if="shouldDetailsBeShown"
        :delivery="deliveryToShowDetails"
        @onCloseRequest="handleCloseDeliveryDetails"
    />
  </div>
</template>

<script>
import DeliverySearchbar from '@/components/Deliveries/DeliverySearchbar'
import ResearchService from '@/service/ResearchService'
import Result from '@/components/Deliveries/Result'
import ResultDetails from '@/components/Deliveries/ResultDetails'
import MapsLeaflet from '@/components/MapsLeaflet'

export default {
    name: 'DeliveryResults', 

    components: {
        DeliverySearchbar,
        Result,
        ResultDetails,
        MapsLeaflet,
    },
    data () {
        return {
            results: [],
            screenWidth: window.innerWidth,
            deliveryNameLike: '',
            around: '',
            shouldDetailsBeShown: false,
            deliveryToShowDetails: null
        }
    },
    methods: {
        onResize () {
            this.screenWidth = window.innerWidth
        },
        async fetchDeliveries () {
            const placeRequested = JSON.parse(window.localStorage.getItem('research'))
            const deliveries = await ResearchService.findAllRelated(encodeURI(this.$route.query.delivery), encodeURI(placeRequested.properties.label))
            this.$store.commit('setSearch', deliveries)
            this.results = deliveries.data
        },
        handleShowDeliveryDetails (del) {
            document.getElementById('app').style.height = '100vh'
            document.getElementById('app').style.overflow = 'hidden'
            this.deliveryToShowDetails = del
            this.shouldDetailsBeShown = true
        },
        handleCloseDeliveryDetails () {
            document.getElementById('app').style.height = 'initial'
            document.getElementById('app').style.overflow = 'initial'
            this.deliveryToShowDetails = null
            this.shouldDetailsBeShown = false
        }
    },
    computed: {
        resultsHeading () {
            let str = ''
            str += this.results.length
            if (this.results.length > 1) str += ' résultats à proximité';
            else str += ' résultat à proximité';
            return str
        }
    },
    mounted () {
        window.addEventListener('resize', this.onResize)
        this.deliveryNameLike = this.$route.query.delivery
        this.around = this.$route.query.around
        this.fetchDeliveries()
    },
    beforeUnmount () {
        removeEventListener('resize', this.onResize)
    }
}
</script>

<style>

</style>