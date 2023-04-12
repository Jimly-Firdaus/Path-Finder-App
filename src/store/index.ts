import { createStore } from 'vuex';
import { Path } from 'src/composables';

interface State {
  pathRetrieved: Path[];
  allPosition: Path[];
  pathInString: string;
}

export default createStore<State>({
  state: {
    pathRetrieved: [],
    allPosition: [],
    pathInString: "",
  },
  mutations: {
    setPathRetrieved(state, pathRetrieved: Path[]) {
      state.pathRetrieved = pathRetrieved;
    },
    setAllPosition(state, allPosition: Path[]) {
      state.allPosition = allPosition;
    },
    setPathInString(state, pathInString: string) {
      state.pathInString = pathInString;
    }
  },
  actions: {
    updatePathRetrieved({ commit }, pathRetrieved: Path[]) {
      commit('setPathRetrieved', pathRetrieved);
    },
    updateAllPosition({ commit }, allPosition: Path[]) {
      commit('setAllPosition', allPosition);
    },
    updatePathInString({ commit }, pathInString: string) {
      commit('setPathInString', pathInString);
    },
  },
});