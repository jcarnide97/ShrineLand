class CharacterMenu extends Phaser.Scene{
    constructor(){
        super('CharacterMenu');
    }
    create(){
        let background=this.add.image(0,0,'charactersmenu').setOrigin(0,0)
        let shiek=this.add.sprite(400,200,'shiekimg')
        let link=this.add.sprite(250,200,'linkimg')
        let popo =this.add.sprite(550,200,'popoimg')
        let zarag=this.add.sprite(325,400,'zaragimg')
        let megaman =this.add.sprite(475,400,'megamanimg')
        let backbtn=this.add.sprite(400,500,'backbtn')

        link.setInteractive({useHandCursor:true})
        link.on('pointerover',function(){
            link.setFrame(1)
        })
        link.on('pointerout',function(){
            link.setFrame(0)
        })
        link.on('pointerdown',()=>{
            this.scene.start('Level1')
        })
        megaman.setInteractive({useHandCursor:true})
        megaman.on('pointerover',function(){
            megaman.setFrame(1)
        })
        megaman.on('pointerout',function(){
            megaman.setFrame(0)
        })
        megaman.on('pointerdown',()=>{
            this.scene.start('Level5')
        })
        popo.setInteractive({useHandCursor:true})
        popo.on('pointerover',function(){
            popo.setFrame(1)
        })
        popo.on('pointerout',function(){
            popo.setFrame(0)
        })

        popo.on('pointerdown',()=>{
            this.scene.start('Level3')
        })

        shiek.setInteractive({useHandCursor:true})
        shiek.on('pointerover',function(){
            shiek.setFrame(1)
        })
        shiek.on('pointerout',function(){
            shiek.setFrame(0)
        })

        shiek.on('pointerdown',()=>{
            this.scene.start('Level2')
        })

        zarag.setInteractive({useHandCursor:true})
        zarag.on('pointerover',function(){
            zarag.setFrame(1)
        })
        zarag.on('pointerout',function(){
            zarag.setFrame(0)
        })
        zarag.on('pointerdown',()=>{
            this.scene.start('Level4')
        })
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