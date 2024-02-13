var data = JSON.parse($('#data').text().replaceAll("'", '"'))
var uname = $('#uname').text()
$('#data').remove()
if(!localStorage.length) {
  localStorage.setItem('uname', uname)
  localStorage.setItem('data', JSON.stringify(data))
}