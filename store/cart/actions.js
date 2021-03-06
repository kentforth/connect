export default {
  /**
   * get games from Firebase
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
  async GET_GAMES({ commit }) {
    const games = []
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(process.env.userId)
        .get()
        .then((snapshot) => {
          const { cart } = snapshot.data()
          cart.forEach((el) => {
            this.$fire.firestore
              .collection('games')
              .where('title', '==', el)
              .get()
              .then((querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => doc.data())
                games.push(documents[0])
                commit('SET_GAMES', games)
              })
          })
        })
    } catch (e) {}
  },

  /**
   * add game to array
   * @param commit
   * @param title
   * @constructor
   */
  ADD_GAME_TO_CART({ commit }, title) {
    commit('ADD_GAME_TO_CART', title)
  },

  /**
   * get games titles
   * @param commit
   * @returns {Promise<void>}
   * @constructor
   */
  async GET_GAMES_TITLES({ commit }) {
    await this.$fire.firestore
      .collection('users')
      .doc(process.env.userId)
      .get()
      .then((snapshot) => {
        const { cart } = snapshot.data()
        commit('SET_GAMES_TITLES', cart)
      })
  },

  /**
   * remove game from cart
   * @param commit
   * @param title
   * @constructor
   */
  REMOVE_GAME({ commit }, title) {
    commit('REMOVE_GAME', title)
  },
}
