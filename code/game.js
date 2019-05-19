var gameState={};
window.onload=function(){
    var config={
        type:Phaser.AUTO,
        width:800,
        height:600,
        scene:[preloader,MainMenu,CharacterMenu,CreditsMenu,MenuHelp,Level1,Level2,Level3,Level4,Level5,Level1s,Level2s,Level3s,Level4s,Level5s],
        physics:{
            default:'arcade',
            arcade:{
                gravity:{y:300},
                debug:false
            }

        },
    }
    var game= new Phaser.Game(config);
}