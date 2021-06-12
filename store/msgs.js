export const state = () => ({
  msgs: []
});

export const actions = {
  SOCKET_newMessage(ctx, msg) {
    console.log(msg);
    ctx.commit("add", msg);
    //state.msgs = [...state.msgs];
  }
};

export const mutations = {
  add(state, msg) {
    state.msgs.push({
      msg
    });
  }
};
