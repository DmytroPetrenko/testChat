<template>
  <v-container class="v-container">
    <v-row no-gutters class="row-container">
      <v-col cols="12" sm="6" md="8" lg="9">
        <v-card class="pa-0 ma-0 chat-card" outlined tile>
          <v-card class="pa-0 ma-0 header-chat-card" outlined tile>
            <v-avatar class="ma-0" size="125" tile v-if="currentUser">
              <MyImage :size="`125`" :user="currentUser" />
            </v-avatar>
            <div class="text-block">
              <v-card-title v-if="users.length">{{
                currentUser.name
              }}</v-card-title>
              <v-card-subtitle
                >Listen to your favorite artists and albums whenever and
                wherever, online and offline.</v-card-subtitle
              >
            </div>
          </v-card>
          <div id="msgBlock" class="msg-block mr-2">
            <Message
              v-for="(message, index) in msgs[room]"
              :key="`message-${index}`"
              :message="message.msg"
              :color="currentUser.id === message.msg.id ? `#f0cbb3` : `#becbd9`"
              :owner="
                currentUser.id === message.msg.id ? `flex-end` : `flex-start`
              "
            />
          </div>
          <div class="typing-message">
            <p>
              {{ typingMessage }}
            </p>
          </div>
          <InputButton :user="currentUser" :room="room" />
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
            <v-tab-item class="users-block">
              <div v-for="user in users" :key="user.id">
                <div
                  v-if="
                    user.id !== currentUser.id && user.socketId !== 'offline'
                  "
                  @click="openRoomWithUser(user.id), selectItem(user.id)"
                >
                  <User :user="user" :activeId="activeId" />
                </div>
              </div>
            </v-tab-item>
            <v-tab-item class="users-block">
              <div v-for="user in users" :key="user.id">
                <div
                  v-if="user.id !== currentUser.id"
                  @click="openRoomWithUser(user.id), selectItem(user.id)"
                >
                  <User :user="user" :activeId="activeId" />
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Message from "@/components/Message.vue";
import MyImage from "@/components/MyImage.vue";
import User from "@/components/User.vue";
import InputButton from "@/components/InputButton.vue";
import uniqid from "uniqid";
export default {
  components: { Message, MyImage, User, InputButton },
  data() {
    return {
      title: "Chat bots 2.0",
      imgSrc: "img/img1.jpg",
      show: "1",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imgChunks: [],
      uniqid: "",
      openedRoom: "",
      room: "",
      activeId: -1
    };
  },
  computed: {
    ...mapState({ msgs: state => state.msgs.msgs }),
    ...mapState({ typingUsers: state => state.msgs.typingUsers }),
    ...mapState({ users: state => state.users.users }),
    ...mapState({ currentUser: state => state.users.currentUser }),
    ...mapGetters("users", ["getUserById"]),
    typingMessage: function() {
      let typingMessage = "";
      if (this.typingUsers.length) {
        for (let i = 0; i < this.typingUsers.length; i++) {
          typingMessage += this.typingUsers[i];
          if (i + 1 < this.typingUsers.length) {
            typingMessage += ", ";
          }
        }
        if (this.typingUsers.length === 1) {
          typingMessage += " is typing...";
        } else {
          typingMessage += " are typing...";
        }
      }
      return typingMessage;
    }
  },
  watch: {
    msgs: function() {
      setTimeout(() => {
        var container = this.$el.querySelector("#msgBlock");
        container.scrollTop = container.scrollHeight;
      }, 10);
    },
    currentUser: function() {
      if (this.currentUser) {
        localStorage.setItem("user", JSON.stringify(this.currentUser));
      }
    }
  },
  methods: {
    selectItem(id) {
      this.activeId = id;
    },
    scrollToEnd: function() {
      let container = this.$el.querySelector(".msg-block");
      container.scrollTop = container.scrollHeight;
    },
    openRoomWithUser: function(userId) {
      if (this.openedRoom !== this.room) {
        this.$socket.emit("leaveRoom", this.openedRoom);
        const someRoom = this.room;
        this.room = "";
        if (userId > this.currentUser.id) {
          this.room += this.currentUser.id + userId;
        } else {
          this.room += userId + this.currentUser.id;
        }
        if (someRoom !== this.room) {
          this.openedRoom = someRoom;
        }
        console.log(this.room);
        this.$socket.emit("joinRoom", this.room);
      }
    },
    initRoom: function() {
      if (this.users.length > 1) {
        if (this.users[0].id !== this.currentUser.id) {
          this.activeId = this.users[0].id;
          if (this.users[0].id > this.currentUser.id) {
            this.room += this.currentUser.id + this.users[0].id;
          } else {
            this.room += this.users[0].id + this.currentUser.id;
          }
        } else {
          this.activeId = this.users[1].id;
          if (this.users[1].id > this.currentUser.id) {
            this.room += this.currentUser.id + this.users[1].id;
          } else {
            this.room += this.users[1].id + this.currentUser.id;
          }
        }
        console.log(this.room);
        this.$socket.emit("joinRoom", this.room);
      } else {
        console.log("Not enought users in app. Add more users, please!");
      }
    }
  },
  mounted() {
    if (!localStorage.getItem("user")) {
      this.uniqid = uniqid();
      this.$socket.emit("generateNewUser", this.uniqid);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      this.$socket.emit("setUsers");
      this.uniqid = user.id;
      this.$store.commit("users/setCurrentUser", user);
    }

    const self = this;
    setTimeout(function() {
      if (!self.currentUser) {
        const user = self.getUserById(self.uniqid);
        self.$store.commit("users/setCurrentUser", user);
      }
      self.initRoom();
    }, 100);
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
        img {
          width: 100%;
          height: 100%;
        }
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
      .typing-message {
        display: inline-block;
        vertical-align: bottom;
        padding: 0;
        color: #3a87ae;
        font-size: 14px;
        padding-left: 10px;
        p {
          margin: 0;
          text-align: center;
        }
      }
    }
    .users-list {
      height: 100%;
      border: 0;

      .users-block {
        overflow-y: auto;
        height: calc(100vh - 210px);
      }
      .users-block::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #becbd9;
      }

      .users-block::-webkit-scrollbar {
        border-radius: 10px;
        width: 10px;
        background-color: #becbd9;
      }

      .users-block::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #9daab9;
      }

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
