class EnemyAttack {

    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.enemyAttackPos = { x: posX, y: posY }
        this.enemyAttackSize = { w: width, h: height }
        this.enemyAttackSpeed = { x: 10, y: 3 }
        this.enemyAttackGravity = 1

        this.init()
    }




    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/enemyAttack.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.enemyAttackPos.x, this.enemyAttackPos.y, this.enemyAttackSize.w, this.enemyAttackSize.h)
        this.move()
    }

    move() {
        this.enemyAttackPos.y += this.enemyAttackSpeed.y
    }

    enemyAttackErase() {
        game.enemyAttacks = game.enemyAttacks.filter(elm => elm.enemyAttackPos.y <= game.gameSize.h)

    }




    enemyAttackCollision() {
        if (this.enemyAttackPos.x < game.player.playerPos.x + game.player.playerSize.w &&
            this.enemyAttackPos.x + this.enemyAttackSize.w > game.player.playerPos.x &&
            this.enemyAttackPos.y < game.player.playerPos.y + game.player.playerSize.h &&
            this.enemyAttackSize.h + this.enemyAttackPos.y > game.player.playerPos.y) {

            game.player.playerLifeCounter -= 2
        }
    }

    ballCollision() {
        game.balls.forEach(ball => {
            game.enemyAttacks.forEach((attack, idx) => {

                if (attack.enemyAttackPos.x < ball.ballPos.x + ball.ballSize.w &&
                    attack.enemyAttackPos.x + attack.enemyAttackSize.w > ball.ballPos.x &&
                    attack.enemyAttackPos.y < ball.ballPos.y + ball.ballSize.h &&
                    attack.enemyAttackSize.h + attack.enemyAttackPos.y > ball.ballPos.y) {
                    console.log('bola colisionada')
                    game.enemyAttacks.splice(idx, 1)
                    console.log('bola colisionada')
                }
            })
        })
    }
}



        // game.balls.forEach((attack) => {
        //     game.enemyAttacks.forEach((ball) => {

        //         game.enemyAttacks = game.enemyAttacks.filter(attack => attack.enemyAttackPos.y + attack.enemyAttackSize.h === ball.ballPos.x)
        //         console.log(game.enemyAttacks)

        // if (attack.enemyAttackPos.x < ball.ballPos.x + ball.ballSize.w &&
        //     attack.enemyAttackPos.x + attack.enemyAttackSize.w > ball.ballPos.x &&
        //     attack.enemyAttackPos.y < ball.ballPos.y + ball.ballSize.h &&
        //     attack.enemyAttackSize.h + attack.enemyAttackPos.y > ball.ballPos.y) {


        //     game.enemyAttacks = game.enemyAttacks.filter(attack => attack)
        //     console.log('bola colisionada')

        // }



