class Pig extends Baseclass
{
    constructor(x,y)
    {
        super(x,y,70,70);
        this.image=loadImage("Angry Bird Game/enemy.png");
        this.Visiblity=255
}
display(){

    //console.log(this.body.speed)
    push();
    if(this.body.speed>2.77){
        World.remove(world,this.body)
        pigSnort.play()
        this.Visiblity=this.Visiblity-3;
        tint(255,this.Visiblity)
        image(this.image,this.body.position.x,this.body.position.y,70,70)
    }
    else{
        super.display();
    }
    pop();
    if(this.Visiblity<200 && this.Visiblity>100){
        game3Score=game3Score+1
    }
}
}