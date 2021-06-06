export default {
  SET_USER(state, { user, id }) {
    state.user = { ...user }
    state.user.id = id
  },
}
