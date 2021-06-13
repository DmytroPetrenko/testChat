<template>
  <!-- <v-row justify="center" no-gutters class="msg-row">
    <v-col class="msg-wrapper">
      <v-row no-gutters justify="space-between" class="msg">
        <v-col>
          <span class="font-weight-bold">{{ message.name }}</span>
          <p class="mb-0">
            {{ message.text }}
          </p>
        </v-col>
        <v-col cols="auto">
          <span class="msg__date ml-3">{{ message.time }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row> -->
  <v-row class="ma-0">
    <v-col sm="8">
      <v-row no-gutters>
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
        :style="triangleStyle"
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
      triangleStyle: {
        "--top": "10px"
      }
    };
  },
  props: ["message"]
};
</script>

<style lang="scss" scoped>
.v-sheet.v-card {
  border-radius: 0;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}
.help-info {
  background-color: #becbd9;
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
/* .msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__date {
    text-decoration: underline;
  }
}

@media (max-width: 400px) {
  .msg {
    width: 90%;
  }
} */
</style>
