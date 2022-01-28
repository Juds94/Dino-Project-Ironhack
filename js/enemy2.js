class Enemy2 {
    constructor(ctx, posX, posY, posS, posF, width, height,) {
        this.ctx = ctx
        this.enemy2Pos = { x: posX, y: posY }
        this.enemy2S = posS
        this.enemy2F = posF
        this.enemy2Size = { w: width, h: height }
        this.enemy2Baseline = undefined
        this.enemy2Speed = 2
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/bird.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemy2Pos.x, this.enemy2Pos.y, this.enemy2Size.w, this.enemy2Size.h)
    }

    createEnemyAttack() {
        game.enemyAttacks.push(new EnemyAttack(this.ctx, this.enemy2Pos.x + this.enemy2Size.w / 2, this.enemy2Pos.y + this.enemy2Size.h, 35, 35))
    }

    move() {
        this.enemy2Pos.x += this.enemy2Speed
        if (this.enemy2Pos.x + this.enemy2Size.w >= this.enemy2F || this.enemy2Pos.x <= this.enemy2S) {
            this.enemy2Speed *= -1
        }
    }

    ballCollision() {
        game.balls.forEach(ball => {
            game.enemies2.forEach((attack, idx) => {

                if (attack.enemy2Pos.x < ball.ballPos.x + ball.ballSize.w &&
                    attack.enemy2Pos.x + attack.enemy2Size.w > ball.ballPos.x &&
                    attack.enemy2Pos.y < ball.ballPos.y + ball.ballSize.h &&
                    attack.enemy2Size.h + attack.enemy2Pos.y > ball.ballPos.y) {
                    console.log('bola colisionada')
                    game.enemies2.splice(idx, 1)
                    console.log('bola colisionada')
                }
            })
        })
    }
}