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
	}
}

export default action
