const speed = 0.04
const rotateSpeed = 0.02

let offsetScroll = 0,
    currentOffset = 0,
    elemOffset = 0,
    backgroundImageHeight = window.innerHeight * 2 - 100,
    isScrollRun = true,
    isCubesComplete = false,
    currentSquare = 0,
    rotateOffset = 0.1,
    currentRotate = 0,
    posInit = 0,
    posRotate = 0,
    isDrag = false;

    const scrollElement = document.querySelector('[data-section]'),
        squares = document.querySelectorAll('.el')
        
    document.addEventListener('pointerdown', (event) => {
        event.preventDefault()
        posInit = event.clientY + offsetScroll
        posRotate = event.clientY + rotateOffset
        isDrag = true
    })
    
    window.addEventListener('pointermove', (event) => {
    if (isDrag) {
        isScrollRun ? offsetScroll = posInit - event.clientY : rotateOffset = (posRotate - event.clientY)
        if (offsetScroll < 0) {
            offsetScroll = 0
        } else if (offsetScroll > backgroundImageHeight) {
            offsetScroll = backgroundImageHeight
        }
    }
    })
    window.addEventListener('pointerup', () => {
        isDrag = false})
    const initialiseScroll = (event) => {
    if (offsetScroll < 0) {
        offsetScroll = 0
    } else if (offsetScroll > backgroundImageHeight) {
        offsetScroll = backgroundImageHeight
    }

    isScrollRun ? offsetScroll += event.deltaY : rotateOffset += event.deltaY / 10
    }
    scrollElement.addEventListener('touchstart', (event) => {
        event.preventDefault()
    })
    const initialiseScreen = () => {
        backgroundImageHeight = window.innerHeight * 2 - 100
    }

    
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

function scroll() {
    const scroll = "translateY(-" + currentOffset + "px) translateZ(0)"
    scrollElement.style.transform = scroll
}

function rotate() {
    currentRotate += (rotateOffset - currentRotate) * rotateSpeed
    if (currentRotate > 90) {
        currentRotate = 90
    } else if (currentRotate < 0) {
        currentRotate = 0
    }
    const rotateStyle = `rotate(${currentRotate}deg)`
    if (currentRotate === 90 && currentSquare === squares.length - 1) {
        isScrollRun = true
        isCubesComplete = true
        offsetScroll = window.innerHeight
        currentOffset = window.innerHeight
        currentRotate = 89
        rotateOffset = 80
    } else if (currentRotate === 0 && currentSquare === 0) {
        squares[currentSquare].style.transform = rotateStyle
        isScrollRun = true
        isCubesComplete = false
        offsetScroll = window.innerHeight
        currentOffset = window.innerHeight
        currentRotate = 0
        rotateOffset = 0.1
        return
    }
    if (currentRotate === 90) {
        squares[currentSquare].style.transform = rotateStyle
        currentSquare++
        rotateOffset = 0
        currentRotate = 0
        return
    } else if (currentRotate === 0) {
        squares[currentSquare].style.transform = rotateStyle
        currentSquare--
        rotateOffset = 90
        currentRotate = 90
        return
    }
    squares[currentSquare].style.transform = rotateStyle
}

animation()