window.onload = () => {
    document.getElementById('start').onclick = () => {
        game.init()

    }
    document.getElementById('reset').onclick = () => {
        location.reload()
    }

}
