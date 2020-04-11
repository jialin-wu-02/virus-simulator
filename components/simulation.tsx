import React, { Component } from 'react';

interface simulationProps {
    restart: boolean;
    data : any;
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

    constructor(props) {
        super(props);
        this.canvas = null;
        this.ctx = null;
        this.width = 370;
        this.height = 370;
        this.population = this.props.data;
        this.beings = [];
        this.frame = 0;
        this.infectedSum = 1;
    }

    restart = () => {
        console.log(this.props.data);
        this.population = this.props.data;
        this.initBeings(this.population);
        this.frame = 0;
        this.infectedSum = 1;
        this.update();
    }

    initBeings = (population) => {
        this.beings = [];
        let id = 0
        for (let i = 0; i < population; i++) {
            let randomDirection = Math.floor(Math.random() * 360);
            let randomSpeed = Math.random() * 2;
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
            }
            this.beings.push(being);
            id += 1;
        }
        this.beings[0].infected = true;
        this.beings[0].color = "red";
    }

    move = (being) => {
        being.x += being.velX;
        being.y += being.velY;
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
                if (Math.pow(currentBeing.x - being.x, 2) + Math.pow(currentBeing.y - being.y, 2) < 
                    Math.pow(range + being.radius + currentBeing.radius, 2)) {
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

    update = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // seperate collision detection and move.
        this.beings.forEach(being => {
            this.checkBoundary(being);
            this.collisionDetection(being, 0);
        })
        this.beings.forEach(being => {
            this.move(being);
            this.drawCircle(being.x, being.y, being.radius, being.color);
        });
        if (this.frame % 10 == 0) {
            this.props.updateChartDataHandle([this.frame, this.infectedSum]);
        }
        this.frame += 1;
        if (this.infectedSum < this.population) {
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