////////////////CANVAS//////////////////
const canvas = document.querySelector("canvas");
let mobileVersion;
if(window.innerWidth < 620){
    mobileVersion = true;
    canvas.width = screen.width;
    canvas.height = screen.height;
}
else{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
let c = canvas.getContext('2d');
const colorArr = ["#4330BF","#113059","#112959"];
let mouse ={
    x:undefined,
    y:undefined
};
class Circle {
    constructor(x=1,y=1,dx=1,dy=1,radius=30,color="000") {
        this.x =  x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    draw(){

        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.fill();
        c.fillStyle = this.color;
    }
    update(){
        if(this.x+this.radius>innerWidth || this.x-this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y+this.radius>innerHeight || this.y-this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        if(mouse.x - this.x < 50 && mouse.y - this.y < 50 && mouse.x - this.x > -50 && mouse.y - this.y > -50 && this.radius < 40){
            if(mobileVersion && this.radius < 10){
                this.radius += 1;
            }
            else if(!mobileVersion){
                this.radius += 2;
            }
        }
        else if (this.radius > 4){
            this.radius -=1;
        }

        this.draw();
    }
}
let circleArr = [];
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  circleArr.forEach(circle => {
      circle.update();
  })
};
const init = () => {
    let howMuch;
    if(mobileVersion){
        howMuch = 100;
    }
    else{
        howMuch = 1000;
    }
    for(let i=0; i<howMuch; i++){
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius *2) + radius;
        let y = Math.random() * (innerHeight - radius *2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        let color = colorArr[Math.floor(Math.random() * 3)];
        circleArr.push(new Circle(x,y,dx,dy,radius,color));
    }
};
init();
animate();
window.addEventListener("resize",() => {
    if(!mobileVersion) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        circleArr = [];
        init();
    }
});
window.addEventListener("mousemove",e => {
   mouse.x =  e.x;
   mouse.y =  e.y;
});
//////////////////////////////////////////////////
const ham = document.querySelector(".nav__ham");
ham.addEventListener("click",() => {
   const menu = document.querySelector(".nav__menu");
    menu.classList.toggle("menu--open");
});
const projectOver =  document.querySelectorAll(".project__over");
projectOver.forEach(el => {
    el.addEventListener("click",e => {
        e.target.children[1].style.pointerEvents = "visible";
        e.target.children[2].style.pointerEvents = "visible";
    })
});
const form = document.querySelector(".footer__form");
form.addEventListener("submit",e => {
    let email = document.querySelector(".form__input").value;
    let textarea = document.querySelector(".form__textarea").value;

    if(email.length > 5 && email.includes("@") && email.includes(".") && textarea.length > 1){
        console.log("Good");
    }
    else {
        e.preventDefault();
    }
});