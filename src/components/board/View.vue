<template>
  <div class = "container-small">
    <h1>게시판 상세보기</h1>
    <div class="AddWrap">
      <form>
        <table class="tb-add">
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tr>
            <th>제목</th>
            <td>{{subject}}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td class="txt_cont" v-html="cont"></td>
          </tr>
        </table>
      </form>
    </div>
    <div class="btn-wrap" >
      <a href="javascript:;" @click="fnList" class="btn">목록</a>
      <a
        href="javascript:;"
        @click="fnMod"
        class="btn-add btn"
        v-if="$store.state.token && id==$store.state.id"
      >수정</a>
      <a
        href="javascript:;"
        @click="fnDeleteProc"
        class="btn-delete btn"
        v-if="$store.state.token && id==$store.state.id"
      >삭제</a>
    </div>
    <div class="reply-wrap">
      <div class="replyCount text-align-left">
        <span>
          <span>
            댓글 &nbsp; {{replyCount}}개
          </span>
        </span>
      </div>
      <div class="flex">
        <textarea type="text" class="ps-box2 overflow-hidden" v-model="replyText"  />
        <a href="javascript:;" @click="fnReplyAdd()" class="btn2">댓글달기</a>    
      </div>

        <div class="float-left w-full">
          <span class="margin-bottom-10p float-left">
            <button id="best" class="btn3-1" @click="fnChangeBest()">
              <span>
                추천순
              </span>
            </button>
            <button id="recent" class="btn3-2" @click="fnChangeRecent()">
              <span>
                최신순
              </span>
            </button>
          </span>
        </div>

      <div class="reply-list margin-top-30p">
        <div class="w-full">
          <div v-for="(row,idx) in list" :key="idx" class="margin-top-20p text-align-left">
            <div class=" text-align-left flex">
              <div class="font-reply-id">
                {{row.writer}} &nbsp;
              </div>
              <span v-if="idx==0 &&isBest" class="background-red color-w padding-2-5">
                Best 
              </span>
              <span v-if ="idx==0 &&isBest">
              &nbsp;&nbsp;
              </span>
              <div class="font-reply-time" v-if="parseInt((new Date().getTime()-row.regdate)/1000)>31536000">
                {{parseInt((new Date().getTime()-row.regdate)/1000/31536000)}}년 전 &nbsp;&nbsp;
              </div>
              <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>604800">
                {{parseInt((new Date().getTime()-row.regdate)/1000/604800)}}주 전 &nbsp;&nbsp;
              </div>
              <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>86400">
                {{parseInt((new Date().getTime()-row.regdate)/1000/86400)}}일 전 &nbsp;&nbsp;
              </div>
              <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>3600">
                {{parseInt((new Date().getTime()-row.regdate)/1000/3600)}}시간 전 &nbsp;&nbsp;
              </div>
              <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>60">
                {{parseInt((new Date().getTime()-row.regdate)/1000/60)}}분 전 &nbsp;&nbsp;
              </div>
              <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)">
                {{parseInt((new Date().getTime()-row.regdate)/1000)}}초 전 &nbsp;&nbsp;
              </div>
            </div>

            <div class="padding-10p">
              {{row.cont}}
            </div>
            <div class="float-right">
              <span>
                <a class="cursor-pointer" @click="up(`${row.rno}`)">
                  <span v-if="isRno(`${row.rno}`)" class="spa">
                    👍🏿 
                  </span>
                  <span class="spa2" v-else>
                    👍🏻 
                  </span>
                </a>
              </span>
              <span>{{row.likeit}} &nbsp;</span>

              <span>
                <a class="cursor-pointer" @click="down(`${row.rno}`)">
                  <span v-if="isRnoDis(`${row.rno}`)" class="spa3">
                    👎🏿 
                  </span>
                  <span class="spa4" v-else>
                    👎🏻 
                  </span>
                </a>
              </span>
              <span>{{row.dislikeit}}&nbsp;</span>
              <span class="btn-padding-4-g"><a>답글</a></span>
              <span v-if="$store.state.id==`${row.writer}`" class="btn-padding-4-r" @click="fnDeleteReply(`${row.rno}`)"><a>삭제</a></span>
            </div>
            <hr class="margin-top-30p margin-bottom-10p">

            <!-- 대댓글 -->
            <div v-if="ddd">
              <div class="replyCount text-align-left">
                <span>
                  <span class="font-reply-id">
                    &nbsp; {{$store.state.id}}:
                  </span>
                </span>
              </div>
              <div class="flex">
                <textarea type="text" class="ps-box2 overflow-hidden" v-model="replyText"  />
                <a href="javascript:;" @click="fnReplyAdd()" class="btn2">댓글달기</a>    
              </div>

                <div class="float-left w-full">
                  <span class="margin-bottom-10p float-left">
                    <button id="best" class="btn3-1" @click="fnChangeBest()">
                      <span>
                        추천순
                      </span>
                    </button>
                    <button id="recent" class="btn3-2" @click="fnChangeRecent()">
                      <span>
                        최신순
                      </span>
                    </button>
                  </span>
                </div>

              <div class="reply-list margin-top-30p">
                <div class="w-full">
                  <div v-for="(row,idx) in list" :key="idx" class="margin-top-20p text-align-left">
                    <div class=" text-align-left flex">
                      <div class="font-reply-id">
                        {{row.writer}} &nbsp;
                      </div>
                      <div class="font-reply-time" v-if="parseInt((new Date().getTime()-row.regdate)/1000)>31536000">
                        {{parseInt((new Date().getTime()-row.regdate)/1000/31536000)}}년 전 &nbsp;&nbsp;
                      </div>
                      <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>604800">
                        {{parseInt((new Date().getTime()-row.regdate)/1000/604800)}}주 전 &nbsp;&nbsp;
                      </div>
                      <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>86400">
                        {{parseInt((new Date().getTime()-row.regdate)/1000/86400)}}일 전 &nbsp;&nbsp;
                      </div>
                      <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>3600">
                        {{parseInt((new Date().getTime()-row.regdate)/1000/3600)}}시간 전 &nbsp;&nbsp;
                      </div>
                      <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)>60">
                        {{parseInt((new Date().getTime()-row.regdate)/1000/60)}}분 전 &nbsp;&nbsp;
                      </div>
                      <div class="font-reply-time" v-else-if="parseInt((new Date().getTime()-row.regdate)/1000)">
                        {{parseInt((new Date().getTime()-row.regdate)/1000)}}초 전 &nbsp;&nbsp;
                      </div>
                    </div>

                    <div class="padding-10p">
                      {{row.cont}}
                    </div>
                    <div class="float-right">
                      <span>
                        <a class="cursor-pointer" @click="up(`${row.rno}`)">
                          <span v-if="isRno(`${row.rno}`)" class="spa">
                            👍🏿 
                          </span>
                          <span class="spa2" v-else>
                            👍🏻 
                          </span>
                        </a>
                      </span>
                      <span>{{row.likeit}} &nbsp;</span>

                      <span>
                        <a class="cursor-pointer" @click="down(`${row.rno}`)">
                          <span v-if="isRnoDis(`${row.rno}`)" class="spa3">
                            👎🏿 
                          </span>
                          <span class="spa4" v-else>
                            👎🏻 
                          </span>
                        </a>
                      </span>
                      <span>{{row.dislikeit}}&nbsp;</span>
                      <span class="btn-padding-4-g"><a>답글</a></span>
                      <span v-if="$store.state.id==`${row.writer}`" class="btn-padding-4-r" @click="fnDeleteReply(`${row.rno}`)"><a>삭제</a></span>
                    </div>
                    <hr class="margin-top-30p margin-bottom-10p">
                  
                  </div>
                </div>
              </div>
            </div>



          
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: this.$route.query,
      subject: "",
      cont: "",
      view: "",
      id: "",
      num: this.$route.query.num,
      replyText:"",
      form:"",
      list:"",
      isBest:true,
      replyCount:"",
      aa:"",
      bb:"",
      ddd:false,
      isBest:true
    };
  },
  mounted() {
    this.fnReplyCount();
    this.fnGetView();
    this.fnReplyBest();
  },
  methods: {
    fnGetView() {
      this.$axios
        .get("http://localhost:8080/board/" + this.body.num)
        .then(res => {
          this.view = res.data
          this.id = this.view.id;
          this.subject = this.view.subject;
          this.cont = this.view.cont.replace(/(\n)/g, "<br />");
        })
        .catch(err => {
          console.log(err);
        });
    },
    fnList() {
      delete this.body.num;
      this.$router.push({ path: "./list", query: this.body });
    },
    fnMod() {
      this.$store.commit('canMod');
	    this.$router.push({ path: "./write", query: this.body });
    },
    fnDeleteProc() {
      if (confirm("삭제하시겠습니까?")) {
        this.$axios
          .delete("http://localhost:8080/board/delete/"+ this.body.num)
          .then(res => {
            console.log(res);
            if (res.status==200) {
              alert("삭제되었습니다.");
              this.fnList();
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요.");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fnDeleteReply(num) {
      if(confirm("삭제하시겠습니까?")) {
        this.$axios
          .delete("http://localhost:8080/reply/delete/"+num)
          .then( res => {
            console.log(res);
            if(res.status ==200) {
              alert("삭제되었습니다.")
              this.fnReplyCount();
              this.fnGetView();
              this.fnReplyBest();
            } else {
              alert("실행중 실패했습니다.\n 다시 이용해 주세요.")
            }
          })
          .catch(err =>{
            console.log(err);
          });
      }
    }
    ,
    fnReplyCount(){
      this.$axios
        .get("http://localhost:8080/reply/count/"+this.body.num)
        .then(res => {
          this.replyCount=res.data;

        })
    }
    ,
    fnReplyAdd(){
      this.form= {
        bno: this.body.num,
        writer: this.$store.state.id,
        cont: this.replyText
      }
      this.$axios
        .post("http://localhost:8080/reply/write",this.form)
        .then(res =>{
          if(res.status==200){
            this.replyText='';
            this.fnReply();
            this.fnChangeRecent();
            this.fnReplyCount();
          }
          
        })
    },
    fnReply(){
      this.$axios
        .get("http://localhost:8080/reply/recent/" + this.body.num)
        .then(res => {
          console.log(res);
          this.list= res.data;
        })

        this.isBest=false;
    },
    fnReplyBest(){
      this.$axios
       .get("http://localhost:8080/reply/best/"+this.body.num)
       .then(res => {
         this.list= res.data;

         this.form = {
           id: this.$store.state.id,
           bno: this.body.num
         }
         this.$axios
          .post("http://localhost:8080/reply/getStatus/",this.form)
          .then(
            res=> { 
              var aa = [];
              for(let i=0 ; i<(res.data).length;i++){
                aa.push(res.data[i].rno);
              }
              this.aa=aa;
              console.log(this.aa);
            }
          )
          this.$axios
          .post("http://localhost:8080/reply/getStatusDis/",this.form)
          .then(
            res=> { 
              var bb = [];
              for(let i=0 ; i<(res.data).length;i++){
                bb.push(res.data[i].rno);
              }
              this.bb=bb;
            }
          )
       })
       this.isBest=true;
    },
    isRno(z) {
      for(let i=0;i<(this.aa).length;i++){
        if(z==this.aa[i]){
          return true;
        }
      }
      return false;
      
    },
    isRnoDis(z) {
      for(let i=0;i<(this.bb).length;i++) {
        if(z==this.bb[i]){
          return true;
        }
      }
    }

    ,
    fnChangeBest(){
      this.fnReplyBest();
      document.getElementById('best').setAttribute('class','btn3-1');
      document.getElementById('recent').setAttribute('class','btn3-2');
      this.isBest=true;
    },
    fnChangeRecent(){
      this.fnReply();
      document.getElementById('recent').setAttribute('class','btn3-1');
      document.getElementById('best').setAttribute('class','btn3-2');
      this.isBest=false;
    },
    up(num) {
      this.form = {
        bno: this.body.num,
        rno: num,
        id : this.$store.state.id
      }
      this.$axios.post("http://localhost:8080/reply/up/",this.form)
      .then(res=>{
        console.log(res);
        if(this.isBest){
          this.fnReplyBest();
          this.fnChangeBest();
        } else{
          this.fnReply();
          this.fnChangeRecent();          
        }
      })

    },
    down(num) {
      this.form = {
        bno: this.body.num,
        rno: num,
        id : this.$store.state.id
      }
      this.$axios.post("http://localhost:8080/reply/down/",this.form)
      .then(res=>{
        console.log(res);
        if(this.isBest){
          this.fnReplyBest();
          this.fnChangeBest();
        } else{
          this.fnReply();
          this.fnChangeRecent();          
        }
      })
    },
    fnCheck(){
      
    }
  }
};
</script>
<style scoped>
.spa {
  font-size:17px;
  animation: bounce-in 1s;
  }
.spa2 {
  font-size:17px;
  animation: bounce-in2 1s;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    font-size:50px
  }
  100% {
    font-size: 17px;
  }
}
@keyframes bounce-in2 {
  0% {
    transform: scale(1);
  }
  50% {
    font-size:50px
  }
  100% {
    font-size: 17px;
  }
}

</style>



