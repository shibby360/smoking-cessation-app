class cardEl extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $('<style>')
    styles.html(`
.flip-card {
  width: ${this.getAttribute('width')};
  height: ${this.getAttribute('height')};
  perspective: 1000px;
  background: transparent;
}

.flip-card-inner {
  position: relative;
  border-radius: 12px;
  border: 3px black solid;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flip-card-hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}

p {
  text-align: center;
  margin: 0;
}`)
    var div = $('<div class="flip-card">')
    div.html(`<div class="flip-card-inner">
    <div class="flip-card-front">
      <p>${this.getAttribute('top')}</p>
    </div>
    <div class="flip-card-back">
      <p>${this.getAttribute('bottom')}</p>
    </div>
  </div>`)
    var scripts = $('<script>')
    scripts.html(`
    var doc = document.querySelector('card-el').shadowRoot
Array.from(doc.querySelectorAll('.flip-card-inner')).forEach(function(item) {
  item.addEventListener('click', function(ev) {
    doc.querySelectorAll('.flip-card')[0].classList.toggle('flip-card-hover')
  })
})
`)
    shadow.appendChild(styles[0])
    shadow.appendChild(div[0])
    shadow.appendChild(scripts[0])
    console.log('card')
  }
}
customElements.define("card-el", cardEl)