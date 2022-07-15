let numclick = -1;
let userpattern = [];
let correctPattern = [];
let possibleColors = ["red","blue","yellow","green"];

let level = 0;
let highscore = 0;

   $(".common").click(function(buttonClicked){
    numclick++;
    let color = buttonClicked.target.id;
    clickanimation("#" + color);
    playAudio(color);
    checkanswer(color);
   })

function checkanswer(color)
{
    userpattern.push(color);
    if(color == correctPattern[numclick]){
         if(userpattern.length == correctPattern.length){
            setTimeout(function(){
                userpattern = [];
                numclick = -1;
                nextsequence(); 
            },1000);
         }
    } 

    else{
       $("h2").text("Game Over! Hit any key to try again");
        playAudio("wrong");
        userpattern = [];
        correctPattern = [];

        if(level > highscore)
        {
            highscore = level;
            $("#highscore").text(level); 
        }
        level = 0;
        numclick = -1;
    }
}

function nextsequence(){
    level ++;
    $("#level").text(level);
    let rand = Math.floor(Math.random()*4);//generate random number between 0 to 3
    let color = possibleColors[rand];
    correctPattern.push(color);
    playAudio(color);
    clickanimation("#" + color);
}

function playAudio(color){
    let findpath = `${color}.mp3`;
    let audio = new Audio(findpath);
    audio.play();
}

function clickanimation(ok){
  $(ok).fadeOut(100).fadeIn(100);
} 

$(document).keydown(function(){
     if(level <= 0){
     $("h2").text("The game begins!");   
     nextsequence();
     }
})