<template>
<ModalWindow/>
</template>

<script>
import ModalWindow from '@/components/taskOne/ModalWindow'

export default {
  data(){
    return{
      doneAllready: this.disabled,
      endTimeout: null
    }
  },
  props:{
    disabled: {
      type: Array
    }
  },
  components: {
    ModalWindow
  },
  emits: ["totalend"],
  mounted(){
    this.warnings()
    this.sendToBackEnd()
  },
  computed: {
    stop(){
      let initialTime = localStorage.getItem("initialTime");
      let executionTime;

      if (initialTime === null) {
            localStorage.setItem("initialTime", (new Date()).getTime());
            executionTime = this.$store.state.timeout;
      } else {
            executionTime = parseInt(initialTime, 10) + this.$store.state.timeout - (new Date()).getTime();
            if (executionTime < 0) {
            executionTime = 0;
            }
      } 

      localStorage.setItem("over", executionTime);
      let over = localStorage.getItem("over")

      return over
    }
  },
  methods: {
    showWarn(text){
        // эти селекторы в компоненте ModalWindow
        let modal = document.getElementById("my_modal");
        let modaltext = document.getElementById("modaltext");
        
        // Отображаем модальное окно и текст, который задан внизу в setTimeOut
        modal.style.display = "block";
        modaltext.innerHTML = text;

        window.onclick = function (event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
          }
        },
    warnings(){
          setTimeout(()=>this.showWarn('Осталось меньше чем половина времени!'), this.stop-10000) // 10 прошло (10 осталось)
          setTimeout(()=>this.showWarn('Осталось пять секунд'), this.stop-5000) // 15 секунд прошло (5 осталось)
    },
    sendToBackEnd(){
          this.endTimeout = setTimeout(()=>this.$emit('totalend'), this.stop) // конец (по окончании заданного timeout)
    },
    clearSendToBackEnd(){
      clearTimeout(this.endTimeout)
      // этот метод отрабатывает при преждевременном submit (confident submit || all answers before timeout)
    }
    },
    // Здесь мы ловим изменения doneAllready (привязываем props disabled из родительского компонента = даем ему тип массив, потом, логически, при функции end() наполняем массив isOver строчкой string = yes it is; не получается отловить props напрямую, поэтому выводим его в дату и через watch отлавливаем изменение - чтобы сразу очистить таймаут)
    watch: {
      doneAllready: {
        handler(){
          this.clearSendToBackEnd()
        },
        deep: true
      }
    }
}
</script>