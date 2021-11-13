export function mockFnByNames(actionNames = []) {
  return actionNames.reduce((acc, name) => {
    acc[name] = jest.fn()
    return acc
  }, {})
}

export const mockModuleStore = ({
  initialState,
  initialGetters,
  initialMutations,
  initialActions,
}) => ({
  namespaced: true,
  state: () => ({
    ...initialState,
  }),
  getters: {
    ...initialGetters,
  },
  mutations: {
    ...initialMutations,
  },
  actions: {
    ...initialActions,
  },
})
