export default {
  SET_GAMES(state, games) {
    state.games = games.slice()
    const prices = []
    state.games.forEach((el) => {
      prices.push(el.totalPrice)
    })
    state.cartTotalPrice = prices.reduce((a, b) => a + b)
  },

  ADD_GAME_TO_CART(state, title) {
    state.gameTitles.push(title)
  },

  ADD_GAME_TO_LIBRARY(state, title) {
    state.gameTitles.push(title)
  },

  SET_GAMES_TITLES(state, titles) {
    state.gameTitles = titles
  },

  async REMOVE_GAME(state, { title, id }) {
    const titleIndex = state.gameTitles.indexOf(title)
    const gameIndex = state.gameTitles.indexOf(title)

    const prices = []

    if (titleIndex !== -1) {
      state.gameTitles.splice(titleIndex, 1)
      state.games.splice(gameIndex, 1)

      if (state.games.length) {
        state.games.forEach((el) => {
          prices.push(el.totalPrice)
        })
        state.cartTotalPrice = prices.reduce((a, b) => a + b)
      }
    }
    await this.$fire.firestore.collection('users').doc(id).update({
      cart: state.gameTitles,
    })
  },
}
