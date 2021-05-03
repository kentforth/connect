<template>
  <nav class="header">
    <div class="header__links">
      <ul>
        <li>
          <nuxt-link :to="{ name: 'store' }">store</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
.header {
  background-color: $gray;
  padding: rem(25px);
}

a {
  text-transform: uppercase;
  color: $white;
  font-weight: 700;
  font-size: rem(20px);
}
</style>
