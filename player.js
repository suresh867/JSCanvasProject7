import {StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight,
JumpingLeft, JumpingRight} from './state.js';

export default class Player{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this),
        new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this)];
        this.currentState = this.states[0];
        this.image = document.getElementById('dogImage');
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.gravity = 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.maxSpeed = 10;
    }
    draw(context){
        // context.strokeRect(this.x, this.y, this.width,this.height);
        context.drawImage(this.image, 
            this.width * this.frameX, this.height * this.frameY,  this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    update(input){
        this.currentState.handleInput(input);
        this.x += this.speed;
        if(this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.gravity;
        } else{
            this.vy = 0;
        }
    }

    setState(state){
        this.currentState = this.states[state];
        console.log(this.currentState)
        this.currentState.enter();
    }

    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
   
}