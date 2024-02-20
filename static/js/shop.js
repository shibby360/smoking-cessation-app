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
}
.shopitem:hover {
  background-color: #b9b9b9;
  cursor: pointer;
}
`)
    var content = $(`<div class='shopitem'>`)
    content.html(`
<h1>${$(this).text()}</h1>
<p>${this.getAttribute('description')}</p>
<p>${this.getAttribute('cost')} points</p>`)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
    $(shadow.querySelector('.shopitem')).click(function(ev) {
      console.log(ev)
    })
  }
}
customElements.define('shop-item', shopItem)