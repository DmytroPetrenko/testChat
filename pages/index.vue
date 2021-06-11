<template>
  <v-container class="v-container">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8" lg="9">
        <v-card class="pa-2 ma-0" outlined tile>
          Chat Page
          <div v-if="users.users.length">{{ users.users[0].user.name }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="pa-2" outlined tile>
          .col-6 .col-md-4
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "Chat bots 2.0"
    };
  },
  computed: mapState(["users"]),
  sockets: {
    getNewUser(user) {
      this.$store.commit("users/addNewUser", user);
    }
  },
  fetch() {
    //const self = this;
    if (!Object.keys(this.$store.state.users.users).length) {
      // generate new user (for future db)
      this.$socket.emit("generateNewUser");
      // add to local storage
    }
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  box-sizing: border-box;
  background-color: #d7dfe7;
  padding: 0;
  height: 100%;
}
</style>
