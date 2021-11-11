import { config } from '@vue/test-utils'

config.global.mocks.$t = (msg) => msg
config.global.directives.lazy = () => {}
