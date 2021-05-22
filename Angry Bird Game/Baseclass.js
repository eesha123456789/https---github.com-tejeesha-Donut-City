class Baseclass
{
    constructor(x,y,width,height,angle)
    {
        var baseclass_options={
            restitution:0.001, //bounciness
            friction:2,
            density: 2.0,
            //isStatic:true
        }
        this.body=Bodies.rectangle(x,y,width,height,baseclass_options);//physics engine body is hidden
        this.image=loadImage("Angry Bird Game/base.png");
        this.width=width;
        this.height=height;
        World.add(world,this.body);
    }

    display()
    {
        var pos=this.body.position;
        var angle=this.body.angle;
        push();
        translate(pos.x,pos.y);//point at which it tilts itself
        rotate(angle); // the angle in which it tilts
        //rectMode(CENTER);
        imageMode(CENTER)
          //rect(200,200,50,50);
          //strokeWeight(3);//border line
          //stroke('green'); //border colour
       // rect(0,0,this.width,this.height);//plane figure - two D figure
        image(this.image,0,0,this.width, this.height)
        pop();
    }
}