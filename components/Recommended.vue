<template>
  <div class="recommended">
    <div class="recommended__slider">
      <div
        ref="recommendedSlider"
        v-swiper="swiperOptions"
        :auto-update="false"
        @slideChange="changeSlide"
      >
        <div class="swiper-wrapper">
          <div
            v-for="game in recommendedGames"
            :key="game.image"
            class="swiper-slide"
          >
            <img :src="game.image" alt="" />
          </div>
        </div>
      </div>
      <div class="recommended__slider__buttons">
        <button class="btn-transparent swiper-nav-prev">
          <svg-icon name="arrow-down" class="arrow-left" />
        </button>
        <span>{{ currentGame.slide }} </span>
        <span>of </span>
        <span>{{ recommendedGames.length }}</span>
        <button class="btn-transparent swiper-nav-next">
          <svg-icon name="arrow-down" class="arrow-right" />
        </button>
      </div>
    </div>

    <div class="recommended__info">
      <h4>Recommended</h4>

      <!--TITLE-->
      <div class="recommended__info__title">
        <h2>{{ currentGame.title }}</h2>
        <ButtonIcon
          v-if="currentGame.isInWishList"
          @click.native="toggleInWishlist"
        >
          <svg-icon name="star" class="icon" />
        </ButtonIcon>
        <ButtonIcon v-else @click.native="toggleInWishlist">
          <svg-icon name="star-outline" class="icon" />
        </ButtonIcon>
      </div>

      <!--IMAGES-->
      <div class="recommended__info__images">
        <div v-for="image in previewImages" :key="image.id">
          <img :src="image.imageUrl" alt="image" @click="goToGamePage" />
        </div>
      </div>

      <!--AVAILABLE-->
      <div class="recommended__info__available">
        <div class="recommended__info__available__platforms">
          <p>Now Available</p>
          <div class="recommended__info__available__platforms__images">
            <img
              v-if="currentGame.platforms.includes('windows')"
              src="../assets/svg/windows.svg"
              alt="windows"
            />
            <img
              v-if="currentGame.platforms.includes('macos')"
              src="../assets/svg/macos.svg"
              alt="macos"
            />
            <img
              v-if="currentGame.platforms.includes('steam')"
              src="../assets/svg/steam.svg"
              alt="steam"
            />
          </div>
        </div>
        <div class="recommended__info__available__tags">
          <nuxt-link
            v-for="tag in currentGame.tags"
            :key="tag"
            :to="{ name: 'tag-tag', params: { tag: tagToLowerCase(tag) } }"
            >{{ tag }}</nuxt-link
          >
        </div>
      </div>

      <!--PRICE-->
      <div class="recommended__info__price">
        <div class="recommended__info__price__price">
          <span v-if="currentGame.discount > 0"
            >{{ price }} {{ currency }}</span
          >
          <br />
          <span v-if="currentGame.discount > 0"
            >{{ currentGame.discount }}%</span
          >
          <span :class="{ 'span-price': currentGame.discount < 1 }"
            >{{ totalPrice }} {{ currency }}</span
          >
        </div>
        <div class="recommended__info__price__button">
          <RoundedButton
            :background-color="'#2F80ED'"
            @click.native="addToCart"
          >
            <span>Add to Cart</span>
            <svg-icon name="cart" />
          </RoundedButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from '@/components/ButtonIcon'
import RoundedButton from '@/components/RoundedButton'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Recommended',
  components: { RoundedButton, ButtonIcon },
  data: () => ({
    recommendedGames: [
      {
        id: 1,
        title: 'europa',
        image: require('../assets/images/recommended/europa-banner.webp'),
      },
      {
        id: 2,
        title: 'red',
        image: require('../assets/images/recommended/red-banner.webp'),
      },
      {
        id: 3,
        title: 'village',
        image: require('../assets/images/recommended/village-banner.webp'),
      },
      {
        id: 4,
        title: 'little',
        image: require('../assets/images/recommended/little-banner.webp'),
      },
    ],
    currentGame: {
      slide: 1,
      title: 'Europa Universalis IV',
      urlTitle: 'Europa Universalis IV',
      isInWishList: false,
      documentId: 'OjJW4vyjDZwmTttRuQgo',
      price: 21,
      discount: 10,
      tags: [
        'Economy',
        'Simulation',
        'Historical',
        'Strategy',
        'Multiplayer',
        'Education',
        'Military',
      ],
      platforms: ['windows', 'macos', 'steam'],
    },
    previewImages: [
      {
        bannerId: 1,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/connect-651e9.appspot.com/o/games%2Feuropa%2Fscreen1.webp?alt=media&token=e838d2d5-81df-4a3c-bfe2-de5203902f09',
      },
      {
        bannerId: 2,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/connect-651e9.appspot.com/o/games%2Feuropa%2Fscreen2.webp?alt=media&token=20675081-d6d9-4baf-9603-9c1dd5027184',
      },
      {
        bannerId: 3,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/connect-651e9.appspot.com/o/games%2Feuropa%2Fscreen3.webp?alt=media&token=b0b2a5e8-60b7-4dae-a984-76db293e26af',
      },
      {
        bannerId: 4,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/connect-651e9.appspot.com/o/games%2Feuropa%2Fscreen4.webp?alt=media&token=9b14234b-1b6b-4187-89e6-be6be6631b95',
      },
    ],
    swiperOptions: {
      stopOnLastSlide: false,
      loop: true,
      slidesPerView: 1,
      effect: 'fade',
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-nav-next',
        prevEl: '.swiper-nav-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    },
  }),
  computed: {
    ...mapState('cart', ['gameTitles']),
    ...mapState('user', ['user']),

    price() {
      let price = this.currentGame.price

      if (this.$i18n.locale === 'ru') {
        price = price * 72.86
      } else if (this.$i18n.locale === 'de') {
        price = price * 0.82
      }
      return price.toFixed(0).replace(/\.0+$/, '')
    },

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
      const discount = this.currentGame.discount / 100
      let totalPrice =
        this.currentGame.price - this.currentGame.price * discount
      if (this.$i18n.locale === 'ru') {
        totalPrice = totalPrice * 72.86
      } else if (this.$i18n.locale === 'de') {
        totalPrice = totalPrice * 0.82
      }
      return totalPrice.toFixed(0).replace(/\.0+$/, '')
    },
  },
  mounted() {},
  methods: {
    ...mapActions('cart', ['ADD_GAME']),

    /**
     * change slides
     */
    changeSlide() {
      const gameId = this.$refs.recommendedSlider.swiper.activeIndex

      this.$emit(
        'change-slide',
        this.$refs.recommendedSlider.swiper.activeIndex
      )
      this.getPreviewImages(gameId)
    },

    getPlatform(platform) {
      return this.currentGame.platforms.includes(platform)
    },

    /**
     * get preview images from firebase
     * @param id
     * @returns {Promise<void>}
     */
    async getPreviewImages(id) {
      let gameId = id
      let slideId = id

      if (slideId === 5) {
        slideId = 1
      }

      if (slideId === 0) {
        slideId = 4
      }

      if (gameId === 1) {
        gameId = 5
      } else if (gameId === 0) {
        gameId = 4
      }

      try {
        await this.$fire.firestore
          .collection('games')
          .where('id', '==', gameId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.assignValuesFromFirebase(slideId, document)
            })
          })
      } catch (e) {
        throw new Error(e)
      }
    },

    assignValuesFromFirebase(slideId, document) {
      this.currentGame.documentId = document.id
      this.previewImages[0].imageUrl = document.data().imageURL_1
      this.previewImages[1].imageUrl = document.data().imageURL_2
      this.previewImages[2].imageUrl = document.data().imageURL_3
      this.previewImages[3].imageUrl = document.data().imageURL_4
      this.currentGame.isInWishList = document.data().is_in_wishlist
      this.currentGame.title = document.data().title
      this.currentGame.urlTitle = document.data().title
      this.currentGame.slide = slideId
      this.currentGame.platforms = document.data().platforms
      this.currentGame.tags = document.data().tags
      this.currentGame.price = document.data().price
      this.currentGame.discount = document.data().discount
    },

    /**
     * set game title url
     */
    setGameUrl(title) {
      const newTitle = title.replace(/\s+/g, '-').toLowerCase()
      return newTitle
    },

    /**
     * make tag to lower case
     */
    tagToLowerCase(tag) {
      return tag.toLowerCase()
    },

    /**
     * go to game page
     */
    goToGamePage() {
      const title = this.setGameUrl(this.currentGame.urlTitle)
      this.$router.push({
        name: 'game-title',
        params: { title },
      })
    },

    /**
     * toggle gamne in wish list
     * @returns {Promise<void>}
     */
    async toggleInWishlist() {
      let isInWishList = false
      if (this.currentGame.isInWishList) {
        this.currentGame.isInWishList = false
        isInWishList = false
      } else {
        this.currentGame.isInWishList = true
        isInWishList = true
      }

      try {
        await this.$fire.firestore
          .collection('games')
          .doc(this.currentGame.documentId)
          .update({
            is_in_wishlist: isInWishList,
          })
      } catch (e) {
        throw new Error(e)
      }
    },

    addToCart() {
      const exist = this.gameTitles.includes(this.currentGame.title)
      if (!exist) {
        this.ADD_GAME(this.currentGame.title)
        this.setCartGamesToFirebase()
      }
    },

    async setCartGamesToFirebase() {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(this.user.id)
          .update({
            cart: this.gameTitles,
          })
      } catch (e) {
        throw new Error(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.recommended {
  background: $dark-gradient-transparent;
  margin-top: rem(40px);
  display: grid;
  grid-template-columns: 800px 1fr;
  grid-gap: rem(30px);
  overflow: hidden;
  border-radius: $radius;

  &__slider {
    height: 500px;
    width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }

    &__buttons {
      position: absolute;
      bottom: rem(40px);
      right: 0;
      z-index: 999;
      background: $dark-gradient;
      padding: rem(12px) rem(8px);
      border-bottom-left-radius: $radius-small;
      border-top-left-radius: $radius-small;
      display: flex;
      align-items: center;

      span {
        margin: 0 5px;
        font-size: rem(14px);
      }

      span:nth-child(2) {
        margin: 0 2px 5px 12px;
      }

      span:nth-child(3) {
        margin-bottom: 5px;
      }

      span:nth-child(4) {
        margin: 0 12px 5px 2px;
      }

      .arrow-left {
        transform: rotate(90deg);
        width: rem(17px);
      }

      .arrow-right {
        transform: rotate(-90deg);
        width: rem(17px);
      }
    }
  }

  &__info {
    padding: rem(30px) rem(30px) 0 0;

    h4 {
      font-weight: 500;
    }

    &__title {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: rem(30px);
      }
    }

    &__images {
      display: grid;
      grid-gap: rem(20px);
      margin-top: rem(30px);
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      div {
        border-radius: $radius;
        width: 100%;
        height: 100px;
        overflow: hidden;
        display: flex;
        cursor: pointer;
      }
      img {
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    &__available {
      &__platforms {
        color: $white;
        &__images {
          max-width: rem(100px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: rem(20px);

          img {
            width: 25px;
          }
        }
      }

      &__tags {
        margin-top: rem(20px);
        display: flex;
        padding-bottom: rem(20px);
        border-bottom: 1px solid $line-thin;

        a {
          margin-right: rem(10px);
          color: $white;
          font-size: rem(13px);
          padding: 3px 10px;
          background-color: $gray-mid;
          border-radius: 10px;
        }
      }
    }

    &__price {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: rem(15px);
      margin-top: rem(30px);
      align-items: center;

      &__price {
        justify-self: end;
        display: grid;
        grid-template-columns: 1fr max-content;
        justify-items: end;
        grid-column-gap: 10px;
        align-items: center;

        span {
          font-size: rem(30px);
        }

        span:nth-child(1) {
          font-size: rem(20px);
          grid-column: 2;
          justify-self: end;
          text-decoration: line-through;
        }

        span:nth-child(3) {
          color: $success;
          font-size: rem(18px);
          grid-column: 1;
          grid-row: 2;
        }

        span:nth-child(4) {
          grid-column: 2;
          grid-row: 2;
        }

        .span-price {
          color: $white !important;
          font-size: rem(30px) !important;
          grid-column: 2 !important;
        }
      }

      &__button {
        display: flex;
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
