<template>
  <div class="main">
    <div class="main__background"></div>
  </div>
</template>

<script></script>

<style scoped lang="scss">
.main {
  &__background {
    width: 100%;
    height: 100vh;
    position: fixed;

    background-image: url('../assets/images/test/bioshock.webp');
    background-color: rgb(9, 65, 101);
    background-blend-mode: multiply;
    background-size: cover;
    filter: sepia(40%) saturate(300%);
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
