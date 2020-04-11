import React, { Component } from 'react';

interface simulationProps {
    population : number;
    updateChartDataHandle(any) : void;
}

class simulation extends Component<simulationProps> {
    componentDidMount() {
        let canvas : any = this.refs.canvas,
            ctx = canvas.getContext("2d"),
            width = 370,
            height = 370,
            beings = [],
            frame = 0,
            population = this.props.population;

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = "370px";
        canvas.style.height = "370px";

        const initBeings = (population) => {
            let id = 0
            for (let i = 0; i < population; i++) {
                let randomDirection = Math.floor(Math.random() * 360);
                let randomSpeed = Math.random() * 2;
                let being = {
                    id,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: 5,
                    speed: randomSpeed,
                    direction: randomDirection,
                    velX: Math.cos(randomDirection) * randomSpeed,
                    velY: Math.sin(randomDirection) * randomSpeed,
                    color: "#ccc",
                    infected: false,
                }
                beings.push(being);
                id += 1;
            }
            beings[0].infected = true;
            beings[0].color = "red";
        }

        const move = (being) => {
            being.x += being.velX;
            being.y += being.velY;
        }

        const checkBoundary = (being) => {
            if (being.x - being.radius <= 0 || being.x + being.radius >= width) {
                being.velX *= -1;
            } 
            if (being.y - being.radius <= 0 || being.y + being.radius >= height) {
                being.velY *= -1;
            }
        }

        const collisionDetection = (currentBeing, range) => {
            beings.forEach((being) => {
                if (being.id != currentBeing.id && (being.infected || currentBeing.infected)) {
                    if (Math.pow(currentBeing.x - being.x, 2) + Math.pow(currentBeing.y - being.y, 2) < 
                        Math.pow(range + being.radius + currentBeing.radius, 2)) {
                        // infected
                        currentBeing.color = "red";
                        being.color = "red";
                        currentBeing.infected = true;
                        being.infected = true;
                    }  
                }
            })
        }

        const drawCircle = (x, y, radius, color) => {
            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        const getInfectedSum = () => {
            let infectedSum = 0;
            beings.forEach(being => {
                if (being.infected) {
                    infectedSum += 1;
                }
            })
            return infectedSum;
        }

        const update = () => {
            ctx.clearRect(0, 0, width, height);
            // seperate collision detection and move.
            beings.forEach(being => {
                checkBoundary(being);
                collisionDetection(being, 0);
            })
            beings.forEach(being => {
                move(being);
                drawCircle(being.x, being.y, being.radius, being.color);
            });
            if (frame % 10 == 0) {
                this.props.updateChartDataHandle([frame, getInfectedSum()]);
            }
            frame += 1;
            if (getInfectedSum() != population) {
                requestAnimationFrame(update);
            }
        }

        initBeings(population);
        update();
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