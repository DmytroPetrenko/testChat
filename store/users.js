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
  }
};
