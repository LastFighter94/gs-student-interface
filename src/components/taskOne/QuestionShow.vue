<template>
<!-- Parent component - TaskOneBody -->

    <div class="questionBox">

<!-- Между первым <b></b> вставляется нумерация вопросов без привязки к div -->
<!-- Этот функционал доступен в mixins в файле btnQuestionsNums -->
   <b></b>
   <b>) {{question.question_text}}</b>

<div v-for="option in question.options" :key="option">
     <input v-if="question.question_type===1" type="radio" v-model="question.selectedOption" :value="option"> 
     <input v-if="question.question_type===3" type="checkbox" v-model="question.selectedOption" :value="option">
     {{option}}
</div>

<div v-if="question.question_type===2">
  <textarea v-model="question.selectedOption"></textarea>
</div>

<p v-if="question.selectedOption.length !== 0">Ваш ответ: {{ question.selectedOption }}</p>

</div>
</template>

<script>

export default{
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    question(){
      return this.$store.state.questions.find(question => question.question_id === this.id)
      // рендеринг компонента по заданному id - происходит здесь
      // отрисовка компонентов происходит в TaskOneBody благодаря v-for
    }
  },
}
</script>



