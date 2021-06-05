<template>
  <div class="main">
    <div
      class="main__background"
      :style="{ backgroundImage: 'url(' + backgroundImage + ')' }"
    ></div>

    <div class="content">
      <!--SIDEBAR-->
      <div class="sidebar">
        <Card>
          <h2>Browse Category</h2>
          <div class="line"></div>
          <div class="links">
            <nuxt-link
              v-for="category in allCategories"
              :key="category.title"
              :to="{ name: category.linkName }"
              class="links__item"
            >
              <svg-icon :name="category.icon" class="card-icon" />
              <span>{{ category.title }}</span>
            </nuxt-link>
          </div>
        </Card>

        <Card>
          <h2>Browse By Genre</h2>
          <div class="line"></div>
          <div class="links">
            <nuxt-link
              v-for="genre in allGenres"
              :key="genre.title"
              :to="{ name: 'genre-path', params: { path: genre.linkPath } }"
              class="links__item"
            >
              <span>{{ genre.title }}</span>
            </nuxt-link>
          </div>
        </Card>
      </div>
      <div class="main">
        <div class="content__topbar">
          <!--STORE-->
          <div class="topbar-item" @click.stop="showStoreMenu">
            <span>Your Store</span>
            <svg-icon
              name="arrow-down"
              class="arrow-icon"
              :class="{ 'arrow-icon-active': isYourStore }"
            />
            <transition name="slide">
              <Dropdown v-if="isYourStore">
                <li class="dropdown__item" @click.stop="hideStoreMenu">
                  <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
                </li>
                <li class="dropdown__item" @click.stop="hideStoreMenu">
                  SOmew
                </li>
                <li class="dropdown__item" @click.stop="hideStoreMenu">Any</li>
              </Dropdown>
            </transition>
          </div>

          <!--CATEGORIES-->
          <div class="topbar-item" @click.stop="showCategoriesMenu">
            <span>Categories</span>
            <svg-icon
              name="arrow-down"
              class="arrow-icon"
              :class="{ 'arrow-icon-active': isCategories }"
            />
            <transition name="slide">
              <Dropdown v-if="isCategories">
                <li class="dropdown__item" @click.stop="hideCategoriesMenu">
                  <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
                </li>
                <li class="dropdown__item" @click.stop="hideCategoriesMenu">
                  SOmew
                </li>
                <li class="dropdown__item" @click.stop="hideCategoriesMenu">
                  Any
                </li>
              </Dropdown>
            </transition>
          </div>

          <!--NEWS-->
          <div class="topbar-item" @click.stop="showNewsMenu">
            <span>News</span>
            <svg-icon
              name="arrow-down"
              class="arrow-icon"
              :class="{ 'arrow-icon-active': isNews }"
            />
            <transition name="slide">
              <Dropdown v-if="isNews">
                <li class="dropdown__item" @click.stop="hideNewsMenu">
                  <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
                </li>
                <li class="dropdown__item" @click.stop="hideNewsMenu">SOmew</li>
                <li class="dropdown__item" @click.stop="hideNewsMenu">Any</li>
              </Dropdown>
            </transition>
          </div>

          <!--NEWS-->
          <nuxt-link :to="{ name: 'wishlist' }" class="link-wishlist">
            <svg-icon name="star" class="icon-star" />
            <span>Wishlist</span>
          </nuxt-link>

          <!--SEARCH-->
          <div class="search">
            <input type="text" placeholder="search for a game" />
            <svg-icon name="search" class="icon-search" />
          </div>
        </div>

        <Recommended @change-slide="changeSlide" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Dropdown from '@/components/Dropdown'
import Recommended from '@/components/Recommended'
import Card from '../components/Card'

export default {
  components: { Recommended, Dropdown, Card },
  data: () => ({
    isYourStore: false,
    isCategories: false,
    isNews: false,
    currentDropdown: 'store',
    backgroundImage: '',
    categoriesEN: [
      {
        icon: 'graph',
        title: 'Top Sellers',
        linkName: 'index',
      },
      {
        icon: 'percent',
        title: 'Specials',
        linkName: 'index',
      },
      {
        icon: 'clock',
        title: 'Upcoming',
        linkName: 'index',
      },
      {
        icon: 'plus',
        title: 'New Releases',
        linkName: 'index',
      },
    ],
    categoriesDE: [
      {
        icon: 'graph',
        title: 'Topseller',
        linkName: 'index',
      },
      {
        icon: 'percent',
        title: 'Angebote',
        linkName: 'index',
      },
      {
        icon: 'clock',
        title: 'Bald verfügbar',
        linkName: 'index',
      },
      {
        icon: 'plus',
        title: 'Neuerscheinungen',
        linkName: 'index',
      },
    ],
    categoriesRU: [
      {
        icon: 'graph',
        title: 'Лидеры продаж',
        linkName: 'index',
      },
      {
        icon: 'percent',
        title: 'Скидки',
        linkName: 'index',
      },
      {
        icon: 'clock',
        title: 'Скоро выйдут',
        linkName: 'index',
      },
      {
        icon: 'plus',
        title: 'Новинки',
        linkName: 'index',
      },
    ],
    genresEN: [
      {
        title: 'Free to Play',
        linkPath: 'free-to-play',
      },
      {
        title: 'Action',
        linkPath: 'action',
      },
      {
        title: 'Adventure',
        linkPath: 'adventure',
      },
      {
        title: 'Casual',
        linkPath: 'casual',
      },
      {
        title: 'Indie',
        linkPath: 'indie',
      },
      {
        title: 'Sports',
        linkPath: 'sports',
      },
      {
        title: 'RPG',
        linkPath: 'rpg',
      },
      {
        title: 'Strategy',
        linkPath: 'strategy',
      },
      {
        title: 'Shooter',
        linkPath: 'shooter',
      },
      {
        title: 'Racing',
        linkPath: 'racing',
      },
      {
        title: 'Simulation',
        linkPath: 'simulation',
      },
    ],
    genresDE: [
      {
        title: 'Kostenlos',
        linkPath: 'free-to-play',
      },
      {
        title: 'Action',
        linkPath: 'action',
      },
      {
        title: 'Abenteuer',
        linkPath: 'adventure',
      },
      {
        title: 'Gelegenheitsspiele',
        linkPath: 'casual',
      },
      {
        title: 'Indie',
        linkPath: 'indie',
      },
      {
        title: 'Sport',
        linkPath: 'sports',
      },
      {
        title: 'RPG',
        linkPath: 'rpg',
      },
      {
        title: 'Strategie',
        linkPath: 'strategy',
      },
      {
        title: 'Shooter',
        linkPath: 'shooter',
      },
      {
        title: 'Racing',
        linkPath: 'racing',
      },
      {
        title: 'Simulation',
        linkPath: 'simulation',
      },
    ],
    genresRU: [
      {
        title: 'Бесплатно',
        linkPath: 'free-to-play',
      },
      {
        title: 'Экшен',
        linkPath: 'action',
      },
      {
        title: 'Приключение',
        linkPath: 'adventure',
      },
      {
        title: 'Казуальная игра',
        linkPath: 'casual',
      },
      {
        title: 'Инди',
        linkPath: 'indie',
      },
      {
        title: 'Спорт',
        linkPath: 'sports',
      },
      {
        title: 'РПГ',
        linkPath: 'rpg',
      },
      {
        title: 'Стратегия',
        linkPath: 'strategy',
      },
      {
        title: 'Шутер',
        linkPath: 'shooter',
      },
      {
        title: 'Гонки',
        linkPath: 'racing',
      },
      {
        title: 'Симулятор',
        linkPath: 'simulation',
      },
    ],
  }),
  head() {
    return {
      title: 'Store',
    }
  },

  computed: {
    ...mapState('global', ['language']),

    allCategories() {
      switch (this.language) {
        case 'en':
          return this.categoriesEN
        case 'de':
          return this.categoriesDE
        case 'ru':
          return this.categoriesRU
        default:
          return this.categoriesEN
      }
    },

    allGenres() {
      switch (this.language) {
        case 'en':
          return this.genresEN
        case 'de':
          return this.genresDE
        case 'ru':
          return this.genresRU
        default:
          return this.genresEN
      }
    },
  },
  mounted() {
    this.getBackgroundImage(5)
    document.body.addEventListener('click', this.hideStoreMenu)
    document.body.addEventListener('click', this.hideCategoriesMenu)
    document.body.addEventListener('click', this.hideNewsMenu)
    const locale = localStorage.getItem('locale')
    this.$i18n.locale = locale
    this.SET_LANGUAGE(locale)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.hideStoreMenu)
    document.body.removeEventListener('click', this.hideCategoriesMenu)
    document.body.removeEventListener('click', this.hideNewsMenu)
  },
  methods: {
    ...mapActions('global', ['SET_LANGUAGE']),

    showStoreMenu() {
      this.isYourStore = !this.isYourStore
      this.currentDropdown = 'store'
      this.isCategories = false
      this.isNews = false
    },

    showCategoriesMenu() {
      this.isCategories = !this.isCategories
      this.currentDropdown = 'categories'
      this.isYourStore = false
      this.isNews = false
    },

    showNewsMenu() {
      this.isNews = !this.isNews
      this.currentDropdown = 'news'
      this.isYourStore = false
      this.isCategories = false
    },

    hideStoreMenu() {
      this.isYourStore = false
    },

    hideCategoriesMenu() {
      this.isCategories = false
    },

    hideNewsMenu() {
      this.isNews = false
    },

    changeSlide(value) {
      this.getBackgroundImage(value)
    },

    async getBackgroundImage(value) {
      try {
        await this.$fire.firestore
          .collection('games')
          .where('id', '==', value)
          .get()
          .then((snapshot) => {
            snapshot.forEach((document) => {
              this.backgroundImage = document.data().backgroundImageURL
            })
          })
      } catch (e) {
        throw new Error(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  &__background {
    min-width: 100%;
    min-height: 110vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #202a34;
    background-blend-mode: luminosity;
    mix-blend-mode: screen;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    transition: all 0.7s ease-in-out;
  }

  &__background:before {
    background-color: rgba(26, 37, 47, 0.7);
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
    transition: all 0.7s ease-in-out;
  }
}

.content {
  padding: rem(40px);
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: rem(45px);

  .sidebar {
    max-width: 300px;
    display: grid;
    grid-gap: rem(40px);
  }

  &__topbar {
    width: 100%;
    background: $dark-gradient-transparent;
    height: max-content;
    border-radius: $radius;
    padding-left: rem(20px);
    display: grid;
    grid-gap: rem(40px);
    grid-template-columns: repeat(4, max-content) 1fr;

    .topbar-item {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: rem(18px);
      display: flex;
      align-items: center;
      padding: rem(10px) 0;
      position: relative;

      .arrow-icon {
        width: 13px;
        margin-left: rem(10px);
      }

      .dropdown {
        position: absolute;
        top: rem(50px);
        right: rem(-30px);
      }
    }

    .link-wishlist {
      display: flex;
      align-items: center;
      border-left: 1px solid $white-transparent;
      padding-left: rem(30px);

      span {
        color: $blue;
      }

      .icon-star {
        width: 15px;
        margin-right: rem(15px);
      }
    }

    .search {
      position: relative;
      input {
        width: 100%;
        margin-right: rem(20px);
        height: 100%;
        font-size: rem(16px);
        font-family: 'NimbusSans', sans-serif;
        padding: rem(5px) rem(50px) rem(5px) rem(15px);
        background-color: $dark-marine;
        border: none;
        outline: none;
        color: $white;
        font-weight: 300;
      }

      input::placeholder {
        color: $text-gray;
      }

      .icon-search {
        position: absolute;
        top: 7px;
        right: 10px;
        width: rem(20px);
      }
    }
  }
}
</style>
