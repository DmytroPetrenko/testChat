<template>
  <v-avatar class="ma-0" :size="size" tile>
    <img :src="`http://localhost:3000/${user.imgSrc}`" />
  </v-avatar>
</template>
<script>
export default {
  props: ["size", "user"]
};
</script>
