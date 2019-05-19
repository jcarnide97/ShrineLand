class preloader extends Phaser.Scene{
    constructor(){
        super('preloader');
    }
    preload() {
        let loading=this.add.text(300,250,"Loading",{fontFamily:'Courier New',fontSize:'32px',color:'#faa'});
        let count=1;
        this.time.addEvent({
            delay:150,
            callback:function() {
                count++;
                if (count === 4) {
                    count = 1
                }
                loading.setText('Loading' + '.'.repeat(count))
            },
            callbackScope:this,
            repeat:true
        })
        this.load.audio('track','../ShrineLand/resources/music/menu_theme.mp3')
        this.load.image('charactersmenu','../ShrineLand/resources/backgrounds/CharacterMenus.png')
        this.load.image('othermenu','../ShrineLand/resources/backgrounds/OtherMenus.png')
        this.load.image('mainmenu','../ShrineLand/resources/backgrounds/mainMenu.png')
        this.load.image('helpmenu','../ShrineLand/resources/backgrounds/HelpMenu.png')
        this.load.image('creditsmenu','../ShrineLand/resources/backgrounds/CredictsMenu.png')
        this.load.image('adventure','../ShrineLand/resources/buttons/adventureBtn.png')
        this.load.image('credits','../ShrineLand/resources/buttons/creditsBtn.png')
        this.load.image('survival','../ShrineLand/resources/buttons/survivalBtn.png')
        this.load.image('helpb','../ShrineLand/resources/buttons/helpBtn.png')
        this.load.image('helpSel','../ShrineLand/resources/buttons/helpBtnSelc.png')
        this.load.spritesheet('backbtn', '../ShrineLand/resources/buttons/backbtnspt.png', {frameWidth: 88, frameHeight: 88})
        this.load.spritesheet('help','../ShrineLand/resources/buttons/helpbtnsprt.png',{frameWidth:18,frameHeight:24})
        this.load.spritesheet('sound','../ShrineLand/resources/buttons/soundsprt.png',{frameWidth:30,frameHeight:28})
        this.load.spritesheet('nextb','../ShrineLand/resources/buttons/nextBtnspt.png',{frameWidth:88,frameHeight:88})
        this.load.spritesheet('linkimg','../ShrineLand/resources/buttons/linkspt.png',{frameWidth:98,frameHeight:96})
        this.load.spritesheet('megamanimg','../ShrineLand/resources/buttons/megamanspt.png',{frameWidth:98,frameHeight:96})
        this.load.spritesheet('popoimg','../ShrineLand/resources/buttons/popospt.png',{frameWidth:98,frameHeight:96})
        this.load.spritesheet('shiekimg','../ShrineLand/resources/buttons/shiekspt.png',{frameWidth:98,frameHeight:96})
        this.load.spritesheet('zaragimg','../ShrineLand/resources/buttons/zaragspt.png',{frameWidth:98,frameHeight:96})

        gameState.hasMusic = false;
    }
    create() {
        this.scene.start("MainMenu");
    }
}