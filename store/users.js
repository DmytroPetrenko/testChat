export const state = () => ({ users: [], currentUser: "" });

export const getters = {
  getUserById: state => id => {
    const user = state.users.find(user => user.id === id);
    return user;
  }
};

export const actions = {
  async addNewUser(ctx, user) {
    ctx.commit("addNewUser", user);
  },
  async SOCKET_setAllUsers(ctx, users) {
    ctx.commit("setAllUsers", users);
  },
  async SOCKET_changeSocketId({ commit, state }, socketId) {
    const obj = { id: state.currentUser.id, socketId: socketId };
    setTimeout(() => {
      commit("changeSocketId", socketId);
      this._vm.$socket.emit("changeUserById", obj);
    }, 100);
  }
};

export const mutations = {
  addNewUser(state, user) {
    state.users.push({ user });
  },
  setAllUsers(state, users) {
    state.users = users;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  changeSocketId(state, socketId) {
    state.currentUser.socketId = socketId;
    /* let index = state.users.indexOf(user => user.id === state.currentUser.id);
    let user = state.users.find(user => user.id === state.currentUser.id);
    user.socketId = socketId;
    state.users.splice(index, 1, user); */
  }
};
