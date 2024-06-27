let cadastros = new Array();

function cadastraNovo(){ //será chamada por evento do botão cadnovo
    const formcad = document.getElementById("formcad");
    const formdata = new FormData(formcad);
    const formObj = Object.fromEntries(formdata);   //cria pares chave/valor para formObj
    console.log(formObj);

    cadastros.push(formObj);
    localStorage.setItem("cadastros",JSON.stringify(cadastros));            // <= novo
    preencheTabela();
}

function preencheTabela(){
    if(localStorage.hasOwnProperty("cadastros")){
        cadastros = JSON.parse(localStorage.getItem("cadastros"));          // <= novo
    }

    let index = 0;
    document.getElementById("tabela_cadastros").innerHTML = "";
    cadastros.forEach( function(cadastro){
        document.getElementById("tabela_cadastros").innerHTML += 
        `<tr>
            <td>${cadastro.nome}</td>
            <td>${cadastro.gen}</td>
            <td><button onclick="editaCadastro(${index})">✏️ Editar</button></td>
            <td><button onclick="descadastra(${index})">🗑️ Remover</button></td>
        </tr>`
        index++;
    })
}

function descadastra(index){
    cadastros.splice(index,1);
    localStorage.setItem("cadastros",JSON.stringify(cadastros));            // <= novo
    preencheTabela();
}

function editaCadastro(index){
    //Construa a lógica para editar cadastros aqui:
    //trazer do array cadastros[] para o formulário cadnovo os dados do cadastro escolhido.
    //use index para identificar cadastro a ler do array;
    for (let [campo, valor] of Object.entries( cadastros[index] )){
        if(document.getElementById(campo)) {    //se "campo" existe no HTML, atualize seu valor:
            document.getElementById(campo).value = valor;   //pena que nem sempre funciona;
            //como fazer para isso tratar corretamente o botão de rádio?
        }
    }
    //alterar botão crianovo para chamar função que atualiza cadastro.
    document.getElementById("cadnovo").style = "display:none";
    document.getElementById("atualiza").style = "display:inline";

    document.getElementById("atualiza").removeEventListener("click",atualizaCadastro)
    document.getElementById("atualiza").addEventListener("click",atualizaCadastro(index));
}
function atualizaCadastro(index){
    //parecida com cadastraNovo, mas salva "por cima" do cadastro selecionado por index
    //ler formData do formulário formcad, substituir em cadastros[index]
    //boa sorte com o que vai dar errado antes disso.
    cadastros[index] = formObj;
}

window.onload = function(){                                                 // <= novo
    preencheTabela();
}

document.getElementById("cadnovo").addEventListener("click", cadastraNovo);

