class Bird extends Baseclass
{
    constructor(x,y)
    {
        super(x,y,70,70);
        this.image=loadImage("Angry Bird Game/bird.png")
        this.image2=loadImage("Angry Bird Game/smoke.png")
        this.trajectory = []
        this.Visiblity=255
    }
    display(){
        super.display()
        if(gameState===birdOffSling && this.body.position.x>325){
            var position=[this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
        }
        push()
        imageMode(CENTER)
       
        for(var i=0; i<this.trajectory.length;i++){
            this.Visiblity=this.Visiblity-0.1
            tint(255,this.Visiblity)
            image(this.image2,this.trajectory[i][0],this.trajectory[i][1])
        }
        pop()
        
       // this.body.position.x=mouseX
       // this.body.position.y=mouseY
    }
}