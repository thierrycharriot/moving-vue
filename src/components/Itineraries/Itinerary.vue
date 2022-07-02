<template>
    <div class="pos-itinerary" :style="{ backgroundColor: this.isEditFormVisible ? 'white' : 'initial', padding: this.isEditFormVisible ? '1rem' : 'initial' }">
        <div class="pos-default-visible">
            <p>
                {{ itinerary.name }}
                <span v-if="this.isEditFormVisible"> - Mode édition</span>
            </p>
            <div class="pos-flex-icon">
                <img v-bind:src="iconPen" @click="this.isEditFormVisible = !this.isEditFormVisible" />
                <img v-bind:src="iconTrash" @click="handleDelete" />
            </div>
        </div>
        <ItineraryForm 
            v-if="this.isEditFormVisible"
            :baseData="itinerary"
            @onSubmit="handleEdit"
        />
    </div>
</template>

<script>
import baseIconTrash from "@/assets/icons/trash.svg";
import baseIconPen from "@/assets/icons/pen.svg";
import ItineraryService from "@/service/ItineraryService.js"
import ItineraryForm from "@/components/Itineraries/ItineraryForm"
import { successToast } from "@/helpers/toasts.js"

export default {
    name: 'Itinerary',
    components: {
        ItineraryForm
    },
    props: {
        itinerary: Object
    },
    data() {
        return {
            iconTrash: baseIconTrash,
            iconPen: baseIconPen,
            isEditFormVisible: false
        }
    },
    emits: ['onEdit', 'onDelete'],
    methods: {
        async handleEdit (data) {
            const { status, itinerary } = await ItineraryService.update(this.$store.state.user.id, this.itinerary.id, data) 
            if (status === 200) {
                successToast("L'itinéraire a été modifié !")
                this.$emit('onEdit', itinerary)
            }
        },
        async handleDelete () {
            await ItineraryService.remove(this.$store.state.user.id, this.itinerary.id)
            this.$emit('onDelete', this.itinerary)
            successToast("L'itinéraire a été supprimé !")
        }
    }
}
</script>

<style>

</style>