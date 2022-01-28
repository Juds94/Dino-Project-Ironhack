const game = {
    appName: 'proyecto1',
    authors: 'Judit Angulo, Arseni Chirkov, Anna Ma Porras',
    version: '1.0.0',
    license: undefined,
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,

    enemies1: [],
    enemies2: [],
    platforms: [],
    enemyAttacks: [],
    balls: [],
    player: undefined,
    background: undefined,
    music: undefined,




    init() {
        this.setContext()
        this.setSize()
        this.setEventHandlers()
        this.createBackground()
        this.createPlayer()
        this.createEnemy1()
        this.createEnemy2()
        this.createPlatform()
        this.drawAll()
        this.music = new Audio("./sounds/music_project.mp3")
        this.music.volume = true
        this.music.play()
    },



    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
    },

    setSize() {
        this.gameSize = { w: 1280, h: 720 }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)
    },


    createPlayer() {
        this.player = new Player(this.ctx, 250, 100, 100, 100)
    },

    createBackground() {
        this.background = new Background(this.ctx, this.gameSize.w, this.gameSize.h + 40)
    },
    createBall() {

        this.balls.push(new Ball(this.ctx, this.player.playerPos.x + this.player.playerSize.w, this.player.playerPos.y + this.player.playerSize.h / 2, 35, 35))
    },

    createPlatform() {
        this.platforms.push(
            new Platform(this.ctx, 600, 500, 150, 70),
            new Platform(this.ctx, 1200, 500, 200, 70),
            new Platform(this.ctx, 1550, 300, 350, 70),
            new Platform(this.ctx, 2100, 500, 100, 70),
            new Platform(this.ctx, 2600, 500, 200, 70),
            new Platform(this.ctx, 3000, 350, 50, 50),
            new Platform(this.ctx, 3200, 200, 1000, 70),
            new Platform(this.ctx, 4650, 500, 70, 70),
            new Platform(this.ctx, 4900, 350, 70, 70),
            new Platform(this.ctx, 5100, 200, 200, 70),
            new Platform(this.ctx, 7000, 400, 200, 70),
            new Platform(this.ctx, 7500, 400, 200, 70),
            new Platform(this.ctx, 9500, 300, 200, 75),
            new Platform(this.ctx, 9000, 500, 1000, 70),
        )
    },


    screenScrollAll() {
        if (this.player.playerPos.x >= 700) {
            this.platforms.forEach(elm => {
                elm.platformPos.x -= this.player.playerSpeed.x / 2
            })
            this.enemies1.forEach(elm => {
                elm.enemy1Pos.x -= this.player.playerSpeed.x / 2
            })
            this.enemies2.forEach(elm => {
                elm.enemy2Pos.x -= this.player.playerSpeed.x / 2
                elm.enemy2S -= this.player.playerSpeed.x / 2
                elm.enemy2F -= this.player.playerSpeed.x / 2
            })
            this.enemyAttacks.forEach(elm => {
                elm.enemyAttackPos.x -= this.player.playerSpeed.x / 2
            })
        }
    },

    drawAll() {
        timer = setInterval(() => {
            this.framesCounter++
            this.framesCounter === 240 ? this.framesCounter = 0 : null
            this.clearAll()
            this.background.draw()
            if (this.player.playerLifeCounter <= 20) {
                clearInterval(timer)
                this.drawText('GAME OVER')

            }
            this.player.draw(this.framesCounter)
            this.enemies1.forEach(elm => {
                elm.draw(this.framesCounter)
                elm.move()
                elm.ballCollision()
                // elm.enemy1Collision()
                elm.enemy1Erase()
            })
            this.enemy1Collision()
            this.enemies2.forEach(elm => {
                elm.draw()
                elm.move()
                elm.ballCollision()
            })
            this.enemy2Collision()
            this.platforms.forEach(elm => {
                elm.draw()
                if (elm.platformPos.x <= -9000) {
                    clearInterval(timer)
                    this.drawText('YOU WIN!!')
                }
            })
            this.platformCheckCollision()
            // this.platformCollision()
            this.balls.forEach(elm => {
                elm.draw()
                elm.ballMove()
                elm.ballErase()
            })
            if (this.framesCounter % 120 === 0) {
                this.enemies2.forEach(elm => { elm.createEnemyAttack() })
            }
            this.enemyAttacks.forEach(elm => {
                elm.enemyAttackErase()
                elm.draw()
                elm.enemyAttackCollision()
                elm.ballCollision()
            })
        }, 1000 / this.FPS)
    },


    drawText(text) {
        this.ctx.fillStyle = 'rgb(234, 0, 255)'
        this.ctx.font = 'bold 90px Mochiy Pop P One'

        this.ctx.fillText(text, 400, 350)
    },
    platformCheckCollision(elm) {
        let platformCollided = undefined

        this.platforms.forEach(elm => {
            if (
                elm.platformPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                elm.platformPos.x + elm.platformSize.w > this.player.playerPos.x &&
                elm.platformPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                elm.platformSize.h + elm.platformPos.y > this.player.playerPos.y
            )
                // )
                platformCollided = elm
        })
        if (platformCollided) {
            this.player.playerBaseline = platformCollided.platformPos.y - platformCollided.platformSize.h

        } else {
            this.player.playerBaseline = 600
        }
    },

    // platformCollision() {

    //     this.platforms.forEach(elm => {
    //         if (this.player.playerPos.y + this.player.playerSize.h <= elm.platformPos.y &&
    //             this.player.playerPos.y +this.player.playerSize.h + this.player.playerSpeed.y >= elm.platformPos.y &&
    //             ) {
    //             this.player.playerSpeed.y = 0
    //         }
    //     })
    // },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    createEnemy1() {
        this.enemies1.push(
            new Enemy1(this.ctx, 800, 600, 100, 100),
            new Enemy1(this.ctx, 2500, 600, 100, 100),
            new Enemy1(this.ctx, 1000, 600, 100, 100),
            new Enemy1(this.ctx, 1300, 600, 100, 100),
            new Enemy1(this.ctx, 1800, 600, 100, 100),
            new Enemy1(this.ctx, 2000, 600, 100, 100),
            new Enemy1(this.ctx, 3000, 600, 100, 100),
            new Enemy1(this.ctx, 3500, 600, 100, 100),
            new Enemy1(this.ctx, 3900, 600, 100, 100),
            new Enemy1(this.ctx, 4200, 600, 100, 100),
            new Enemy1(this.ctx, 4400, 600, 100, 100),
            new Enemy1(this.ctx, 4800, 600, 100, 100),
            new Enemy1(this.ctx, 5000, 600, 100, 100),
            new Enemy1(this.ctx, 5400, 600, 100, 100),
            new Enemy1(this.ctx, 5700, 600, 100, 100),
            new Enemy1(this.ctx, 6000, 600, 100, 100),
            new Enemy1(this.ctx, 6400, 600, 100, 100),
            new Enemy1(this.ctx, 6800, 600, 100, 100),
            new Enemy1(this.ctx, 7000, 600, 100, 100),
            new Enemy1(this.ctx, 7400, 600, 100, 100),
            new Enemy1(this.ctx, 7600, 600, 100, 100),
            new Enemy1(this.ctx, 8000, 600, 100, 100),
            new Enemy1(this.ctx, 8100, 600, 100, 100),
            new Enemy1(this.ctx, 8250, 600, 100, 100),
            new Enemy1(this.ctx, 8500, 600, 100, 100),
            new Enemy1(this.ctx, 9000, 600, 100, 100),
            new Enemy1(this.ctx, 9500, 600, 100, 100),
            new Enemy1(this.ctx, 10600, 600, 100, 100),
        )
    },



    enemy1Collision() {
        game.enemies1.forEach((elm, idx) => {
            if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
                game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
                game.player.playerPos.y + game.player.playerSize.h > elm.enemy1Pos.y &&
                game.player.playerPos.y < elm.enemy1Pos.y + elm.enemy1Size.h) {
                console.log('me mataaaaan')
                game.player.playerLifeCounter -= 10
            }
            else if (game.player.playerPos.x + game.player.playerSize.w >= elm.enemy1Pos.x &&
                game.player.playerPos.x < elm.enemy1Pos.x + elm.enemy1Size.w &&
                game.player.playerPos.y + game.player.playerSize.h === elm.enemy1Pos.y) {

                console.log('POR ARRIBA')
                game.enemies1.splice(idx, 1)
            }
        })
    },

    enemy2Collision(elm) {
        let enemy2Collided = undefined


        this.enemies2.forEach((elm, idx) => {
            if (this.player.playerPos.x < this.player.playerSize.w >= elm.enemy2Pos.x &&
                this.player.playerPos.x < elm.enemy2Pos.x + elm.enemy2Size.w &&
                this.player.playerPos.y + this.player.playerSize.h > elm.enemy2Pos.y &&
                this.player.playerPos.y < elm.enemy2Pos.y + elm.enemy2Size.h) {
                enemy2Collided = elm
            }
            // if (this.player.playerPos.x + this.player.playerSize.w >= elm.enemy2Pos.x &&
            //     this.player.playerPos.x < elm.enemy2Pos.x + elm.enemy2Size.w &&
            //     this.player.playerPos.y < elm.enemy2Pos.y + elm.enemy2Size.h &&
            //     this.player.playerPos.y + this.player.playerSize.h > elm.enemy2Pos.y) {

            //     console.log('POR ARRIBA gaviota')
            //     this.enemies2.splice(idx, 1)
            // }

        })
        if (enemy2Collided) {
            console.log('memataaaaaaaaaaaaaaaaaaaaaaaan')
            this.player.playerLifeCounter -= 10
        }

    },


    createEnemy2() {
        this.enemies2.push(
            new Enemy2(this.ctx, 500, 100, 450, 700, 100, 50),
            new Enemy2(this.ctx, 1600, 390, 1550, 1850, 100, 50),
            new Enemy2(this.ctx, 2850, 150, 2800, 3095, 100, 50),

            new Enemy2(this.ctx, 3250, 275, 3200, 3580, 100, 50),
            new Enemy2(this.ctx, 3700, 275, 3580, 3910, 100, 50),
            new Enemy2(this.ctx, 3920, 275, 3910, 4200, 100, 50),
            new Enemy2(this.ctx, 4700, 125, 4400, 5100, 100, 50),

            new Enemy2(this.ctx, 5200, 125, 5100, 5500, 100, 50),
            new Enemy2(this.ctx, 5700, 125, 5500, 5900, 100, 50),
            new Enemy2(this.ctx, 6000, 125, 5900, 6300, 100, 50),
            new Enemy2(this.ctx, 6550, 125, 6300, 6700, 100, 50),
            new Enemy2(this.ctx, 6850, 125, 6700, 7000, 100, 50),
            new Enemy2(this.ctx, 6700, 225, 5500, 6950, 100, 50),
            new Enemy2(this.ctx, 5700, 225, 5500, 6950, 100, 50)
        )
    },


    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            if (key === 'ArrowRight') {
                this.player.moveRight()
                this.screenScrollAll()
            }

            if (key === 'ArrowLeft') {
                this.player.playerPos.x >= 35 ? this.player.moveLeft() : null
            }
            //key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.jump() : null
            key === ' ' ? this.createBall() : null


        })
    }
}