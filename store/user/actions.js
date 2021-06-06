export default {
  async GET_USER({ commit }) {
    try {
      await this.$fire.firestore
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            commit('SET_USER', {
              user: document.data(),
              id: document.id,
            })
          })
        })
    } catch (e) {
      throw new Error(e)
    }
  },
}
