<template>
  <div>
    <div class="title">
      <h1>YOUR SHOPPING CART</h1>
    </div>

    <div class="container">
      <CartGame />
    </div>
  </div>
</template>

<script>
import CartGame from '@/components/pages/cart/CartGame'
import { mapState, mapActions } from 'vuex'

export default {
  components: { CartGame },
  async asyncData({ store }) {
    await store.dispatch('cart/GET_GAMES')
  },
  data: () => ({
    games: [],
  }),

  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('cart', ['GET_GAMES']),

    async getGames() {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(process.env.VUE_APP_USER_ID)
          .get()
          .then((snapshot) => {
            const { cart } = snapshot.data()
            this.games = [...cart]
          })
      } catch (e) {
        throw new Error(e)
      }
    },

    /* async getGameByTitle() {
      try {
        await this.$fire.firestore
          .collection('users')
          .where('title', '==', '')
          .get()
          .then((snapshot) => {
          })
      } catch (e) {
        throw new Error(e)
      }
    }, */
  },
}
</script>

<style scoped lang="scss">
.title {
  width: 70%;
  margin: rem(30px) auto rem(20px) auto;
  text-align: center;
  padding: rem(30px) 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}
.container {
  width: 70%;
  margin: 0 auto;
}
</style>
