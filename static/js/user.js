var data = JSON.parse($('#data').text().replaceAll("'", '"'))
var uname = $('#uname').text()
$('#data').remove()
localStorage.setItem('uname', uname)
if(data != JSON.parse(localStorage.getItem('data'))) {
  localStorage.setItem('data', JSON.stringify(data))
}
var oglogin = new Date(userdata['last logged in'])
var nowlogin = new Date(Date.now())
if(oglogin.toDateString() == nowlogin.toDateString()) {
  userdata['days w/o smoking'] += 1
}
userdata['last logged in'] = Date.now()
document.documentElement.style.setProperty('--goalportion', ((data['days w/o smoking']/data['goal'])*360) + 'deg')
$('#items').html('')
for(var i of data['items']) {
  var li = $('<li>')
  li.text(i)
  $('#items').append(li)
}