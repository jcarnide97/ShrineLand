class Level2 extends Phaser.Scene {
    constructor() {
        super('Level2');
    }
    preload() {
        this.load.image('desert', '../ShrineLand/resources/backgrounds/Desert.png');
        this.load.spritesheet('shiek', '../ShrineLand/resources/characters/shiekSheet.png', {frameWidth: 127, frameHeight: 98});
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

        this.shiek = this.physics.add.sprite(100, 430, 'shiek');
        this.shiek.setBounce(0.2);
        this.shiek.setCollideWorldBounds(true);

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

        this.physics.add.collider(this.shiek, this.platforms);
        this.physics.add.collider(this.shiek, this.cactus, this.hitEnemies, null, this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.shiek, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.shiek, this.shrine, this.reachShrine, null, this);
        this.physics.add.overlap(this.shiek, this.coins, this.collectCoins, null, this);
    }



    update() {
        if (this.controls.left.isDown) {
            this.shiek.setVelocityX(-160);
            this.shiek.anims.play('left', true);
        } else if (this.controls.right.isDown) {
            this.shiek.setVelocityX(160);
            this.shiek.anims.play('right', true);
        } else {
            this.shiek.setVelocityX(0);
            this.shiek.anims.play('turn');
        }

        if (this.controls.up.isDown && this.shiek.body.touching.down) {
            this.shiek.setVelocityY(-330);
        }
    }

    collectCoins(shiek, coins) {
        coins.disableBody(true, true);
        this.nCoins += 1;
        this.coinsText.setText('coins: ' + this.nCoins);
    }



    hitEnemies(shiek, enemies) {
        this.physics.pause();
        this.shiek.setTint(0xff0000);
        this.shiek.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level2')
    }


    reachShrine(shiek, shrine) {
        this.physics.pause();
        this.shiek.setTint(0x0000ff);
        this.shiek.anims.play('turn');
        this.gameOver = true;
        this.scene.start('CharacterMenu')

    }
}