<template>
<!-- Parent component - QuestionButtons -->

    <button @click="submit" class="btnTaskOne">Отправить ответы</button>
    <!--  -->
    <div id="submitStateDiv"><p style="display:none" id="submitState">default submit state</p></div>
    <!--  -->
</template>

<script>
export default {

emits: ["totalend"],
// data(){
//     return{
//         colorUndoneSecond: "#E3242B"
//     }
//   },
computed: {
    questions(){
      return this.$store.state.questions
    }
  },
methods: {
  notConfident(){
    let submitState= document.querySelector('#submitState');
    submitState.innerHTML = "default submit state";
    // submitState.style.display = "none";
    // Для отображения состояния и возможной анимации
  },
  submit(){
      // Функционал уверенного submit
      let submitState = document.querySelector('#submitState');
      if (submitState.textContent !== "default submit state"){
            this.$emit('totalend')
      }
      submitState.innerHTML = "I AM CONFIDENT HERE MFUCKA!!!";
      // submitState.style.display = "block"; 
      // Для отображения состояния и возможной анимации
      setTimeout(()=>this.notConfident(),5000)
      // конец функционала уверенного submit

      let answers = 0;
      let q = this.questions.filter(q => q);
      // this.questions - находятся в родительском компоненте TaskOneBody - вложены во Vuex
      let notAllAnswers = document.querySelector('#notAllAnswers');
      // элемент находится в компоненте QuestionButtons
      
        for (let i=0; i < q.length; i++){

          if(q[i].selectedOption.length !== 0){answers++} 
          // Если пользователь делал выбор - инкрементируем answers

          // Если НИЧЕГО не выбрано - хотя бы раз
          if (q[i].selectedOption.length === 0) {
          
          // Окраска кнопочек с невыполненными вопросами
          let btnId = q[i].question_id + 'btn';
          let btnUndone = document.getElementById(btnId);
          btnUndone.style.backgroundColor = this.$store.state.colorUndoneSecond;
          //

          notAllAnswers.style.display = "block";
          // Отображаем "вы ответили не на все вопросы"
          // элемент находится в компоненте QuestionButtons
          } 
        }
          // ЕСЛИ ВСЕ ВАРИАНТЫ ОТВЕТА ВЫБРАНЫ!
          if (answers===q.length){
            this.$emit('totalend')
            // эмитим событие totalend в родительский компонент QuestionButtons
          }
    },
  }
}
</script>