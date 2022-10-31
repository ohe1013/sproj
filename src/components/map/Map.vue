<template>
  <div>
    <div class="container">
      <div class="side-list">
        <div class="nav-box">
          <img class="icon-btn" id="menuBtn" style="margin-left: -5px" />
        </div>

        <div class="menu-wrap">
          <div class="data-list">
            <div style="margin-top: 20px;">
              <a class="home" href="/Map">HOME</a>
            </div>
            <ul id="layerLi"></ul>
          </div>

          <div class="page-data-list">
            <ul id="pagingDataList"></ul>
          </div>
        </div>
      </div>

      <div class="contents">
        <div class="map-main-div">
          <div class="mash-up-map-div" id="map"></div>
          <div class="base-map-div" id="base"></div>
        </div>

        <!-- <div class="data-table"> -->
        <table>
          <thead id="table_header"></thead>
          <tbody id="table_body"></tbody>
        </table>
      </div>

      <div class="page-data-table">
        <ul id="pagingDataTable"></ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
		return {
			form: ''
		}
	},
	created() {
    if( this.$session.get('expired')< new Date().getTime()){

      this.$store.commit('timeout');
      this.$session.destroy();
      alert('세션이 만료되었습니다.');
      this.$router.push("/");
    }
    if (this.$session.get('expired') == null ){
      alert('권한이 없습니다');
      this.$router.push("/");
    }
	},
	methods : {

	}

}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}
.side-list {
  width: 30%;
  height: 100%;
  min-width: 400px;
  text-align: center;
  font-family: Arial;
}
.contents {
  max-width: 70%;
  flex: 1;
}
</style>
