function limpar() { //limpar o formulário
    var opcao = confirm("Deseja limpar a tela?")
    if(opcao == true){
        document.form04.reset();
    }    
}

function verificaNome(){// verificar o nome
    var vnome = document.form04.nome.value;
    
    if(vnome.length < 4){
        document.form04.nome.value = "";
        alert("O nome deve conter mais de 3 letras");
        return false;

    }
    else{
        document.form04.nome.value = document.form04.nome.value.toUpperCase();
    }
    
}


function verificaEstado(){ // verificar o estado civil
   if(document.form04.estado_civil.value == "") {
       document.getElementById("estado_civil_erro").innerHTML = "Selecione um estado civil válido!";
       document.getElementById("estado_civil_erro").style.color = "red";
   }
   else{
    document.getElementById("estado_civil_erro").innerHTML = "";
   }
}

function converteObjetivo(){// converte as letras do campo objetivo para minúsculas
    if(document.form04.objetivo.value != ""){
        document.form04.objetivo.value = document.form04.objetivo.value.toLowerCase();
    }
}

function confirmaTelefoneEmail(){// verifica se o campo email, ou telefone foi preenchido
    if ((document.form04.telefone.value == "") && (document.form04.email.value == "")){
        alert("Informe seu telefone e/ou email por favor!");
    }
}

function selecionaNivel(){//verifica se um nivel de idioma foi selecionado
   var ingles = document.form04.idiomaIngles.value;
   var espanhol = document.form04.idiomaEspanhol.value;

   if((ingles == "") || (ingles == "Nível") || (espanhol == "") || (espanhol == "Nível")){
        alert("Insira um nível para cada idioma, por favor!");
        return false;
   }
   else{
       return true;
   }

}

function lingProg(){// verifica se alguma lingua de programação foi selecionada
    var opcoes = document.getElementsByName("conhecimento");
    var controle = 0;
    for(var i = 0;i<opcoes.length;i++){
        if(opcoes[i].checked == true){
            break;
        }
        else{
            controle++;
        }
    }
    if(controle == opcoes.length){
        var opcao = confirm("Deseja enviar o formulário sem selecionar linguagens de programação?");
        if (opcao == true ) {
            return true;
        }
        else{
            return false;
        }
    }

}


function enviar(){//checa todos os requisitos e envia o formulario
    verificaNome();
    verificaEstado();
    converteObjetivo();
    confirmaTelefoneEmail();
    selecionaNivel();
    lingProg();
}