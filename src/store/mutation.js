const mutation = {
	test(state,data){
		console.log(state.word,data)
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
	}
}

export default mutation
