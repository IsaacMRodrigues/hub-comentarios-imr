import { CommentService } from "../services/comment.services.js";
import { Comment } from "../models/comment.model.js";

const getInputComment = () => {
  return {
    author: document.getElementById("inputAuthor"),
    comment_text: document.getElementById("comment_text"),
    idUser: document.getElementById("idUser"),
  };
};

// const setInputComment = (authorValue, commentValue) => {
//   const { author, comment } = getInputComment();
//   author.value = authorValue;
//   comment.value = commentValue;
// };

// const getInputCommentValue = () => {
//   return {
//     author: document.getElementById("inputAuthor").value,
//     comment: document.getElementById("inputComment").value,
//   };
// };

// const submitComment = (event) => {
//   event.preventDefault();
//   handleComment();

//   //requisção Post para enviar o comment

//   loadComment();
// };

const handleComment = (event) => {
  event.preventDefault();
  const { author, comment_text, idUser } = getInputComment();
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const comentario = new Comment(
    null,
    author.value,
    comment_text.value,
    created_at,
    updated_at,
    idUser.value
  );

  CommentService.apiSetComment(comentario);

  loadComment();
};
let comentarios;
const loadComment = async () => {
  // Dados carregados da API
  CommentService.apiGetComment()
    .then((result) => {
      const comments = result.map(
        (comment) =>
          new Comment(
            comment.id,
            comment.author,
            comment.comment_text,
            comment.created_at,
            comment.updated_at,
            comment.idUser
          )
      );
      displayComment(comments);
      comentarios = comments;
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
};

const displayComment = (comments) => {
  const divFeed = document.getElementById("comment-feed");
  divFeed.innerHTML = ``;
  comments.forEach((item) => {
    const divDisplay = document.createElement("div");
    let data = new Date(item.getCreatedAt());
    divDisplay.className = "d-flex text-body-secondary pt-3";
    divDisplay.innerHTML = `
    <div class="cardzin" id="scroll">
    <div class="d-flex">
        <p class="pb-0 mb-0 small lh-sm" style="word-break: break-all;">
        <a class="author" data-id="${item.idUser}">@${
      item.author.split(" ")[0]
    }</a>
            <i>${item.getCommentText()}</i>     
        </p>
    </div>
    <small class="d-block text-end">${data.toLocaleDateString()} às ${data.getHours()}:${data.getMinutes()}</small>
    </div>     
        `;
    divFeed.appendChild(divDisplay);
    document.querySelectorAll(".author").forEach((authorLink) => {
      const userId = authorLink.getAttribute("data-id");
      authorLink.addEventListener("click", () => listarComentarios(userId));
    });
  });
};

function listarComentarios(idUser) {
  const commentuser = document.getElementById("feeduser");

  if (commentuser.classList.contains("disabled")) {
    commentuser.classList.remove("disabled");
  }
  const divFeed2 = document.getElementById("comment-user");
  divFeed2.innerHTML = ``;
  comentarios.forEach((item) => {
    if (item.getIdUser() == idUser) {
      const divDisplay2 = document.createElement("div");
      let data = new Date(item.getCreatedAt());
      divDisplay2.className = "d-flex text-body-secondary pt-3";
      divDisplay2.innerHTML = `
    <div class="cardzin" id="scroll">
    <div class="d-flex">
        <p class="pb-0 mb-0 small lh-sm" style="word-break: break-all;">
        <a class="author" id="${item.idUser}">@${item.author.split(" ")[0]}</a>
            <i>${item.getCommentText()}</i>     
        </p>
    </div>
    <small class="d-block text-end">${data.toLocaleDateString()} às ${data.getHours()}:${data.getMinutes()}</small>
    </div>     
        `;
      divFeed2.appendChild(divDisplay2);
    }
  });
}

const CommentComponent = {
  run: () => {
    const formComentario = document.getElementById("formComment");
    formComentario.addEventListener("submit", handleComment);
    window.onload = () => {
      loadComment();
    };
  },
};

export { CommentComponent };
