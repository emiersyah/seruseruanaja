var bgm = document.getElementById('bgm');
var playing = false;
bgm.volume = 0.65;

function tryPlay() {
  bgm.play().then(function() {
    playing = true;
    document.getElementById('mbtn').textContent = String.fromCodePoint(127925);
  }).catch(function(){});
  document.removeEventListener('click', tryPlay);
  document.removeEventListener('keydown', tryPlay);
}
document.addEventListener('click', tryPlay);
document.addEventListener('keydown', tryPlay);

function toggleMusic() {
  if (playing) {
    bgm.pause();
    playing = false;
    document.getElementById('mbtn').textContent = String.fromCodePoint(128263);
  } else {
    bgm.play();
    playing = true;
    document.getElementById('mbtn').textContent = String.fromCodePoint(127925);
  }
}

var c = 1;
var t = 6;

function go(n) {
  document.getElementById('s' + c).classList.remove('on');
  c = n;
  document.getElementById('s' + c).classList.add('on');
  if (c === 6) rain();
  nav();
}

function next() {
  if (c < t) go(c + 1);
}

function prev() {
  if (c > 1) go(c - 1);
}

function nav() {
  document.getElementById('nb').style.display = c > 2 ? 'block' : 'none';
  document.getElementById('nn').style.display = (c > 2 && c < t) ? 'block' : 'none';
}

function openEnv() {
  document.getElementById('ob').style.display = 'none';
  document.getElementById('ew').classList.add('open');
  setTimeout(function() { go(2); }, 900);
}

function sp(inp, imgId, phId) {
  if (!inp.files || !inp.files[0]) return;
  var r = new FileReader();
  r.onload = function(e) {
    var img = document.getElementById(imgId);
    var ph  = document.getElementById(phId);
    img.src = e.target.result;
    img.style.display = 'block';
    if (ph) ph.style.display = 'none';
  };
  r.readAsDataURL(inp.files[0]);
}

function rain() {
  var cols = ['#C9A84C', '#F0ECD8', '#8B0000', '#6B3A2A', '#fff', '#d4a852'];
  for (var i = 0; i < 80; i++) {
    (function() {
      var e = document.createElement('div');
      e.className = 'cf';
      e.style.left = Math.random() * 100 + 'vw';
      e.style.background = cols[Math.floor(Math.random() * cols.length)];
      e.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      var s = 7 + Math.random() * 9;
      e.style.width = s + 'px';
      e.style.height = s + 'px';
      e.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      e.style.animationDelay = Math.random() * 1.5 + 's';
      document.body.appendChild(e);
      setTimeout(function() {
        if (e.parentNode) e.parentNode.removeChild(e);
      }, 5500);
    })();
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if ((e.key === 'Enter' || e.key === ' ') && c === 1) openEnv();
});

nav();