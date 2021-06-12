export const state = () => ({ users: [] });

export const actions = {
  async addNewUser(ctx, user) {
    ctx.commit("addNewUser", user);
  }
};

export const mutations = {
  addNewUser(state, user) {
    state.users.push({ user });
  }
};
