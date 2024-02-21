var data = JSON.parse($('#data').text().replaceAll("'", '"'))
var uname = $('#uname').text()
$('#data').remove()
if(data != JSON.parse(localStorage.data)) {
  localStorage.setItem('uname', uname)
  localStorage.setItem('data', JSON.stringify(data))
}
document.documentElement.style.setProperty('--goalportion', ((data['days w/o smoking']/data['goal'])*360) + 'deg')