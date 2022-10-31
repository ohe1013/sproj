<template>
  <div class="container-small">
    <h2>프로필 수정</h2>

    <MyModal v-if="is_show" @close="is_show = false" @image="image">
      <button slot="header" class="float-right background-trans border1 cursor-pointer" @click="showPopup()"> 
        취소
      </button>
      <h2 slot="header">기본 이미지 선택</h2>
    </MyModal>
    <table>
      <tr>
        <th class="back-gray border-1p-sol-gray">프로필 사진</th>
        <td class="border-1p-sol-gray padding-10p">
          <div>
            <div>
              <div class=" mx-auto w-200p h-200p cursor-pointer padding-10p"
                @click="clickInputTag()"
                @drop.prevent="dropInputTag($event)"
                @dragover.prevent
              >
                <input ref="image" id="input" type="file" name="image" accept="image/*" class="display-none" @change="uploadImage()"> 
                <img v-if='dummyImg' class="border-rad-50 w-200p h-200p" :src="dummyImg"/>
                <img v-else class="border-rad-50 w-200p h-200p" :src="dummyImg"/>
              </div>
            </div>
            <div class="flex ">
              <div class="mx-auto">
                <button @click="clickInputTag()" class="cursor-pointer margin-right-10p background-trans">사진 변경</button>
                <button @click="showPopup()" class="cursor-pointer margin-right-10p background-trans">기본이미지</button>
                <button @click="imageDelete()" class="cursor-pointer background-trans">삭제</button>
              </div>
            </div>
          </div>
		    </td>
      </tr>
      <tr>
        <th class="back-gray border-1p-sol-gray">별명</th>
        <td class="padding-10p border-1p-sol-gray font-size-20p">
          <input v-if='dummyNick' v-model="dummyNick" @blur="nicknameCheck" type="text" placeholder="공백없이 2~8자 한글,영문,숫자만 사용가능"/>
          <input v-else v-model="dummyNick" @blur="nicknameCheck" type="text" placeholder="공백없이 2~8자 한글,영문,숫자만 사용가능"/>
          <div class = 'error-box' v-if="nicknameValidation">공백없이 2~8자 한글,영문,숫자만 사용가능합니다.</div>
        </td>
      </tr>
    </table>
    <div class="cursor-pointer padding-10p btn-green w-20 mx-auto margin-top-10p" @click="updateProfile()">
      <a href="javascript:;" class="color-w" > 수정</a>
    </div>
  </div>
</template>

<script>
import MyModal from '../modal/MyModal'
export default {
  components : {MyModal},
  data: ()=>({
    nicknameValidation: false,
    formUser: '',
    is_show:false,
    dummyNick:'',
    dummyImg:'',
    img:''
  }),
  created() {
    this.dummyNick = this.$store.state.nickname;
    this.dummyImg = this.$store.state.img;
  },
  methods: {
    uploadImage: function(file) {
      let form = new FormData();
      let image = file || this.$refs['image'].files[0];
      form.append('file', image);
      
      this.$axios.post('http://localhost:8080/file/upload', form, {
          header: { 'Content-Type': 'multipart/form-data' }
      })
      .then( data => {
        this.dummyImg = 'http://localhost:8080/file/download/'+data.data;
      })
      .catch( err => console.log(err))
    },
    getImage: function(file) {
      let form = new FormData();
      let image = file || this.$refs['image'].files[0];
      
      form.append('image', image);
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
        this.dummyImg = 'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629336128413.png';
      }
    },
    showPopup: function() {
      this.is_show = !this.is_show
    },
    nicknameCheck: function() {
      if ( /^[A-Za-z0-9가-힣]{2,8}$/.test(this.dummyNick)){
        this.nicknameValidation = false
      } else {
        this.nicknameValidation = true 
      }
    },
    updateProfile: function() {
      if(this.nicknameValidation === true){
        alert('닉네임을 확인해주세요.')
      }
      else{
        this.formUser = {
          id : this.$store.state.id,
          img : this.dummyImg,
          nickname : this.dummyNick
        }
        this.$axios.post('http://localhost:8080/member/update',this.formUser)
        .then((res) => {
            if(res.status==200) {
              console.log(res);
              this.$store.commit('infoChange',this.formUser)
              alert('정보가 수정되었습니다.!')
              this.$router.push({name : 'Mypage'})
            }else {
              alert('실행중 실패했습니다. \n 다시 이용해주세요')
            }
        }) 
      }
    },
    image: function (image) {
        this.dummyImg = image;
    }
  }
}
</script>
<style scoped>

</style>