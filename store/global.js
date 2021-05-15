export const state = () => ({
  language: 'en',
})

export const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
  },
}

export const actions = {
  SET_LANGUAGE({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
}
