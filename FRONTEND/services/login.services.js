const URL_API = "http://localhost:7000";

const LoginService = {

  apiGetUser: async () => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/user`)
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



  apiAuthLogin: async (user) => {
    return new Promise((resolve, reject) => {
      fetch(`${URL_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    
        .then((response) => response.json())
        .then(data => {
          if (data.success) {
            resolve(data.user);
          } else {
            reject(data.error);
          }
        });
    }).catch((error) => {
      reject(error);
    });
  },
};

export {LoginService}
