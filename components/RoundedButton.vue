<template>
  <button class="btn-rounded" :style="{ backgroundColor: backgroundColor }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'RoundedButton',
  props: {
    backgroundColor: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.btn-rounded {
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: $radius;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  font-size: rem(25px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 3px 8px rgba(0, 0, 0, 0.1);

  svg {
    width: 20px;
    margin-left: 10px;
  }
}
</style>
