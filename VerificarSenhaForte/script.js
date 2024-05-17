// Seleciona o input de senha pelo seu id "passwordInput"
const passwordInput = document.querySelector("#passwordInput");

// Adiciona um ouvinte de eventos que é acionado sempre que o valor do input muda
passwordInput.addEventListener("input", function () {
  // Obtém o valor atual do campo de senha
  const password = this.value;

  // Seleciona o indicador de força da senha pelo seu id "password-strength-indicator"
  const strengthIndicator = document.querySelector("#password-strength-indicator");

  // Seleciona o elemento que mostrará o texto da força da senha pelo seu id "password-strength-text"
  const strengthText = document.querySelector("#password-strength-text");

  // Define os textos correspondentes aos níveis de força da senha
  const strengths = {
    0: "Muito fraca",
    1: "Fraca",
    2: "Moderada",
    3: "Forte",
    4: "Muito Forte",
  };

  // Inicializa a pontuação da senha
  let score = 0;

  // Verifica os requisitos da senha e incrementa a pontuação conforme os requisitos são atendidos
  if (password.length >= 8) score++;
  if (password.match(/[a-z]/)) score++;
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^a-zA-Z0-9]/)) score++;

  // Calcula a largura do indicador de força em porcentagem com base na pontuação
  //const width = (score / 4) * 100;
  const width = Math.min(score * 20, 100); // Garantir que a largura máxima é 100%

  // Define a largura do indicador de força
  strengthIndicator.style.width = `${width}%`;
  
  if (score >= 4) {
    strengthIndicator.style.backgroundColor = "#81C784"; // Verde para forte ou muito forte
  } else {
    
  // Define a cor do indicador de força com base na pontuação
  switch (score) {
    case 1:
      strengthIndicator.style.backgroundColor = "#e70b0b"; // Vermelho para fraca
      break;
    case 2:
      strengthIndicator.style.backgroundColor = "#FFB74D"; // Laranja para moderada
      break;
    case 3:
      strengthIndicator.style.backgroundColor = "#FFF176"; // Amarelo para forte
      break;
    case 4:
      strengthIndicator.style.backgroundColor = "#81C784"; // Verde para muito forte
      break;
    default:
      strengthIndicator.style.backgroundColor = "transparent"; // Transparente para muito fraca ou campo vazio
      break;
  }
}

  // Define o texto da força da senha
  if (password.length > 0 ) {
    strengthText.innerHTML = `Força: ${strengths[Math.min(score, 4)]}`;
  } else {
    strengthText.innerHTML = "";
  }
});
