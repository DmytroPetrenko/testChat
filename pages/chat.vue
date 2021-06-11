<template>
  <div>
    Chat Page
    <div v-if="users.users.length">{{ users.users[0].user }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["users"]),
  sockets: {
    getNewUser(user) {
      this.$store.commit("users/addNewUser", user);
    }
  },
  fetch() {
    //const self = this;
    if (!Object.keys(this.$store.state.users.users).length) {
      // generate new user
      this.$socket.emit("generateNewUser");
    }
  }
};
</script>
