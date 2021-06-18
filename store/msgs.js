export const state = () => ({
  msgs: [],
  typingUsers: []
});

export const actions = {
  SOCKET_newMessage(ctx, msg) {
    ctx.commit("add", msg);
  },
  SOCKET_regTypingUser(ctx, userName) {
    ctx.commit("addTypingUser", userName);
  },
  SOCKET_unregTypingUser(ctx, userName) {
    ctx.commit("deleteTypingUser", userName);
  }
};

export const mutations = {
  add(state, msg) {
    state.msgs.push({
      msg
    });
  },
  addTypingUser(state, userName) {
    state.typingUsers.push(userName);
  },
  deleteTypingUser(state, userName) {
    state.typingUsers.splice(state.typingUsers.indexOf(userName), 1);
  }
};
