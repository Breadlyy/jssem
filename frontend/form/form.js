document.getElementById("sign_up").addEventListener("submit", function(event){
    event.preventDefault();
});
function handleKeyPress(event, nextFieldId) {
  if (event.keyCode === 13) { // Проверяем, что нажата клавиша Enter
    event.preventDefault(); // Отменяем стандартное поведение формы
    document.getElementById(nextFieldId).focus(); // Переходим к следующему полю
  }
}
let form = document.querySelector('.js-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPhone = document.querySelector('.js-input-phone'),
    inputCheckbox = document.querySelector('.js-input-checkbox');
    password = document.querySelector('.js-input-password');

function validateEmail(email) {

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


form.onsubmit = function ()
 {
    let emailVal = inputEmail.value,
        phoneVal = inputPhone.value,
        nameVal = formInputs[0].value,
        lastNameVal = formInputs[1].value,
        passwordVal = password.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');
        //validating form
    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');

        } else {
            input.classList.remove('error');
        }
    });

    if (emptyInputs.length !== 0) {
        console.log('inputs not filled');
        return false;
    }

    if(!validateEmail(emailVal)) {
        console.log('email not valid');
        inputEmail.classList.add('error');
        return false;
    } else {
        inputEmail.classList.remove('error');
    }



    if(!inputCheckbox.checked) {
        console.log('checkbox not checked');
        inputCheckbox.classList.add('error');
        return false;
    } else {
        inputCheckbox.classList.remove('error')
    }
     
    //sending user's data on server
    sendData(nameVal, lastNameVal, emailVal, phoneVal, passwordVal)
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
  const sendData = (firstName, lastName, emailVal, phoneVal, password) => {
    sendHttpRequest('POST', '/api/registration', {
      firstname: firstName, 
      lastname: lastName, 
      email:  emailVal,
      phone:  phoneVal, 
      pass: password
    })
      .then(data => {
        const token = data.login_user.token;
        const firstName = data.login_user.firstname
        const lastName = data.login_user.lastname
        const email = data.login_user.email
        const phone = data.login_user.phone
        const user = {firstName, lastName, email, phone }
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(user))
        console.log('Токен JWT получен и сохранен:', token);
        //relocating user on the other page
         window.location.href = '/';
      })
      .catch(err => {
        console.log(err);
      });
  };