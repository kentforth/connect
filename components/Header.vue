<template>
  <nav class="header">
    <!--LOGO-->
    <nuxt-link :to="localePath({ name: 'index' })">
      <svg-icon name="logo" class="logo" />
    </nuxt-link>

    <!--LINKS-->
    <ul class="header__links">
      <li>
        <nuxt-link :to="localePath({ name: 'index' })">{{
          $t('navigationLinkStore')
        }}</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath({ name: 'library' })">{{
          $t('navigationLinkLibrary')
        }}</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath({ name: 'community' })">{{
          $t('navigationLinkCommunity')
        }}</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath({ name: 'support' })">{{
          $t('navigationLinkSupport')
        }}</nuxt-link>
      </li>
    </ul>

    <!--PROFILE-->
    <div class="header__profile">
      <!--CART-->
      <div class="cart" @click="goToCart">
        <svg-icon name="cart" class="icon" />
        <div v-if="gameTitles.length > 0" class="cart__badge">
          <span>{{ gameTitles.length }}</span>
        </div>
        <span>84.34 $</span>
      </div>

      <!--LANGUAGE-->
      <div class="language" @click.stop="showLanguageMenu">
        <span>{{ currentLanguage.title }}</span>
        <svg-icon :name="currentLanguage.icon" class="icon-language" />
        <svg-icon
          name="arrow-down"
          class="arrow-icon"
          :class="{ 'arrow-icon-active': isLanguageMenu }"
        />
        <transition name="slide">
          <ul v-if="isLanguageMenu" class="dropdown">
            <li
              v-for="language in languages"
              :key="language.title"
              class="dropdown__item"
              @click.stop="setLanguage(language)"
            >
              <span>{{ language.title }}</span>
              <svg-icon :name="language.icon" class="icon-language" />
            </li>
          </ul>
        </transition>
      </div>

      <div class="user" @click.stop="showUserMenu">
        <div class="user__image">
          <img src="../assets/images/test/profile.jpg" alt="" />
        </div>
        <span>John</span>
        <svg-icon
          name="arrow-down"
          class="arrow-icon"
          :class="{ 'arrow-icon-active': isUserMenu }"
        />
        <transition name="slide">
          <div v-if="isUserMenu" class="dropdown">
            <div class="dropdown__item" @click.stop="goToProfile">
              <span>{{ $t('profile') }}</span>
              <svg-icon name="profile" class="icon" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  data: () => ({
    isUserMenu: false,
    isLanguageMenu: false,
    currentLanguage: {
      icon: 'flag-english',
      title: 'English',
    },
    languages: [
      {
        title: 'English',
        code: 'en',
        icon: 'flag-english',
      },
      {
        title: 'Deautch',
        code: 'de',
        icon: 'flag-deautch',
      },
      {
        title: 'Russian',
        code: 'ru',
        icon: 'flag-russian',
      },
    ],
  }),
  async fetch() {
    await this.GET_GAMES_TITLES()
  },
  computed: {
    ...mapState('cart', ['gameTitles']),
  },
  mounted() {
    this.getLanguage()
    this.GET_USER()
    document.body.addEventListener('click', this.hideLanguageMenu)
    document.body.addEventListener('click', this.hideUserMenu)
  },

  beforeDestroy() {
    document.body.removeEventListener('click', this.hideLanguageMenu)
    document.body.removeEventListener('click', this.hideUserMenu)
  },
  methods: {
    ...mapActions('global', ['SET_LANGUAGE']),
    ...mapActions('user', ['GET_USER']),
    ...mapActions('cart', ['GET_GAMES_TITLES']),

    /**
     * get current language
     */
    getLanguage() {
      const locale = localStorage.getItem('locale')

      switch (locale) {
        case 'en':
          this.currentLanguage.title = 'English'
          this.currentLanguage.icon = 'flag-english'
          this.currentLanguage.code = 'en'
          break
        case 'de':
          this.currentLanguage.title = 'Deautch'
          this.currentLanguage.icon = 'flag-deautch'
          this.currentLanguage.code = 'de'
          break
        case 'ru':
          this.currentLanguage.title = 'Russian'
          this.currentLanguage.icon = 'flag-russian'
          this.currentLanguage.code = 'ru'
          break
      }
    },

    showLanguageMenu() {
      this.isLanguageMenu = !this.isLanguageMenu
    },

    hideLanguageMenu() {
      this.isLanguageMenu = false
    },

    showUserMenu() {
      this.isUserMenu = !this.isUserMenu
    },

    hideUserMenu() {
      this.isUserMenu = false
    },

    goToProfile() {
      this.isUserMenu = false
    },

    /**
     * set language
     */
    setLanguage(language) {
      this.currentLanguage.title = language.title
      this.currentLanguage.icon = language.icon
      this.isLanguageMenu = false
      this.$i18n.locale = language.code
      this.SET_LANGUAGE(language.code)
      localStorage.setItem('locale', language.code)
    },

    goToCart() {
      this.$router.push({ name: 'cart' })
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  background: $dark-gradient;
  padding: rem(25px);
  display: grid;
  align-items: center;
  grid-template-columns: 200px 1fr 0.5fr;
  grid-gap: rem(30px);

  .logo {
    width: 150px;
    height: 40px;
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    grid-gap: rem(30px);
    align-items: center;

    a:hover {
      color: $blue;
      transition: color 0.2s ease-in-out;
    }
  }

  &__profile {
    display: grid;
    align-items: center;
    justify-content: end;
    grid-template-columns: repeat(3, max-content);
    grid-gap: 30px;

    .cart {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      .icon {
        color: $gray-light;
      }

      span {
        margin-left: rem(20px);
        color: $success;
        font-weight: 600;
        font-size: rem(20px);
      }

      &__badge {
        background-color: $blue;
        padding: 2px 7px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-items: center;
        top: -10px;
        left: 20px;
        border-radius: 50%;
        span {
          margin: 0;
          font-size: 12px;
          color: $white;
        }
      }
    }

    .language {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      min-width: rem(130px);

      span {
        font-size: rem(20px);
        color: $white;
      }

      .icon-language {
        margin-left: 10px;
        width: 25px;
        height: 15px;
      }

      .dropdown {
        position: fixed;
        top: 80px;
        right: 165px;
        background-color: $dark-gray;
        border-radius: $radius-small;
        display: grid;
        overflow: hidden;
        min-width: rem(150px);
        box-shadow: 1px 3px 17px 1px rgba(11, 18, 28, 0.75);
        z-index: 999;

        &__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: rem(10px) rem(15px);
          transition: $transition;
        }

        &__item:hover {
          background-color: $dark-gray-lighten;
        }
      }
    }

    .user {
      display: flex;
      align-items: center;
      justify-self: flex-end;
      cursor: pointer;

      &__image {
        width: 40px;
        height: 40px;
        background-color: $gray;
        border: 2px solid $blue;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }

      span {
        font-size: rem(20px);
        color: $white;
        margin-left: 10px;
      }

      .arrow-icon {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        transition: 0.3s ease-in-out;
      }

      .arrow-icon-active {
        transform: rotateX(-180deg);
      }

      .dropdown {
        position: fixed;
        top: 80px;
        right: 18px;
        background-color: $dark-gray;
        border-radius: $radius-small;
        display: grid;
        overflow: hidden;
        min-width: rem(150px);
        z-index: 999;
        box-shadow: 1px 3px 17px 1px rgba(11, 18, 28, 0.75);

        &__item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: rem(10px) rem(15px);
          transition: $transition;
        }

        &__item:hover {
          background-color: $dark-gray-lighten;
        }

        .icon {
          width: 20px;
          margin-left: rem(20px);
        }
      }
    }
  }
}

a {
  text-transform: uppercase;
  color: $white;
  font-weight: 700;
  font-size: rem(20px);
}
</style>
