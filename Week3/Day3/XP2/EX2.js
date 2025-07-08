function myMove() {
    const animate = document.getElementById('animate')
    let position = 0
    const id = setInterval(test, 5)
    function test() {
        if (position >= 350) {
        clearInterval(id)
    } else {
        position ++ 
        animate.style.left = position + 'px'
    }
    }
   

}
