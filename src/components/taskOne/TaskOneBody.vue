<template>

<QuestionsButtons/>

  <div :id="question.question_id" v-for="question in questions" :key="question.question_id">
<QuestionShow :id="question.question_id"/>
  </div>

<SubmitQuestions @totalend="end()"/>

<TimerFromStart @totalend="end()"/>

</template>

<script>

import QuestionShow from '@/components/taskOne/QuestionShow'
import SubmitQuestions from '@/components/taskOne/SubmitQuestions'
import QuestionsButtons from '@/components/taskOne/QuestionsButtons'
import TimerFromStart from '@/components/taskOne/TimerFromStart'

export default{

  components: {
    QuestionShow,
    SubmitQuestions,
    QuestionsButtons,
    TimerFromStart,
  },

  computed: {
    questions(){
      return this.shuffle(this.$store.state.questions)
      // возможно антипаттерн! 
    },

  },

  methods: {

    shuffle(array){
        let currentIndex = array.length;  
        let randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;

    },

    end(){

      // Закрытие отображения модального окна - если не закрыл пользователь (по истечению таймера - в данном случае)
      let modalAll = document.getElementById("modalAll");
      modalAll.style.display = "none";

      // Убираем предупреждение (если оно есть) "Вы ответили не на все вопросы"
      let notAllAnswers = document.querySelector('#notAllAnswers'); // Есть в submit() эта переменная
      notAllAnswers.style.display = "none";

      // Убираем время из локального хранилища
      localStorage.removeItem("initialTime");

      // Отправка данных (нужные данные в разделе Proxy - [Target])

      // 
      let q = this.questions.filter(q => q);
      // let q = this.randomQ.filter(q => q);
      // 

      console.log('ДАННЫЕ ОТПРАВЛЕНЫ!')
      console.log(q);

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
    },
    
  },

  mounted(){

// Не знаю почему, но без mounted - реализовать данную схему не получилось
// Здесь мы делаем нумерацию кнопок и вопросов без привязки к question_id
    let q = this.questions.filter(q => q);
    for (let i=0; i < q.length; i++){
      let btnId = q[i].question_id + 'btn';
      let btn = document.getElementById(btnId);
      btn.innerHTML = i+1
    }

    for (let i=0; i < q.length; i++){
      let qId = q[i].question_id;
      let qShowDiv = document.getElementById(qId);
      qShowDiv.children[0].children[0].innerHTML = i+1
    }

  },
}

</script>

<style scoped>

</style>