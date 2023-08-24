const html = document.querySelector('html')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoDescansoCurto = document.querySelector('.app__card-button--curto')
const botaoDescansoLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const botaoMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPausar = new Audio('./sons/pause.mp3')
const audioIniciar = new Audio('./sons/play.wav')
const audioFinalizar = new Audio('./sons/beep.mp3')
const botaoComecar = document.querySelector('#start-pause')
const spanComecarPausar = document.querySelector('#start-pause > span')
const iconeComecarPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.querySelector('#timer')

let temporizador = 1500
let intervaloId = null

musica.loop = true

botaoMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }
    else {
        musica.pause()
    }
})

botaoFoco.addEventListener('click', ()=> {
    temporizador = 1500
    alterarContexto('foco')

    botaoFoco.classList.add('active')
})

botaoDescansoCurto.addEventListener('click', () => {
    temporizador = 300
    alterarContexto('descanso-curto')
    botaoDescansoCurto.classList.add('active')
} )

botaoDescansoLongo.addEventListener('click', () => {
    temporizador = 900
    alterarContexto('descanso-longo')
    botaoDescansoLongo.classList.add('active')
    
} )

function alterarContexto(contexto){
    mostrarTempo()
    limpaFocoBotoes()
    mudaTema(contexto)
    mudaBanner(contexto)
    mudaTitulo(contexto)
}

function limpaFocoBotoes(){
    botoes.forEach( contexto => {
        contexto.classList.remove('active')
    } )
}

function mudaTema(contexto){
    html.setAttribute('data-contexto',contexto)
}

function mudaBanner(contexto){
    banner.setAttribute('src',`/imagens/${contexto}.png`)
}

function mudaTitulo(contexto){
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (temporizador <= 0){
        audioFinalizar.play()
        // alert('Tempo finalizado!')
        zerarTemporizador()
        return
    }
    temporizador -= 1
    mostrarTempo()
    
}

botaoComecar.addEventListener('click', iniciarOuPausarTemporizador)

function iniciarOuPausarTemporizador(){

    if(intervaloId){
        audioPausar.play()
        zerarTemporizador()
        return
    }
    audioIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    spanComecarPausar.textContent = "Pausar"
    iconeComecarPausar.setAttribute('src','/imagens/pause.png')
}

function zerarTemporizador(){
    clearInterval(intervaloId)
    spanComecarPausar.textContent = "Começar"
    iconeComecarPausar.setAttribute('src','/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(temporizador * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' })
    
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()