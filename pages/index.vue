<template>
  <v-container class="v-container">
    <v-row no-gutters class="row-container">
      <v-col cols="12" sm="6" md="8" lg="9">
        <v-card class="pa-0 ma-0 chat-card" outlined tile>
          <v-card class="pa-0 ma-0 header-chat-card" outlined tile>
            <v-avatar class="ma-0" size="125" tile>
              <v-img :src="imgSrc"></v-img>
            </v-avatar>
            <div class="text-block">
              <v-card-title>Top 10 Australian beaches</v-card-title>
              <v-card-subtitle
                >Listen to your favorite artists and albums whenever and
                wherever, online and offline.</v-card-subtitle
              >
            </div>
          </v-card>
          <div id="msgBlock" class="msg-block mr-2" v-if="users.length">
            <Message
              v-for="(message, index) in msgs"
              :key="`message-${index}`"
              :message="message.msg"
            />
            {{ users[0].user.name }}
          </div>
          <div class="input-holder mb-5">
            <input
              class="ml-2 mr-1"
              type="text"
              name="MsgInput"
              id="msgInput"
              placeholder="Start chatting!"
              v-model="message"
            />
            <v-btn
              class="white--text ml-1 mr-2"
              color="#428bca"
              @click.prevent="sendMessage"
              >Send message</v-btn
            >
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="pa-0 users-list" outlined tile>
          <div class="bb">
            <v-tabs v-model="show" class=" tabs" slider-color="white" grow>
              <v-tab active-class="tabs__item--active active">Online</v-tab>
              <v-tab active-class="tabs__item--active active">All</v-tab>
            </v-tabs>
          </div>
          <v-tabs-items v-model="show">
            <v-tab-item v-for="n in 2" :key="n">
              <v-card flat>
                <v-card-text>No.{{ n }}<br />{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/Message.vue";
export default {
  components: { Message },
  data() {
    return {
      title: "Chat bots 2.0",
      imgSrc: "img/img1.jpg",
      show: "1",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      message: ""
    };
  },
  computed: {
    ...mapState({ msgs: state => state.msgs.msgs }),
    ...mapState({ users: state => state.users.users })
  },
  watch: {
    msgs: function() {
      setTimeout(() => {
        var container = this.$el.querySelector("#msgBlock");
        container.scrollTop = container.scrollHeight;
      }, 10);
    }
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = this.message;
        this.$socket.emit("msgToServer", message);
        this.text = "";
      }
    },
    /* receivedMessage(message) {
      this.messages.push(message);
    }, */
    validateInput() {
      return this.message.length > 0;
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector(".msg-block");
      container.scrollTop = container.scrollHeight;
    }
  },
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
  .row-container {
    height: 100%;

    .chat-card {
      background-color: #d7dfe7;
      height: 100%;
      border: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .header-chat-card {
        display: flex;
        flex-wrap: nowrap;
        background-color: #becbd9;
        border: 0;
      }
      .msg-block {
        padding-left: 10px;
        overflow-y: auto;
        height: calc(100vh - 393px);
      }
      .msg-block::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #becbd9;
      }

      .msg-block::-webkit-scrollbar {
        border-radius: 10px;
        width: 10px;
        background-color: #becbd9;
      }

      .msg-block::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #9daab9;
      }
      .input-holder {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;

        #msgInput {
          background-color: white !important;
          border: 0 !important;
          border-radius: 4px;
          height: 38px;
          flex-grow: 7;
        }
        #msgInput::placeholder {
          font-size: 14px;
          padding-left: 10px;
        }
        #msgInput:focus {
          outline: 0;
          box-shadow: 0 0 1pt 1pt #74b9ef;
        }
        .v-btn {
          flex-grow: 1;
          text-transform: capitalize;
        }
      }
    }
    .users-list {
      height: 100%;
      border: 0;

      .v-tab {
        background-color: #f8f8f8;
        border: 1px solid #dddddd;
        color: #555555;
        text-transform: capitalize;
      }

      .active {
        border: 0;
        background-color: #fff;
      }
    }
  }
}
</style>
