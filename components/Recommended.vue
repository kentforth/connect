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
          <div v-for="game in games" :key="game.image" class="swiper-slide">
            <img :src="game.image" alt="" />
          </div>
        </div>
      </div>
      <div class="recommended__slider__buttons">
        <button class="btn-transparent swiper-nav-prev">
          <svg-icon name="arrow-down" class="arrow-left" />
        </button>
        <span>3 </span>
        <span>of </span>
        <span>7</span>
        <button class="btn-transparent swiper-nav-next">
          <svg-icon name="arrow-down" class="arrow-right" />
        </button>
      </div>
    </div>

    <div class="recommended__info">
      <h4>Recommended</h4>
      <div class="recommended__info__title">
        <h2>{{ currentGame.title }}</h2>
        <ButtonIcon v-if="hasInWishList" @click.native="toggleInWishlist">
          <svg-icon name="star" class="icon" />
        </ButtonIcon>
        <ButtonIcon v-else @click.native="toggleInWishlist">
          <svg-icon name="star-outline" class="icon" />
        </ButtonIcon>
      </div>
      <div class="recommended__info__images">
        <div v-for="image in previewImages" :key="image.id">
          <img :src="image.imageUrl" alt="image" @click="goToGamePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from '@/components/ButtonIcon'
export default {
  name: 'Recommended',
  components: { ButtonIcon },
  data() {
    return {
      hasInWishList: false,
      games: [
        {
          id: 67,
          title: 'europa',
          image: require('../assets/images/recommended/europa-banner.webp'),
        },
        {
          id: 68,
          title: 'red',
          image: require('../assets/images/recommended/red-banner.webp'),
        },
        {
          id: 69,
          title: 'village',
          image: require('../assets/images/recommended/village-banner.webp'),
        },
        {
          id: 70,
          title: 'little',
          image: require('../assets/images/recommended/little-banner.webp'),
        },
      ],
      currentGame: {
        title: 'Europa Universalis IV',
        urlTitle: '',
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
          disableOnInteraction: true,
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
    }
  },

  computed: {},

  mounted() {},
  methods: {
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

    /**
     * get preview images from firebase
     * @param id
     * @returns {Promise<void>}
     */
    async getPreviewImages(id) {
      let gameId = id
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
              this.previewImages[0].imageUrl = document.data().imageURL_1
              this.previewImages[1].imageUrl = document.data().imageURL_2
              this.previewImages[2].imageUrl = document.data().imageURL_3
              this.previewImages[3].imageUrl = document.data().imageURL_4
              this.currentGame.title = document.data().title
              this.currentGame.urlTitle = document.data().title
            })
          })
      } catch (e) {
        throw new Error(e)
      }
    },

    setGameUrl(title) {
      const newTitle = title.replace(/\s+/g, '-').toLowerCase()
      console.log(newTitle)
      return newTitle
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
     * toggle game in wishlist
     */
    toggleInWishlist() {
      this.hasInWishList = !this.hasInWishList
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
    padding: rem(30px) rem(30px) rem(30px) 0;

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
  }
}
</style>
