<template>
  <v-row justify="center" align="center">
    <div class="col-md-6 offset-md-3 col-sm-12">
      <h1 class="text-center">{{ title }}</h1>
      <br />
      <div id="status"></div>
      <div id="chat">
        <input
          type="text"
          v-model="name"
          id="username"
          class="form-control"
          placeholder="Enter name..."
        />
        <br />
        <div class="card">
          <div id="messages" class="card-block">
            <ul>
              <li v-for="message of messages" v-bind:key="message">
                {{ message.name }}: {{ message.text }}
              </li>
            </ul>
          </div>
        </div>
        <br />
        <textarea
          id="textarea"
          class="form-control"
          v-model="text"
          placeholder="Enter message..."
        ></textarea>
        <br />
        <button id="send" class="btn" @click.prevent="sendMessage">
          Send
        </button>
      </div>
    </div>
  </v-row>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Nestjs Websockets Chat",
      name: "",
      text: "",
      messages: [],
      socket: null
    };
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text
        };
        this.socket.emit("msgToServer", message);
        this.text = "";
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    }
  },
  created() {
    this.socket = io("http://localhost:8000");
    this.socket.on("msgToClient", message => {
      this.receivedMessage(message);
    });
  }
};
</script>
