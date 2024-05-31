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
    this.data = avatarparts[this.getAttribute('iname')]
    content.find('#deleteAct').click(function(ev) {
      userdata.items.splice(userdata.items.indexOf(self.getAttribute('iname')),1)
      if(self.data.type == 'accesory') {
        if(userdata.avatar[self.data.type][0] == self.getAttribute('iname')) {
          userdata.avatar[self.data.type][0] = ''
        }
      } else {
        if(userdata.avatar[self.data.type] == self.getAttribute('iname')) {
          userdata.avatar[self.data.type] = ''
        }
      }
      userdata.points += self.data.cost
      savedata()
      drawItems()
    })
    if(this.getAttribute('iname').startsWith('starter')) {
      content.find('#deleteAct').css('display', 'none')
    }
    if(self.data.type == 'accesory') {
      content.find('#preview')[0].setAttribute('viewBox', self.data.viewBox[userdata.avatar.accesory[1]])
      content.find('#preview').html(
      self.data.content[userdata.avatar.accesory[1]])
    }
    else {
      content.find('#preview')[0].setAttribute('viewBox', self.data.viewBox)
      content.find('#preview').html(self.data.content)
    }
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