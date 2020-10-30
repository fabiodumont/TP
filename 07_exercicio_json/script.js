const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('imagem')
const questionPergunta = document.getElementById('pergunta')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, pontuacao = 0

startButton.addEventListener('click', startGame) // adiciona evento ao botao start, se clicado chama a funcao startGame()
nextButton.addEventListener('click', () => { // adiciona evento ao botao next, se clicado soma um no indixe e chama a funcao nextQuestion()
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {            // Começa o quiz
  startButton.classList.add('hide') // desconde o botao de start do quiz
  shuffledQuestions = questoes.sort(() => Math.random() - .5) // sorteia a questao
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion() // chama a funcao para a proxima questao
}

function setNextQuestion() {
  resetState() // reseta a questao, tirando as respostas da questao anterior
  showQuestion(shuffledQuestions[currentQuestionIndex]) // exibe a questao e a imagem com o indice sorteado 
}

function showQuestion(question) { 
  questionPergunta.innerText = question.question // exibe a pergunta da cidade atual
  document.getElementById('pontuacao').innerText = "Acertos até agora: " + pontuacao + "/12" // mostra a pontuacao atual da pessoa 
  questionElement.innerHTML = "<img src=" + question.link + " height=" + "600px" + " width=" + "1180px>"; // exibe a imagem da cidade da pergunta
  question.answers.forEach(answer => { 
    const button = document.createElement('button')
    button.innerText = answer.text // seta o texto para cada botao de resposta
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct // verifica se a resposta do botao é a certa para comparar depois
    }
    button.addEventListener('click', selectAnswer) // recebe o evento de clicar e o botao de resposta clicado
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {  // recebe o botao selecionado como resposta
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct) // seta a classe para o botao dependendo se for certo ou nao certo
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct) // seta classe para todos os botoes se for certo ou nao certo tb
  })
  if (correct) { // verifica se a resposta foi correta, se sim amumenta a pontuacao
    pontuacao++
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) { // verifica se chegou no final do quiz
    nextButton.classList.remove('hide')
  } else { // chegou no final, zera tudo e restarta
    pontuacao = 0;
    startButton.innerText = 'Restart'
    startButton.classList.add('restart-btn')
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) { // seta a classe para o botao, como certo ou nao certo
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
