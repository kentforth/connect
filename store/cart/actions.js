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
        .doc(process.env.VUE_APP_USER_ID)
        .get()
        .then((snapshot) => {
          const { cart } = snapshot.data()
          const games = []
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
  ADD_GAME({ commit }, title) {
    commit('ADD_GAME', title)
  },

  async GET_GAMES_TITLES({ commit }) {
    await this.$fire.firestore
      .collection('users')
      .doc(process.env.VUE_APP_USER_ID)
      .get()
      .then((snapshot) => {
        const { cart } = snapshot.data()
        console.log(cart)
        commit('SET_GAMES_TITLES', cart)
      })
  },
}
