import { createStore } from 'vuex';
import { Path } from 'src/composables';

interface State {
  pathRetrieved: Path[];
  allPosition: Path[];
}

export default createStore<State>({
  state: {
    pathRetrieved: [],
    allPosition: [],
  },
  mutations: {
    setPathRetrieved(state, pathRetrieved: Path[]) {
      state.pathRetrieved = pathRetrieved;
    },
    setAllPosition(state, allPosition: Path[]) {
      state.allPosition = allPosition;
    },
  },
  actions: {
    updatePathRetrieved({ commit }, pathRetrieved: Path[]) {
      commit('setPathRetrieved', pathRetrieved);
    },
    updateAllPosition({ commit }, allPosition: Path[]) {
      commit('setAllPosition', allPosition);
    },
  },
});