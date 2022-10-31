<template>
	<div class='flex justify-center margin-top-10p' id = "home">
		<div class='margin-right-30p'>
			<a href='javascript:;' @click="checklog">
				<img class="border-rad-50 w-200p h-200p" :src="$store.state.img"/>
			</a>
		</div>
		<div class='margin-auto-0 font-size-20p'>
			<div class='flex'>
				<b class=' font-size-30p'>{{$store.state.id}}</b>
				<div>님 안녕하세요.<br></div>
			</div>
			<div>
				당신의 역할은 <b class=' font-size-30p'>{{$store.state.role}}</b>입니다.
			</div>
			<div>
				{{this.$session.set('id',$store.state.id)}}
				<a href="javascript:;" @click="f()">sss</a>
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
		// this.$store.commit('userCheck')
		console.log(this.$store.state.id)
	},
	methods : {
		f: function() {
			this.$axios.get('http://localhost:8080/member/check',{searchType: "subject", keyword: "asd"})
			.then(res=> {
				console.log(res);
			})
		},
		checklog: function () {
			if(this.$store.state.id){
				this.$router.push("/member/mypage")
			}
		}
	}
}
</script>	