export const state = () => ({
  msgs: []
});

export const mutations = {
  add(state, text) {
    state.msgs.push({
      text
    });
  }
};
