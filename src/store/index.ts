import { createStore } from 'vuex';
import { Path } from 'src/composables';

interface State {
  pathRetrieved: Path[];
}

export default createStore<State>({
  state: {
    pathRetrieved: [],
  },
  mutations: {
    setPathRetrieved(state, pathRetrieved: Path[]) {
      state.pathRetrieved = pathRetrieved;
    },
  },
  actions: {
    updatePathRetrieved({ commit }, pathRetrieved: Path[]) {
      commit('setPathRetrieved', pathRetrieved);
    },
  },
});