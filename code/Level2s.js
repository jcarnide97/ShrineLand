class Level2s extends Phaser.Scene {
    constructor() {
        super('Level2s');
    }
    preload() {
        this.load.image('desert', '../ShrineLand/resources/backgrounds/Desert.png');
        this.load.spritesheet('shiek', '../ShrineLand/resources/characters/shiekSheet.png', {frameWidth: 83.9, frameHeight: 68});
        this.load.image('shuriken', '../ShrineLand/resources/coins/shuriken.png');
        this.load.spritesheet('mummy', '../ShrineLand/resources/enemies/giantMummySheet.png', {frameWidth: 100, frameHeight: 180});
        this.load.image('shrine', '../ShrineLand/resources/logo/shrineDoor.png');
        this.load.image('desertTile1', '../ShrineLand/resources/tiles/desertTiles1.png');
        this.load.image('desertTile2', '../ShrineLand/resources/tiles/desertTiles2.png');
        this.load.image('desertTile3', '../ShrineLand/resources/tiles/desertTiles3.png');
        this.load.image('desertTile4', '../ShrineLand/resources/tiles/desertTiles4.png');
        this.load.image('cactus', '../ShrineLand/resources/tiles/desertCactus.png');
    }


    create() {
        this.characterS=null;
        this.add.image(400, 300, 'desert');
        this.nCoins=0;
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(125, 568, 'desertTile1').setScale(2).refreshBody();
        this.platforms.create(450, 568, 'desertTile4').setScale(2).refreshBody();
        this.platforms.create(700, 425, 'desertTile3').setScale(2).refreshBody();
        this.platforms.create(90, 400, 'desertTile2').setScale(2).refreshBody();
        this.platforms.create(220, 220, 'desertTile2').setScale(2).refreshBody();

        this.cactus = this.physics.add.staticGroup();
        this.cactus.create(325, 568, 'cactus').setScale(2).refreshBody();
        this.cactus.create(570, 568, 'cactus').setScale(2).refreshBody();
        this.cactus.create(670, 568, 'cactus').setScale(2).refreshBody();
        this.cactus.create(770, 568, 'cactus').setScale(2).refreshBody();

        this.enemies = this.physics.add.sprite(450, 450, 'mummy');
        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('mummy', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });
        this.enemies.anims.play('stand');

        this.characterS = this.physics.add.sprite(100, 430, 'shiek');
        this.characterS.setBounce(0.2);
        this.characterS.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('shiek', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'shiek', frame: 4}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('shiek', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.controls = this.input.keyboard.createCursorKeys();

        this.shrine = this.physics.add.staticGroup();
        this.shrine.create(740, 344, 'shrine');

        this.coins = this.physics.add.staticGroup();
        this.coins.create(250, 400, 'shuriken');
        this.coins.create(70, 300, 'shuriken');
        this.coins.create(600, 300, 'shuriken');
        this.coins.create(300, 100, 'shuriken');

        this.coinsText = this.add.text(16, 16, 'coins: 0', {fontSize: '32px', fill: '#d17abb'});

        this.physics.add.collider(this.characterS, this.platforms);
        this.physics.add.collider(this.characterS, this.cactus, this.hitEnemies, null, this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.characterS, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.characterS, this.shrine, this.reachShrine, null, this);
        this.physics.add.overlap(this.characterS, this.coins, this.collectCoins, null, this);
    }



    update() {
        if (this.controls.left.isDown) {
            this.characterS.setVelocityX(-160);
            this.characterS.anims.play('left', true);
        } else if (this.controls.right.isDown) {
            this.characterS.setVelocityX(160);
            this.characterS.anims.play('right', true);
        } else {
            this.characterS.setVelocityX(0);
            this.characterS.anims.play('turn');
        }

        if (this.controls.up.isDown && this.characterS.body.touching.down) {
            this.characterS.setVelocityY(-330);
        }
    }

    collectCoins(characterS, coins) {
        coins.disableBody(true, true);
        this.nCoins += 1;
        this.coinsText.setText('coins: ' + this.nCoins);
    }



    hitEnemies(characterS, enemies) {
        this.physics.pause();
        this.characterS.setTint(0xff0000);
        this.characterS.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level1s')
    }


    reachShrine(characterS, shrine) {
        this.physics.pause();
        this.characterS.setTint(0x0000ff);
        this.characterS.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level3s')

    }
}
