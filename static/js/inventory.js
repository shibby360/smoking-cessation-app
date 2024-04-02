var items = userdata.items
class InventoryItem extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $(`<style>
#content {
  background: ${baseGray};
  width: 100%;
  height: 100%;
  border-radius: 7px;
}
#content > p {
  text-align: center;
  height: 10%;
  margin-bottom: 0;
  font-weight: bold;
}
#preview {
  height: 40%;
  width: 100%;
}
#actions {
  height: calc(50% - 3px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px black solid;
}
#actions > button {
  width: 25%;
  height: 75%;
}
#deleteAct {
  background: rgb(255,0,0,0.5);
  cursor: pointer;
}
</style>`)
    var content = $(`<div id='content'>
<p>${this.getAttribute('iname')}</p>
<svg id='preview'></svg>
<div id='actions'>
<button id='deleteAct'>🗑️</button>
</div>
</div>`)
    var self = this
    content.find('#deleteAct').click(function(ev) {
      userdata.items.splice(userdata.items.indexOf(self.getAttribute('iname')),1)
      userdata.points += avatarparts[self.getAttribute('iname')].cost
      savedata()
      drawItems()
    })
    if(this.getAttribute('iname').startsWith('starter')) {
      content.find('#deleteAct').css('display', 'none')
    }
    content.find('#preview').attr('viewBox', avatarparts[this.getAttribute('iname')].viewBox)
    content.find('#preview').html(avatarparts[this.getAttribute('iname')].content)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
  }
}
customElements.define('inv-item', InventoryItem)
function drawItems(params) {
  $('#points').text('Points: ' + userdata['points'])
  $('#items').html('')
  for(var i of items) {
    $('#items').append($(`<inv-item iname="${i}">`))
  }
}
drawItems()