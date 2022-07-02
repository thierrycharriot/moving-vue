<template>
    <div class="conversation-details-page slide-rtl" ref="page">
        <main class="conversation-details-page__content">
            <div class="conversation-details-page__topbar">
                <div class="conversation-details-page__topbar-content">
                    <img class="pointer" :src="back" @click="onCloseRequest">
                </div>
            </div>

            <section class="conversation-details__content">
                <div class="conversation-details__content-header">
                    <p><span>Objet : </span>Arrosage des plantes</p>
                    <p><span>Prestataire : </span>Vous</p>
                    <p><span>Bénéficiare : </span>{{ conversation.interlocutor.display_name }}</p>
                    <p><span>Lieu : </span>Versailles</p>
                    <p class="unchosen"><span>Date : </span>A définir</p>
                </div>
            </section>            
        </main>
    </div>
</template>

<script>
import back from '@/assets/icons/arrow-back.svg'

export default {
    name: 'ConversationDetails',
    props: {
        conversation: Object
    },
    data () {
        return {
            back
        }
    },
    methods: {
        onCloseRequest () {
            this.$refs.page.classList.add('slide-rtl-return')
            setTimeout(() => {
                this.$emit('onCloseRequest')
            }, 300)
        }
    }
}
</script>

<style>

</style>