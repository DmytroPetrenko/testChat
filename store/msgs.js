export const state = () => ({
  msgs: []
});

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log("Message received", data)
  }
};

export const mutations = {
  add(state, text) {
    state.msgs.push({
      text
    });
  }
};
