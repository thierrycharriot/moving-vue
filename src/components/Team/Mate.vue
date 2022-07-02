<template>
    <div class="mate-container">
        <div class="mate-main">
            <img :src="this.picture" alt="Mathieu">
            <div class="mate-content">
                <h3 class="name">{{ this.name }}</h3>
                <p v-for="role in this.roles" :key="role" class="role">{{ role }}</p>
            </div>
        </div>
        <div class="mate-contact">
            <h4>Le contacter</h4>
            <div class="contact-info">
                <img :src="linkedin" alt="LinkedIn de Mathieu Pajot">
                <p>{{ this.linkedInUrl }}</p>
            </div>
            <div class="contact-info">
                <img :src="github" alt="GitHub de Mathieu Pajot">
                <p>{{ this.githubUrl }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import linkedin from '@/assets/images/team/linkedin.svg'
import github from '@/assets/images/team/github.svg'

export default {
    name: 'Mate',
    props: {
        name: String,
        roles: Array,
        linkedInUrl: String,
        githubUrl: String,
        picture: String
    },
    data () {
        return {
            linkedin,
            github
        }
  }
}
</script>

<style>

</style>