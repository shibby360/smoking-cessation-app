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
var avatarparts = {
  'starter-head':{
    type:'head',
    content:`<circle cx="50%" cy="50" r="24" fill="transparent" stroke="black" stroke-width="3px"/><circle cx="65px" cy="46px" r="4"/><circle cx="84px" cy="46px" r="4"/><path d="M65,61 A 20,20 0 0,0 84,61" fill="none" stroke="black" stroke-width="3px">`
  },
  'starter-body':{
    type:'body', 
    content:`<rect style="x: 55; y: 74; width: 40px; height: 100px; fill: none; stroke: black; stroke-width: 3px;">`
  },
  'starter-legs':{
    type:'legs',
    content:`<rect style="x: 55;y: 174;width: 18px;height: 100px;fill: none;stroke: black;stroke-width: 3px;" /><rect style="x: 77;y: 174;width: 18px;height: 100px;fill: none;stroke: black;stroke-width: 3px;" />`
  },
  'starter-rhand':{
    type:'rhand',
    content:`<path style="d: path('M95,126 l32,36 l12,-11 l-44,-49 z');fill: none;stroke: black;stroke-width: 3px;" />`
  },
  'starter-lhand':{
    type:'lhand',
    content:`<path style="d: path('M55,126 l-40,36 l-9,-14 l49,-49 z');fill: none;stroke: black;stroke-width: 3px;" />`
  },
  'Badge':{
    type:'badge',
    content:`<circle style="cx: 69;cy: 91;r: 8;fill: #FFC107;stroke: black;" /><path style="d: path('m69,99 l6,13 h-11 z');fill: #ffc107;stroke: black;" />`
  }
}