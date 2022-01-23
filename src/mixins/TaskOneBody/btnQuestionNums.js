export default {
  mounted(){
    // Не знаю почему, но без mounted - реализовать данную схему не получилось
    // Здесь мы делаем нумерацию кнопок и вопросов без привязки к question_id

    // нумерация без привязки к ID = кнопочки
        let q = this.questions.filter(q => q);
        for (let i=0; i < q.length; i++){
          let btnId = q[i].question_id + 'btn';
          // :id="question.question_id + 'btn'" - QuestionButtons - component code line
          let btn = document.getElementById(btnId);
          btn.innerHTML = i+1
        }

    // нумерация без привязки к ID = questions
        for (let i=0; i < q.length; i++){
          let qShowDiv = document.getElementById(q[i].question_id);
          qShowDiv.children[0].children[0].innerHTML = i+1
          // между двумя первыми <b> QuestionShow - идет вставка
        }
      }
}