<template>
  <v-badge
    bottom
    :color="user.socketId === 'offline' ? 'red' : 'green'"
    dot
    offset-x="10"
    offset-y="10"
  >
    <v-avatar class="ma-0" :size="size" tile>
      <img :src="`http://localhost:3000/${user.imgSrc}`" />
    </v-avatar>
  </v-badge>
</template>
<script>
export default {
  props: ["size", "user"]
};
</script>
