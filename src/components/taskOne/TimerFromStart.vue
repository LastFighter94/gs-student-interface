<template>
  
<ModalWindow/>

</template>

<script>

import ModalWindow from '@/components/taskOne/ModalWindow'

export default {

  components: {
    ModalWindow
  },

  emits: ["totalend"],

  mounted(){
    this.warnings()
  },

  computed: {
    timeout(){
      return this.$store.state.timeout
    }
  },

  methods: {
    warnings(){
      // эти селекторы в компоненте ModalWindow
      let modal = document.getElementById("my_modal");
      let modaltext = document.getElementById("modaltext");
      
      function showWarn(text){
        // Отображаем модальное окно и текст, который задан внизу в setTimeOut
        modal.style.display = "block";
        modaltext.innerHTML = text;

        window.onclick = function (event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
          }
        }

      let initialTime = localStorage.getItem("initialTime");
      let executionTime;

      if (initialTime === null) {
            localStorage.setItem("initialTime", (new Date()).getTime());
            executionTime = this.timeout;
      } else {
            executionTime = parseInt(initialTime, 10) + this.timeout - (new Date()).getTime();
            if (executionTime < 0) executionTime = 0;
      } 

          // если вместо "-" ставить деление или умножение - работаем некорректно почему-то
          setTimeout(()=>this.$emit('totalend'), executionTime) // конец 
          setTimeout(()=>showWarn('Осталось меньше чем половина времени!'), executionTime-10000) // 10 прошло (10 осталось)
          setTimeout(()=>showWarn('Осталось пять секунд'), executionTime-5000) // 15 секунд прошло (5 осталось)

    }
  }

}

</script>

<style scoped>

</style>