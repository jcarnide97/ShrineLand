class MenuHelp extends Phaser.Scene{
    constructor(){
        super('MenuHelp');
    }
    create(){
        let background=this.add.image(0,0,'helpmenu').setOrigin(0,0)
        let backbtn=this.add.sprite(50,500,'backbtn').setOrigin(0,0)

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