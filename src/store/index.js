import { createStore } from 'vuex'
import dataQuestions from '@/dataQuestions.json'

export default createStore({
  state: dataQuestions,
  
})