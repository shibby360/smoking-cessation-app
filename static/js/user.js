var data = JSON.parse($('#data').text().replaceAll("'", '"'))
var uname = $('#uname').text()
$('#data').remove()
localStorage.setItem('uname', uname)
if(data != JSON.parse(localStorage.getItem('data'))) {
  localStorage.setItem('data', JSON.stringify(data))
}
document.documentElement.style.setProperty('--goalportion', ((data['days w/o smoking']/data['goal'])*360) + 'deg')
$('#items').html('')
for(var i of data['items']) {
  var li = $('<li>')
  li.text(i)
  $('#items').append(li)
}