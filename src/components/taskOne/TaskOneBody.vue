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

// mixins
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
      // возможно антипаттерн! касательно shuffle, который берется из mixins
      // берем функционал из mixins
    }
  },
  methods: {
    end(){ 
      this.isOver.push('yes it is');

      // let tasks = document.querySelector('#tasks');
      // tasks.style.display = "none"
      // рассмоментировав строчки выше - можно скрыть панельку NAV-BAR с вопросами после окончания теста

      // Закрытие отображения модального окна - если не закрыл пользователь (по истечению таймера - в данном случае)
      let modalAll = document.getElementById("modalAll");
      modalAll.style.display = "none";
      
  // NAV-BAR - оставлен
      // Убираем предупреждение (если оно есть) "Вы ответили не на все вопросы"
      let warnNAA = document.querySelector('#warnNAA'); // warn Not All Answers
      warnNAA.style.display = "none";

      // Убираем отображение "уверенного submit" если он есть
      // Оставляю возможность отображения в примечаниях для возможной анимации
      // let submitStateDiv = document.querySelector('#submitStateDiv');
      // submitStateDiv.style.display = "none";
  //

      // Убираем время из локального хранилища
      localStorage.removeItem("initialTime");
      localStorage.removeItem("over");

      // Отправка данных (нужные данные в разделе Proxy - [Target] - смотреть в консоле command + option + j)
      let q = this.questions.filter(q => q);
      console.log('ДАННЫЕ ОТПРАВЛЕНЫ!')
      console.log(q);
      // так тоже работает, но код наверху дает более чистый вывод + был бы невозможен функционал окраски кнопочек с невыполненными вопросами, который прописан ниже
      // console.log(this.questions)

    // NAV-BAR - оставлен
          // Окраска кнопочек с невыполненными вопросами
          // Именно по окончанию - такой функционал реализован в SubmitQuestions
          for (let i=0; i < q.length; i++){
            if (q[i].selectedOption.length === 0) {
              let btnId = q[i].question_id + 'btn';
              let btnUndone = document.getElementById(btnId);
              btnUndone.style.backgroundColor = this.$store.state.colorUndoneSecond;
            } 
          }
      //
    },
  }
}
</script>