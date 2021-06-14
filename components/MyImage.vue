<template>
  <v-avatar class="ma-0" :size="size" tile>
    <img src="" />
  </v-avatar>
</template>
<script>
export default {
  data() {
    return {
      userImgId: "",
      imgChunks: []
    };
  },
  props: ["size", "user"],
  sockets: {
    sendChunk(chunk) {
      if (this.userImgId === this.user.id) {
        let img = this.$el.querySelector("img");
        this.imgChunks.push(chunk);
        img.setAttribute(
          "src",
          "data:image/png;base64," + window.btoa(this.imgChunks)
        );
      }
    },
    sendUserImgId(id) {
      this.userImgId = id;
    }
  },
  mounted() {
    this.$socket.emit("getUserImg", this.user);
  }
};
</script>
