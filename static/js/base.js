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
    content:`<circle cx="75" cy="50" r="24" fill="transparent" stroke="black" stroke-width="3px"/><circle cx="65px" cy="46px" r="4"/><circle cx="84px" cy="46px" r="4"/><path d="M65,61 A 20,20 0 0,0 84,61" fill="none" stroke="black" stroke-width="3px">`,
    cost:0,
    viewBox:'40 20 70 60'
  },
  'starter-body':{
    type:'body', 
    content:`<rect style="x: 55; y: 74; width: 40px; height: 100px; fill: none; stroke: black; stroke-width: 3px;">`,
    cost:0,
    viewBox:'50 70 50 110'
  },
  'starter-rleg':{
    type:'rleg',
    content:`<rect style="x: 55;y: 174;width: 18px;height: 100px;fill: none;stroke: black;stroke-width: 3px;" />`,
    cost:0,
    viewBox:'50 170 30 110'
  },
  'starter-lleg':{
    type:'lleg',
    content:`<rect style="x: 77;y: 174;width: 18px;height: 100px;fill: none;stroke: black;stroke-width: 3px;" />`,
    viewBox:'70 170 30 110'
  },
  'starter-rhand':{
    type:'rhand',
    content:`<path style="d: path('M55,126 l-40,36 l-9,-14 l49,-49 z');fill: none;stroke: black;stroke-width: 3px;" />`,
    cost:0,
    viewBox:'20 95 60 70'
  },
  'starter-lhand':{
    type:'lhand',
    content:`<path style="d: path('M95,126 l32,36 l12,-11 l-44,-49 z');fill: none;stroke: black;stroke-width: 3px;" />`,
    cost:0,
    viewBox:'80 95 60 70'
  },
  'Badge':{
    type:'badge',
    content:`<circle style="cx: 69;cy: 91;r: 8;fill: #FFC107;stroke: black;" /><path style="d: path('m69,99 l6,13 h-11 z');fill: #ffc107;stroke: black;" /><path style="d: path('m69,96 l4,-6 h-8 z');fill: #F4511E;stroke: black;" />`,
    cost:50,
    viewBox:'55 80 30 40'
  },
  'badeg':{
    type:'badge',
    content:`<circle style="cx: 66;cy: 87;r: 4;fill: yellow;stroke: black;" />`,
    cost:25,
    viewBox:'50 70 40 40'
  },
  'small hat':{
    type:'hat',
    content:`<path d="M56,29 A20,20 0 0,1 90,27" fill="none" stroke="black" stroke-width="8px" />`,
    cost:10,
    viewBox:'40 10 60 40'
  },
  'bracelet':{
    type:'accesory',
    content:{
      right:``,
      left:`<path d="m137,142 l-19,17" fill="none" stroke="yellow" stroke-width="4px">`
    },
    cost:10,
    viewBox:''
  }
}
function buttonStyle(sel) {
  return `${sel} {
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}
${sel}:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}
${sel}:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}
${sel}:focus {
  outline: 1px transparent;
}`
}
var baseGray = '#909090'