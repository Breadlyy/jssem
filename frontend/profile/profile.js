
document.querySelector('.avatar').addEventListener('submit', function(event) {
    event.preventDefault();
    debugger
  var formData = new FormData(); // adding FormData

  var fileInput = document.querySelector('.avatarInput');
  var file = fileInput.files[0]; // Получаем выбранный файл
  var jwtToken = localStorage.getItem('jwtToken')
  formData.append('avatar', file); // Добавляем файл в FormData
  formData.append('token', localStorage.getItem('jwtToken'))
  debugger
  fetch('http://localhost:5000/api/avatar', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + jwtToken // adding header with token JWT
    },
    body: formData
  })
    .then(response => {
      console.log('uploaded')
    })
    .catch(error => {
     console.log('error during uploading the avatar')
    });
});