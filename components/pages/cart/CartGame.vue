<template>
  <div class="game">
    <!--IMAGE-->
    <div class="game__image">
      <img
        src="../../../assets/images/recommended/little-banner.webp"
        alt="image"
      />
    </div>

    <!--CONTENT-->
    <div class="game__content">
      <div class="game__content__title">
        <h2>Game Title</h2>
        <button class="btn-transparent">
          <img src="@/assets/svg/trash.svg" alt="" />
        </button>
      </div>

      <div class="game__content__platforms">
        <svg-icon name="steam" class="game__content__platforms__icon" />
        <img
          src="@/assets/svg/windows.svg"
          alt=""
          class="game__content__platforms__icon"
        />
        <img
          src="@/assets/svg/macos.svg"
          alt=""
          class="game__content__platforms__icon"
        />
      </div>

      <div class="game__content__price">
        <span>182</span>
        <span>433</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartGame',
}
</script>

<style scoped lang="scss">
.game {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: rem(20px);
  background: $gray;
  border-radius: $radius;
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

  &__content {
    &__title {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      img {
        width: 25px;
        height: 25px;
      }
    }

    &__platforms {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      width: rem(100px);
      margin-top: rem(10px);
      &__icon {
        width: 20px;
      }
    }

    &__price {
      display: flex;
      flex-direction: column;
      width: max-content;
      margin-left: auto;
      align-items: flex-end;

      span:nth-child(2) {
        font-size: rem(25px);
      }
    }
  }
}
</style>
