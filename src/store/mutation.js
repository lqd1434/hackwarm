const mutation = {
	test(state,data){
		console.log(state.word,data)
	},
	setUserInfo(state,data){
		state.user = data.user
		console.log(state.user)
	},
	setTalkToWho(state,data){
		state.talkToWho = data
	},
	setSocket(state,data){
		state.socket = data
	},
	closeSocket (state) {
		if (state.socket.readyState === 1) {
			state.socket.close()
		}
	},
	changeIsShowFooterMenu(state,data){
		state.isShowFooterMenu = data
	},
	setChatList(state,data){
		state.chatList = data
	},
	addChatList(state,data){
		state.chatList.unshift(data)
	},
	setToTop(state,data){
		if (state.chatList[data].hasBg){
			state.chatList[data].hasBg = false
			const arr=state.chatList.splice(data,1)
			state.chatList.push(arr[0])
		} else {
			state.chatList.map((item, index) => {
				if (index === data) {
					state.chatList[data].hasBg = true
					state.chatList.unshift(state.chatList.splice(index, 1)[0]);
				}
			})
		}
	},
	deleteChatList(state,data){
		state.chatList.splice(data,1)
	},
	setMessageHistory(state,data){
		state.messageHistory=data
	},
	addMessageHistory(state,data){
		console.log('lll')
		console.log(state.messageHistory)
		state.messageHistory.push(data)
	},
	setMaxId(state,data){
		state.maxId=data
	},
	increaseMaxId(state){
		state.maxId++
	},
	setMinId(state,data){
		state.minId = data
	},
	// addMessageHistory(state,data){
	// 	console.log(state.messageHistory)
	// 	state.messageHistory.push(data)
	// },
	setViewContentId(state,data){
		state.viewContentId = data
	},
	setMyPosts(state,data){
		state.myPosts = data
	},
}

export default mutation
