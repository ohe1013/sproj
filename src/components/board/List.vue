<template>
  <div class="container-small">
    <h2>게시판 리스트</h2>

    <div class="search-wrap">
      <select v-model="searchType" size="1" class="selects">
        <option value="subject" selected>제목</option>
        <option value="id">아이디</option>
      </select>
      <input type="text" v-model="keyword" @keyup.enter="fnSearch" />
      <a href="javascript:;" @click="fnSearch" class="btnSearch btn">검색</a>
    </div>

    <div class="listWrap">
      <table class="tb-list">
        <colgroup>
          <col width="6%" />
          <col width="*" />
          <col width="10%" />
          <col width="25%" />
        </colgroup>
        <tr>
          <th>no</th>
          <th>제목</th>
          <th>아이디</th>
          <th>날짜</th>
        </tr>
        <tr v-for="(row, idx) in list " :key="idx">
          <td>{{no-idx}}</td>
          <td class="txt-left">
            <a href="javascript:;" @click="fnView(`${row.num}`)">{{row.subject}}</a>
          </td>
          <td>{{row.id}}</td>
          <td v-if="row.editdate != null">{{row.mixdate.substring(0,10)}}(수정)</td>
          <td v-else>{{row.mixdate.substring(0,10)}}</td>
        </tr>
        <tr v-if="list.length == 0">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
      </table>
    </div>

    <div class="pagination" v-if="totalCount > 0">
      <a href="javascript:;" @click="fnPage(1)" class="first">처음</a>
      <a href="javascript:;" v-if="startPage > 10" @click="fnPage(`${startPage-1}`)" class="first">◀</a>
      <template v-for=" (n,index) in paginavigation()">
        <template v-if="page==n">
          <strong :key="index">{{n}}</strong>
        </template>
        <template v-else>
          <a class="black" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
        </template>
      </template>
      <a
        href="javascript:;"
        v-if="totalPage > endPage"
        @click="fnPage(`${endPage+1}`)"
        class="last"
      >▶</a>
      <a href="javascript:;" @click="fnPage(`${totalPage}`)" class="last">마지막</a>
    </div>
    <div class = "margin-top-10p">
      <a href="javascript:;" @click="fnAdd" v-if="this.$store.state.token" class="btn margin-right-30p">등록</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return  {
      body: "",
      searchType: this.$route.query.searchType ? this.$route.query.searchType : "subject",
      board_code: "test",
      list: "",
      no: "",
      paging: "",
      startPage: "",
      totalCount:"",
      form:"",
      block:10,
      ipp:10,
      hss:"<div>aaa</div>",
      page: this.$route.query.page ? this.$route.query.page : 1,
      keyword: this.$route.query.keyword ? this.$route.query.keyword :"",
      paginavigation: function() {
        var pageNumber = [];
        var startPage = this.startPage;
        var endPage = this.endPage;
        for (var i = startPage; i <= endPage; i++) pageNumber.push(i);
        return pageNumber;
      }
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      this.body = {
        board_code: this.board_code,
        keyword: this.keyword,
        page: this.page,
        searchType: this.searchType
      };
      this.$axios
        .post("http://localhost:8080/board/count", this.body)
        .then(res => {
          if (res.status==200) {
            let count= res.data;
            this.getPaging(count);
            this.fnGetListPage()
          } else {
            alert("실행중 실패했습니다.\n다시 이용해 주세요.");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fnAdd() {
      this.$store.commit('canWrite');
      this.$router.push("./write");
    },
    fnSearch() { 
      this.page = 1;
      this.fnGetList();
      this.fnGetListPage();
    },
    fnPage(n) {
      if (this.page != n) {
        this.page = n;
        this.fnGetListPage();
        if (this.page> this.endPage) {
          this.startPage = this.endPage + 1;
          if (this.totalPage > this.endPage + this.block  ){
            this.endPage = this.startPage + this.block -1;
          } else{
            this.endPage = this.totalPage;
          }
        }
        if (this.page <this.startPage ) {
          this.endPage = this.startPage-1;
          this.startPage = this.endPage-this.block+1;
        }

      }
    },
    fnView(num) {
      this.body.num = num;
      this.$router.push({ path: "./view", query: this.body });
    },
    fnGetListPage() {
      this.form = {
        page: this.page,
        searchType : this.searchType,
        keyword : this.keyword
      }
      this.$axios.post("http://localhost:8080/board/list/detail",this.form)
        .then( res => {
          if (res.data) {
            this.list = res.data;
            this.no = this.totalCount - (this.page - 1 )* this.ipp;
          }
          else {
          }
        })
    },
    getPaging(count) {
      this.startPage = 1;
      this.endPage = this.block;

      this.totalCount = count;
      this.totalPage = Math.ceil(this.totalCount/this.ipp);
      this.startPage = Math.ceil(this.page/this.block);
      this.endPage = this.startPage * this.block;

      if( this.totalPage< this.endPage) this.endPage = this.totalPage;
      
      this.no = this.totalCount - (this.page - 1) * this.ipp;

    }
  }
};
</script>
