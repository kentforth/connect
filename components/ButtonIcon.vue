<template>
  <button class="btn-icon">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonIcon',
}
</script>

<style scoped lang="scss">
.btn-icon {
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
}
</style>
