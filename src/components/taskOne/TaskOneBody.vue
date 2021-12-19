<template>
<QuestionsButtons @totalend="end()"/>
  <div :id="question.question_id" v-for="question in questions" :key="question.question_id">
<QuestionShow :id="question.question_id"/>
  </div>
<TimerFromStart :disabled="isOver" @totalend="end()"/>
</template>

<script>
import QuestionShow from '@/components/taskOne/QuestionShow'
import QuestionsButtons from '@/components/taskOne/QuestionsButtons'
import TimerFromStart from '@/components/taskOne/TimerFromStart'
// 
import shuffle from '@/mixins/TaskOneBody/shuffle.js'
import btnQuestionNums from '@/mixins/TaskOneBody/btnQuestionNums.js'

export default{
  mixins: [shuffle, btnQuestionNums],
  data(){
    return {
      isOver: []
    }
  },
  components: {
    QuestionShow,
    QuestionsButtons,
    TimerFromStart
  },
  computed: {
    questions(){
      return this.shuffle(this.$store.state.questions)
      // возможно антипаттерн! 
      // берем функционал из mixins
    }
  },
  methods: {
    end(){ 
      this.isOver.push('yes it is');

      // let tasks = document.querySelector('#tasks');
      // tasks.style.display = "none"

      // Закрытие отображения модального окна - если не закрыл пользователь (по истечению таймера - в данном случае)
      let modalAll = document.getElementById("modalAll");
      modalAll.style.display = "none";
      
  // NAV-BAR - оставлен
      // Убираем предупреждение (если оно есть) "Вы ответили не на все вопросы"
      let warnNAA = document.querySelector('#warnNAA'); // warn Not All Answers
      warnNAA.style.display = "none";

      // Убираем отображение "уверенного submit" если он есть
      // let submitStateDiv = document.querySelector('#submitStateDiv');
      // submitStateDiv.style.display = "none";
  //

      // Убираем время из локального хранилища
      localStorage.removeItem("initialTime");
      localStorage.removeItem("over");

      // Отправка данных (нужные данные в разделе Proxy - [Target])
      let q = this.questions.filter(q => q);
      console.log('ДАННЫЕ ОТПРАВЛЕНЫ!')
      console.log(q);

    // NAV-BAR - оставлен
          // Окраска кнопочек с невыполненными вопросами
          // Именно по окончанию - такой функционал реализован в SubmitQuestions
          for (let i=0; i < q.length; i++){
            if (q[i].selectedOption.length === 0) {
              let btnId = q[i].question_id + 'btn';
              let btnUndone = document.getElementById(btnId);
              btnUndone.style.backgroundColor = "#E3242B";
              // colorUndoneSecond из SubmitQuestions
            } 
          }
      //
    },
  }
}
</script>