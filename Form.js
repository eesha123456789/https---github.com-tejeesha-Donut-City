class Form // HTML file
{
constructor()
{
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2')
    this.reset = createButton("Reset")
}
hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
display()
{
this.reset.position(displayWidth/2 + 500,displayHeight/2 - 500)


this.title.html("Eesha's car racing game");
this.title.position(displayWidth/2 - 50,0);


this.input.position(displayWidth/2 - 40,displayHeight/2 - 80);
this.button.position(displayWidth/2 + 30,displayHeight/2);

this.button.mousePressed(()=>{
this.input.hide();
this.button.hide();

player.name = this.input.value(); // read the value from the text box
playerCount += 1; // track player count
player.index=playerCount;
player.update(name); // method to update player name
player.writeCount(playerCount);

this.greeting.html("Hello " + player.name);
this.greeting.position(displayWidth/2 - 70,displayHeight/4);
})

this.reset.mousePressed(()=>{
  game.writeState(0)
  player.writeCount(0)
  Player.writeCAE(0)
})
}

}