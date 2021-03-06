const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particlesArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/140) * (canvas.width/140)
}

//get touch position
let touch = {
    x: null,
    y: null,
    radius: (canvas.height/100) * (canvas.width/100)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y
    }
)

window.addEventListener('touchmove',
    function(event){
        touch.x = touch.x;
        touch.y = event.y
    }
)


// class Shape{
//     constructor(x, y, width, height)
// }

// create particle
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

// method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill();
    }


    // check particle position, check mouse position, move the particle, draw the particle
    update(){
        if(this.x > canvas.width|| this.x < 0){
            if(Math.abs(this.directionX) < .8){
                this.directionX = -this.directionX*1.1
            }
            this.directionX = -this.directionX ;
            // this.size -= .5;
        }
        if(this.y > canvas.height || this.y < 0){
            if(Math.abs(this.directionY) < .2){
                this.directionY = -this.directionY*1.1
            }
            else{
                this.directionY = -this.directionY ;
            }
            // this.size -= .5;
            
        }

        
    // check collision detection - mouse poistion / particle position
        let distance;
        
        let dxm = mouse.x - this.x;
        let dym = mouse.y - this.y;
        let distanceMouse = Math.sqrt(dxm*dxm + dym*dym);
        let point = mouse
        distance = distanceMouse;
        if(distance < mouse.radius +this.size){
            this.directionX = -this.directionX
            this.directionY = -this.directionY
            if (mouse.x < this.x && this.x < canvas.width - this.size *10){
                this.x += 10;
                // this.directionX = -this.directionX
            }
            if (mouse.x > this.x && this.x > this.size * 10){
                this.x -= 0;
                // this.directionX = -this.directionX
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
                // this.directionY = -this.directionY
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
                // this.directionY = -this.directionX
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
        
        // if(touch.x > 0){
        //     let dxt = touch.x - this.x;
        //     let dyt = touch.y - this.y;
        //     let distanceTouch = Math.sqrt(dxm*dxm + dym*dym);
        //     distance = distanceTouch
        //     if(distance < touch.radius +this.size){
        //         this.directionX = -this.directionX
        //         this.directionY = -this.directionY
        //         if (touch.x < this.x && this.x < canvas.width - this.size *10){
        //             this.x += 10;
        //             // this.directionX = -this.directionX
        //         }
        //         if (touch.x > this.x && this.x > this.size * 10){
        //             this.x -= 10;
        //             // this.directionX = -this.directionX
        //         }
        //         if(touch.y < this.y && this.y < canvas.height - this.size * 10){
        //             this.y += 10;
        //             // this.directionY = -this.directionY
        //         }
        //         if(touch.y > this.y && this.y > this.size * 10){
        //             this.y -= 10;
        //             // this.directionY = -this.directionX
        //         }
        //     }
        //     this.x += this.directionX;
        //     this.y += this.directionY;
        //     // draw particle
        //     this.draw();
        // }
    }
}

function init(){
    particlesArray = []
    let numberOfParticles = (canvas.height * canvas.width ) / 10000;
    for(let i = 0; i < numberOfParticles*2; i++){
        let size = (Math.random() * 5);
        let x = (Math.random() * ((innerWidth - size * 2) - size * 2) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - size * 2) + size * 2);
        let directionX = (Math.random() * 3) - 1.5;
        let directionY = (Math.random() * 3) - 1.5;
        let color = '#44bcc9'
        color = '#020826' // Black hole code
        particlesArray.push(new Particle(x,y, directionX, directionY, size, color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
    Animation.pause()
}

// check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b <particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            // Black hole code
            if(distance < 1){
                particlesArray[a].size += particlesArray[b].size/200
                particlesArray.remove(particlesArray[b])
            }
            if(distance < particlesArray[a].size){
                particlesArray[a].directionX = -particlesArray[a].directionX
                particlesArray[a].directionY = -particlesArray[a].directionY

                particlesArray[b].directionX = -particlesArray[b].directionX
                particlesArray[b].directionY = -particlesArray[b].directionY
            }

            if(distance < (canvas.width/7) * canvas.height/7){
                opacityValue = 1 - (distance/15000)
                // opacityValue = ((particlesArray[a].size + particlesArray[b].size)/50)
                let stroke1 = 'rgba(68, 188, 201,' + opacityValue + ')';
                let stroke2 = 'rgba(255, 255, 255,' + opacityValue + ')';
                // if(particlesArray[a].size > .5){
                //     ctx.strokeStyle = stroke1;
                // }else{
                //     ctx.strokeStyle = stroke2;

                // }
                ctx.strokeStyle = stroke1;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo (particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            } 
        }
    }
}


// resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height/80));
        init();
});

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();