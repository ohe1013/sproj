<template>
  <div class="container-small">
    <h1>회원가입</h1>
    <div class="signup-wrap">
      <form>
        <table class="member-add">
          <colgroup>
            <col width="30%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>아이디 (<span class="red">*</span>)</th>
            <td>
              <input v-model="$store.state.signup.id"  type="text" maxlength="20"
               @blur="idValid" placeholder ="공백없이 4 ~ 20자의 대소문자와 숫자만 사용가능" />
              <div class = 'error-box' v-if="!idValidation">유효하지 않은 아이디 입니다.</div>
              <div class = 'error-box' v-else-if="!idSameValidation">이미 존재하는 아이디 입니다.</div>
            </td>
          </tr>
          <tr>
            <th>비밀번호 (<span class="red">*</span>)</th>
            <td>
              <input v-model="$store.state.signup.password" ref = "signup.password" type="password" maxlength="16"
               @blur="passwordValid" placeholder="공백없이 8~16자리 영문 대문자, 소문자, 숫자 3가지 조합" />
              <div class = 'error-box' v-if="!passwordValidation">유효하지 않은 비밀번호 입니다.</div>
            </td>
          </tr>
          <tr>
            <th>비밀번호 확인 (<span class="red">*</span>)</th>
            <td>
				      <input v-model="passwordCheck" type="password" ref = "signup.passwordCheck" maxlength="16"
               @blur="passwordCheckValid" placeholder="공백없이 8~16자리 영문 대문자, 소문자, 숫자 3가지 조합"/>
            	<div class = 'error-box' v-if="!passwordCheckValidation">비밀번호가 동일하지 않습니다.</div>
			      </td>
          </tr>
          <tr>
            <th>비밀번호 힌트 (<span class="red">*</span>)</th>
            <td>
              <select v-model = "$store.state.signup.pwhint" size = "1" class ="select">
                <option value="">
                  선택하세요
                </option>
                <option
                  v-for="(item, index) in $store.state.signup.pwhintList"
                  :key="index"
                  :value="item.text"
                >
                  {{ item.text }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <th>답변 (<span class="red">*</span>)</th>
            <td><input v-model = "$store.state.signup.pwhintans" type="text"></td>
          </tr>
          <tr>
            <th>닉네임 (<span class="red">*</span>)</th>
            <td>
              <input v-model = "$store.state.signup.nickname" 
              @blur="nicknameCheck" type="text" placeholder="공백없이 2~8자 한글,영문,숫자만 사용가능">
              <div class = 'error-box' v-if="!nicknameValidation">유효하지 않은 닉네임 입니다.</div>
            </td>
          </tr>
          <tr>
            <th>역할 선택 (<span class="red">*</span>)</th>
            <td>
              <select v-model = "$store.state.signup.role" size = "1" class ="select">
                <option value="">
                  선택하세요
                </option>
                <option
                  v-for="(item, index) in $store.state.signup.roleList"
                  :key="index"
                  :value="item.text"
                >
                  {{ item.text }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td colspan = "2" align ="center">
              <button type="button" class="cursor-pointer btn-green-border-0" @click="goNextPage">        
                <span>다음 페이지</span>
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idValidation: true,
      idSameValidation : true,
      passwordValidation: true,
      passwordCheck:'',
      passwordCheckValidation : true,
      nicknameValidation: true
    };
  },
  computed: {
  },
  methods: {
    idValid() {
      if ( /^[A-Za-z0-9]{4,20}$/.test(this.$store.state.signup.id)){
        this.idValidation = true
      } else {
        this.idValidation = false
      }
      this.$axios.get('http://localhost:8080/member/' + this.$store.state.signup.id)
      .then((res) => {
          if(res.data) {
            this.idSameValidation = false
            console.log("id already exsists");
          }else {
            this.idSameValidation = true
          }

        })
      .catch((err) => {
        console.log(err);
      })
    
    },
    passwordValid () {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.$store.state.signup.password)) { 
        this.passwordValidation = true 
        } else { 
        this.passwordValidation = false 
      }
    },
    passwordCheckValid () {
      if( this.$store.state.signup.password === this.passwordCheck) {
        this.passwordCheckValidation = true
      } else {
        this.passwordCheckValidation = false
      }
    },
    nicknameCheck(){
      if ( /^[A-Za-z0-9가-힣]{2,8}$/.test(this.$store.state.signup.nickname)){
        this.nicknameValidation = true
      } else {
        this.nicknameValidation = false
      }
    },
    goNextPage() {
      if (this.$store.state.signup.id == '' || this.$store.state.signup.password == '' || this.$store.state.signup.passwordCheck == '' || this.$store.state.signup.pwhint === '' || this.$store.state.signup.pwhintans == '' || this.$store.state.signup.role =='' ){
        alert('필수값 누락')
        return
      }
      if (!this.idValidation || !this.idSameValidation || !this.passwordValidation || !this.passwordCheckValidation) { 
        alert('유효성 확인') 
        return 
      }

      this.$router.push({ name : 'Signup2'});
    }
  }
};
</script>

<style scoped>
.select {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
