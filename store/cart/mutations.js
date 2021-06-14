export default {
  SET_GAMES(state, games) {
    state.games.push(games)
  },

  ADD_GAME(state, title) {
    state.gameTitles.push(title)
  },

  SET_GAMES_TITLES(state, titles) {
    state.gameTitles = titles
  },
}
