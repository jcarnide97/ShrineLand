class Level1s extends Phaser.Scene{
    constructor(){
        super('Level1s');
    }

    preload(){
        this.load.image('forest','../ShrineLand/resources/backgrounds/Forest.png');
        this.load.spritesheet('link','../ShrineLand/resources/characters/linkSheet.png',{frameWidth: 83.9, frameHeight: 68});
        this.load.image('rupee','../ShrineLand/resources/coins/rupee.png');
        this.load.image('bokoblin','../ShrineLand/resources/enemies/redBokoblinNoSheet.png');
        this.load.image('forestTile1','../ShrineLand/resources/tiles/forestTiles1.png');
        this.load.image('forestTile2','../ShrineLand/resources/tiles/forestTiles2.png');
        this.load.image('shrine','../ShrineLand/resources/logo/shrineDoor.png');
    }
    create(){
        this.characterL=null;
        this.nCoins=0;
        this.add.image(400,300,'forest');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,568,'forestTile1').setScale(2).refreshBody();
        this.platforms.create(625, 400,'forestTile2').setScale(2).refreshBody();
        this.platforms.create(177, 275,'forestTile2').setScale(2).refreshBody();
        this.platforms.create(625, 150,'forestTile2').setScale(2).refreshBody();

        this.characterL = this.physics.add.sprite(120,450,'link');
        this.characterL.setBounce(0.2);
        this.characterL.setCollideWorldBounds(true);

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('link', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'link', frame: 6}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('link', {start: 7, end: 12}),
            frameRate: 10,
            repeat: -1
        });

        this.controls = this.input.keyboard.createCursorKeys();

        this.coins = this.physics.add.staticGroup();
        this.coins.create(250,400,'rupee');
        this.coins.create(435,450,'rupee');
        this.coins.create(200,200,'rupee');

        this.coinsText = this.add.text(16, 16, 'coins: 0', {fontSize:'32px', fill: '#d17abb'});

        this.enemies = this.physics.add.staticGroup();
        this.enemies.create(550,496,'bokoblin');
        this.enemies.create(600,328,'bokoblin');

        this.shrine = this.physics.add.staticGroup();
        this.shrine.create(700,70,'shrine');

        //colisões
        this.physics.add.collider(this.characterL,this.platforms);
        this.physics.add.overlap(this.characterL,this.coins,this.collectCoins,null,this);
        this.physics.add.collider(this.coins,this.platforms);
        this.physics.add.collider(this.enemies,this.platforms);
        this.physics.add.collider(this.characterL,this.enemies,this.hitEnemies,null,this);
        this.physics.add.collider(this.characterL,this.shrine,this.reachShrine,null,this);
    }

    update() {
        if (this.controls.left.isDown) {
            this.characterL.setVelocityX(-160);
            this.characterL.anims.play('left', true);
        }
        else if (this.controls.right.isDown) {
            this.characterL.setVelocityX(160);
            this.characterL.anims.play('right', true);
        }
        else {
            this.characterL.setVelocityX(0);
            this.characterL.anims.play('turn');
        }

        if (this.controls.up.isDown && this.characterL.body.touching.down) {
            this.characterL.setVelocityY(-330);
        }

    }

    collectCoins(characterL, coins) {
        coins.disableBody(true,true);
        this.nCoins++;
        this.coinsText.setText('coins: ' + this.nCoins);
    }

    hitEnemies(characterL, enemies) {
        this.physics.pause();
        this.characterL.setTint(0xff0000);
        this.characterL.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level1s')
    }

    reachShrine(characterL, shrine) {
        this.physics.pause();
        this.characterL.setTint(0x0000ff);
        this.characterL.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level2s');
    }

}
