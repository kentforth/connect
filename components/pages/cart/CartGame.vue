<template>
  <div class="game">
    <!--IMAGE-->
    <div class="game__image">
      <img :src="game.bannerUrl" alt="image" />
    </div>

    <!--CONTENT-->
    <div class="game__content">
      <div class="game__content-title">
        <h2>{{ game.title }}</h2>
        <button class="btn-transparent">
          <img src="@/assets/svg/trash.svg" alt="" />
        </button>
      </div>

      <div class="game__content-platforms">
        <svg-icon
          v-if="game.platforms.includes('steam')"
          name="steam"
          class="game__content-platforms-icon"
        />
        <img
          v-if="game.platforms.includes('windows')"
          src="@/assets/svg/windows.svg"
          alt=""
          class="game__content-platforms-icon"
        />
        <img
          v-if="game.platforms.includes('macos')"
          src="@/assets/svg/macos.svg"
          alt=""
          class="game__content-platforms-icon"
        />
      </div>

      <div class="game__content-price">
        <span v-if="game.discount > 0">{{ price }} {{ currency }}</span>
        <span v-if="game.discount > 0">{{ game.discount }}%</span>
        <span :class="{ 'span-price': game.discount < 1 }"
          >{{ totalPrice }} {{ currency }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CartGame',
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    /**
     * calculate price
     */
    price() {
      let price = this.game.price

      if (this.$i18n.locale === 'ru') {
        price = price * 72.86
      } else if (this.$i18n.locale === 'de') {
        price = price * 0.82
      }
      return price.toFixed(0).replace(/\.0+$/, '')
    },

    /**
     * claculate currency
     */
    currency() {
      const locale = this.$i18n.locale
      switch (locale) {
        case 'ru':
          return 'руб.'
        case 'de':
          return '€'
        case 'en':
          return '$'
        default:
          return '$'
      }
    },

    /**
     * calculate total price
     */
    totalPrice() {
      const discount = this.game.discount / 100
      let totalPrice = this.game.price - this.game.price * discount
      if (this.$i18n.locale === 'ru') {
        totalPrice = totalPrice * 72.86
      } else if (this.$i18n.locale === 'de') {
        totalPrice = totalPrice * 0.82
      }
      totalPrice = totalPrice.toFixed(0).replace(/\.0+$/, '')
      return totalPrice
    },
  },
  mounted() {
    this.SET_GAME_TOTAL_PRICE(+this.totalPrice)
  },

  methods: {
    ...mapMutations('cart', ['SET_GAME_TOTAL_PRICE']),
  },
}
</script>

<style scoped lang="scss">
.game {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: rem(20px);
  background: $gray;
  border-bottom: 1px solid $line-thin;
  grid-gap: rem(20px);
  &__image {
    img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      object-position: center;
      border-radius: $radius-small;
    }
  }

  &__content-title {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  &__content-price {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin-left: auto;
    align-items: flex-end;

    span:nth-child(1) {
      text-decoration: line-through;
    }

    span:nth-child(3) {
      font-size: rem(30px);
      color: $success;
    }

    .span-price {
      text-decoration: none !important;
      font-size: rem(30px);
      color: $success;
    }
  }

  &__content-platforms {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    width: rem(100px);
    margin-top: rem(10px);
  }

  &__content-platforms-icon {
    width: 20px;
  }
}
</style>
