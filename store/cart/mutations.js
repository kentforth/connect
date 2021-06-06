export default {
  SET_GAMES(state, games) {
    state.games = games
  },

  ADD_GAME(state, title) {
    state.games.push(title)
  },
}
