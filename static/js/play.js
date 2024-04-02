function getCSSVar(x) {
  return getComputedStyle(document.documentElement).getPropertyValue(x)
}
function shuffle(array) {
  let currentIndex = array.length,randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
/* cards */
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
customElements.define("card-el", cardEl)
/* questions */
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
${buttonStyle('#smbt')}
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
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
    qs[this.getAttribute('index')-1] = this
    var useranswerinp = $(shadow.querySelector('#useranswer'))
    $(shadow.querySelector('#smbt')).click(function(ev) {
      if($(ev.target).text() == 'Submit') { 
        var useranswer = useranswerinp.val()
        if(useranswerinp.val() == '') { return }
        var resultp = $(shadow.querySelector('#result'))
        useranswerinp.val('')
        if (useranswer == qs[qnumber-1].getAttribute('answer')) {
          resultp.text('correct!')
          resultp.css('color', 'green')
          useranswerinp.css('border', '2px solid green')
          $('pop-up')[0].pop()
          userdata['points'] += 10
          pts += 10
          savedata()
        } else {
          resultp.text('wrong... answer was ' + qs[qnumber-1].getAttribute('answer'))
          resultp.css('color', 'red')
          useranswerinp.css('border', '2px solid red')
          useranswerinp.css('background', 'white')
          useranswerinp.attr('disabled', 'true')
        }
        $(ev.target).text('Next')
      } else {
        qnumber++
        if(qnumber <= qs.length) {
          $('question-el[index='+(qnumber)+']').addClass('qin')
          $('question-el[index='+(qnumber)+']').css('visibility', 'visible')
          $('question-el[index='+(qnumber)+']')[0].shadowRoot.querySelector('input').focus()
        } else {
          $('end-card')[0].setStuff()
          $('end-card').addClass('endcardin')
          $('end-card').css('visibility', 'visible')
        }
        $('question-el[index='+(qnumber-1)+']').addClass('qout')
        moving = 1
        setTimeout(function() {
          $('question-el[index='+(qnumber-1)+']').removeClass('qout')
          $('question-el[index='+(qnumber-1)+']').css('visibility', 'hidden')
          moving = 0
        }, Number(getCSSVar('--qmovetime').replace(/\D/g, ''))*950)
      }
    })
  }
}
var qEls = $('#questions').find('question-el')
var randlst = Array.from(shuffle(Array.from({length:qEls.length},(v,k)=>k+1)))
for(var i = 0; i < qEls.length; i++) {
  qEls[i].setAttribute('index', randlst[i])
}
var qnumber = 1
var qs = []
var moving = 0
customElements.define('question-el', questionEl)
$(`question-el[index="${qnumber}"]`).css('visibility', 'visible')
$(document).on('keyup', function(ev) {
  if(ev.key == 'Enter' && !moving) {
    $($(`question-el[index="${qnumber}"]`)[0].shadowRoot.querySelector('#smbt')).click()
  }
})
var qheights = []
for(var i of Array.from($('question-el'))) {
  qheights.push(Number(getComputedStyle(i).height.replace('px','')))
}
$('#questions').css('height', Math.max(...qheights))
$('end-card').css('height', Math.max(...qheights))
/* popups */
class popupEl extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $('<style>')
    styles.html(`.popdiv {
  visibility: hidden;
  z-index: 200;
  background-color: ${baseGray};
  padding-top: 0.5px;
  padding-bottom: 0.5px;
  padding-left: 27px;
  padding-right: 27px;
  font-size: 14px;
  position: relative;
}`)
    var content = $(`<div class='popdiv'>`)
    content.html(`
<p>${this.innerHTML}</p>
`)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
  }
  pop() {
    $(this.shadowRoot.querySelector('.popdiv')).css('visibility', 'visible')
    $(this).addClass('popshow')
    var popdiv = $(this.shadowRoot.querySelector('.popdiv'))
    setTimeout(function() {
      popdiv.css('visibility', 'hidden')
      $(this).removeClass('popshow')
    }, Number(getCSSVar('--poptime').replace(/\D/g, '') * 999))
  }
}
customElements.define("pop-up", popupEl)
/* end card */
var pts = 0
class endCard extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    var shadow = this.attachShadow({mode: 'open'})
    var styles = $(`<style>#fulldiv {
  width: 100%;
  height: 100%;
  border: 3px black solid;
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>`)
    var content = $(`<div id="fulldiv">
<h2 id="points">You got some points!<h2>
</div>`)
    shadow.appendChild(styles[0])
    shadow.appendChild(content[0])
  }
  setStuff() {
    this.shadowRoot.querySelector('#points').innerHTML = `You got ${pts} points!`
  }
}
customElements.define('end-card', endCard)