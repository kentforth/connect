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
  background: $dark-gradient-transparent;
  border-radius: $radius;
  padding: rem(20px) 0;

  h2 {
    margin: 0 rem(20px);
  }

  .line {
    width: 100%;
    background-color: $line-thin;
    height: 1px;
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
