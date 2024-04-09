import { defineStore } from 'pinia'

export const useMyCocomoStore = defineStore({
  id: 'myCocomoStore',
  state: () => ({
    baseObj: '30',
    reuse: '0.0',
    prod: '7',
    wage: '100000',
    rcpx: '1.0',
    ruse: '1.0',
    pers: '1.0',
    pdif: '1.0',
    prex: '1.0',
    fcil: '1.0',
    sced: '1.0',
    dataTrans: '5',
    distribDev: '5',
    performance: '3',
    opReq: '2',
    opIO: '4',
    transFreq: '3',
    endUserEfficiency: '1',
    opUpdate: '4',
    procDif: '4',
    reusability: '0',
    instEase: '1',
    useEase: '2',
    crossPlat: '2',
    easeEdit: '2',
    prec: '3.72',
    flex: '3.04',
    resl: '4.24',
    team: '3.29',
    pmat: '4.68',
    languages: [
      {
        lang: 'Java',
        code: 60
      },
      {
        lang: 'SQL',
        code: 30
      },
      {
        lang: 'C',
        code: 10
      }
    ],
    ei: {
      easy: 3,
      mid: 1,
      high: 0
    },
    eo: {
      easy: 4,
      mid: 0,
      high: 0
    },
    eq: {
      easy: 1,
      mid: 0,
      high: 0
    },
    ilf: {
      easy: 3,
      mid: 0,
      high: 0
    },
    eif: {
      easy: 0,
      mid: 0,
      high: 0
    },
    fpToKLoC: {
      'Assembler': 320,
      'C': 128,
      'COBOL': 106,
      'Fortran': 105,
      'Pascal': 91,
      'C++': 64,
      'C#': 53,
      'Java': 53,
      'Ada95': 49,
      'Visual Basic': 32,
      'Visual C++': 34,
      'Delphi 5': 18,
      'Perl': 21,
      'Prolog': 64,
      'SQL': 13,
      'Lisp': 64
    } as {[key: string]: number},
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
    },

    params(state) {
      return +state.dataTrans +
            +state.distribDev +
            +state.performance +
            +state.opReq +
            +state.opIO +
            +state.transFreq +
            +state.endUserEfficiency +
            +state.opUpdate +
            +state.procDif +
            +state.reusability +
            +state.instEase +
            +state.useEase +
            +state.crossPlat +
            +state.easeEdit
    },

    earch(state) {
      return +state.pers * +state.rcpx * +state.ruse * +state.pdif * +state.prex * +state.fcil * +state.sced
    }
  }
})
