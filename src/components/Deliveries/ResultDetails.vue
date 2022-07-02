<template>
    <div class="slide-rtl result-details" ref="page">
        <PerfectScrollbar>
            <div class="result-details__header">
                <img class="pointer" :src="back" alt="Revenir à la liste des résultats" @click="onCloseRequest">
                <div class="header__illustration">
                    <img v-if="screenWidth < 768" :src="delivery.pictures[0].link" alt="">
                    <img v-else :src="delivery.pictures[1].link" alt="">
                </div>
            </div>
            <div class="result-details__content">
                <div class="content__header">
                    <h3>{{ delivery.post_title }}</h3>
                    <div class="header__meta">
                        <div class="first-line">
                            <div class="place">
                                <img :src="pin" alt="Lieu">
                                <p>{{ place }}</p>
                            </div>
                            <div class="rating">
                                <img :src="star" alt="Note" width="18">
                                <p>4.9 (12)</p>
                            </div>
                        </div>
                        <div class="second-line">
                            <div class="period">
                                <img :src="calendar" alt="Période">
                                <p>25 février - 02 mars</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content__description">
                    <h4>Description</h4>
                    <div v-html="delivery.post_content" />
                </div>

                
                <div ref="contact" class="recap">
                    <div class="recap__default-showing">
                        <div class="content__header">
                            <h3>{{ delivery.post_title }}</h3>
                            <div class="header__meta">
                                <div class="first-line">
                                    <div class="place">
                                        <img :src="pin" alt="Lieu">
                                        <p>{{ place }}</p>
                                    </div>
                                    <div class="rating">
                                        <img :src="star" alt="Note" width="18">
                                        <p>4.9 (12)</p>
                                    </div>
                                </div>
                                <div class="second-line">
                                    <div class="period">
                                        <img :src="calendar" alt="Période">
                                        <p>16 mars - 24 mars</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button v-if="!contactScreenDisplayed" class="button" @click="contactProvider">Contacter</button>
                        <button v-else class="button" @click="closeContactProvider">Annuler</button>
                    </div>

                    <div v-if="contactScreenDisplayed" class="recap__contact-box">
                        <textarea v-model="contactMessage" />
                        <button class="button" @click="handleConversationRequest">Envoyer</button>
                    </div>
                </div>
                
            </div>
        </PerfectScrollbar>
    </div>
</template>

<script>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import back from '@/assets/icons/arrow-back-dark.svg'
import pin from '@/assets/icons/position.svg'
import calendar from '@/assets/icons/calendar.svg'
import star from '@/assets/icons/star.svg'
import exampleImg from '@/assets/images/example-details.jpg'
import exampleImgDesktop from '@/assets/images/example-details-desktop.jpg'
import UserDeliveryService from '@/service/UserDeliveryService'
import MailboxService from '@/service/MailboxService'
import { successToast, errorToast } from '@/helpers/toasts'

export default {
    name: 'ResultDetails',
    components: {
        PerfectScrollbar
    },
    props: {
        delivery: Object
    },
    data () {
        return {
            back,
            pin,
            calendar,
            star,
            exampleImg,
            exampleImgDesktop,
            screenWidth: window.innerWidth,
            contactScreenDisplayed: false,
            contactMessage: '',
            place: JSON.parse(window.localStorage.getItem('research')).properties.label
        }
    },
    methods: {
        onCloseRequest () {
            this.$refs.page.classList.add('slide-rtl-return')
            setTimeout(() => {
                this.$emit('onCloseRequest')
            }, 300)
        },
        contactProvider () {
            this.$refs.contact.classList.add('slide-btt')
            setTimeout(() => {
                this.contactScreenDisplayed = true
            }, 300)
        },
        closeContactProvider () {
            this.$refs.contact.classList.add('slide-btt-return')
            this.contactScreenDisplayed = false
            setTimeout(() => {
                this.$refs.contact.classList.remove('slide-btt-return', 'slide-btt')
            }, 300)
        },
        /**
         * If the user is coming from the "Contact" button onto a Delivery details,
         * we check if he/she already has a conversation with the provider 
         * concerning this delivery. If yes, does nothing. If no, create a new 
         * user_delivery which linked both Customer and Provider around this
         * delivery
         */
        async handleConversationRequest () {
            if (!this.$store.state.token) {
                errorToast("Vous devez vous connecter pour envoyer un message")
                return
            }

            
            const exists = await UserDeliveryService.checkIfExists({
                customer_id: this.$store.state.user.id,
                delivery_id: this.delivery.ID
            })

            if (exists) {
                errorToast("Vous avez déjà une conversation avec ce prestataire concernant cette offre")
            }
            
            if (!exists) {
                const result = await UserDeliveryService.create({
                    customer_id: this.$store.state.user.id,
                    provider_id: parseInt(this.delivery.post_author),
                    delivery_id: this.delivery.ID 
                })

                const userDelivery = result.data

                    console.log({
                    sender_id: this.$store.state.user.id,
                    receiver_id: parseInt(this.delivery.post_author),
                    user_delivery_id: parseInt(userDelivery.id),
                    content: this.contactMessage
                })

                const send = await MailboxService.send({
                    sender_id: this.$store.state.user.id,
                    receiver_id: parseInt(this.delivery.post_author),
                    user_delivery_id: userDelivery.id,
                    content: this.contactMessage
                })

                if (send.status === 201) {
                    successToast('Message envoyé !')
                }
            }
        }
    }
}
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css">

</style>