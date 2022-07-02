<template>
    <div class="desktop" ref="page">
        <main class="message-page__content">
            <div class="message-page__topbar">
                <div class="message-page__topbar-content">
                    <h2>Conversation entre vous et {{ localConversation.interlocutor.display_name }}</h2>
                    <p>{{ this.userDelivery.customer_id == this.$store.state.user.id ? 
                        ('Vous êtes le bénéficiaire pour la prestation ') : 
                        ('Vous êtes le prestataire pour la prestation')
                        }}
                    </p>
                </div>
            </div>
            <perfect-scrollbar ref="scrollbar">
                <section class="message-page__messages">
                    <div v-for="message in localConversation.messages" :key="message.id" class="unique-message" :class="{self: localConversation.interlocutor.id != message.sender_id}">
                        <div class="unique-message__container">
                            <div class="unique-message__header">
                                <img :src="sampleUser" alt="">
                                <!-- If the user sender_id is not ours, so we display the interlocutor name, else, ours -->
                                <h4>{{ localConversation.interlocutor.id == message.sender_id ? localConversation.interlocutor.display_name : 'Vous'}}</h4>
                                <p class="unique-message__header-date">{{ message.sent_at ? getMessageDate(message.sent_at) : 'Maintenant'}}</p>
                            </div>

                            <!-- By default, apostrophes are escaped with an antislash so we remove them -->
                            <p class="message-content">{{ message.content.replaceAll('\\', '') }}</p>
                        </div>
                    </div>
                </section>
            </perfect-scrollbar>

            <section class="message-page__respond">
                <textarea v-model="answer"></textarea>
                <button class="button thin" @click="sendMessage">Envoyer</button>
            </section>
        </main>

    </div>
</template>

<script>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import MailboxService from '@/service/MailboxService'
import sampleUser from '@/assets/icons/user-sample.svg'

export default {
    name: 'ConversationMobile',
    components: {
        PerfectScrollbar
    },
    props: {
        conversation: Object,
        userDelivery: Object
    },
    data () {
        return {
            sampleUser,
            answer: '',
            localConversation: this.conversation
        }
    },
    methods: {
        async sendMessage () {
            /**
             * We are formatting the data to a usable set of data
             * interpretable by our custom table in WordPress
             */
            const formattedMessage = {
                sender_id: this.$store.state.user.id,
                //sender_id: 1,
                receiver_id: this.conversation.interlocutor.id,
                user_delivery_id: this.userDelivery.id,
                content: this.answer
            }

            // Awaiting of the API response
            const { status } = await MailboxService.send(formattedMessage)

            // HTTP Code 201 means "created"
            if (status === 201) {
                this.localConversation.messages.push(formattedMessage)
            }
        },

        /**
         * Evaluates if two dates are on the same calendar day (not just the day number)
         * @param {datetime} first
         * @param {datetime} second
         * @returns {boolean}
         */
        dateAreOnSameDay (first, second) {
            return first.getFullYear() === second.getFullYear() &&
                   first.getMonth() === second.getMonth() &&
                   first.getDate() === second.getDate();
        },

        /**
         * Convert an SQL datetime to a user-friendly string (e.g.: Aujourd'hui à 7h55)
         * @param {string} dateString A datetime string to the SQL format
         * @returns {string}
         */
        getMessageDate (dateString) {
            const msgDate = new Date(dateString)
            const now = new Date()
            let toDisplay = ''

            if (this.dateAreOnSameDay(msgDate, now)) {
                toDisplay += "Aujourd'hui, à "
            } else {
                toDisplay += 'Le ' + msgDate.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' }) + ' à '
            }
            toDisplay += msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            return toDisplay
        }
    },

    /**
     * Mounted is an event triggered on the component creation into the DOM
     */
    mounted () {
        // Scroll to the bottom of the messages historic
        this.$refs.scrollbar.ps.element.scrollTop = this.$refs.scrollbar.ps.element.scrollHeight
        console.log(this.userDelivery)
    },

    /**
     * Updated is an event triggered on the component update (e.g.: props modified from the parent)
     */
    updated () {
        this.localConversation = this.conversation
    }
}
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css">
</style>