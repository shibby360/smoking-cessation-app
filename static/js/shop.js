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
  background-color: #c9c9c9;
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
    $(shadow.querySelector('.shopitem')).click(function(ev) {
      if(cost > userdata['points']) {
        alert('You don\'t have enough points!')
        return
      }
      userdata['points'] -= cost
      userdata['items'].push(sid)
      savedata()
    })
  }
}
customElements.define('shop-item', shopItem)
$('#points').text('Points: ' + userdata['points'])