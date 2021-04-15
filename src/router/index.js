import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/components/Main";
import Home from "@/views/Home/Home";
import MyInfo from "@/views/my/MyInfo";
import TreeHole from "@/views/treehole/TreeHole";
import UpdateInfo from "@/views/my/UpdateInfo";
import LoginAndRegister from "@/views/auth/LoginAndRegister";
import TalkList from "@/views/talk/TalkList";
import TalkWin from "@/views/talk/TalkWin";

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
				path: '/treeHole',
				name: 'treeHole',
				component: TreeHole
			},
			{
				path: '/mine',
				name: 'mine',
				component: MyInfo
			},
			{
				path: '/update',
				name: 'update',
				component: UpdateInfo
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
