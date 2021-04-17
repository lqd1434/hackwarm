const state = {
	word: 'hello world',
	socket: null,
	isShowFooterMenu: true,
	user:{},
	viewContentText:'',
	messageList: [
		{fromUserId:3,toUserId:1,content:'晚上好',sendTime:'2021-4-13时间 20:00:01'},
		{fromUserId:2,toUserId:1,content:'哈哈',sendTime:'2021-4-13时间 20:00:01'},
		{fromUserId:4,toUserId:1,content:'今天天气真好',sendTime:'2021-4-13时间 20:00:01'},
		{fromUserId:6,toUserId:1,content:'明天有空吗',sendTime:'2021-4-13时间 20:00:01'},
		{fromUserId:5,toUserId:1,content:'有啊',sendTime:'2021-4-13时间 20:00:01'},
	],
	messageHistory: [
		{id:1,fromUserId:1,acceptUserId:2,content:'hello',sendTime:'2021-4-13时间 20:00:01'},
		{id:2,fromUserId:2,acceptUserId:1,content:'你好',sendTime:'2021-4-13时间 20:00:09'}
	],
	icon:[
		{id:1,url:'/images/1.png'},
		{id:2,url:'/images/2.png'},
		{id:3,url:'/images/3.png'},
		{id:4,url:'/images/4.png'},
		{id:5,url:'/images/5.png'},
		{id:6,url:'/images/6.png'},
		{id:7,url:'/images/7.png'},
	],
	talkToWho: 0
}

export default state
