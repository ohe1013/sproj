<template>
  <div class = "container-small">
    <h1>게시판 등록</h1>

    <div class="add-wrap">
      <form>
        <table class="tb-add">
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>

          <tr>
            <th>제목</th>
            <td>
              <input type="text" v-model="subject" ref="subject" />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea v-model="cont" ref="cont"></textarea>
            </td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btn-wrap">
      <a href="javascript:;" @click="fnList" class="btn">목록</a>
      <a href="javascript:;" @click="fnAddProc" v-if="$store.state.writeState=='Add'" class="btn-add btn">등록</a>
      <a href="javascript:;" @click="fnModProc" v-if="$store.state.writeState=='Mod'" class="btn-mod btn">수정</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
	  board_code: "test",
	  id : "",
    subject: "",
    cont: "",
    id: this.$store.state.id,
    body: this.$route.query,
    form: "",
    num: this.$route.query.num
    };
  },
  mounted() {
    if (this.num) {
      this.fnGetView();
    }
  },
  methods: {
    fnList() {
      this.$router.push({ path: "./list", query: this.body });
    },
    fnGetView() {
      this.$axios
        .get("http://localhost:8080/board/" + this.body.num)
        .then(res => {
          this.view = res.data
          this.id = this.view.id;
          this.subject = this.view.subject;
		      this.cont = this.view.cont;
		      this.id = this.view.id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fnView() {
      this.$router.push({ path: "./view", query: this.body });
    },
    fnAddProc() {
      if (!this.subject) {
        alert("제목을 입력해 주세요!");
        this.$refs.subject.focus();
        return;
      }
      this.form = {
        board_code: this.board_code,
        subject: this.subject,
        cont: this.cont,
        id: this.id
      };

      this.$axios
        .post("http://localhost:8080/board/save", this.form)
        .then(res => {
          console.log("res",res);
          if (res.status == 200) {
            alert("등록되었습니다.");
            this.fnList();
          } else {
            alert("실행중 실패했습니다. \n 다시 이용해주세요");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fnModProc() {
      if (!this.subject) {
        alert("제목을 입력해 주세요!");
        this.$refs.subject.focus();
        return;
      }
      this.form = {
        board_code: this.board_code,
        subject: this.subject,
        cont: this.cont,
        id: this.id,
        num: this.num
      };

      this.$axios
        .post("http://localhost:8080/board/update", this.form)
        .then(res => {
          if (res.status == 200) {
            alert("수정되었습니다.");
            this.fnList();
          } else {
            alert("실행중 실패했습니다. \n 다시 이용해 주세요");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped>

</style>





