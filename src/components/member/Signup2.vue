<template>
  <div class='join-content container-small'>
    <h1>회원가입 상세정보</h1>
    <div class='row-group'>
      <div class='join-row'>
        <h3 class='join-title'>이름</h3>
        <span class='ps-box box-right-space'>
          <input
            class='int'
            v-model='$store.state.signup.name'
            type='text'
            placeholder='이름을 입력해주세요'
            maxlength='20'
            @blur = 'nameValid'
            @focus='checkFlag = false'
          />
        </span>
        <span class='error-next-box' v-if='!nameValidation && $store.state.signup.name'>유효하지않은 이름입니다.</span>
        <span class='error-next-box' v-if='checkFlag && !$store.state.signup.name'>이름을 입력하세요</span>
      </div>
      <div class='join-row join-birthday'>
        <h3 class='join-title'>생년월일</h3>
        <div class='bir-wrap'>
          <div class='bir-yy'>
            <span class='ps-box'>
              <select
                class='select'
                v-model='$store.state.signup.yyyy'
                @focus='checkFlag = false'
              >
                <option value=''>년</option>
                <option
                  v-for='(item, index) in $store.state.signup.yyyyList'
                  :key='index'
                  :value='item.text'
                >
                  {{ item.text }}
                </option>
              </select>
            </span>
          </div>
          <div class='bir-mm'>
            <span class='ps-box'>
              <select
                class='select'
                v-model='$store.state.signup.mm'
                @focus='checkFlag = false'
              >
                <option value=''>월</option>
                <option
                  v-for='(item, index) in $store.state.signup.mmList'
                  :key='index'
                  :value='item.text'
                >
                  {{ item.text }}
                </option>
              </select>
            </span>
          </div>
          <div class='bir-dd'>
            <span class='ps-box'>
              <select 
                class='select'
                v-model='$store.state.signup.dd'
                @focus='checkFlag = false'
              >
                <option value=''>일</option>
                <option
                  v-for ='(item,index) in $store.state.signup.ddList'
                  :key ='index'
                  :value ='item.text'
                >
                  {{item.text}}
                </option>
              </select>
            </span>
          </div>
        </div>
        <span class='error-next-box' v-if='checkFlag && (!$store.state.signup.yyyy || !$store.state.signup.mm || !$store.state.signup.dd)'>생년월일을 입력하세요</span>
      </div>

      <div class='join-row join-sex'>
        <h3 class='join-title'>성별</h3>
        <span class='ps-box gender-code'>
          <select
            class='select'
            v-model='$store.state.signup.gender'
            @focus='checkFlag = false'
          >
            <option value=''>성별</option>
            <option
              v-for='(item, index) in $store.state.signup.genderList'
              :key='index'
              :value='item.value'
            >
              {{ item.text }}
            </option>
          </select>
        </span>
        <span class='error-next-box' v-if='checkFlag && !$store.state.signup.gender'
          >성별을 선택하세요</span
        >
      </div>

      <span
        class='error-next-box'
        id='genderMsg'
        style='display:none'
        aria-live='assertive'
      ></span>

      <div class='join-row join-email'>
        <h3 class='join-title'>
          <label for='email'>이메일<span class='terms-choice'></span></label>
        </h3>
        <div class= "email-row">
          <span class='email-box'>
            <input
              type='text'
              v-model='$store.state.signup.email'
              placeholder='이메일을 입력해주세요'
              class='int'
              maxlength='100'
              @focus='checkFlag = false'
            />
          </span>
            <p>@</p>
            <span class ='email-box-select'>
              <input 
                type = 'text'
                id = 'readonlyId'
                v-model = '$store.state.signup.emailDomain'
                class = 'int'
                maxlength = '100'
                readonly
              >    
            </span>
            <span class='email-box-select'>
              <select
              class='select'
              v-model='$store.state.signup.emailDomain'
              @focus='checkFlag = false'
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
            <button type='button' v-if="checked" class="font-size-13p cursor-pointer btn-green-border-0 margin-left-1 " @click='checkEmail'>
              <span>인증코드발송</span>
            </button>
            <span type='button' v-else class="font-size-13p btn-gray-border-0 margin-left-1 " >
              인증완료 ✓
            </span>
        </div>
        <span class='error-next-box' v-if='checkFlag && !$store.state.signup.email'
          >이메일을 입력해주세요</span
        >
      </div>
      <div v-if="forCode" class = 'flex'>
        <span class = "ps-box-w20 btn-green">
          인증코드
        </span>
        <input v-model="code" class = "ps-box-w40 font-size-13p margin-left-1">
        <button v-if="checked" class = "cursor-pointer ps-box-w20 btn-green margin-left-5 w-10" @click='admitEmail'>
          확인
        </button>
        <!-- <span v-else class = "cursor-pointer ps-box-w20 btn-green margin-left-5 w-10" @click='admitEmail'>
          ✓
        </span> -->
      </div>

      <div class='join-row'>
        <h3 class='join-title'>주소</h3>
        <span class='ps-box box-right-space'>
          <input
            type='text'
            class='int'
            v-model='$store.state.signup.address'
            placeholder='주소를 입력해주세요'
            maxlength='100'
            @focus='checkFlag = false'
          />
        </span>
        <span class='error-next-box' v-if='checkFlag && !$store.state.signup.address'>
          주소를 입력해주세요
        </span>
      </div>
      <div class='join-row'>
        <h3 class='join-title'>휴대폰번호</h3>
        <span class='ps-box box-right-space'>
          <input
            class='int'
            v-model='contact'
            type='text'
            placeholder='숫자만 입력해 주세요'
            maxlength='13'
            @keyup="getPhoneMask(contact)"
            @focus='checkFlag = false'
          />
        </span>
        <span class='error-next-box' v-if='!phoneValidation && !$store.state.signup.phoneNum'>숫자를 입력해주세요.</span>
        <span class='error-next-box' v-if='checkFlag && !$store.state.signup.phoneNum'>휴대폰 번호를 입력해주세요</span>
      </div>
    </div>
    <div class='margin-top-10p'>
      <button type='button' class="cursor-pointer btn-green-border-0" @click='goNextPage'>
        <span>회원가입</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code:'',
      checkFlag: false,
      phoneValidation: true,
      nameValidation: true,
      checked: true,
      forCode: false,
      contact:null
    };
  },
  computed: {

  },
  watch: {
  },
  created() {
    const nowYear = new Date().getFullYear();
    for (let i = 0; i < 100; i++) {
      let date = nowYear - i;
      this.$store.state.signup.yyyyList.push({ value: date, text: date });
    }
    for (let i = 1; i < 13; i++) {
      this.$store.state.signup.mmList.push({
        value: i,
        text: i,
      });
    }
    for (let i =1; i < 32; i++) {
      this.$store.state.signup.ddList.push({
        value: i,
        text: i,
      });
    }
  },
  mounted() {
  },
  methods: {
    getPhoneMask(val) {
        let res = this.getMask(val)
        this.contact = res
        //서버 전송 값에는 '-' 를 제외하고 숫자만 저장
        this.$store.state.signup.phoneNum = this.contact.replace(/[^0-9]/g, '')
    },
    
    getMask( phoneNumber ) {
        if(!phoneNumber) return phoneNumber
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
    
        let res = ''
        if(phoneNumber.length < 3) {
            res = phoneNumber
        }
        else {
            if(phoneNumber.substr(0, 2) =='02') {
        
                if(phoneNumber.length <= 5) {//02-123-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3)
                }
                else if(phoneNumber.length > 5 && phoneNumber.length <= 9) {//02-123-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5)
                }
                else if(phoneNumber.length > 9) {//02-1234-5678
                    res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6)
                }
        
            } else {
                if(phoneNumber.length < 8) {
                    res = phoneNumber
                }
                else if(phoneNumber.length == 8)
                {
                    res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4)
                }
                else if(phoneNumber.length == 9)
                {
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                }
                else if(phoneNumber.length == 10)
                {
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6)
                }
                else if(phoneNumber.length > 10) { //010-1234-5678
                    res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7)
                }
            }
        }
                  
        return res
        },


    nameValid(){
      if ( /^[A-Za-z0-9가-힣]/.test(this.$store.state.signup.name)){
        this.nameValidation = true
      } else {
        this.nameValidation = false
      }
    },
    phoneValid() {
      if (/[^0-9]/g.test(this.$store.state.signup.phoneNum)) { 
        this.phoneValidation = false
        } else { 
        this.phoneValidation = true 
      }
    },
    checkEmail() {
      this.$axios.get('http://localhost:8080/member/email?id='
      +this.$store.state.signup.id+'&email='+this.$store.state.signup.email
      +'&emailDomain='+this.$store.state.signup.emailDomain)
      .then( res => {
        if(res.data == "ok") {
          alert("인증메일을 보냈습니다!");
          this.forCode = true;
        }else { 
          alert("이미 존재하는 이메일입니다.")
        }
      })
      .catch((err)=> {
        console.log(err);
      })
    },
    emailValid(event) {
      if( this.$store.state.signup.emailDomain == ''){
        document.getElementById('readonlyId').readOnly = false;
      } else {
        document.getElementById('readonlyId').readOnly = true;
      }
    },
    admitEmail() {
      this.form = {
        id : this.$store.state.signup.id,
        etoken : this.code
      }
      this.$axios.post('http://localhost:8080/member/email/check', this.form)
      .then(res => {
        console.log(res);
        if(res.data== "ok") {
          this.checked = false;
          this.forCode = false;
          alert('인증완료됐습니다.');
        }

      })
    },
    isEmpty(data) {
      if (data === '' || data === null || data === undefined) {
        return true;
      } else {
        return false;
      }
    },
    goNextPage() {
      this.checkFlag = true;
      if (
        !this.isEmpty(this.$store.state.signup.name) &&
        !this.isEmpty(this.$store.state.signup.yyyy) &&
        !this.isEmpty(this.$store.state.signup.mm) &&
        !this.isEmpty(this.$store.state.signup.dd) &&
        !this.isEmpty(this.$store.state.signup.gender) &&
        !this.isEmpty(this.$store.state.signup.email) &&
        !this.isEmpty(this.$store.state.signup.emailDomain)&&
        !this.isEmpty(this.$store.state.signup.address) &&
        !this.isEmpty(this.$store.state.signup.phoneNum) &&
        !this.checked
      ) {
        this.form = {
          id: this.$store.state.signup.id,
          password: this.$store.state.signup.password,
          pwhint : this.$store.state.signup.pwhint,
          pwhintans : this.$store.state.signup.pwhintans,
          name: this.$store.state.signup.name,
          yyyy: this.$store.state.signup.yyyy,
          mm: this.$store.state.signup.mm,
          dd: this.$store.state.signup.dd,
          gender: this.$store.state.signup.gender,
          email: this.$store.state.signup.email,
          emailDomain: this.$store.state.signup.emailDomain,
          address: this.$store.state.signup.address,
          phoneNum: this.$store.state.signup.phoneNum,
          role : this.$store.state.signup.role,
          nickname: this.$store.state.signup.nickname
        }
        this.$axios.post ('http://localhost:8080/member/signup', this.form)
        .then((res) => {
          console.log("Res",res);
            if(res.status == 200) {
              alert('회원가입 축하드립니다!')
              this.$store.commit('success')
              this.$router.push("/")
            }else {
              alert('실행중 실패했습니다. \n 다시 이용해주세요')
            }

          })
          .catch((err) => {
            console.log(err);
          })
        } else{
          alert('정보를 확인해주세요');
        }
      },
    }

};
</script>
<style scoped>
input {
	height: 100%;
	width: 100%;
	border : none;
}
.select {
  width: 100%; 
  height: 100%;
  padding: 3px 5px 3px 3px;
  font-size: 15px;
  line-height: 18px;
  color: #000;
  border: none;
  border-radius: 0;
}
</style>