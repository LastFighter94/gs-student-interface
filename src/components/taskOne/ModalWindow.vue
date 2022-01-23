<template>
<!-- Parent component - TimerFromStart -->

  <div id="modalAll">
    <div id="my_modal" class="modal">
      <div class="modal_content">
        <span @click="closeWindow" class="close_modal_window">×</span>
        <span class="warn">НАПОМИНАЕМ:</span><p id="modaltext"></p>
        <!-- текст "ниже НАПОМИНАЕМ" находится в компоненте TimerFromStart-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    closeWindow(){
        let modal = document.getElementById("my_modal");
        modal.style.display = "none";
            // На случай отключения прокрутки (добавляем эти опции в showWarn() TimerFromStart, end() TaskOneBody)
            // Единственный возможный косяк в этом случае - после отправки всех вариантов ответа, модальное окно будет отображаться невидимым - но будет отключать функции прокрутки - как вариант - можно включить прокрутку в end() компонента TaskOneBody
            // document.body.style.overflow = 'hidden'; - отключаем прокрутку
            // document.body.style.overflow = 'visible'; - даем доступ к прокрутке
    }
  }
}
</script>