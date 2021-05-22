class Ground
{
    constructor(x,y,width,height)
    {
        var ground_options={
isStatic:true,
density:1
        }
        this.body=Bodies.rectangle(x,y,width,height,ground_options);
        this.width=width;
        this.height=height;
        World.add(world,this.body);
        
    }

    display() //methods
    {
        var pos=this.body.position
        rectMode(CENTER);
        //rect(200,200,50,50);
        push();
        fill('brown');
        rect(pos.x,pos.y,this.width,this.height);
        pop()
    }
}