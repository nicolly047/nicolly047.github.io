const pwd = document.getElementById("password");
const pwd2 = document.getElementById("confirm-password");
const idade = document.getElementById("age");
const idadeHTML = document.getElementById("age-display");

const dataEvento = document.getElementById("date");
const diasDisplay = document.getElementById("days-display");

const cpf = document.getElementById("cpf");

function validate(item){
    item.setCustomValidity(""); // Limpa erros anteriores de validação
    item.checkValidity();
    if(item === pwd2){
        if(item.value === pwd.value){
            item.setCustomValidity("");
        } else {
            item.setCustomValidity("As senhas não coincidem");
        }
    }
    if (item === cpf){
        let numCPF = cpf.value.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
        if( validateCPF(numCPF) ){
            item.setCustomValidity(""); // Aprovado
        } else {
            item.setCustomValidity("CPF inválido");
        }
    }
    if (item === idade){
        let hoje = new Date(); // Obtém data atual 
        let dnasc = new Date(idade.value);
        let idadeUsuario = hoje.getFullYear() - dnasc.getFullYear();
        let m = hoje.getMonth() - dnasc.getMonth();
        if(m < 0 || (m === 0 && hoje.getDate() < dnasc.getDate())){
            idadeUsuario--;
        }
        if(idadeUsuario >= 18 && idadeUsuario <= 130) {
            idadeHTML.textContent = idadeUsuario + " anos";
            item.setCustomValidity("");
        } else if (idadeUsuario < 18) {
            item.setCustomValidity("Você precisa ser maior de 18 anos para cadastrar-se.");
        } else {
            item.setCustomValidity("Você não deve mentir sua idade tão descaradamente ao se cadastrar.");
        }
    } 
    if (item === dataEvento) {
        let hoje = new Date(); // Obtém data atual
        let dataSelecionada = new Date(dataEvento.value);
        let diferenca = Math.floor((dataSelecionada - hoje) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias

        if (diferenca < 1) {
            item.setCustomValidity("A data do evento deve ser pelo menos um dia após a data atual");
        } else if (diferenca > 365 * 50) { // 50 anos no futuro
            item.setCustomValidity("O evento deve ser em até 50 anos a partir de hoje");
        } else {
            item.setCustomValidity("");
        }

        // Exibe a diferença em dias
        diasDisplay.textContent = diferenca + " dias";
    }
}

function validateCPF(cpf){
    var number, digits, sum, i, result, equal_digits;
    equal_digits = 1;
    if (cpf.length < 11)
      return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        equal_digits = 0;
        break;
      }
    if (!equal_digits) {
      number = cpf.substring(0, 9);
      digits = cpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--)
        sum += number.charAt(10 - i) * i;
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(0))
        return false;
      number = cpf.substring(0, 10);
      sum = 0;
      for (i = 11; i > 1; i--)
        sum += number.charAt(11 - i) * i;
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(1))
        return false;
      return true;
    }
    else
      return false;     
}

function maskCPF(){
    let strCPF = cpf.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    strCPF = strCPF.slice(0, 11); // Limita o CPF a 11 caracteres
    strCPF = strCPF.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"); // Aplica a formatação do CPF
    cpf.value = strCPF;

    validate(cpf);
}

cpf.addEventListener("input", maskCPF);
pwd.addEventListener("input", () => validate(pwd));
pwd2.addEventListener("input", () => validate(pwd2));
idade.addEventListener("input", () => validate(idade));
dataEvento.addEventListener("input", () => validate(dataEvento));

pwd.addEventListener("invalid", function msgPwd(){
    pwd.setCustomValidity("");
    pwd.checkValidity();
    if (pwd.value === ""){
        pwd.setCustomValidity("A senha não pode ficar em branco");
    } else {
        pwd.setCustomValidity("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número");
    }
});

// Adiciona uma caixa de alerta ao enviar o formulário
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    alert("O código foi enviado!"); // Exibe o alerta
});