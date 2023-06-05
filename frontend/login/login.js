document.getElementById("login").addEventListener("submit", function(event){
    event.preventDefault();
});
function handleKeyPress(event, nextFieldId) {
  if (event.keyCode === 13) { // check if Enter was clicked
    event.preventDefault(); // cancel stadart form's behaviour
    document.getElementById(nextFieldId).focus(); // Moving to the next field
  }
}
let form = document.querySelector('.js-form'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPassword = document.querySelector('.js-input-password');

    function validateEmail(email) {

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    form.onsubmit = function ()
    {
        let emailVal = inputEmail.value,
            passwordVal = inputPassword.value;

        
    if(!validateEmail(emailVal)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        return false;
    } else {
        inputEmail.classList.remove('error');
    }
    //sending user's data on server for log in
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailVal,
        pass: passwordVal
      })
    })
      .then(response => response.json())
      .then(data => {
        debugger
        const token = data.login_user.token;
        const firstName = data.login_user.firstname
        const lastName = data.login_user.lastname
        const email = data.login_user.email
        const phone = data.login_user.phone
        const user = {firstName, lastName, email, phone }
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user))
        console.log('Токен JWT получен и сохранен:', token);
        // relocating user on the other page
         window.location.href = '/';
      })
      .catch(error => {
        console.error('Произошла ошибка при входе:', error);
      });
    };

    const sendHttpRequest = (method, url, data) => {
        const promise = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
      
          xhr.responseType = 'json';
      
          if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
          }
      
          xhr.onload = () => {
            if (xhr.status >= 400) {
              reject(xhr.response);
            } else {
              resolve(xhr.response);
            }
          };
      
          xhr.onerror = () => {
            reject('Something went wrong!');
          };
      
          xhr.send(JSON.stringify(data));
        });
        return promise;
      };
      const sendData = ( emailVal, password) => {
        sendHttpRequest('POST', '/api/login', {
            email: emailVal, 
            pass: password
        })
          .then(responseData => {
            console.log(responseData);
            return responseData
          })
          .catch(err => {
            console.log(err);
          });
      };
      const check = (token) =>
      {
        sendHttpRequest('GET', '/api/check',
        {
          token: token
        })
        .then(responseData => {
          console.log(responseData);
          return responseData
        })
        .catch(err => {
          console.log(err);
        });
      };