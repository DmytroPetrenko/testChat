export const state = () => ({
  msgs: []
});

export const actions = {
  SOCKET_newMessage(ctx, msg) {
    ctx.commit("add", msg);
  }
};

export const mutations = {
  add(state, msg) {
    state.msgs.push({
      msg
    });
  }
};
