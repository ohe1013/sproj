<template>
	<header>
		<h1><router-link to="/"><img alt="Vue logo" src="../../assets/logo.png" width="80"></router-link></h1>
		<div class="menu-wrap">
			<ul class="menu">
				<li><router-link to="/board/list">게시판</router-link></li>
				<li v-if="!$store.state.token"><router-link to="/member/Signup">회원가입</router-link></li>
				<li v-if="$store.state.token"><a href = "javascript:;" @click ="logout">로그아웃</a></li>
				<li v-else><router-link to = "/member/Login">로그인 </router-link></li>
				<li v-if="$store.state.token"><router-link to ="/member/Mypage">마이페이지</router-link></li>
				<li><router-link to ="/Map">맵</router-link></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	methods:{
		logout() {
			var con_test = confirm("정말 로그아웃 하시겠습니까?");
			if(con_test) {
				this.$store.commit('logout');
				this.$session.destroy();
				this.$router.push({path : '/member/Login'});
			}
		}
	}
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;}
</style>