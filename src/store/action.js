import axios from 'axios'

const action = {
	testAction({commit}, data){
		console.log(data)
		axios({
			url: 'musics.json',
			method: 'get'
		}).then((res)=>{
			commit('test', res.data)
			console.log(res.data)
		})
	},
	getUserInfo({commit},data){
		return new Promise((resolve) => {
			axios({
				url: '/api/info/'+data,
				method: 'get'
			}).then((res)=>{
				resolve(res.data)
				commit('setUserInfo', res.data.data)
				console.log(res.data)
			})
		})

	},
	sendPostAction({commit},data){
		return new Promise((resolve) => {
			axios({
				url: '/api/info',
				method: 'post',
				data:data
			}).then((res)=>{
				console.log(res.data)
				commit()
				resolve(res.data)
			})
		})
	},
	getMessageHistory({commit},data){
		const data1=JSON.stringify({
			from:data.fromId,
			to:data.toId
		})
		return new Promise((resolve) => {
			console.log(data)
			console.log(data1)
			axios({
				url: '/chat/history',
				method: 'post',
				data: {
					from:data.fromId,
					to:data.toId
				}
			}).then((res)=>{
				console.log(res.data)
				commit('setMessageHistory',res.data.data)
				resolve(res.data)
			})
		})
	},
	getChatListAction({commit}){
		return new Promise((resolve)=>{
			axios({
				url:'/api/auth/chats',
				method:'get',
				headers:{
					Authorization:'Bearer ' + localStorage.getItem('myToken')
				},
			}).then((res)=>{
				commit('setChatList',res.data.data.chats)
				resolve(res.data)
			})
		})
	},
	addChatListAction({commit},data){
		return new Promise((resolve) => {
			commit('addChatList',data)
			const data1 =JSON.stringify({
				from_id:data.fromId,
				last_msg:data.LastMsg
			})
			console.log(data1)
			axios({
				url:'/api/auth/chat',
				method:'post',
				data:data1,
				headers:{
					Authorization:'Bearer ' + localStorage.getItem('myToken')
				},
			}).then((res)=>{
				console.log(res.data)
				resolve(res.data)
			})
		})
	}
}

export default action
