import React, { Component } from 'react';

interface simulationProps {
    restart: boolean;
    parameters : any;
    updateChartDataHandle(any) : void;
    restartDoneHandler() : void;
}

class simulation extends Component<simulationProps> {

    canvas : any;
    ctx : any;
    width : number;
    height : number;
    beings : any;
    frame : number;
    population : number;
    infectedSum : number;
    cureDelay : number;
    curedSum : number;
    socialDistanceFactor : number;
    socialDistanceFactorArray : Array<boolean>;

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.width = 370;
        this.height = 370;
        this.population = this.props.parameters.population;
        this.beings = [];
        this.frame = 0;
        this.infectedSum = 1;
        this.cureDelay = 400;
        this.curedSum = 0;
        this.socialDistanceFactor = this.props.parameters.socialDistance;
        this.socialDistanceFactorArray = [];
        for (var i = 0; i < this.population; i++) {
            this.socialDistanceFactorArray.push(this.socialDistanceFactor > i)
        }

    }

    restart = () => {
        this.population = this.props.parameters.population;
        this.socialDistanceFactor = this.props.parameters.socialDistance;
        this.initBeings(this.population);
        this.frame = 0;
        this.infectedSum = 1;
        this.curedSum = 0;
        this.update();
    }

    initBeings = (population) => {
        this.beings = [];
        let id = 0
        for (let i = 0; i < population; i++) {
            let randomDirection = Math.floor(Math.random() * 360);
            let randomSpeed = Math.random() * 1.5;
            let being = {
                id,
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 5,
                speed: randomSpeed,
                direction: randomDirection,
                velX: Math.cos(randomDirection) * randomSpeed,
                velY: Math.sin(randomDirection) * randomSpeed,
                color: "#ccc",
                infected: false,
                cured: false,
                cureDelayCountDown: this.cureDelay
            }
            this.beings.push(being);
            id += 1;
        }
        this.socialDistanceFactorArray = [];
        for (var i = 0; i < this.population; i++) {
            this.socialDistanceFactorArray.push(this.socialDistanceFactor / 100 * this.population > i)
        }
        this.beings[0].infected = true;
        this.beings[0].color = "red";
    }

    move = (being) => {
        if (!this.socialDistanceFactorArray[being.id]) {
            being.x += being.velX;
            being.y += being.velY;
        }
    }

    checkBoundary = (being) => {
        if (being.x - being.radius <= 0 || being.x + being.radius >= this.width) {
            being.velX *= -1;
        } 
        if (being.y - being.radius <= 0 || being.y + being.radius >= this.height) {
            being.velY *= -1;
        }
    }

    collisionDetection = (currentBeing, range) => {
        this.beings.forEach((being) => {
            if (being.id != currentBeing.id && (being.infected || currentBeing.infected) && 
                !(being.infected && currentBeing.infected)) {
                if ((Math.pow(currentBeing.x - being.x, 2) + Math.pow(currentBeing.y - being.y, 2) < 
                    Math.pow(range + being.radius + currentBeing.radius, 2)) 
                        && (currentBeing.cured == false) && (being.cured == false)) {
                    // infected
                    currentBeing.color = "red";
                    being.color = "red";
                    currentBeing.infected = true;
                    being.infected = true;
                    this.infectedSum += 1;
                }  
            }
        })
    }

    drawCircle = (x, y, radius, color) => {
        this.ctx.moveTo(x, y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    cureDelayHandler = (being) => {
        if (being.infected && being.cureDelayCountDown > 0) {
            being.cureDelayCountDown -= 1;
        } else if (being.infected && being.cureDelayCountDown == 0) {
            being.cureDelayCountDown = this.cureDelay;
            being.infected = false;
            being.cured = true;
            being.color = "rgb(104, 181, 253)";
            this.infectedSum -= 1;
            this.curedSum += 1;
        }
    }

    update = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // seperate collision detection and move.
        this.beings.forEach(being => {
            this.checkBoundary(being);
            this.collisionDetection(being, 0);
        })
        this.beings.forEach(being => {
            this.move(being);
            if (this.props.parameters.washHand == 1) {
                this.cureDelayHandler(being);
            }
            this.drawCircle(being.x, being.y, being.radius, being.color);
        });
        if (this.frame % 10 == 0) {
            this.props.updateChartDataHandle([this.frame, this.infectedSum, this.curedSum]);
        }
        this.frame += 1;
        if (this.infectedSum < this.population && this.infectedSum != 0) {
            requestAnimationFrame(this.update);
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.restart) {
            console.log("restart")
            this.props.restartDoneHandler();
            this.restart();
        }
    }

    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = "370px";
        this.canvas.style.height = "370px";

        this.restart();
    }

    render () {
        return (
            <canvas 
                style={{
                    border: "2px solid #ccc",
                    margin: "20px"
                }} 
                ref="canvas"> 
            </canvas>
        )
    }
}

export default simulation;