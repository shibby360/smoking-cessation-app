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
    this.innerdiv = div.find('.flip-card-inner')
    shadow.appendChild(styles[0])
    shadow.appendChild(div[0])
    var doc = this.shadowRoot
    Array.from(doc.querySelectorAll('.flip-card-inner')).forEach(function(item) {
      item.addEventListener('click', function(ev) {
        doc.querySelectorAll('.flip-card')[0].classList.toggle('flip-card-hover')
      })
    })
  }
  fliparoo() {
    $(this.innerdiv).click()
  }
}
var qnumber = 1
var qs = []
class questionEl extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $('<style>')
    styles.html(`
.fulldiv {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#smbt {
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
#smbt:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}
#smbt:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}
#smbt:focus {
  outline: 1px transparent;
}
`)
    var content = $('<div class="fulldiv">')
    content.html(`
<h1>Question ${this.getAttribute('index')}</h1>
<p>${this.getAttribute('question')}</p>
<input id='useranswer'>
<p id='result'></p>
<button id='smbt'>Submit</button>
<!-- <card-el top="${this.getAttribute('question')}" bottom="${this.getAttribute('answer')}" width='500px' height='400px'><card-el> -->
    `)
    var scripts = $('<script>')
    scripts.html(``)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
    shadow.appendChild(scripts[0])
    qs[this.getAttribute('index')-1] = this
    var useranswerinp = $(shadow.querySelector('#useranswer'))
    $(shadow.querySelector('#smbt')).click(function(ev) {
      if($(ev.target).text() == 'Submit') { 
        var useranswer = useranswerinp.val()
        var resultp = $(shadow.querySelector('#result'))
        useranswerinp.val('')
        if (useranswer == qs[qnumber-1].getAttribute('answer')) {
          resultp.text('correct!')
          resultp.css('color', 'green')
          useranswerinp.css('border', '2px solid green')
        } else {
          resultp.text('wrong...')
          resultp.css('color', 'red')
          useranswerinp.css('border', '2px solid red')
        }
        $(ev.target).text('Next')
      } else {
        qnumber++
        console.log($('question-el[index='+(qnumber)+']'))
        $('question-el[index='+(qnumber)+']').addClass('qin')
        $('question-el[index='+(qnumber)+']').css('display', 'inline')
        console.log('question-el[index='+(qnumber-1)+']')
        $('question-el[index='+(qnumber-1)+']').addClass('qout')
        moving = 1
        setTimeout(function() {
          $('question-el[index='+(qnumber-1)+']').removeClass('qout')
          $('question-el[index='+(qnumber-1)+']').css('display', 'none')
          moving = 0
        }, 2000)
      }
    })
  }
}
var moving = 0
customElements.define("card-el", cardEl)
customElements.define('question-el', questionEl)
$(`question-el[index="${qnumber}"]`).css('display', 'inline')
$(document).on('keyup', function(ev) {
  if(ev.key == 'Enter' && !moving) {
    console.log(`question-el[index="${qnumber}"]`)
    $($(`question-el[index="${qnumber}"]`)[0].shadowRoot.querySelector('#smbt')).click()
  }
})