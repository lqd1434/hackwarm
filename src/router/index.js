import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/components/Main";
import Home from "@/views/Home/Home";
import MyInfo from "@/views/my/MyInfo";
import UpdateInfo from "@/views/my/setting/UpdateInfo";
import LoginAndRegister from "@/views/auth/LoginAndRegister";
import TalkList from "@/views/talk/TalkList";
import TalkWin from "@/views/talk/TalkWin";
import Account from "@/views/my/setting/Account";
import Setting from "@/views/my/setting/Setting";
import UpdateSer from "@/views/my/setting/UpdateSer";
import Icon from "@/views/my/setting/Icon";
import ViewPost from "@/views/Home/ViewPost";
import AuditPost from "@/views/my/setting/AuditPost";

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		component: Main,
		children: [
			{
				path: '/home',
				name: 'home',
				component: Home
			},
			{
				path: '/view',
				name: 'view',
				component: ViewPost
			},
			// {
			// 	path: '/treeHole',
			// 	name: 'treeHole',
			// 	component: TreeHole
			// },
			{
				path: '/mine',
				name: 'mine',
				component: MyInfo
			},
			{
				path: '/talkList',
				name: 'talkList',
				component: TalkList
			},
			{
				path: '/talkWin',
				name: 'talkWin',
				component: TalkWin
			},
			{
				path: '/setting',
				name: 'setting',
				component: Setting
			},
			{
				path: '/audit',
				name: 'audit',
				component: AuditPost
			},
			{
				path: '/account',
				name: 'account',
				component: Account
			},
			{
				path: '/updateInfo',
				name: 'updateInfo',
				component: UpdateInfo
			},
			{
				path: '/updateSer',
				name: 'updateSer',
				component: UpdateSer
			},
			{
				path: '/icon',
				name: 'icon',
				component: Icon
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: LoginAndRegister
	}

]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'login' && localStorage.getItem('isLogin') !== 'true') {
		next({ name: 'login' })
	} else {
		next()
	}
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

export default router
