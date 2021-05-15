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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Card from '../components/Card'

export default {
  components: { Card },
  data() {
    return {
      backgroundImage:
        'https://images.gog-statics.com/35cd661ed60c46beb5a99a744f6e70ab12c0b4055a92028ef0b2460ff09e6962.jpg',
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
    const locale = localStorage.getItem('locale')
    this.$i18n.locale = locale
    this.SET_LANGUAGE(locale)
  },
  methods: {
    ...mapActions('global', ['SET_LANGUAGE']),
  },
}
</script>

<style scoped lang="scss">
.main {
  &__background {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #202a34;
    background-blend-mode: luminosity;
    mix-blend-mode: screen;
    background-size: cover;
    z-index: -1;
  }

  &__background:before {
    background-color: rgba(26, 37, 47, 0.7);
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
}

.content {
  padding: rem(40px);

  .sidebar {
    max-width: 300px;
    display: grid;
    grid-gap: rem(40px);
  }
}
</style>
