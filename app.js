const a = "word-game/02.png"
const b = "word-game/ai.png"
const c = "word-game/asuna.png"
const d = "word-game/jiro.png"
const e = "word-game/cc.jpg"
const f = "word-game/chizuru.png"
const g = "word-game/ds.png"
const h = "word-game/h-ai.jpg"
const i = "word-game/hori.jpg"
const j = "word-game/jjk.png"
const k = "word-game/lucy.jpg"
const l = "word-game/mai.png"
const m = "word-game/makima.jpg"
const n = "word-game/mikasa.png"
const o = "word-game/miku.jpg"
const p = "word-game/kana.jpg"
const q = "word-game/rem.png"
const r = "word-game/yotsuba.jpg"

let startBtn = document.getElementById('start');
var seconds = 0
let mins = 0

var unshuffled = [a, a, b, b, c, c, d, d, e, e, f, f, g, g, h, h, i, i, j, j, k, k, l, l, m, m, n, n, o, o, p, p, q, q, r, r];

isopen = false
var winindex = 18

let ser1 = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

function ser2(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function loadbest() {
    const bestscore = localStorage.getItem('best_score');
    document.getElementById('besttime').innerHTML = bestscore;
}

window.onload = loadbest();

var shuf = ser2(ser1)
let shuffled = shuf
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

oldind = x
var islagging = false

function change(newind) {
    if (started == true) {
        if (shuffled[newind] != 'x') {
            if (islagging != true) {
                const image = document.getElementById(newind)
                image.src = shuffled[newind]
                if (!isopen) {
                    oldind = newind
                    isopen = true
                } else {
                    if (newind != oldind) {
                        if (shuffled[oldind] == shuffled[newind]) {
                            shuffled[oldind] = 'x'
                            shuffled[newind] = 'x'
                            winindex = winindex - 1
                            isopen = false
                        } else {
                            islagging = true
                            setTimeout(() => {
                                image.src = "word-game/bg.png"
                                document.getElementById(oldind).src = "word-game/bg.png"
                                islagging = false
                            }
                                , 500);

                            isopen = false
                        }
                    }
                }
            }
        }
    }
}

function stopwatch() {
    if (winindex >= 1) {
        seconds++;
        if (seconds == 60) {
            seconds = 0
            mins++;
        }
    }else{
        const timeString = document.getElementById('timer').innerHTML;
        const [mins, sec] = timeString.split(':');
        const bestScore = localStorage.getItem('best_score');
        if(bestScore){
            const [topmin, topsec] = bestScore.split(':');
            if (parseInt(topmin) > parseInt(mins)) {
                localStorage.setItem('best_score', `${mins}:${sec}`);
            } else if (parseInt(topmin) == parseInt(mins) && parseInt(topsec) > parseInt(sec)) {
                localStorage.setItem('best_score', `${mins}:${sec}`);
            }
        }else{
            localStorage.setItem('best_score', `${mins}:${sec}`);
            console.log('oldnewbest')
        }
    }
    if (seconds <= 9) {
        document.getElementById('timer').innerHTML = mins + ":0" + seconds
    } else {
        document.getElementById('timer').innerHTML = mins + ":" + seconds
    }
}

var started = false

function startwatch() {
    document.getElementById("start").innerHTML = "Restart"
    document.getElementById("start").style.fontSize = "30px";

    if (started != true) {
        timer = setInterval(stopwatch, 1000);
        started = true;
    } else if (started == true) {        
        location.reload()
    }
}