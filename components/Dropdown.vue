<template>
  <ul class="dropdown">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'Dropdown',
}
</script>

<style scoped lang="scss">
.dropdown {
  background-color: $dark-gray;
  border-radius: $radius-small;
  display: grid;
  overflow: hidden;
  min-width: rem(150px);
  box-shadow: 1px 3px 17px 1px rgba(11, 18, 28, 0.75);
  z-index: 999;

  &__item {
    border-bottom: 1px solid $white-transparent;
    padding: rem(10px) rem(15px);
  }

  &__item:hover {
    background-color: $dark-gray-lighten;
  }
}
</style>
