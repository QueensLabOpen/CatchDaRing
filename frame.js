String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function setStats(l, s) {
    const score = document.getElementById('score');
    const lives = document.getElementById('lives');
    lives.textContent = l.toString();
    score.textContent = s.toString().lpad('0', 4);
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const splash = document.getElementById('splash');
    const dismissSplash = document.getElementById('dismiss-splash');

    dismissSplash.onclick = (e) => {
        splash.classList.add('hidden');
    }
}
