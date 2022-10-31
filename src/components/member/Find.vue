<template>
<div>
    <div class = "margin-0"> 
        <div class= " justify-center flex">
            <button id='id' class='select-convert' @click="convertId()"> 아이디 찾기</button>
            <button id='password' class='unselect-convert' @click="convertPassword()"> 비밀번호 찾기 </button>
        </div>
    
  </div>
  <hr>
    <div v-if="id" class= "margin-top-100p">
        <div class = 'color-green font-size-20p font-weight-bold'>
            회원가입 시 설정한 힌트를 통해 아이디 찾기
        </div>

        <div>
            <div class='flex justify-center'>

                <div class= "email-row">
                    <span class='ps-box-150-border'>
                        <input
                        class= "font-size-15p w-full h-32p"
                        v-model='email'
                        placeholder='Email'
                        />
                    </span>
                    <p class='margin-left-2'>@</p>
                    <span class='ps-box-150-border margin-left-1'>
                        <input 
                        id = 'readonlyId'
                        class= "font-size-15p w-full h-32p margin-right-50p"
                        v-model = 'emailDomain'
                        readonly
                        >    
                    </span>

                    <span class='ps-box-150-border margin-left-5'>
                            <select
                            class='select w-full'
                            v-model='emailDomain'
                            @change='emailValid($event)'
                            >
                                <option
                                    v-for='(item, index) in $store.state.signup.emailList'
                                    :key='index'
                                    :value='item.value'
                                >
                                    {{ item.text }}
                                </option>
                            </select>
                        </span>

                </div>

                </div>
                <div class='flex justify-center'>
                    <span class="ps-box-464-border flex">
                        <select v-model = "$store.state.signup.pwhint" size = "1" class ="select w-full">
                            <option value="">
                            비밀번호 힌트
                            </option>
                            <option
                            v-for="(item, index) in $store.state.signup.pwhintList"
                            :key="index"
                            :value="item.text"
                            >
                            {{ item.text }}
                            </option>
                        </select>
                    </span>
                </div>
                <div class='flex justify-center'>
                    <span class="ps-box-255-border ">
                        <input type="text" class= "font-size-15p w-full  h-32p" placeholder=" 답변" ref="pwhint" v-model="pwhintans">
                    </span>
                </div>
                <div class='margin-top-20p '>
                    <button class='cursor-pointer ps-box-w20 btn-green margin-0-auto padding-10p' @click="findId">아이디 찾기</button>
                </div>
            </div>
    </div>
    <div v-else class= "margin-top-100p">
        <div class = 'color-green font-size-20p font-weight-bold'>
            회원가입 시 설정한 힌트를 통해 비밀번호 찾기
        </div>
        <div class='flex justify-center'>
            <span class="ps-box-255-border ">
                <input type="text" class= "font-size-15p w-full  h-32p" placeholder=" ID"  v-model="user_id">
            </span>
        </div>
        <div>
            <div class='flex justify-center'>

                <div class= "email-row margin-top-20p">
                    <span class='ps-box-150-border'>
                        <input
                        class= "font-size-15p w-full h-32p"
                        v-model='email'
                        placeholder='Email'
                        />
                    </span>
                    <p class='margin-left-2'>@</p>
                    <span class='ps-box-150-border margin-left-1'>
                        <input 
                        id = 'readonlyId'
                        class= "font-size-15p w-full h-32p margin-right-50p"
                        v-model = 'emailDomain'
                        readonly
                        >    
                    </span>

                    <span class='ps-box-150-border margin-left-5'>
                            <select
                            class='select w-full'
                            v-model='emailDomain'
                            @change='emailValid($event)'
                            >
                                <option
                                    v-for='(item, index) in $store.state.signup.emailList'
                                    :key='index'
                                    :value='item.value'
                                >
                                    {{ item.text }}
                                </option>
                            </select>
                        </span>

                </div>

                </div>
                <div class='flex justify-center'>
                    <span class="ps-box-464-border flex">
                        <select v-model = "$store.state.signup.pwhint" size = "1" class ="select w-full">
                            <option value="">
                            비밀번호 힌트
                            </option>
                            <option
                            v-for="(item, index) in $store.state.signup.pwhintList"
                            :key="index"
                            :value="item.text"
                            >
                            {{ item.text }}
                            </option>
                        </select>
                    </span>
                </div>
                <div class='flex justify-center'>
                    <span class="ps-box-255-border ">
                        <input type="text" class= "font-size-15p w-full  h-32p" placeholder=" 답변" ref="pwhint" v-model="pwhintans">
                    </span>
                </div>
                <div class='margin-top-20p '>
                    <button class='cursor-pointer ps-box-w20 btn-green margin-0-auto padding-10p' @click="findPassword">비밀번호 찾기</button>
                </div>
            </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      user_id: '',
      email:'',
      emailDomain:'',
      pwhintans:'',
      isLogin: true,
      id:true,
      form:''
    }
  },

  methods: {
      convertId : function() {
          document.getElementById('id').setAttribute('class','select-convert');
          document.getElementById('password').setAttribute('class','unselect-convert');
          this.id = true;
      },
      convertPassword : function() {
          document.getElementById('id').setAttribute('class','unselect-convert');
          document.getElementById('password').setAttribute('class','select-convert');
          this.id = false;
      },
      findId : function() {
          this.form = {
              email: this.email,
              emailDomain : this.emailDomain,
              pwhint: this.$store.state.signup.pwhint,
              pwhintans: this.pwhintans
          }
          this.$axios.post('http://localhost:8080/member/find/id',this.form)
          .then( res => {
              if (res.data== "ok") {
                  alert('이메일로 아이디를 발송하였습니다.');
                  this.$router.push('/member/login')
              }else{
                  alert('정보를 한번 더 확인해주세요!')
              } 


          })
      },
      findPassword : function() {
          this.form = {
              id : this.user_id,
              email: this.email,
              emailDomain : this.emailDomain,
              pwhint: this.$store.state.signup.pwhint,
              pwhintans: this.pwhintans
          }
          this.$axios.post('http://localhost:8080/member/find/password',this.form)
          .then( res => {
              if (res.data== "ok") {
                  alert('이메일로 새로운 password를 발송하였습니다.');
                  this.$router.push('/member/login')
              }else{
                  alert('정보를 한번 더 확인해주세요!')
              } 


          })
      },
        emailValid: function() {
            if( this.emailDomain == ''){
                document.getElementById('readonlyId').readOnly = false;
            } else {
                document.getElementById('readonlyId').readOnly = true;
      }
    },
    
  }
}
</script>



<style>
.select {
  height: 100%;
  padding: 3px 5px 3px 3px;
  font-size: 15px;
  line-height: 18px;
  color: #000;
  border-radius: 0;
}
</style>