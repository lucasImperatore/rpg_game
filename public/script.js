async function carregaDados(){
    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    let url = `http://localhost:3000/characters`
    let forca = document.getElementById("for");
    let dex = document.getElementById("dex");
    let con = document.getElementById("con");
    let car = document.getElementById("car");
    let sab = document.getElementById("sab");
    let int = document.getElementById("int");
    let classe = document.getElementById("Classe");
    

    

 await   fetch(url)
.then((Response)=>{
    
    return Response.json();
})
.then((data) =>{

      for(let i = 0; i < data.length; i++){

        if(data[i].classe.toLowerCase() == pesquisa){
        
          classe.innerHTML =  `CLASSE: ${data[i].classe}`
          forca.innerHTML = `FOR: ${data[i].forca}`
          dex.innerHTML = `DEX: ${data[i].destreza}`
          con.innerHTML = `CON: ${data[i].constituicao}`
          car.innerHTML = `CAR: ${data[i].carisma}`
          sab.innerHTML = `SAB: ${data[i].sabedoria}`
          int.innerHTML = `INT: ${data[i].inteligencia}`
    }else{
      // alert("sua pesquisa nao foi encontrada")
    }
      }
   
})
}

async function deletar() {
  let deleta = document.getElementById("classDelete").value.toLowerCase();

  const response = await fetch(`http://localhost:3000/characters/${deleta}`, {
    method: "DELETE",
  });

  const result = await response.json();
  alert(result.message)};

// Função para enviar novo usuário
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const classe = document.getElementById("classe").value;
  const inteligencia = document.getElementById("inteligencia").value;
  const carisma = document.getElementById("carisma").value;
  const constituicao = document.getElementById("constituição").value;
  const forca = document.getElementById("força").value;
  const destreza = document.getElementById("destreza").value;
  const sabedoria = document.getElementById("sabedoria").value;

  if(classe !==""){

  await fetch("/characters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ classe, inteligencia, carisma, constituicao, forca, destreza, sabedoria }),
    // alert ("classe adicionada") // manda o objeto js para o banco como json
  })}else{

  }

  form.reset(); // limpa os campos com a função nativa para tags form
  carregaDados(); // atualiza lista
});

// Carrega ao abrir a página
carregaDados();