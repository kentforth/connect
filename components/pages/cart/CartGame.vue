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
        <button class="btn-transparent" @click="removeGame(game.title)">
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
        <div>
          <button class="btn-buy" @click="buyGame(game.title)">Buy</button>
          <span :class="{ 'span-price': game.discount < 1 }"
            >{{ totalPrice }} {{ currency }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

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
      return price.toFixed(1).replace(/\.0+$/, '')
    },

    /**
     * show currency
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

    /**
     * calculate total price
     */
    totalPrice() {
      let totalPrice = this.game.totalPrice
      if (this.$i18n.locale === 'ru') {
        totalPrice = this.game.totalPrice * 72.86
      } else if (this.$i18n.locale === 'de') {
        totalPrice = this.game.totalPrice * 0.82
      }
      totalPrice = totalPrice.toFixed(1).replace(/\.0+$/, '')
      return totalPrice
    },
  },

  methods: {
    ...mapActions('cart', ['REMOVE_GAME']),
    ...mapMutations('cart', ['ADD_GAME_TO_LIBRARY']),

    /**
     * remove game
     * @param title
     */
    removeGame(title) {
      this.REMOVE_GAME(title)
    },

    buyGame(title) {
      this.$swal({
        title: 'Thanks for purchase!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        willClose: this.moveGameToLibrary(title),
      })
    },

    moveGameToLibrary(title) {
      setTimeout(() => {
        this.REMOVE_GAME(title)
        this.ADD_GAME_TO_LIBRARY(title)
        this.$router.push({ name: 'library' })
      }, 1500)
    },
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

    .span-price {
      text-decoration: none !important;
      font-size: rem(30px);
      color: $success;
    }

    div {
      display: flex;
      align-items: center;

      span {
        margin-left: rem(20px);
        font-size: rem(30px);
        color: $success;
      }

      .btn-buy {
        font-size: rem(25px);
        cursor: pointer;
        background-color: $blue;
        border: none;
        border-radius: 20px;
        padding: 4px 0;
        color: $white;
        font-weight: 600;
        width: 100px;
      }
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
