export default {
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
      }
}