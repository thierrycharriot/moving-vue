<template>
    <div>
        <div v-if="screenWidth < 1024" class="mailbox-page">
            <Searchbar @onSearchRequest="handleSearch" />
            <div class="messages">
                <div v-for="userDelivery in userDeliveriesToDisplay" :key="userDelivery.id" class="message" @click="(e) => handleShowConversation(e, userDelivery)">
                    <div class="message__content">
                        <img :src="sampleUser" alt="" class="profile-picture">
                        <div class="message__preview">
                            <h4 class="message__interlocutor">{{ userDelivery.conversation.interlocutor.display_name }}</h4>
                            <p class="message__extract">{{ userDelivery.conversation.messages[userDelivery.conversation.messages.length - 1].content.replaceAll('\\', '').slice(0, 30) + '...' }}</p>
                        </div>
                    </div>
                </div>
                <ConversationMobile 
                    v-if="shouldConversationBeShown" 
                    class="message-page"
                    @onCloseRequest="this.shouldConversationBeShown = false"
                    :conversation="conversationToShow.conversation"
                    :userDelivery="conversationToShow"
                />
            </div>
        </div>

        <div v-else class="mailbox-page desktop">
            <aside class="left-sidebar">
                <Searchbar @onSearchRequest="handleSearch" />
                <div v-for="userDelivery in userDeliveriesToDisplay" :key="userDelivery.id" class="message" @click="(e) => handleShowConversationDesktop(e, userDelivery)">
                    <div class="message__content">
                        <img :src="sampleUser" alt="" class="profile-picture">
                        <div class="message__preview">
                            <h4 class="message__interlocutor">{{ userDelivery.conversation.interlocutor.display_name }}</h4>
                            <p class="message__extract">{{ userDelivery.conversation.messages[userDelivery.conversation.messages.length - 1].content.replaceAll('\\', '').slice(0, 30) + '...' }}</p>
                        </div>
                    </div>
                </div>
            </aside>
            <main>
                <ConversationDesktop
                    v-if="this.conversationToShow" 
                    class="message-page"
                    :conversation="conversationToShow.conversation"
                    :userDelivery="conversationToShow"
                    :slide="false"
                />
            </main>
        </div>
    </div>
</template>

<script>
import Searchbar from '@/components/Mailbox/Searchbar.vue'
import ConversationMobile from '@/components/Mailbox/ConversationMobile.vue'
import ConversationDesktop from '@/components/Mailbox/ConversationDesktop.vue'
import sampleUser from '@/assets/icons/user-sample.svg'
import MailboxService from '@/service/MailboxService.js'

export default {
    name: 'Mailbox',
    data () {
        return {
            search: '',
            sampleUser,
            conversationToShow: null,
            shouldConversationBeShown: false,
            userDeliveries: [],
            userDeliveriesToDisplay: [],
            screenWidth: window.innerWidth,
        }
    },
    components: {
        Searchbar,
        ConversationMobile,
        ConversationDesktop
    },
    mounted () {
        window.addEventListener('resize', this.onResize)
        this.fetchConversations()
        if (!this.$store.state.token) {
            // A décommenter lorsque l'on arrêtera de faire du debug
            //this.$router.push('/connexion')
        }
    },
    beforeUnmount () {
        removeEventListener('resize', this.onResize)
    },
    methods: {
        handleSearch (search) {
            this.search = search
            this.userDeliveriesToDisplay = this.userDeliveries.filter(us_del => us_del.conversation.interlocutor.display_name.toLowerCase().includes(this.search.toLowerCase()))
        },
        handleShowConversation (e, userDelivery) {
            this.conversationToShow = userDelivery
            this.shouldConversationBeShown = true
        },
        handleShowConversationDesktop (e, userDelivery) {
            this.conversationToShow = userDelivery
            document.querySelectorAll('.message.active').forEach(msg => msg.classList.remove('active'))
            e.currentTarget.classList.add('active')
        },
        async fetchConversations () {
            //const userDeliveries = await MailboxService.findAllConversations(4)
            const userDeliveries = await MailboxService.findAllConversations(this.$store.state.user.id)
            this.userDeliveries = userDeliveries.data
            this.userDeliveriesToDisplay = this.userDeliveries
        },
        onResize () {
            this.screenWidth = window.innerWidth
        }
    }
}
</script>

<style>

</style>