const URL_API = "http://localhost:7000";

const CommentService = {

  apiGetComment: async () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/comment`)
        .then((response) => response.json())
        .then(data => {
          if (data.success) {
            resolve(data.comment);
          } else {
            reject("Erro na requisição");
          }
        });
    }).catch((error) => {
      reject(error);
    });
  },

  apiSetComment: async (comment) => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    }).then((response) => response.json())
        .then(data => {
          if (data.success) {
            resolve(data.comment);
          } else {
            reject(data.error);
          }
        });
    })
    .catch((error) => {
      reject(error);
    });
  },
};

export {CommentService}
