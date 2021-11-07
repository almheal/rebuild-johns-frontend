import * as types from './mutations-types'
import { NOTIFICATION_TIMEOUT } from '@const'

export const setNotification = ({ commit, getters }, notification) => {
  const id = Math.floor(Math.random() * Date.now())
  const updatedNotification = {
    ...notification,
    id,
  }
  commit(types.ADD_NOTIFICATION, updatedNotification)

  setTimeout(() => {
    const notifications = getters.getNotifications
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    )
    commit(types.SET_NOTIFICATIONS, updatedNotifications)
  }, NOTIFICATION_TIMEOUT)
}

export default {
  setNotification,
}
