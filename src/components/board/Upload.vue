<template>
<div id="uploadImage" class="container-modify mx-auto font-15p">
  <div class="w-128p h-128p flex items-center border-2 mx-auto border-dotted border-blue">
    <div v-if="images" class="w-full h-full flex items-center"> 
      <img :src="images" class="img-a" alt="image">
      <button @click="imageDelete" class="position-rel w-16p h-16p left--23p bottom-55p border0 outline0 background-trans">
        <img class="w-16p h-16p" src="../../assets/img/update/x-mark.svg"/>
      </button>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center cursor-pointer "
          @click="clickInputTag()"
          @drop.prevent="dropInputTag($event)"
          @dragover.prevent>
      <input ref="image" id="input"
             type="file" name="image" accept="image/*" 
             class="display-none"
             @change="uploadImage()">
      <svg class="w-32p h-32p" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: ()=>({
    images: ''
  }),
  methods: {
    uploadImage: function(file) {
      let form = new FormData()
      let image = file || this.$refs['image'].files[0]
      
      form.append('image', image)
      
      this.$axios.post('http://localhost:3000/upload', form, {
          header: { 'Content-Type': 'multipart/form-data' }
      }).then( ({data}) => {
        this.images = data.data;
      })
      .catch( err => console.log(err))
    },
    dropInputTag: function(event) {
      let file = Array.from(event.dataTransfer.files, v => v)[0]
      this.uploadImage(file)
    },
    clickInputTag: function() {
      this.$refs['image'].click()
    },
    imageDelete: function() {
      var del = confirm('정말로 삭제하시겠습니까?')
      if (del){
        this.images = '';
      }
    }
  }
}
</script>

<style scoped>

</style>