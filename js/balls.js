class Ball {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.ballPos = { x: posX, y: posY }
        this.ballSize = { w: width, h: height }
        this.ballSpeed = { x: 12, y: 1 }
        this.ballGravity = 3
        this.bounceCount = 0

        this.init()
    }




    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/ball.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }

    ballMove() {
        this.ballPos.x += this.ballSpeed.x
        this.ballPos.y += this.ballSpeed.y
        this.ballSpeed.y += this.ballGravity

        if (this.ballPos.y + this.ballSize.h >= game.player.playerBaseline + game.player.playerSize.h) {
            this.ballSpeed.y *= -1
            this.bounceCount++
        }
    }

    ballErase() {
        game.balls = game.balls.filter(elm => elm.bounceCount !== 3)
    }
}