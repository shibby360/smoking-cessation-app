var userdata = JSON.parse(localStorage.getItem('data'))
function savedata() {
  var data = JSON.parse(JSON.stringify(userdata))
  data['uname'] = localStorage.getItem('uname')
  fetch('/save', {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data),
  })
  localStorage.setItem('data', JSON.stringify(userdata))
}
$('#backbtn').attr('href', '/user/' + localStorage.getItem('uname'))