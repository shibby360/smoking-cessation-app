if(localStorage.getItem('uname')) {
  window.location.href = '/user/' + localStorage.getItem('uname')
}