import React, { Component } from "react"

class ParticleText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false
        }

        this.myRef = React.createRef()
    }

    _runParticle = () => {
        const
            { height: HEIGHT, text: TEXT, ratio: RATIO, lineRange: LINE } = this.props,
            canvas = this.myRef.current,
            virtualCanvas = document.createElement('canvas'),
            canvasCtx = canvas.getContext('2d'),
            virtualCanvasCtx = virtualCanvas.getContext('2d'),
            canvasStyles = getComputedStyle(canvas),
            FONT = `${HEIGHT}px ${canvasStyles.fontFamily}`

        virtualCanvasCtx.font = FONT
        virtualCanvasCtx.textAlign = 'center'
        virtualCanvas.width = virtualCanvasCtx.measureText(TEXT).width
        virtualCanvas.height = HEIGHT
        canvas.width = virtualCanvas.width
        canvas.height = HEIGHT

        const
            stroke = this._getStroke(virtualCanvas, virtualCanvasCtx, FONT, TEXT),
            movingPoints = this._getPoints(stroke, RATIO),
            interval = setInterval(() => { this._movePoints(canvas, canvasCtx, movingPoints, stroke, LINE) }, 1)

        this.setState({ interval: interval, text: TEXT })
    }

    _getStroke(cv, ctx, font, text) {
        ctx.beginPath()
        ctx.fillStyle = "#000"
        ctx.rect(0, 0, cv.width, cv.height)
        ctx.fill()
        ctx.font = font
        ctx.textAlign = "left"
        ctx.fillStyle = "#fff"
        ctx.fillText(text, 0, cv.height)
        ctx.closePath()

        return ctx.getImageData(0, 0, cv.width, cv.height)
    }

    _getPoints(stroke, ratio) {

        const
            rgbaData = stroke.data,
            skillfulPixels = [],
            movingPoints = [],
            STROKE_WITDH = stroke.width,
            getPositionX = rgbaDataPos => (rgbaDataPos % (4 * STROKE_WITDH)) / 4,
            getPositionY = rgbaDataPos => Math.floor(rgbaDataPos / (4 * STROKE_WITDH))

        for (let i = 0; i < rgbaData.length; i += 4) {

            const [r, g, b, a] = [rgbaData[i], rgbaData[i + 1], rgbaData[i + 2], rgbaData[i + 3]]

            if (r === 255 && g === 255 && b === 255 && a === 255)
                skillfulPixels.push({
                    x: getPositionX(i),
                    y: getPositionY(i)
                })
        }

        const
            SKILLFUL_PIXELS_LENGTH = skillfulPixels.length,
            NUMBER_POINTS = parseInt(SKILLFUL_PIXELS_LENGTH * ratio / 100),
            generateRandomPoint = () => {
                const
                    skillfulRandomPosition = skillfulPixels[Math.floor(Math.random() * skillfulPixels.length)],
                    ramdomDirection = () => Math.floor(Math.random() * 2 - 1) || 1

                movingPoints.push({
                    x: skillfulRandomPosition.x,
                    y: skillfulRandomPosition.y,
                    directionX: ramdomDirection(),
                    directionY: ramdomDirection()
                })
            }

        for (let i = 0; i < NUMBER_POINTS; i++) { generateRandomPoint() }

        return movingPoints
    }

    _movePoints(cv, ctx, movingPoints, stroke, line) {

        const
            RATIO_LINE = parseInt(line / 20),
            COLOR = getComputedStyle(cv).color,
            isntInsineLine = (x, y) => stroke.data[(((stroke.width * y) + x) * 4)] != 255,
            drawPoint = point => {
                ctx.beginPath()
                ctx.fillStyle = COLOR
                ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI)
                ctx.fill()
                ctx.closePath()
            },
            changeDirectionsIfApplicable = point => {

                ['x', 'y'].forEach(axe => {
                    const
                        NEXT_COORD_X = point.x + point.directionX,
                        NEXT_COORD_Y = point.y + point.directionY,
                        CURRENT_POSITION = point[axe] + point[`direction${axe.toUpperCase()}`],
                        CHANGE_APPLY = axe === 'x'
                            ? (CURRENT_POSITION >= cv.width || CURRENT_POSITION < 0 || isntInsineLine(NEXT_COORD_X, point.y))
                            : (CURRENT_POSITION >= cv.height || CURRENT_POSITION < 0 || isntInsineLine(point.x, NEXT_COORD_Y))

                    if (CHANGE_APPLY) {
                        point[`direction${axe.toUpperCase()}`] *= -1
                        point[axe] += point[`direction${axe.toUpperCase()}`] * 2
                    }
                })
            }


        ctx.clearRect(0, 0, cv.width, cv.height)

        movingPoints.forEach(point => {

            drawPoint(point)
            changeDirectionsIfApplicable(point)

            movingPoints.forEach(otherPoint => {
                if (otherPoint === point) return

                const HYPOTENUSE = Math.sqrt(Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2))

                if (HYPOTENUSE < line) {
                    ctx.lineWidth = HYPOTENUSE < RATIO_LINE ? .2 : .1
                    ctx.beginPath()
                    ctx.strokeStyle = COLOR
                    ctx.moveTo(point.x, point.y)
                    ctx.lineTo(otherPoint.x, otherPoint.y)
                    ctx.stroke()
                }

            })

            point.x += point.directionX
            point.y += point.directionY
        })
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ show: true }) }, 1)
        this._runParticle()
    }

    componentWillReceiveProps() {
        const
            TEXT = this.props.text,
            { text, interval } = this.state

        if (text != TEXT) {
            clearInterval(interval)
            this._runParticle()
        }
    }

    render() {
        return (<canvas ref={this.myRef} className={this.state.show && !this.props.finish ? 'active' : ''} ></canvas>)
    }
}

export default ParticleText