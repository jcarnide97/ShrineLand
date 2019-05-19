class CreditsMenu extends Phaser.Scene{
    constructor(){
        super('CreditsMenu');
    }
    create(){
        let background=this.add.image(0,0,'creditsmenu').setOrigin(0,0)
        let backbtn=this.add.sprite(50,50,'backbtn')
        backbtn.setInteractive({useHandCursor:true})
        backbtn.on('pointerover',function(){
            backbtn.setFrame(1)
        })
        backbtn.on('pointerout',function(){
            backbtn.setFrame(0)
        })
        backbtn.on('pointerdown',()=>{
            this.scene.start('MainMenu')
        })
    }
}