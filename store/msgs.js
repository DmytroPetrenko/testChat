export const state = () => ({
  msgs: {},
  typingUsers: []
});

export const actions = {
  SOCKET_newMessage({ commit, state }, msg) {
    if (!state.msgs.hasOwnProperty(msg.room)) {
      commit("createNewRoom", msg.room);
    }

    commit("add", msg);
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
    //const message = msg.msg;
    state.msgs[msg.room].push({ msg });
  },
  createNewRoom(state, room) {
    state.msgs = Object.assign({}, state.msgs, { [`${room}`]: [] });
  },
  addTypingUser(state, userName) {
    state.typingUsers.push(userName);
  },
  deleteTypingUser(state, userName) {
    state.typingUsers.splice(state.typingUsers.indexOf(userName), 1);
  }
};
