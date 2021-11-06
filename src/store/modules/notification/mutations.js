import * as types from './mutations-types'

export default {
  [types.SET_NOTIFICATIONS](state, notifications) {
    state.notifications = notifications
  },
  [types.ADD_NOTIFICATION](state, notification) {
    state.notifications.push(notification)
  },
}
