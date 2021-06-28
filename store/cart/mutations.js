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

  /**
   * add game to library
   * @param state
   * @param title
   * @returns {Promise<void>}
   * @constructor
   */
  async ADD_GAME_TO_LIBRARY(state, title) {
    const listHasTitles = state.libraryGames.includes(title)
    if (!listHasTitles) {
      state.libraryGames.push(title)
      await this.$fire.firestore
        .collection('users')
        .doc(process.env.userId)
        .update({
          library: state.libraryGames,
        })
    }
  },

  SET_GAMES_TITLES(state, titles) {
    state.gameTitles = titles
  },

  /**
   * remove game from cart
   * @param state
   * @param title
   * @param id
   * @returns {Promise<void>}
   * @constructor
   */
  async REMOVE_GAME(state, title) {
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
    await this.$fire.firestore
      .collection('users')
      .doc(process.env.userId)
      .update({
        cart: state.gameTitles,
      })
  },
}
