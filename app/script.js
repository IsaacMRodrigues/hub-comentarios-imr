let data = []

const submitComment = (event) => {
    event.preventDefault();

    const author = inputAuthor.value;
    const comment = inputComment.value;
    const dat = new Date();

    data.push({ author: author, comment: comment, dat: dat })
    console.log(data)

    loadComment()
}

const formComentario = document.getElementById('formComment')
formComentario.addEventListener("submit", submitComment)

const loadComment = () => {
    // Dados carregados da API
    if (data) {
        displayComment();
    }
}

const displayComment = () => {
    const divFeed = document.getElementById('comment-feed');
    divFeed.innerHTML = ``
    data.forEach(item => {
        const divDisplay = document.createElement('div');
        divDisplay.className = 'comentarios'
        divDisplay.innerHTML = `
        <div class="cardzin">
        <div class="d-flex">
            <p class="pb-0 mb-0 small lh-sm border-bottom">
                <strong class="d-block">@${item.author}</strong>
                ${item.comment}     
            </p>
            
        </div>
        <small class="d-block text-end">${item.dat.toLocaleDateString()} as ${item.dat.getHours()}:${item.dat.getMinutes()}</small>
        </div>
        `
        divFeed.appendChild(divDisplay);
    })
}