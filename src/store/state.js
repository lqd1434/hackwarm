const state = {
	word: 'hello world',
	socket: null,
	isShowFooterMenu: true,
	user:{id:1,username:'xxx',password:'123',icon:'2.png',mySign: 'text bit longer'},
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
	talkToWho: 0
}

export default state
