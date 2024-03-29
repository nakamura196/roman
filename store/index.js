export const state = () => ({
  wordAttributes: {},
  entityAttributes: {},
  selectedFactoidIdOnText: '',
  selectedEntityIdOnText: '',
  selectedReferenceIdOnText: '',
  isRedraw: false,
  cyElements: [],
  clickedNodeIdOnNetwork: null,
})

export const mutations = {
  setWordAttributes(state, data) {
    state.wordAttributes = data
  },
  setEntityAttributes(state, data) {
    state.entityAttributes = data
  },
  setSelectedFactoidIdOnText(state, data) {
    state.selectedFactoidIdOnText = data
  },
  setSelectedEntityIdOnText(state, data) {
    state.selectedEntityIdOnText = data
  },
  setSelectedReferenceIdOnText(state, data) {
    state.selectedReferenceIdOnText = data
  },
  setIsRedraw(state, data) {
    state.isRedraw = data
  },
  setCyElements(state, data) {
    state.cyElements = data
  },
  setClickedNodeIdOnNetwork(state, data) {
    state.clickedNodeIdOnNetwork = data
  },
  
}

export const getters = {
  getWordAttributes(state) {
    return state.wordAttributes
  },
  getEntityAttributes(state) {
    return state.entityAttributes
  },
  getSelectedFactoidIdOnText(state) {
    return state.selectedFactoidIdOnText
  },
  getSelectedEntityIdOnText(state) {
    return state.selectedEntityIdOnText
  },
  getSelectedReferenceIdOnText(state) {
    return state.selectedReferenceIdOnText
  },
  getIsRedraw(state) {
    return state.isRedraw
  },
  getCyElements(state) {
    return state.cyElements
  },
  getClickedNodeIdOnNetwork(state) {
    return state.clickedNodeIdOnNetwork
  },
}
