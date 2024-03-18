class Comment {
  constructor(id, author, comment_text, created_at, updated_at) {
   
      this.id = id;
      this.author = author;
      this.comment_text = comment_text;
      this.created_at = created_at;
      this.updated_at = updated_at;

  }
  
  getId(){
    return this.id;
  }
  
  getAuthor(){
    return this.author;
  }
  
  getCommentText(){
    return this.comment_text;
  }
  
  getCreatedAt(){
    return this.created_at;
  }
  getUpdatedAt(){
    return this.updated_at;
  }

  setAuthor(author){
    this.author = author;
  }

  setCommentText(comment_text){
    this.comment_text = comment_text;
  }


}


export { Comment }