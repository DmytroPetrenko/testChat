<template>
  <div class="input-holder mb-5">
    <input
      class="ml-2 mr-1"
      type="text"
      name="MsgInput"
      id="msgInput"
      placeholder="Start chatting!"
      v-model="message"
      @keyup.enter="sendMessage"
    />
    <v-btn
      class="white--text ml-1 mr-2"
      color="#428bca"
      @click.prevent="sendMessage"
      >Send message</v-btn
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      isLengthMoreThanOne: false
    };
  },
  watch: {
    message: function() {
      if (this.message.length > 0) {
        this.isLengthMoreThanOne = true;
      } else {
        this.isLengthMoreThanOne = false;
      }
    },
    isLengthMoreThanOne: function() {
      if (this.isLengthMoreThanOne) {
        this.$socket.emit("regTypingUser", this.user.name);
      } else {
        // unarray user throught the socket
        this.$socket.emit("unregTypingUser", this.user.name);
      }
    }
  },
  props: ["user"],
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        this.$socket.emit("msgToServer", {
          message: this.message,
          clientId: this.user.id,
          clientName: this.user.name
        });
        this.message = "";
      }
    },
    validateInput() {
      return this.message.length > 0;
    }
  }
};
</script>
<style lang="scss" scoped>
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
    padding-left: 10px;
  }
  #msgInput::placeholder {
    font-size: 14px;
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
</style>
