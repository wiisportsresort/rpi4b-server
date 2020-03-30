class Group {
  constructor({ initalHexes }) {
    
  }
}

let franceHexes = document.getElementsByClassName('france');
let britainHexes = document.getElementsByClassName('britain');
let mohawkHexes = document.getElementsByClassName('mohawk');
let cherokeeHexes = document.getElementsByClassName('cherokee');
let shawneeHexes = document.getElementsByClassName('shawnee');
let miamiHexes = document.getElementsByClassName('miami');
let ojibweHexes = document.getElementsByClassName('ojibwe');

let hexId = '';

let clickedHexes = [];

//sets initial colors of hexes on startup and reset

document.addEventListener('DOMContentLoaded', reset);

document.getElementById('resetBtn').addEventListener('click', function() {
  reset();
  updateScores();
});

//NEED TO MAKE SCORES RESET ON GAME RESET

function reset() {
  let france = document.getElementsByClassName('origFr');
  let britain = document.getElementsByClassName('origBr');
  let mohawk = document.getElementsByClassName('origMo');
  let cherokee = document.getElementsByClassName('origCh');
  let shawnee = document.getElementsByClassName('origSh');
  let miami = document.getElementsByClassName('origMi');
  let ojibwe = document.getElementsByClassName('origOj');

  let i = '';

  let selectedHex = document.querySelectorAll('.selected');

  for (let i = 0; i < selectedHex.length; i++) {
    selectedHex[i].classList.remove('selected');
  }

  for (let i = 0; i < france.length; i++) {
    let removeClass = france[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    france[i].classList.remove(removeClass);
    france[i].classList.add('france');
  }

  for (let i = 0; i < britain.length; i++) {
    let removeClass = britain[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    britain[i].classList.remove(removeClass);
    britain[i].classList.add('britain');
  }

  for (let i = 0; i < mohawk.length; i++) {
    let removeClass = mohawk[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    mohawk[i].classList.remove(removeClass);
    mohawk[i].classList.add('mohawk');
  }

  for (let i = 0; i < cherokee.length; i++) {
    let removeClass = cherokee[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    cherokee[i].classList.remove(removeClass);
    cherokee[i].classList.add('cherokee');
  }

  for (let i = 0; i < shawnee.length; i++) {
    let removeClass = shawnee[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    shawnee[i].classList.remove(removeClass);
    shawnee[i].classList.add('shawnee');
  }

  for (let i = 0; i < miami.length; i++) {
    let removeClass = miami[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    miami[i].classList.remove(removeClass);
    miami[i].classList.add('miami');
  }

  for (let i = 0; i < ojibwe.length; i++) {
    let removeClass = ojibwe[i]
      .getAttribute('class')
      .split('st1 ')
      .pop();
    ojibwe[i].classList.remove(removeClass);
    ojibwe[i].classList.add('ojibwe');
  }
}

//This gets the id of the hex that is clicked.

(function() {
  let hex = document.getElementsByClassName('hex');

  let getHexId = function() {
    hexId = this.getAttribute('id');
    return hexId;
  };

  //This adds the selected class to the most recently clicked on hex.
  let selected = function() {
    document.getElementById(hexId + 'fill').classList.add('selected');

    //adds the most recently clicked hex to an array.
    clickedHexes.unshift(hexId);

    //removes the selected class from the second most recently clicked hex.

    let lastHex = document.getElementById(clickedHexes[1] + 'fill');
    if (lastHex !== null) {
      lastHex.classList.remove('selected');
    }
    //resolves issue of two most recently clicked hexes being the same.
    if (clickedHexes[0] === clickedHexes[1]) {
      return (clickedHexes = []);
    }
  };

  //in vanilla JS, you need to loop through this. jQuery does this step automatically, I think.
  for (let i = 0; i < hex.length; i++) {
    hex[i].addEventListener('click', getHexId);
    hex[i].addEventListener('click', selected);
  }
})();

//Updates the scores
function updateScores() {
  document.getElementById('franceScore').textContent = franceHexes.length.toString();
  document.getElementById('britainScore').textContent = britainHexes.length.toString();
  document.getElementById('mohawkScore').textContent = mohawkHexes.length.toString();
  document.getElementById('cherokeeScore').textContent = cherokeeHexes.length.toString();
  document.getElementById('shawneeScore').textContent = shawneeHexes.length.toString();
  document.getElementById('miamiScore').textContent = miamiHexes.length.toString();
  document.getElementById('ojibweScore').textContent = ojibweHexes.length.toString();
  return (hexId = '');
}

//Changes the hex colors when the group btns are clicked. Also, it removes the selected class from the most recently clicked hex.

function removeClasses() {
  document.getElementById(hexId + 'fill').classList.remove('selected');
  let removeClass = document
    .getElementById(hexId + 'fill')
    .getAttribute('class')
    .split('st1 ')
    .pop();
  document.getElementById(hexId + 'fill').classList.remove(removeClass);
}

//Changes the hex to the color of the group btn clicked.

document.getElementById('franceBtn').addEventListener('click', france);
document.getElementById('britainBtn').addEventListener('click', britain);
document.getElementById('mohawkBtn').addEventListener('click', mohawk);
document.getElementById('cherokeeBtn').addEventListener('click', cherokee);
document.getElementById('shawneeBtn').addEventListener('click', shawnee);
document.getElementById('miamiBtn').addEventListener('click', miami);
document.getElementById('ojibweBtn').addEventListener('click', ojibwe);
document.getElementById('smallpoxBtn').addEventListener('click', smallpox);

function france() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('france');
    updateScores();
  }
}

function britain() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('britain');
    updateScores();
  }
}

function mohawk() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('mohawk');
    updateScores();
  }
}

function cherokee() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('cherokee');
    updateScores();
  }
}

function shawnee() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('shawnee');
    updateScores();
  }
}

function miami() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('miami');
    updateScores();
  }
}

function ojibwe() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('ojibwe');
    updateScores();
  }
}

function smallpox() {
  if (hexId.length > 0) {
    removeClasses();
    document.getElementById(hexId + 'fill').classList.add('smallpox');
    updateScores();
  }
}
