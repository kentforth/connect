export default {
  /**
   * get games from Firebase
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
  async GET_GAMES({ commit }) {
    try {
      await this.$fire.firestore
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            commit('SET_GAMES', document.data().cart)
          })
        })
    } catch (e) {
      throw new Error(e)
    }
  },

  /**
   * add game to array
   * @param commit
   * @param title
   * @constructor
   */
  ADD_GAME({ commit }, title) {
    commit('ADD_GAME', title)
  },
}
