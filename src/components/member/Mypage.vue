<template>
	<div class = "container-small">
		<div class="h-30">
			<div class='h-30,'>
				<h2>뷰 프로필</h2>
				<div class="flex justify-around">
					<a href="/member/MypageDetail1">
						<img class="border-rad-50 w-200p h-200p" :src='$store.state.img'/>
					</a>
					<div class="flex-col margin-auto-0 color-green  font-weight-bold">
						<span class="font-size-15p">닉네임 </span>
						<span class="font-size-20p">{{$store.state.nickname}}</span>
					</div>
				</div>
				<router-link to="/member/MypageDetail1" class="border-1p-sol-gray cursor-pointer font-size-15p font-weight-bold padding-10p">프로필 수정</router-link>
			</div>
		</div>
		<div class="h-70">
			<div>
				<h2>개인정보</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
	}),
	methods: {

	},
	created: function() {
	}

}
</script>

<style scoped>

</style>