export default {
  SET_GAMES(state, games) {
    state.games = games
  },

  ADD_GAME(state, title) {
    state.gameTitles.push(title)
  },

  SET_GAMES_TITLES(state, titles) {
    state.gameTitles = titles
  },

  SET_GAME_TOTAL_PRICE(state, price) {
    state.gameTotalPrice = state.gameTotalPrice + price
  },
}
