const speed = 0.04
const rotateSpeed = 0.06

let offsetScroll = 0,
    currentOffset = 0,
    backgroundImageHeight = window.innerHeight * 2 - 100,
    isScrollRun = true,
    isCubesComplete = false,
    currentSquare = 0,
    rotateOffset = 0,
    currentRotate = 0


const initialiseScroll = (event) => {
    if (offsetScroll < 0) {
        offsetScroll = 0
    } else if (offsetScroll > backgroundImageHeight) {
        offsetScroll = backgroundImageHeight
    }

    isScrollRun ? offsetScroll += event.deltaY : rotateOffset += event.deltaY / 10
} 
const initialiseScreen = () => {
    backgroundImageHeight = window.innerHeight * 2 - 100
}

const scrollElement = document.querySelector('[data-section]'),
    squares = document.querySelectorAll('.el')
    
document.addEventListener('wheel', initialiseScroll)
window.addEventListener('resize', initialiseScreen)


function animation() {
    currentOffset += (offsetScroll - currentOffset) * speed
    if (currentOffset > window.innerHeight && isCubesComplete === false) {
        isScrollRun = false
    } else if (currentOffset < window.innerHeight && isCubesComplete === true) {
        isScrollRun = false
    }
    if (isScrollRun === true) {
        scroll(currentOffset)
    } else {
        rotate()
    }
    requestAnimationFrame(animation)
}

function scroll(currentOffset) {
    let scroll = "translateY(-" + currentOffset + "px) translateZ(0)"
    scrollElement.style.transform = scroll
}

function rotate() {
    console.log(currentRotate, currentSquare, rotateOffset)
    currentRotate += (rotateOffset - currentRotate) * rotateSpeed
    const rotateStyle = `rotate(${currentRotate}deg)`
    if (currentRotate < 0 && currentSquare === 0) {
        isScrollRun = true
        isCubesComplete = false
        offsetScroll = window.innerHeight
        currentOffset = window.innerHeight
        currentRotate = 0
        rotateOffset = 0
        return
    } else if (currentRotate >= 90 && currentSquare === squares.length - 1) {
        isScrollRun = true
        isCubesComplete = true
        offsetScroll = window.innerHeight
        currentOffset = window.innerHeight
        currentRotate = 89
        rotateOffset = 80
        console.log(offsetScroll, currentOffset)
        return
    }
    if (Math.floor(currentRotate) >= 90) {
        currentSquare++
        rotateOffset = 0
        currentRotate = 0
    } else if (Math.floor(currentRotate) < 0) {
        currentSquare--
        rotateOffset = 90
        currentRotate = 90
    }
    squares[currentSquare].style.transform = rotateStyle
}

animation()