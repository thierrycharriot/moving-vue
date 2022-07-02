<template>
  <div class="team-page">
      <h1>L'équipe derrière Moving Forward</h1>
      <div class="team-container">
        <Mate 
          name="Mathieu"
          :roles="['Scrum Master']"
          linkedInUrl="/in/mathieu-pajot/"
          githubUrl="/MathieuPAJOT"
          :picture="mathieu"
        />

        <Mate 
          name="Emmanuel"
          :roles="['Lead Developer Front']"
          linkedInUrl="/in/emmanuel-ratier/"
          githubUrl="/emmanuel-ratier"
          :picture="manu"
        />

        <Mate 
          name="Thierry"
          :roles="['Git Master']"
          linkedInUrl="/in/thierry-charriot/"
          githubUrl="/thierrycharriot"
          :picture="thierry"
        />

        <Mate 
          name="Anthony"
          :roles="['Product Owner', 'Lead Developer Back']"
          linkedInUrl="/in/anthony-perrier-74b932142/"
          githubUrl="/A-Perrier"
          :picture="antho"
        />
      </div>
  </div>
</template>

<script>
import mathieu from '@/assets/images/team/mathieu.png'
import manu from '@/assets/images/team/manu.png'
import antho from '@/assets/images/team/antho.png'
import thierry from '@/assets/images/team/thierry.png'
import Mate from '@/components/Team/Mate'

export default {
  name: 'Contact',
  components: {
    Mate
  },
  data () {
    return {
      mathieu,
      manu,
      antho,
      thierry
    }
  }
}
</script>

<style>
</style>