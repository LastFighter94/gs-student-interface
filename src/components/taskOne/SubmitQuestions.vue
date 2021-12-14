<template>

  <div class="page">
    <p><button @click="submit" class="btnTaskOne">Click to submit</button></p>
      <router-link :to="{name: 'Home'}">Вернуться на главную</router-link>
  </div>
  
</template>

<script>

export default {

emits: ["totalend"],

data(){
    return{
        colorUndoneSecond: "#E3242B",
    }
  },

computed: {
    questions(){
      return this.$store.state.questions
    }
  },

methods: {

submit(){

      let answers = 0;
      let q = this.questions.filter(q => q);
      let notAllAnswers = document.querySelector('#notAllAnswers');
     
        for (let i=0; i < q.length; i++){

          if(q[i].selectedOption.length !== 0){answers++} // 

          // Если НИЧЕГО не выбрано - хотя бы раз
          if (q[i].selectedOption.length === 0) {
          
          // Окраска кнопочек с невыполненными вопросами
          let btnId = q[i].question_id + 'btn';
          let btnUndone = document.getElementById(btnId);
          btnUndone.style.backgroundColor = this.colorUndoneSecond;
          //

          notAllAnswers.style.display = "block";
          
          } 
        }

          // ЕСЛИ ВСЕ ВАРИАНТЫ ОТВЕТА ВЫБРАНЫ!
          if (answers===q.length){
            this.$emit('totalend')
          }

    },

  }

}
</script>

<style scoped>

</style>