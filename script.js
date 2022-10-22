const winningScore = 7;
const isMobile = window.matchMedia('(max-width: 500px)');

const game = {
    width: 500,
    height: 700,
    color: 'black',
    show() {
        this.elem = document.getElementById("game");
        if (isMobile.matches){
            this.width = window.screen.width;
        }
        this.elem.style.width = this.width + 'px';
        this.elem.style.height = this.height + "px";
        this.elem.style.background = this.color;
    },
    create() {
        let div = document.createElement("div");
        div.id = "game";
        document.body.append(div);
        this.show()
    },
    win(winner) {
        clearInterval(start);
        game.elem.style.display = 'none';
        menu.create(winner);
    }
}

const menu = {
    width: 500,
    height: 500,
    color: 'deepskyblue',
    show(winner) {
        this.elem = document.getElementById("menu");
        let button = document.createElement("button");
        if (isMobile.matches){
            this.width = window.screen.width;
            button.style.left = this.width / 2 - 85 + 'px';
        }
        this.elem.style.width = this.width + "px";
        this.elem.style.height = this.height + "px";
        this.elem.style.background = this.color;
        let p = document.createElement('p');
        p.id = "title";
        p.textContent = `${winner} won!!!`;
        this.elem.append(p);
        button.id = "restartBtn";
        button.textContent = "restart";
        button.onclick = () => { location.reload(); }
        menu.elem.append(button);
    },
    create(winner) {
        let div = document.createElement('div');
        div.id = "menu";
        document.body.append(div);
        this.show(winner);
    }
}

const line = {
    height: 1,
    width: 100,
    show() {
        line.elem = document.getElementById("line");
        line.elem.style.width = this.width + "%";
        line.elem.style.height = this.height + "px";
        line.elem.style.margin = '0';
        line.elem.style.top = game.height / 2 - 3 + 'px';
    },
    create() {
        let line = document.createElement("hr");
        line.id = "line";
        game.elem.append(line);
        this.show();
    }
}

const playerScore = {
    score: 0,
    color: 'gray',
    show() {
        playerScore.elem = document.getElementById("playerScore");
        playerScore.elem.innerHTML = this.score;
        playerScore.elem.style.color = this.color;
        playerScore.elem.style.top = game.height / 2 - 20 + 'px';
        playerScore.elem.style.left = 20 + 'px';
    },
    create() {
        let p = document.createElement('p');
        p.className = "score";
        p.id = "playerScore";
        game.elem.append(p);
        this.show();
    }
}

const compScore = {
    score: 0,
    color: 'gray',
    show() {
        compScore.elem = document.getElementById("compScore");
        compScore.elem.innerHTML = this.score;
        compScore.elem.style.color = this.color;
        compScore.elem.style.bottom = game.height / 2 - 20 + 'px';
        compScore.elem.style.left = 20 + 'px';
    },
    create() {
        let p = document.createElement('p');
        p.className = "score";
        p.id = "compScore";
        game.elem.append(p);
        this.show();
    }
}

const playerPaddle = {
    width: 50,
    height: 10,
    speed: 25,
    x: (game.width - 50) / 2,
    y: 10,
    color: 'white',
    show() {
        playerPaddle.elem = document.getElementById('playerPaddle');
        playerPaddle.elem.style.height = this.height + 'px';
        playerPaddle.elem.style.width = this.width + 'px';
        playerPaddle.elem.style.background = this.color;
        playerPaddle.elem.style.bottom = this.y + 'px';
        playerPaddle.elem.style.left = this.x + 'px';

    },
    create() {
        let div = document.createElement('div');
        div.className = "paddle";
        div.id = "playerPaddle";
        game.elem.append(div);
        this.show();
    },
    move(e) {
        if (e.type == 'keydown') {
            if (e.keyCode == 37) playerPaddle.x -= playerPaddle.speed;
            if (e.keyCode == 39) playerPaddle.x += playerPaddle.speed;
        }
        else {
            playerPaddle.x = e.pageX - game.elem.offsetLeft - playerPaddle.width / 2;
        }
        if (playerPaddle.x <= 0) playerPaddle.x = 0;
        if (playerPaddle.x + playerPaddle.width > game.width) playerPaddle.x = game.width - playerPaddle.width;
        playerPaddle.show();
    }
}

const compPaddle = {
    width: 50,
    height: 10,
    speed: 1,
    x: (game.width - 50) / 2,
    y: 10,
    color: 'white',
    show(opcode = 0) {
        if (opcode) {
            compPaddle.elem = document.getElementById('compPaddle');
            compPaddle.elem.style.height = this.height + 'px';
            compPaddle.elem.style.width = this.width + 'px';
            compPaddle.elem.style.background = this.color;
        }
        compPaddle.elem.style.top = this.y + 'px';
        compPaddle.elem.style.left = this.x + 'px';

    },
    create() {
        let div = document.createElement('div');
        div.className = "paddle";
        div.id = "compPaddle";
        game.elem.append(div);
        this.show(1);
    },
    move() {
        if (compPaddle.x + compPaddle.width / 2 > ball.x + ball.width / 2)
            compPaddle.x -= compPaddle.speed;
        else if (compPaddle.x + compPaddle.width / 2 < ball.x + ball.width / 2)
            compPaddle.x += this.speed;
        if (compPaddle.x < 0)
            compPaddle.x = 0;
        else if (compPaddle.x + compPaddle.width > game.width)
            compPaddle.x = game.width - compPaddle.width;
        compPaddle.show();
    }
}

const ball = {
    width: 10,
    height: 10,
    speedX: 1,
    speedY: 1,
    x: 245,
    y: 345,
    color: 'white',
    show(opcode = 0) {
        if (opcode == 1) {
            ball.elem = document.getElementById('ball');
            ball.elem.style.width = this.width + 'px';
            ball.elem.style.height = this.height + 'px';
            ball.elem.style.borderRadius = "50%";
            ball.elem.style.background = this.color;
        }
        ball.elem.style.top = this.y + 'px';
        ball.elem.style.left = this.x + 'px';
    },
    create() {
        let div = document.createElement('div');
        div.id = "ball";
        game.elem.append(div);
        this.show(1);
    },
    move() {
        if (ball.x + ball.width >= game.width || ball.x <= 0 ||
            ((ball.x + ball.width == playerPaddle.x || ball.x == playerPaddle.x + playerPaddle.width) &&
                ball.y + ball.height / 2 > game.height - playerPaddle.y - playerPaddle.height &&
                ball.y + ball.height / 2 <= game.height - playerPaddle.y))
            ball.speedX *= -1.05
        if (ball.y + ball.height >= game.height) {
            ball.reset();
            compScore.score++;
            compScore.show();
            if (compScore.score == winningScore)
                game.win('computer');
        }
        else if (ball.y <= 0) {
            ball.reset();
            playerScore.score++;
            playerScore.show();
            if (playerScore.score == winningScore)
                game.win('player');
        }
        if ((ball.x + ball.width >= playerPaddle.x &&
            ball.x <= playerPaddle.x + playerPaddle.width &&
            ball.y + ball.height >= game.height - playerPaddle.height - playerPaddle.y) ||
            (ball.x + ball.width / 2 >= compPaddle.x &&
                ball.x + ball.width / 2 <= compPaddle.x + compPaddle.width &&
                ball.y <= compPaddle.height + compPaddle.y)) {

            if (ball.y == compPaddle.height + compPaddle.y ||
                ball.y + ball.height == game.height - playerPaddle.height - playerPaddle.y) {
                ball.speedY *= -1;
                if (ball.y + ball.height == game.height - playerPaddle.height - playerPaddle.y)
                    ball.speedX = (ball.x - playerPaddle.x - playerPaddle.width / 2) / 15;
                else
                    ball.speedX = (ball.x - compPaddle.x - compPaddle.width / 2) / 15;

                if (ball.speedX < 0)
                    compPaddle.speed = -ball.speedX;
                else
                    compPaddle.speed = ball.speedX;
            }
            else
                ball.speedX *= -1;

        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        ball.show();
        compPaddle.move();
    },
    reset() {
        this.x = 245;
        this.y = 345;
        this.speedY = 1;
        this.speedX = 1;
        compPaddle.speed = 1;
        this.show(1);
    }
}

let s = 6;
if (isMobile.matches)
    s = 2;
let start = setInterval(ball.move, s);
game.create();
line.create();
playerScore.create();
compScore.create();
playerPaddle.create();
compPaddle.create();
ball.create();
document.onkeydown = playerPaddle.move;
game.elem.onmousemove = playerPaddle.move;