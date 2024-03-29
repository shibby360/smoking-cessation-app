class shopItem extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $('<style>')
    styles.html(`
.shopitem {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${baseGray};
  border-radius: 10px;
  width: 140px;
  height: 185px;
  transition: bottom 0.3s;
  position: relative;
  bottom: 0px;
}
.shopitem:hover {
  background-color: #b9b9b9;
  cursor: pointer;
  position: relative;
  bottom: 5px;
}
`)
    var content = $(`<div class='shopitem'>`)
    content.html(`
<h1>${$(this).text()}</h1>
<p>${this.getAttribute('description')}</p>
<p>${this.getAttribute('cost')} points</p>`)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
    var cost = Number(this.getAttribute('cost'))
    var sid = this.getAttribute('sid')
    var self = this
    $(shadow.querySelector('.shopitem')).click(function(ev) {
      if(cost > userdata['points']) {
        alert('You don\'t have enough points!')
        return
      }
      userdata['points'] -= cost
      $('#points').text('Points: ' + userdata['points'])
      userdata['items'].push(sid)
      savedata()
      var popup = $('<p>')
      popup.text('+1 ' + sid)
      popup.css('position', 'absolute')
      $(document.body).append(popup)
      document.documentElement.style.setProperty('--poptop', (self.offsetTop - popup[0].offsetHeight) + 'px')
      popup.css('left', 'calc(' + self.offsetLeft + 'px' + ' + ' + self.offsetWidth/2 + 'px' + ' - ' + popup[0].offsetWidth / 2 + 'px)')
      popup.css('animation', 'flyup 1s linear')
      setTimeout(function() {
        popup.remove()
      }, 900)
    })
    if(userdata['items'].includes(sid)) {
      this.style.display = 'none'
    }
  }
}
customElements.define('shop-item', shopItem)
$('#points').text('Points: ' + userdata['points'])
var ogshopitems = Array.from(document.querySelectorAll('shop-item'))
var nshopitems = ogshopitems.filter((item) => {
  return $(item).css('display') == 'none'
})
if(ogshopitems.length == nshopitems.length) {
  $('#bought').css('display', 'block')
}