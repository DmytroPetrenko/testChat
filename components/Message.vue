<template>
  <v-row class="ma-0 message-container" :style="messageContainerStyle">
    <v-col sm="8">
      <v-row no-gutters class="msg-info" :style="msgInfoStyle">
        <v-col cols="8" sm="10">
          <v-card class="pa-2 help-info">
            <span class="font-weight-bold">{{ message.name }}</span>
          </v-card>
        </v-col>
        <v-col cols="4" sm="2">
          <v-card class="pa-2 help-info">
            <span class="msg__date ml-3">{{ message.time }}</span>
          </v-card>
        </v-col>
      </v-row>
      <v-card
        :style="messageTextStyle"
        class="pa-2 message-text"
        id="message-text"
      >
        {{ message.text }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      messageTextStyle: {
        "--top": "10px"
      }
    };
  },
  computed: {
    msgInfoStyle() {
      return {
        "--color": this.color
      };
    },
    messageContainerStyle() {
      return {
        "--justifyContent": this.owner
      };
    }
  },
  props: ["message", "color", "owner"]
};
</script>

<style lang="scss" scoped>
.message-container {
  justify-content: var(--justifyContent);
}
.v-sheet.v-card {
  border-radius: 0;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.msg-info {
  background-color: var(--color);
}
.help-info {
  background-color: inherit;
}
/* .message-text {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    right: 100%;
    border-top: 6px solid transparent;
    border-right: 12px solid white;
    border-bottom: 6px solid transparent;
    top: var(--top);
  }
} */
</style>
