export const state = () => ({ users: [] });

export const actions = {};

export const mutations = {
  addNewUser(state, user) {
    state.users.push({ user });
  }
};
