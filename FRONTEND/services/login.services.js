const URL_API = "http://localhost:7000";

const LoginService = {
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
