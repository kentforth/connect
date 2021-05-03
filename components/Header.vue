<template>
  <nav class="header">
    <!--LOGO-->
    <nuxt-link :to="{ name: 'index' }">
      <svg-icon name="logo" class="logo" />
    </nuxt-link>

    <!--LINKS-->
    <ul class="header__links">
      <li>
        <nuxt-link :to="{ name: 'index' }">store</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'library' }">library</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'community' }">community</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'support' }">support</nuxt-link>
      </li>
    </ul>

    <!--PROFILE-->
    <div class="header__profile">
      <div class="cart">
        <svg-icon name="cart" class="icon" />
        <div class="cart__badge"><span>3</span></div>
        <span>84.34 $</span>
      </div>

      <div class="language" @click="toggleLanguageMenu">
        <span>Language</span>
        <svg-icon name="flag-english" class="icon-language" />
        <svg-icon
          name="arrow-down"
          class="arrow-icon"
          :class="{ 'arrow-icon-active': isLanguageMenu }"
        />
      </div>

      <div class="user" @click="toggleUserMenu">
        <div class="user__image"></div>
        <span>John</span>
        <svg-icon
          name="arrow-down"
          class="arrow-icon"
          :class="{ 'arrow-icon-active': isUserMenu }"
        />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    isUserMenu: false,
    isLanguageMenu: false,
  }),
  methods: {
    toggleUserMenu() {
      this.isUserMenu = !this.isUserMenu
    },

    toggleLanguageMenu() {
      this.isLanguageMenu = !this.isLanguageMenu
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  background-color: $gray;
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
    grid-gap: 20px;

    .cart {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      span {
        margin-left: rem(20px);
        color: $success;
        font-weight: 600;
        font-size: rem(20px);
      }

      &__badge {
        background-color: $blue;
        padding: 2px 6px;
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

      span {
        font-size: rem(20px);
        color: $white;
      }

      .icon-language {
        margin-left: 10px;
        width: 25px;
        height: 15px;
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
      }

      span {
        font-size: rem(20px);
        color: $white;
        margin-left: 5px;
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
