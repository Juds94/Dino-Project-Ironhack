class Enemy1 {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.enemy1Pos = { x: posX, y: posY }
        this.enemy1Size = { w: width, h: height }
        this.enemy1Baseline = undefined
        this.enemy1Speed = 1
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/Cow.png'
        this.imageInstance.frames = 4
        this.imageInstance.framesIndex = 0
    }

    draw(framesCounter) {
        this.ctx.drawImage(this.imageInstance, this.imageInstance.width / this.imageInstance.frames * this.imageInstance.framesIndex, 0, this.imageInstance.width / this.imageInstance.frames, this.imageInstance.height, this.enemy1Pos.x, this.enemy1Pos.y, this.enemy1Size.w, this.enemy1Size.h)
        this.animate(framesCounter)


    }

    animate(framesCounter) {
        if (framesCounter % 7 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames) {
            this.imageInstance.framesIndex = 0;
        }
    }


    move() {

        if (game.player.playerPos.x + 900 >= this.enemy1Pos.x) {
            this.enemy1Pos.x -= this.enemy1Speed
        }
    }

    enemy1Erase() {
        game.enemies1 = game.enemies1.filter(elm => elm.enemy1Pos.x >= 0 - elm.enemy1Size.w)
    }

    // enemy1Collision() {
    //     game.enemies1.forEach((elm, idx) => {
    //         if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
    //             game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
    //             game.player.playerPos.y + game.player.playerSize.h > elm.enemy1Pos.y &&
    //             game.player.playerPos.y < elm.enemy1Pos.y + elm.enemy1Size.h) {
    //             console.log('me mataaaaan')
    //             game.player.playerLifeCounter -= 100
    //         }
    //         else if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
    //             game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
    //             game.player.playerPos.y + game.player.playerSize.h === elm.enemy1Pos.y) {

    //             console.log('POR ARRIBA')
    //             game.enemies1.splice(idx, 1)
    //         }
    //     })
    // }



    // enemy1Collision(elm) {
    //     let enemy1Collided = undefined

    //     game.enemies1.forEach(elm => {
    //         if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
    //             game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
    //             game.player.playerPos.y + game.player.playerSize.h > elm.enemy1Pos.y &&
    //             game.player.playerPos.y < elm.enemy1Pos.y + elm.enemy1Size.h)
    //             enemy1Collided = elm
    //     })
    //     if (enemy1Collided) {
    //         game.player.playerLifeCounter -= 5

    //     }
    // }







    ballCollision() {
        game.balls.forEach(ball => {
            game.enemies1.forEach((attack, idx) => {


                if (attack.enemy1Pos.x < ball.ballPos.x + ball.ballSize.w &&
                    attack.enemy1Pos.x + attack.enemy1Size.w > ball.ballPos.x &&
                    attack.enemy1Pos.y < ball.ballPos.y + ball.ballSize.h &&
                    attack.enemy1Size.h + attack.enemy1Pos.y > ball.ballPos.y) {
                    console.log('bola colisionada')
                    game.enemies1.splice(idx, 1)
                    console.log('bola colisionada')

                }
            })
        })

    }


}