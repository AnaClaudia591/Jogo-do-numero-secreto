let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (!campo) {
        console.error(`Elemento não encontrado para o seletor: ${tag}`);
        return;
    }
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        try {
            window.speechSynthesis.cancel();
            let utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.2;
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Erro ao tentar usar a síntese de voz:', error);
        }
    }
}

function exibirMensageminicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensageminicial();

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
        return;
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
    }
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;

    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    if (chute) chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensageminicial();
}