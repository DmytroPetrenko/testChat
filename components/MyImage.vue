<template>
  <v-avatar class="ma-0" :size="size" tile>
    <img :id="user.id" src="" />
  </v-avatar>
</template>
<script>
export default {
  data() {
    return {
      imgChunks: []
    };
  },
  computed: {
    img: function() {
      return this.$el.querySelector(`#${this.user.id}`);
    }
  },
  props: ["size", "user"],
  sockets: {
    sendChunk(chunk) {
      //const img = this.$el.querySelector(`#${this.user.id}`);
      this.imgChunks.push(chunk);
      this.img.setAttribute(
        "src",
        "data:image/png;base64," + window.btoa(this.imgChunks)
      );
    }
  },
  mounted() {
    this.$socket.emit("getUserImg", this.user.imgSrc);
  }
};
</script>
