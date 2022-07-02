<template>
    <div class="research-result" @click="handleShowDetails">
        <img :src="delivery.pictures[0].link" :alt="`Illustration de la prestation ${delivery.post_title}`">
        <div class="research-result__content">
            <div class="research-result__header">
                <div class="main-line">
                    <p class="main-line__post-title">{{delivery.post_title}}</p>
                    <div class="main-line__post-rating">
                        <img :src="star" alt="Note sur 5 de la prestation">
                        <p>4.5/5</p>
                    </div>
                </div>
                <p class="period">{{ place }}, 16 mars - 24 mars</p>
            </div>
            <p class="research-result__excerpt" v-html="excerpt(delivery.post_content)" />
        </div>
    </div>
</template>

<script>
import star from '@/assets/icons/star.svg'
import exampleImg from '@/assets/images/delivery-result-test.jpg'

export default {
    name: 'Result',
    props: {
        delivery: Object
    },
    data () {
        return {
            star,
            exampleImg,
            place: JSON.parse(window.localStorage.getItem('research')).properties.label
        }
    },
    methods: {
        excerpt (content) {
            let str = content.slice(0, 100)
            if (str.length >= 100) str += ' ...';
            return str
        },
        handleShowDetails () {
            this.$emit('onShowDetailsRequested', this.delivery)
        }
    },
    mounted () {
        console.log(this.delivery)
    }
}
</script>

<style>

</style>