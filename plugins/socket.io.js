import Vue from "vue";
import VueSocketIO from "vue-socket.io";

//const socket = io("http://localhost:3000");

/* export default ({ store }) => {
  Vue.use(VueSocketIOExt, socket, { store });
}; */
export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: "ws://localhost:3000",
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
      }
    })
  );
}
