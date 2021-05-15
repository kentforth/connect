<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style scoped lang="scss">
.card::v-deep {
  background: linear-gradient(
    315deg,
    rgba(31, 48, 67, 0.9) 27%,
    rgba(25, 39, 55, 0.9) 95%
  );
  border-radius: $radius;
  padding: rem(20px) 0;

  h2 {
    margin: 0 rem(20px);
  }

  .line {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    height: 2px;
    margin-top: rem(10px);
  }

  .links {
    margin: rem(20px) rem(20px) 0 rem(20px);
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: rem(15px);

    &__item {
      display: flex;
      align-items: center;
      width: max-content;

      .card-icon {
        margin-right: rem(20px);
        width: rem(20px);
      }
    }
  }
}
</style>
