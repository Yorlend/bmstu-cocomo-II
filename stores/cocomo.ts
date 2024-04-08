import { defineStore } from 'pinia'

export const useMyCocomoStore = defineStore({
  id: 'myCocomoStore',
  state: () => ({
    baseObj: '30',
    reuse: '0.0',
    prod: '7',
    wage: '100000'
  }),
  getters: {
    nop(state) {
      return Math.ceil(+state.baseObj * ((100 - +state.reuse) / 100))
    },

    labor(state) {
      return (+state.baseObj * ((100 - +state.reuse) / 100)) / +state.prod
    },

    time(state) {
      return 3 * Math.pow((+state.baseObj * ((100 - +state.reuse) / 100)) / +state.prod, 0.33 + 0.2 * (1 - 1.01))
    }
  }
})
