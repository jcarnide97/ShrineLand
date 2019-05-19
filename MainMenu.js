class MainMenu extends Phaser.Scene{
    constructor(){
        super('MainMenu');
    }
    create(){
        let background=this.add.image(0,0,'mainmenu').setOrigin(0,0)
        let aventura=this.add.image(500,180,'adventure').setOrigin(0,0)
        let survival = this.add.image(500,255,'survival').setOrigin(0,0)
        let creditos = this.add.image(500,330,'credits').setOrigin(0,0)
        let helpb =this.add.sprite(550,482,'help').setOrigin(0,0)
        let sound =this.add.sprite(600,480,'sound').setOrigin(0,0)
        if(gameState.track==undefined)
            gameState.track=this.sound.add('track',{loop:true})

        helpb.setInteractive({useHandCursor:true})
        helpb.on('pointerover',function(){
            helpb.setFrame(1)
        })
        helpb.on('pointerout',function(){
            helpb.setFrame(0)
        })
        helpb.on('pointerdown', ()=>{
            this.scene.start('MenuHelp')
        })

        sound.setInteractive({useHandCursor:true})
        sound.setFrame(gameState.hasMusic ? 1:0)
        sound.on('pointerdown', function(){
            if(gameState.hasMusic){
                this.setFrame(1)
                gameState.track.mute=true
            }else{
                this.setFrame(0)
                if(gameState.track.mute){
                    gameState.track.mute=false
                }else
                    gameState.track.play()
            }
            gameState.hasMusic= !gameState.hasMusic
        })
        survival.setInteractive({useHandCursor:true})
        survival.on('pointerdown', ()=> {
            this.scene.start('Level1s')
        })
        aventura.setInteractive({useHandCursor:true})
        aventura.on('pointerdown',()=>{
            this.scene.start('CharacterMenu')
        })
        creditos.setInteractive({useHandCursor:true})
        creditos.on('pointerdown',()=>{
            this.scene.start('CreditsMenu')
        })
    }
}