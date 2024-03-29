$('#buttonStyles').html(buttonStyle('input[type="submit"]'))
var signorlog = document.location.pathname.split('/')[1]
var urlsearch = new URLSearchParams(window.location.search)
if(urlsearch.has('i')) {
  $('#error').css('display', 'block')
  if(signorlog == 'signup') {
    $('#error').text('Username already in use')
  } else if(signorlog == 'login') {
    $('#error').text('Something went wrong. Try again.')
  }
  window.history.replaceState(null, '', window.location.pathname)
}