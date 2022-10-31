import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(Vuex);
import router from './routes';
import createPersistedState from 'vuex-persistedstate';

export const store = new Vuex.Store({

	plugins: [
		createPersistedState()
	],
	state: {

		host: 'http://127.0.0.1:3000',
		token: '',
		id: '',
		role: '',
		errorState: '',
		nickname: '',
		isAuth: false,
		img: 'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629336128413.png',
		imgStore:'',
		writeState:'',
		at:'',
		signup: {
			id: '',
			password: '',
			pwhint: '',
			pwhintans: '',
			name: '',
			yyyy: '',
			mm: '',
			dd: '',
			gender: '',
			email: '',
			address: '',
			phoneNum: '',
			emailDomain: '',
			role:'',
			nickname:'',
			pwhintList: [
				{
					value: 1,
					text: "졸업한 초등학교 이름은?",
				},
				{
					value: 2,
					text: "아버지 성함은?",
				},
				{
					value: 3,
					text: "어머니 성함은?",
				},
				{
					value: 4,
					text: "어릴 적 내 별명은?",
				},
				{
					value: 5,
					text: "좋아하는 색깔은?",
				},
			],
			roleList: [
				{
					value : 'admin',
					text: "admin"
				},
				{
					value :'user',
					text : "user"
				}
			],
			genderList: [
				{
					value: 'M',
					text: '남성',
				},
				{
					value: 'F',
					text: '여성',
				},
			],
			yyyyList: [],
			mmList: [],
			ddList: [],
			emailList: [
				{
					value: '',
					text: '직접입력'
				},
				{
					value: 'naver.com',
					text: 'naver.com'
				},
				{
					value: 'google.com',
					text: 'google.com'
				},
				{
					value: 'yahoo.com',
					text: 'yahoo.com'
				},
				{
					value: 'nate.com',
					text: 'nate.com'
				}
			],
			form: ''
		}
	},
	getters: {
		getId: function (state) {
			console.log(state.id);
			return state.id;
		},
		/* 		
		logout: function (state) {
			if(state.token) {
				state.token = '';
				alert('로그아웃되었습니다.');
			}
		}
		*/
	},
	mutations: {
		loginToken: function (state, payload) {
			state.token = payload;
		},
		infoChange: function (state, payload) {
			state.img = payload.img;
			state.nickname = payload.nickname;
		},
		logout: function (state, payload) {
			if (state.token) {
				state.token = payload;
				state.token='';
				state.at ='';
				state.id='';
				state.role='';
				alert('로그아웃되었습니다.');
			}
		}, 
		canWrite: function (state){
			state.writeState='Add';
		},
		canMod: function(state){
			state.writeState='Mod';
		},
		success: function (state) {
			state.signup.id ='';
			state.signup.password = '';
			state.signup.pwhint = '';
			state.signup.pwhintans = '';
			state.signup.nickname = '';
			state.signup.name = '';
			state.signup.role = '';
			state.signup.yyyy = '';
			state.signup.mm = '';
			state.signup.dd = '';
			state.signup.gender = '';
			state.signup.email = '';
			state.signup.emailDomain = '';
			state.signup.address = '';
			state.signup.phoneNum = '';
			state.signup.yyyyList=[];
			state.signup.mmList=[];
			state.signup.ddList=[];
		},
		imageChange: function(state,payload){
			state.img=payload;
		}
		,
		timeout : function (state) {
			state.id= '';
			state.token = '';
			state.nickname= '';
			state.role = '';
			state.img= 'https://my-hg-bucket.s3.ap-northeast-2.amazonaws.com/1629336128413.png';
		},
		attacked: function (state) {
			state.id = '';
			state.token = '';
			state.nickname = '';
			state.role = '';
		},
		getUser : function (state,payload) {
			state.id = payload.id;
			state.role = payload.role;
			state.nickname =payload.nickname;
			state.token='s';
			state.at = payload.access_token;
			state.img = payload.img;
		},
		tokenRefresh : function (state,payload) {
			state.at = payload;
		},
		userCheck: function (state) {
			axios.get(`${state.host}/api/auth/check`, {
				headers: {
					"x-access-token": state.token
				}
			}).then(
				res => {
					console.log(res.data.token)
					state.id = res.data.token.id;
					state.role = res.data.token.role;
					return state.id;
				},
				error => { 
					console.log('로그인 정보가 없음',error);
					state.token='';
					state.id='';
					state.role='';
					router.push("/member/Login");
				}
			);
		}
	}
});