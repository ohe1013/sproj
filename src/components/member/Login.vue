<template>
<div>
  <div class = "margin-top-100p"> 
  <h1 >HG VUE</h1>
  </div>
    <article id= "login_container" v-if = "isLogin">
        <form id = "login_form" v-on:submit.prevent = "loginSubmit">
          <div class="form-group justify-center margin-top-20p">
            <!-- <label for="userId" class="label font-weight-bold">아이디</label> -->
              <div class="input-box">
                <input type="text" class= "font-size-15p w-20 h-32p" placeholder=" ID" ref="userId" v-model="user_id">
              </div>
          </div>
          <div class="form-group justify-center margin-top-20p">
            <!-- <label for="userPw" class="label font-weight-bold">패스워드</label> -->
              <div class="input-box">
                <input type="password" class="font-size-15p  w-20 h-32p" placeholder=" Password" ref="userPw" v-model="user_pw">
              </div>
          </div>
          <div class="form-group">
            <div class='margin-top-20p '>
              <button class='cursor-pointer ps-box-w20 btn-green margin-0-auto padding-10p' id= 'loginBtn' type="submit"> Log in</button>
            </div>
          </div>
          <div class = "find flex justify-center margin-top-100p">
            <router-link class="font-weight-bold" style="color:rgb(56, 152, 255)" to="/member/Find">
              아이디 / 비밀번호를 잊으셨나요?
            </router-link>
          </div>

      </form>
  </article>
</div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      user_id: '',
      user_pw: '',
      isLogin: true,
    }
  },

  methods: {
    loginSubmit : function() {
      console.log('로그인');
      this.$axios.post('http://localhost:8080/member/login', {id: this.user_id, password: this.user_pw}).then(
        res =>{
           if(res.status ==200 && res.data != "") {
            console.log("resres",res);

              if(res.data.id == this.user_id) {
                this.$store.commit('getUser',res.data);
                this.$session.set("id",this.$store.id);
                this.$session.set("expired",new Date().getTime()+1000*3600*30);
                this.$router.push('/');

              }else{
                alert('로그인 정보를 확인해주세요')
              }
              
            // this.$store.commit('getUser',res)
            // this.$store.commit('loginToken',res.data.token);
          }else {
            alert('로그인 정보를 확인해주세요');
          }
        },
        error => {
          console.log(error);
          alert('로그인 정보를 확인해주세요',error);
        }
      )
    }
  }
}
</script>