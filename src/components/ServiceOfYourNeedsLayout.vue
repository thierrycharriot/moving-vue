<template>

    <section class="all-service-of-your-needs">

        <div class="service-of-your-needs">
        
            <h2 id="h2-serv-of-your-need">Au service de vos besoins</h2>

            <div class="all-card-serv-of-your-needs">
                
                <div class="card-serv-of-your-needs" id="card-serv-1">
                    <!-- <img v-bind:src="city"/> -->
                    <h3 class="h3-serv-of-your-need">Le concept derrière Moving Forward</h3>
                    <button>Découvrir</button>
                </div>

                <div class="card-serv-of-your-needs" id="card-serv-2">
                    <!-- <img v-bind:src="city"/> -->
                    <h3 class="h3-serv-of-your-need">Comment devenir prestataire ?</h3>
                    <button>Découvrir</button>
                </div>

                <div class="card-serv-of-your-needs" id="card-serv-3">
                    <!-- <img v-bind:src="city"/> -->
                    <h3 class="h3-serv-of-your-need">L'équipe derrière le projet</h3>
                    <a href="/contact">
                        <button>
                            Découvrir
                        </button>
                    </a> 
                </div>

            </div>

        </div>

    </section>

</template>


<script>
import flowers from "@/assets/images/flowers.jpg";
import city from "@/assets/images/city.jpg";
import field from "@/assets/images/field.jpg";


export default {
    name: 'ServiceOfYourNeedsLayout',
    data() {
        return {
            flowers : flowers,
            city : city,
            field :field,
        }
    }
}
</script>

<style>
</style>