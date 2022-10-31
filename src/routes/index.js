import Vue from 'vue';
import Router from 'vue-router';
/* import HelloWorld from '@/components/HelloWorld'; 
 */
import List from '@/components/board/List'; 
import Write from '@/components/board/Write'; 
import View from '@/components/board/View';
import Signup from '@/components/member/Signup';
import Signup2 from '@/components/member/Signup2'; 
import Login from '@/components/member/Login';
import Mypage from '@/components/member/Mypage'
import Home from '@/components/board/Home';
import Map from '@/components/map/Map';
import Upload from '@/components/board/Upload';
import MypageDetail1 from '@/components/member/MypageDetail1';
import Find from '@/components/member/Find';

import {store} from '../store';
import axios from 'axios';


Vue.use(Router); 

const isToken = (to, from, next) => {
	const isAuth = store.state.at;
	if (isAuth) {
		next();
	} else {
		alert('로그인이 필요합니다');
	}
}

const routes = [
	{
		path: '/', 
		name: 'Home', 
		component: Home,
	}, 
	{
		path: '/board/list', 
		name: 'List', 
		component: List,
		beforeEnter: isToken
	}, 
	{
		path: '/board/write', 
		name: 'Write', 
		component: Write,
		beforeEnter: isToken
	}, 
	{
		path: '/board/view',
		name: 'View',
		component: View,
		props: true,
		beforeEnter: isToken
	}, 
	{
		path: '/member/Signup',
		name: 'Signup',
		component: Signup,
		props: true
	},
	{
		path: '/member/Signup2',
		name: 'Signup2',
		component: Signup2,
		props: true
	},
	{
		path: '/member/Login',
		name: 'Login',
		component: Login
	},
	{
		path: '/member/Find',
		name: 'Find',
		component: Find
	},
	{
		path : '/Map',
		name: 'Map',
		component: Map,
		beforeEnter: isToken
	},
	{
		path: '/member/Mypage',
		name: 'Mypage',
		component : Mypage,
		beforeEnter: isToken
	},
	{
		path: '/board/Upload',
		name: 'Upload',
		component : Upload,
		beforeEnter: isToken
	},
	{
		path:'/member/MypageDetail1',
		name: 'MypageDetail1',
		component : MypageDetail1,
		beforeEnter: isToken
	}
];

const router = new Router({
	mode: 'history',
	routes
})



router.beforeEach( async(to, from, next) => {
	if(store.state.at ){
		let at = store.state.at;
		let accessTime = parseFloat(at.substr(0,13));
		let form = '';
		form = {
			id : store.state.id,
			access_token : at
		}
		if(accessTime > new Date().getTime()) {
			next();
		} else {
			axios.post('http://localhost:8080/auth',form)
			.then ( res => {
				store.commit("tokenRefresh",res.data);
				console.log("res",res);
				next();
			}).catch(e => {
				store.commit("attacked");
			})
		}
	}else {
		next();
	}
}) 

export default router