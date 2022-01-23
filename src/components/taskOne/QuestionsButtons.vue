<template>
<!-- Parent component - TaskOneBody -->

  <div id="tasks">
    
  <button class="knopka" 
  :style="question.selectedOption.length !== 0 ? {backgroundColor: this.$store.state.colorDone} : {backgroundColor: this.$store.state.colorUndoneFirst}" 
  v-for="question in questions" 
  :key="question.question_id" 
  @click="goTo(question.question_id)" 
  :id="question.question_id + 'btn'">
  
  </button>
  
  <p><SubmitQuestions @totalend="this.$emit('totalend')"/></p>

  <div id="warnNAA"><span id="notAllAnswers">Вы ответили не на все вопросы!</span></div>
  <!-- NAA - not all answers -->
  </div>
</template>

<script>
import SubmitQuestions from '@/components/taskOne/SubmitQuestions'

export default {
  emits: ["totalend"],
  components: {
    SubmitQuestions
  },
// Используем Vuex дабы не засорять TaskOneBody очередным props
  computed: {
    questions(){
      return this.$store.state.questions
    }
  },
  methods: {
// getBoundingClientRect(); - стандартная функция в JS - поддерживается всеми основными браузерами

// механизм работы описан в двух последующих строчках ниже:
// let test = element.getBoundingClientRect() дает возможность искать offset захваченного через 
// querySelector element через переменную test

// box - в этой переменной мы захватываем div id определенного компонента QuestionShow
// boxTasks - захватываем div c кнопками с номерами вопросов
// posTwo элементу "div с кнопками" возможность искать его offset через переменную posTwo, 
// getOffset(el) // функция, в которую мы вписываем динамическмй элемент, куда нужен "скролл"
// window - окно Dom, scrollTo, top, behavior - перевод буквально: top задан новым, полученным в результате фунции getOffSet(el) "топом"

    goTo(boxId){ 
      
      let box = document.getElementById(boxId); // динамический div QuestionShow

      let boxTasks = document.getElementById("tasks"); // див с кнопочками вопросов от 1 до n
      const posTwo = boxTasks.getBoundingClientRect(); // теперь можно искать offset boxTasks через posTwo

      function getOffset(el) {
        const pos = el.getBoundingClientRect();
        return {
          top: pos.top + window.scrollY - (posTwo.bottom - posTwo.top) - 10
          // путем небольшой заморочки и Google - вычислили следующий top
          // вдаваться в подробности поздно - разобраться можно и не сложно (по мере необходимости)
        };
      } 

      let top = getOffset(box).top; // наше вычисляемое динамическое значение к которому будет идти скролл

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    },
  }
}
</script>
