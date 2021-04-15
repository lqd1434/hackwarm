import state from '@/store/state'
import mutation from '@/store/mutation'
import action from '@/store/action'

const warm = {
	namespaced: true,
	state: () => ({
		...state
	}),
	mutations: {
		...mutation
	},
	actions: {
		...action
	}
}

export default warm
