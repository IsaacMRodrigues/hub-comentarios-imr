import { CommentService} from "../services/comment.services.js";
import { Comment } from "../models/comment.model.js";

const getInputComment = () => {
  return {
    author: document.getElementById("inputAuthor"),
    comment: document.getElementById("inputComment"),
  };
};

const setInputComment = (authorValue, commentValue) => {
  const { author, comment } = getInputComment();
  author.value = authorValue;
  comment.value = commentValue;
};

const getInputCommentValue = () => {
  return {
    author: document.getElementById("inputAuthor").value,
    comment: document.getElementById("inputComment").value,
  };
};

const submitComment = (event) => {
  event.preventDefault();
  const comment = getInputCommentValue();

  //requisção Post para enviar o comment

  loadComment();
};

const loadComment = async () => {
    
  // Dados carregados da API
  CommentService.apiGetComment().then(result => {
    const comments = result.map(
        (comment) => new Comment(comment.id, comment.author, comment.comment_text, comment.created_at, comment.updated_at)
    );
    displayComment(comments)
}).catch(error => {
    console.error(error);
    alert(error);
})
};

const displayComment = (comments) => {
  const divFeed = document.getElementById("comment-feed");
  divFeed.innerHTML = ``;
  comments.forEach((item) => {
    const divDisplay = document.createElement("div");
    let data = new Date(item.getCreatedAt());
    divDisplay.className = "d-flex text-body-secondary pt-3";
    divDisplay.innerHTML = `
    <div class="cardzin">
    <div class="d-flex">
        <p class="pb-0 mb-0 small lh-sm" style="word-break: break-all;">
            <strong>@${item.getAuthor()}</strong>
            <i>${item.getCommentText()}</i>     
        </p>
        
    </div>
    <small class="d-block text-end">${data.toLocaleDateString()} às ${data.getHours()}:${data.getMinutes()}</small>
    </div>     
        `;
    divFeed.appendChild(divDisplay);
  });
};

const CommentComponent = {
  run: () => {
    const formComentario = document.getElementById("formComment");
    formComentario.addEventListener("submit", submitComment);
    window.onload = () => {
      loadComment();
    };
  },
};

export { CommentComponent };
