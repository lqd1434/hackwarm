const mutation = {
	test(state,data){
		console.log(state.word,data)
	},
	setUserInfo(state,data){
		state.user = data
		console.log(state.user)
	},
	setTalkToWho(state,data){
		state.talkToWho = data
	},
	setSocket(state,data){
		state.socket = data
	},
	changeIsShowFooterMenu(state,data){
		state.isShowFooterMenu = data
	},
	addMessageHistory(state,data){
		state.messageHistory.push(data)
	},
	setViewContentText(state,data){
		state.viewContentText = data
	}
}

export default mutation
