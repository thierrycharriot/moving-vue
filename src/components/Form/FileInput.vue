<template>
  <div :style="{ display: this.hidden ? 'none' : 'flex' }">
    <label for="">Photo</label>
    <input type="file" @change="handleFileSelection">
  </div>
</template>

<script>
export default {
    name: 'FileInput',
    props: {
      label: String,
      class: String,
      hidden: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        file: undefined,
      }
    },
    emits: ['onFileSelected'],
    methods: {
      handleFileSelection: function (e) {
        const file = e.target.files[0]
        this.file = file
        this.$emit('onFileSelected', file) 
      }
    }
}
</script>

<style scoped>
div {
  flex-direction: column;
}
input {
  border: none;
  padding-left: 0;
  padding-top: 0;
}
</style>