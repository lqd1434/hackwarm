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

	}
}

export default action
