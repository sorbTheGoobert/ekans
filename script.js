var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const background = new Image();
background.src = "./assets/background.png";
var map = {
    array: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    Xsize: 18,
    Ysize: 18,
    size: 324,
    width: 900,
    height: 900,
    color: "orange",
    clear: function () {
        ctx.clearRect(0, 0, this.width, this.height);
    },
    draw: function () {
        ctx.fillStyle = this.color;
        ctx.drawImage(background, 0, 0);
    }
}
var length = 1;

function WormPart(mx, my, x, y) {
    this.mx = mx;
    this.my = my;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.color = "rgb(0, 255, 0)";
    this.strokeColor = "rgb(128, 255, 128)";
}

var worm = [
    new WormPart(Math.floor(map.Xsize / 2) - 1, Math.floor(map.Ysize / 2) - 1, (Math.floor(map.Xsize / 2) - 1) * 50, (Math.floor(map.Ysize / 2) - 1) * 50)
];

const gabum = new Image();
gabum.src = "./assets/gabum.gif";
const CACHING = new Audio();
CACHING.src = "./assets/fatty.wav";
const dead = new Audio();
dead.src = "./assets/explosion.wav";
function locationUpdate() {
    var tempX = worm[0].mx;
    var tempY = worm[0].my;
    if (dir == 1) worm[0].mx--;
    if (dir == 2) worm[0].mx++;
    if (dir == 3) worm[0].my++;
    if (dir == 4) worm[0].my--;
    if (worm[0].mx < 0) {
        console.log("lost");
        dead.play();
        worm[0].mx++;
        gameover = true;
    }
    if (worm[0].mx > map.Xsize - 1) {
        console.log("lost");
        dead.play();
        worm[0].mx--;
        gameover = true;
    }
    if (worm[0].my < 0) {
        console.log("lost");
        dead.play();
        worm[0].my++;
        gameover = true;
    }
    if (worm[0].my > map.Ysize - 1) {
        console.log("lost");
        dead.play();
        worm[0].my--;
        gameover = true;
    }
    if(!gameover){
        worm[0].x = worm[0].mx * 50;
        worm[0].y = worm[0].my * 50;
        map.array[worm[0].my * map.Xsize + worm[0].mx] = 1;
        var tempX1;
        var tempY1;
        for (var i = 1; i < length; i++) {
            if (i % 2 == 1) {
                tempX1 = worm[i].mx;
                tempY1 = worm[i].my;
                worm[i].mx = tempX;
                worm[i].my = tempY;
                worm[i].x = worm[i].mx * 50;
                worm[i].y = worm[i].my * 50;
            }
            if (i % 2 == 0) {
                tempX = worm[i].mx;
                tempY = worm[i].my;
                worm[i].mx = tempX1;
                worm[i].my = tempY1;
                worm[i].x = worm[i].mx * 50;
                worm[i].y = worm[i].my * 50;
            }
            if (worm[i].mx == worm[0].mx && worm[i].my == worm[0].my) {
                console.log("lost");
                dead.play();
                if (dir == 1) worm[0].mx++;
                if (dir == 2) worm[0].mx--;
                if (dir == 3) worm[0].my--;
                if (dir == 4) worm[0].my++;
                gameover = true;
            }
        }
        if (worm[0].my == apple.my && worm[0].mx == apple.mx) {
            var newmx;
            var newmy;
            var newx;
            var newy;
            if (worm.length % 2 == 1) {
                newmx = tempX;
                newmy = tempY;
                newx = newmx * 50;
                newy = newmy * 50;
                tempX1 = newmx;
                tempY1 = newmy;
            }
            if (worm.length % 2 == 0) {
                newmx = tempX1;
                newmy = tempY1;
                newx = newmx * 50;
                newy = newmy * 50;
                tempX = newmx;
                tempY = newmy;
            }
            worm.push(new WormPart(newmx, newmy, newx, newy));
            CACHING.play();
            length += 1;
            apple.spawn();
            score.addScore();
        }
    }
}

const appleTexture = new Image();
appleTexture.src = "./assets/apul.png";
var apple = {
    mx: Math.floor(Math.random() * map.Xsize),
    my: Math.floor(Math.random() * map.Ysize),
    x: this.mx * (map.width / map.Xsize),
    y: this.my * (map.height / map.Ysize),
    color: "rgb(255, 0, 0)",
    strokeColor: "rgb(255, 128, 128)",
    width: 50,
    height: 50,
    // texture: document.getElementById("apple"),
    spawn: function() {
        this.mx = Math.floor(Math.random() * map.Xsize);
        this.my = Math.floor(Math.random() * map.Ysize);
        while (map.array[this.my * map.Xsize + this.mx] == 1){
            this.mx++;
            if(this.mx > map.Xsize - 1){
                this.mx = 0
                this.my++;
                if(this.my > map.Ysize - 1){
                    this.my =0;
                    this.mx =0;
                }
            }
        }
        map.array[this.my * map.Xsize + this.mx] = 2;
        this.x = this.mx * (map.width / map.Xsize);
        this.y = this.my * (map.height / map.Ysize);
    }
    ,
    draw: function() {
        // ctx.strokeStyle = this.strokeColor;
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // console.log(appleTexture)
        ctx.drawImage(appleTexture, this.x, this.y);
    }
}

const ekansTexture = [new Image(), new Image(), new Image(), new Image()];
ekansTexture[0].src = "./assets/ekansleft.png";
ekansTexture[1].src = "./assets/ekansright.png";
ekansTexture[2].src = "./assets/ekansdown.png";
ekansTexture[3].src = "./assets/ekanstop.png";
const ekansBodyTexture = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
ekansBodyTexture[0].src = "./assets/ltot.png";
ekansBodyTexture[1].src = "./assets/ttor.png";
ekansBodyTexture[2].src = "./assets/rtod.png";
ekansBodyTexture[3].src = "./assets/dtol.png";
ekansBodyTexture[4].src = "./assets/xaxisbody.png";
ekansBodyTexture[5].src = "./assets/yaxisbody.png";
function draw() {
    if(dir == null) ctx.drawImage(ekansTexture[0], worm[0].x, worm[0].y);
    if(dir == 1) ctx.drawImage(ekansTexture[0], worm[0].x, worm[0].y);
    if(dir == 2) ctx.drawImage(ekansTexture[1], worm[0].x, worm[0].y);
    if(dir == 3) ctx.drawImage(ekansTexture[2], worm[0].x, worm[0].y);
    if(dir == 4) ctx.drawImage(ekansTexture[3], worm[0].x, worm[0].y);
    for (var i = 1; i < length - 1; i++) {
        if (
            (worm[i].mx > worm[i - 1].mx && worm[i].my > worm[i + 1].my) ||
            (worm[i].mx > worm[i + 1].mx && worm[i].my > worm[i - 1].my)
        ) {
            ctx.drawImage(ekansBodyTexture[0], worm[i].x, worm[i].y);
        }
        if (
            (worm[i].my > worm[i + 1].my && worm[i].mx < worm[i - 1].mx) ||
            (worm[i].my > worm[i - 1].my && worm[i].mx < worm[i + 1].mx)
        ) {
            ctx.drawImage(ekansBodyTexture[1], worm[i].x, worm[i].y);
        }
        if (
            (worm[i].my < worm[i + 1].my && worm[i].mx < worm[i - 1].mx) ||
            (worm[i].my < worm[i - 1].my && worm[i].mx < worm[i + 1].mx)
        ) {
            ctx.drawImage(ekansBodyTexture[2], worm[i].x, worm[i].y);
        }
        if (
            (worm[i].my < worm[i + 1].my && worm[i].mx > worm[i - 1].mx) ||
            (worm[i].my < worm[i - 1].my && worm[i].mx > worm[i + 1].mx)
        ) {
            ctx.drawImage(ekansBodyTexture[3], worm[i].x, worm[i].y);
        }
        if (
            worm[i].mx == worm[i + 1].mx && worm[i].mx == worm[i - 1].mx
        ) {
            ctx.drawImage(ekansBodyTexture[5], worm[i].x, worm[i].y);
        }
        if (
            worm[i].my == worm[i + 1].my && worm[i].my == worm[i - 1].my
        ) {
            ctx.drawImage(ekansBodyTexture[4], worm[i].x, worm[i].y);
        }
        // ctx.strokeStle = "rgb(128, 255, 128)";
        // ctx.strokeRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
        // ctx.fillStyle = worm[i].color;
        // ctx.fillRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
    }
    if(length > 1){
        if (
            worm[worm.length - 1].my == worm[worm.length - 2].my
        ) {
            ctx.drawImage(ekansBodyTexture[4], worm[worm.length - 1].x, worm[worm.length - 1].y);
            // ctx.strokeStle = "rgb(128, 255, 128)";
            // ctx.strokeRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
            // ctx.fillStyle = worm[i].color;
            // ctx.fillRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
        }
        if (
            worm[worm.length - 1].mx == worm[worm.length - 2].mx
        ) {
            ctx.drawImage(ekansBodyTexture[5], worm[worm.length - 1].x, worm[worm.length - 1].y);
            // ctx.strokeStle = "rgb(128, 255, 128)";
            // ctx.strokeRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
            // ctx.fillStyle = worm[i].color;
            // ctx.fillRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
        }
    }
}

var dir;

function input() {
    switch (event.key) {
        case "a":
            if(dir == 2){
                break;
            }else{
                dir = 1;
            }
            break;
        case "ArrowLeft":
            if (dir == 2) {
                break;
            } else {
                dir = 1;
            }
            break;
        case "d":
            if (dir == 1) {
                break;
            } else {
                dir = 2;
            }
            break;
        case "ArrowRight":
            if (dir == 1) {
                break;
            } else {
                dir = 2;
            }
            break;
        case "s":
            if (dir == 4) {
                break;
            } else {
                dir = 3;
            }
            break;
        case "ArrowDown":
            if (dir == 4) {
                break;
            } else {
                dir = 3;
            }
            break;
        case "w":
            if (dir == 3) {
                break;
            } else {
                dir = 4;
            }
            break;
        case "ArrowUp":
            if (dir == 3) {
                break;
            } else {
                dir = 4;
            }
            break;
        case " ":
            if(gameover){
                init();
            }
        default:
            break;
    }
}

var score = {
    amount: 0,
    HS: 0,
    x: map.width / 2,
    y: 40,
    alignment: "center",
    color: "#FFF",
    strokeColor: "black",
    font: "Silkscreen",
    fontSize: "50px",
    addScore: function() {
        this.amount = (length - 1) * 10;
        if(this.HS < this.amount) {
            this.HS = this.amount;
        }
    },
    draw: function() {
        ctx.font = this.fontSize + " " + this.font;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.strokeColor;
        ctx.textAlign = this.alignment;
        ctx.fillText(this.amount, this.x, this.y);
        ctx.strokeText(this.amount, this.x, this.y + 0);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.strokeColor;
        ctx.fillText(this.HS, this.x, this.y + 40);
        ctx.strokeText(this.HS, this.x, this.y + 40);
    }
}

var fps = 10;
var gameover = false;

function init() {
    ctx = canvas.getContext("2d");
    map.clear();
    map.draw();
    dir = null;
    length = 1;
    worm[0].mx = Math.floor(map.Xsize / 2) - 1 + Math.floor(Math.random() * 2);
    worm[0].my = Math.floor(map.Ysize / 2) - 1 + Math.floor(Math.random() * 2);
    worm[0].x = (Math.floor(map.Xsize / 2) - 1) * 50;
    worm[0].y = (Math.floor(map.Ysize / 2) - 1) * 50;
    score.amount = 0;
    while (worm.length - 1) {
        worm.pop();
    }
    locationUpdate();
    draw();
    apple.spawn();
    apple.draw();
    score.draw();
    gameover = false;
    update();
}

function update() {
    if (!gameover) {
        map.clear();
        map.draw();
        locationUpdate();
        draw();
        apple.draw();
        score.draw();
        setTimeout(() => {
            requestAnimationFrame(update);
        }, 1000 / fps);
    } else {
        for (var i = 0; i < worm.length; i++) {
            ctx.clearRect(worm[i].x, worm[i].y, worm[i].width, worm[i].height);
            ctx.drawImage(gabum, worm[i].x, worm[i].y, worm[i].width, worm[i].height);
        }
        ctx = null;
    }
}

init();