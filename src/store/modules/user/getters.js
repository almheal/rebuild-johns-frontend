import { getLocalStorage } from '@utils'
import { TOKEN_NAME } from '@const'

export default {
  getToken: () => getLocalStorage(TOKEN_NAME),
}
