<template>
  <div>
    <div class="title">
      <h1>YOUR SHOPPING CART</h1>
    </div>

    <div class="container">
      <CartGame v-for="game in games" ref="game" :key="game.id" :game="game" />
    </div>

    <div class="total">
      Total: <span> {{ totalPrice }} {{ currency }}</span>
    </div>
  </div>
</template>

<script>
import CartGame from '@/components/pages/cart/CartGame'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Index',
  components: { CartGame },
  async asyncData({ store }) {
    await store.dispatch('cart/GET_GAMES')
  },
  data: () => ({
    price: 0,
  }),
  computed: {
    ...mapState('user', ['user']),
    ...mapState('cart', ['cartTotalPrice', 'games']),

    /**
     * calculate currency
     */
    currency() {
      const locale = this.$i18n.locale
      switch (locale) {
        case 'ru':
          return '₽'
        case 'de':
          return '€'
        case 'en':
          return '$'
        default:
          return '$'
      }
    },

    totalPrice() {
      let price = this.cartTotalPrice

      if (this.$i18n.locale === 'ru') {
        price = price * 72.86
      } else if (this.$i18n.locale === 'de') {
        price = price * 0.82
      }
      return price.toFixed(1).replace(/\.0+$/, '')
    },
  },
  mounted() {},
  methods: {
    ...mapActions('cart', ['GET_GAMES']),
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
  padding-bottom: rem(40px);
}

.total {
  width: 70%;
  margin: 0 auto 30px auto;
  display: flex;
  justify-content: space-between;
  padding: rem(20px);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  font-size: rem(30px);
  color: $white;

  span {
    color: $success;
    font-size: rem(35px);
  }
}
</style>
