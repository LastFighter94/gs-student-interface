import { createStore } from 'vuex'
import dataQuestions from '@/dataQuestions.json'

export default createStore({
  state: {
    ...dataQuestions,
    // окраска кнопочек в NAV-BAR в зависимости от функционала
    colorUndoneFirst: "#9A9A9A",
    colorUndoneSecond: "#E3242B",
    colorDone: "#00FF80"
    // можно добавить столько свойств, сколько хочешь,
    // state будет равен dataQuestions, а остальные будут задаваться
  },
})