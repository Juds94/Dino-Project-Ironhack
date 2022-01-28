class Background {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.x = 0
        this.y = 0
        this.w = width
        this.h = height
        this.speed = 0.5
        this.image = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/background.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.x, this.y, this.w, this.h)
        this.ctx.drawImage(this.imageInstance, this.x + this.w, this.y, this.w, this.h)
        this.move()
    }
    move() {
        if (game.player.playerPos.x >= 700) {
            if (this.x <= -this.w) {
                this.x = 0
            }
            this.x -= this.speed
        }
    }
}
