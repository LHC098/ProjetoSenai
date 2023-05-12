//Este é o codigo de login,que dependendo do usuario o redireciona para um site especifico
     function Login() {
          var usuario = document.getElementById("usuario").value;
          var password = document.getElementById("password").value;
          
          if (usuario === "professor" && password === "senha1") {
            abrirPaginaProf();
          } else if (usuario === "aluno" && password === "senha2") {
            abrirPaginaAluno();
          } else if (usuario === "representante" && password === "senha3") {
            abrirPaginaRepre();
          } else {
            alert("Usuário ou senha incorretos");
          }
        }

      function abrirPaginaProf() {
        location.href = "professor.html"
      }
      function abrirPaginaRepre() {
        location.href = "representante.html"
      }

      function abrirPaginaAluno() {
        location.href = "aluno.html"
      }
//Esta Parte do Codigo faz a função de criar um botao de editar,excluir um post e adicionar um também,tanto para o post de professor tanto quanto o de representante
function editarPost(id) {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  var postIndex = posts.findIndex(function(post) {
    return post.id === id;
  });

  if (postIndex !== -1) {
    var post = posts[postIndex];
    var title = prompt("Editar título:", post.title);
    var content = prompt("Editar conteúdo:", post.content);
    var descricao = prompt("Editar descrição:", post.descricao);
    var dataentrega = prompt("Editar data de entrega:", post.dataentrega);
    var horario = prompt("Editar Horario",post.horario)

    if (title && content && descricao && dataentrega) {
      post.title = title;
      post.content = content;
      post.descricao = descricao;
      post.dataentrega = dataentrega;
      post.horario = horario;

      localStorage.setItem("posts", JSON.stringify(posts));

      var postDiv = document.getElementById(id);
      postDiv.innerHTML = "<h2>Matéria</h2>" + title + "<p><h2>Conteudo</h2>" + content + "</p><p><h2>Descrição</h2>" + descricao + "</p><p><h2>Data de Entrega</h2>" + dataentrega + "</p>" + "<p><h2>Horario</h2></p>" + horario;

      var buttonDiv = document.createElement("div");

      var deleteButton = document.createElement("button");
      deleteButton.innerText = "Excluir";
      deleteButton.id = id;
      deleteButton.addEventListener("click", function() {
        excluirPost(this.id);
      });
      buttonDiv.appendChild(deleteButton);

      var editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.id = id;
      editButton.addEventListener("click", function() {
        editarPost(this.id);
      });
      buttonDiv.appendChild(editButton);

      postDiv.appendChild(buttonDiv);
    }
  }
}

function excluirPost(id) {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter(function(post) {
    return post.id !== id;
  });
  localStorage.setItem("posts", JSON.stringify(posts));

  var postDiv = document.getElementById(id);
  postDiv.remove();
}

function adicionarPost() {
  var title = document.getElementById("materia").value;
  var content = document.getElementById("content").value;
  var descricao = document.getElementById("descricao").value;
  var dataentrega = document.getElementById("dataentrega").value;
  var horario = document.getElementById("hora").value;
  var postId = "post-" + Date.now();
  var post = document.createElement("div");
  post.id = postId;
  post.classList.add("post");
  post.innerHTML = "<h2>Matéria</h2>" + title + "<p><h2>Conteudo</h2>" + content + "</p><p><h2>Descrição</h2>" + descricao + "</p><p><h2>Data de Entrega</h2>" + dataentrega + "</p>" + "<p><h2>Horario</h2></p>" + horario;
  post.style.marginBottom = "20px";
  post.style.border = "2px solid " + getRandomColor();
  post.style.borderRadius = "10px";

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Excluir";
  deleteButton.id = postId;
  deleteButton.addEventListener("click", function() {
    excluirPost(this.id);
  });
  post.appendChild(deleteButton);

  var editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.id = postId;
  editButton.addEventListener("click", function() {
    editarPost(this.id);
  });
  post.appendChild(editButton);

  var conteudoDiv = document.getElementById("conteudo");
  conteudoDiv.appendChild(post);

  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push({ id: postId, title: title, content: content, descricao: descricao, dataentrega: dataentrega,horario: horario });
  localStorage.setItem("posts", JSON.stringify(posts));
}
//Esta parte do codigo recria todo o codigo novamente para que ao recarregar a pagina nao seja perdido
window.onload = function() {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  var conteudoDiv = document.getElementById("conteudo");
  conteudoDiv.innerHTML = "";

  for (var i = 0; i < posts.length; i++) {
    var post = document.createElement("div");
    post.id = posts[i].id;
    post.classList.add("post");
    post.innerHTML =
      "<h2>Matéria</h2>" +
      posts[i].title +
      "<p><h2>Conteudo</h2>" +
      posts[i].content +
      "</p><p><h2>Descrição</h2>" +
      posts[i].descricao +
      "</p><p><h2>Data de Entrega</h2>" +
      posts[i].dataentrega +
      "</p><p><h2>Horario</h2></p>" +
      posts[i].horario;
    post.style.marginBottom = "20px";
    post.style.border = "2px solid " + getRandomColor();
    post.style.borderRadius = "10px";

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Excluir";
    deleteButton.id = posts[i].id;
    deleteButton.addEventListener("click", function() {
      excluirPost(this.id);
    });
    post.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.id = posts[i].id;
    editButton.addEventListener("click", function() {
      editarPost(this.id);
    });
    post.appendChild(editButton);

    conteudoDiv.appendChild(post);
  }

  var postsRepre = JSON.parse(localStorage.getItem("postsRepre")) || [];

  for (var i = 0; i < postsRepre.length; i++) {
    var postRepre = document.createElement("div");
    postRepre.id = postsRepre[i].id;
    postRepre.classList.add("postRepre");
    postRepre.innerHTML =
      "<h2>Matéria</h2>" +
      postsRepre[i].title +
      "<p><h2>Conteudo</h2>" +
      postsRepre[i].content +
      "</p><p><h2>Descrição</h2>" +
      postsRepre[i].descricao +
      "</p><p><h2>Data de Entrega</h2>" +
      postsRepre[i].dataentrega +
      "</p>";
    postRepre.style.marginBottom = "20px";
    postRepre.style.border = "2px solid " + getRandomColor();
    postRepre.style.borderRadius = "10px";

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Excluir";
    deleteButton.id = postsRepre[i].id;
    deleteButton.addEventListener("click", function() {
      excluirPost(this.id);
    });
    postRepre.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerText = "Editar";
    editButton.id = postsRepre[i].id;
    editButton.addEventListener("click", function() {
      editarPostRepre(this.id);
    });
    postRepre.appendChild(editButton);

    conteudoDiv.appendChild(postRepre);
  }
};


function editarPostRepre(id) {
  var postsRepre = JSON.parse(localStorage.getItem("postsRepre")) || [];
  var postIndex = postsRepre.findIndex(function(postRepre) {
    return postRepre.id === id;
  });

  if (postIndex !== -1) {
    var postRepre = postsRepre[postIndex];
    var title = prompt("Editar título:", postRepre.title);
    var content = prompt("Editar conteúdo:", postRepre.content);
    var descricao = prompt("Editar descrição:", postRepre.descricao);
    var dataentrega = prompt("Editar data de entrega:", postRepre.dataentrega);

    if (title && content && descricao && dataentrega) {
      postRepre.title = title;
      postRepre.content = content;
      postRepre.descricao = descricao;
      postRepre.dataentrega = dataentrega;

      localStorage.setItem("postsRepre", JSON.stringify(postsRepre));

      var postRepreDiv = document.getElementById(id);
      postRepreDiv.innerHTML =
        "<h2>Matéria</h2>" +
        title +
        "<p><h2>Conteúdo</h2>" +
        content +
        "</p><p><h2>Descrição</h2>" +
        descricao +
        "</p><p><h2>Data de Entrega</h2>" +
        dataentrega +
        "</p>";

      var buttonDiv = document.createElement("div");

      var deleteButton = document.createElement("button");
      deleteButton.innerText = "Excluir";
      deleteButton.id = id;
      deleteButton.addEventListener("click", function() {
        excluirPost(this.id);
      });
      buttonDiv.appendChild(deleteButton);
      var editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.id = id;
      editButton.addEventListener("click", function() {
        editarPostRepre(this.id);
      });
      buttonDiv.appendChild(editButton);

      postRepreDiv.appendChild(buttonDiv);
    }
  }
}

function excluirPost(id) {
  var postsRepre = JSON.parse(localStorage.getItem("postsRepre")) || [];
  postsRepre = postsRepre.filter(function(postRepre) {
    return postRepre.id !== id;
  });
  localStorage.setItem("postsRepre", JSON.stringify(postsRepre));

  var postRepreDiv = document.getElementById(id);
  postRepreDiv.remove();
}
//essa função cria cores para ficar na borda de cada cor
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//essa função faz com que crie cores para o postRepre
function getRandomColor1() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
//e a função que ao abrir o menu,ele faça uma animação para que ele siga ou nao siga a borda do menu
function toggleMenu() {
  var conteudo = document.getElementById("conteudo");
  var formulario = document.getElementById("form-container")
  var habilitarMenu = document.getElementById("habilitarmenu");

  if (habilitarMenu.classList.contains("menu-aberto")) {
    conteudo.style.marginLeft = "0";
    formulario.style.marginLeft="0";
    habilitarMenu.classList.remove("menu-aberto");
  } else {
    conteudo.style.marginLeft = "250px";
    formulario.style.marginLeft= "250px";
    habilitarMenu.classList.add("menu-aberto");
  }
}
//ao clicar exibe a div conteudo
function exibirConteudo() {
  var conteudoDiv = document.getElementById("conteudo");
  
  if (conteudoDiv.classList.contains("hidden")) {
    conteudoDiv.classList.remove("hidden");
  } else {
    conteudoDiv.classList.add("hidden");
  }
}
//exibe a div de aidicionar uma tarefa ao ser cliclado
function exibirtarefa() {
  var conteudoDiv = document.getElementById("form-container");
  
  if (conteudoDiv.classList.contains("hidden1")) {
    conteudoDiv.classList.remove("hidden1");
  } else {
    conteudoDiv.classList.add("hidden1");
  }
}