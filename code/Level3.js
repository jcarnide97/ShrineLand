class Level3 extends Phaser.Scene {
    constructor() {
        super('Level3');
    }

    preload() {
        this.load.image('ice', '../ShrineLand/resources/backgrounds/Ice.png');
        this.load.spritesheet('popo', '../ShrineLand/resources/characters/popoSheet.png', {frameWidth: 128, frameHeight: 82});
        this.load.image('snowflake', '../ShrineLand/resources/coins/goldenSnowflake.png');
        this.load.image('jackFrost', '../ShrineLand/resources/enemies/jackFrostNoSheet.png');
        this.load.image('shrine', '../ShrineLand/resources/logo/shrineDoor.png');
        this.load.image('iceTile1', '../ShrineLand/resources/tiles/iceTiles1.png');
        this.load.image('iceTile2', '../ShrineLand/resources/tiles/iceTiles2.png');
        this.load.image('iceTile3', '../ShrineLand/resources/tiles/iceTiles3.png');
        this.load.image('crystal', '../ShrineLand/resources/tiles/iceCrystals.png');
    }


    create() {
        this.add.image(400, 300, 'ice');
        this.nCoins=0;
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(90, 568, 'iceTile1').setScale(2).refreshBody();
        this.platforms.create(435, 568, 'iceTile1').setScale(2).refreshBody();
        this.platforms.create(700, 400, 'iceTile3').setScale(2).refreshBody();
        this.platforms.create(350, 300, 'iceTile2').setScale(2).refreshBody();
        this.platforms.create(91, 131, 'iceTile3').setScale(2).refreshBody();

        this.enemies = this.physics.add.staticGroup();
        this.enemies.create(223, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(300, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(570, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(645, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(721, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(799, 568, 'crystal').setScale(2).refreshBody();
        this.enemies.create(750, 344, 'jackFrost').flipX = true;
        this.enemies.create(350, 244, 'jackFrost');

        this.popo = this.physics.add.sprite(100, 430, 'popo');
        this.popo.setBounce(0.2);
        this.popo.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('popo', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'popo', frame: 2}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('popo', {start: 3, end: 4}),
            frameRate: 10,
            repeat: -1
        });

        this.controls = this.input.keyboard.createCursorKeys();

        this.shrine = this.physics.add.staticGroup();
        this.shrine.create(45, 50, 'shrine');

        this.coins = this.physics.add.staticGroup();
        this.coins.create(250, 400, 'snowflake');
        this.coins.create(435, 450, 'snowflake');
        this.coins.create(600, 300, 'snowflake');
        this.coins.create(350, 150, 'snowflake');
        this.coins.create(210, 100, 'snowflake');

        this.coinsText = this.add.text(640, 16, 'coins: 0', {fontSize: '32px', fill: '#d17abb'});

        //colisões
        this.physics.add.collider(this.popo, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.popo, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.popo, this.shrine, this.reachShrine, null, this);
        this.physics.add.overlap(this.popo, this.coins, this.collectCoins, null, this);
    }

    update() {
        if (this.controls.left.isDown) {
            this.popo.setVelocityX(-160);
            this.popo.anims.play('left', true);
        } else if (this.controls.right.isDown) {
            this.popo.setVelocityX(160);
            this.popo.anims.play('right', true);
        } else {
            this.popo.setVelocityX(0);
            this.popo.anims.play('turn');
        }

        if (this.controls.up.isDown && this.popo.body.touching.down) {
            this.popo.setVelocityY(-330);
        }
    }


    collectCoins(popo, coins) {
        coins.disableBody(true, true);

        this.nCoins++;
        this.coinsText.setText('coins: ' + this.nCoins);
    }


    hitEnemies(popo, enemies) {
        this.physics.pause();
        this.popo.setTint(0xff0000);
        this.popo.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level3');
    }

    reachShrine(popo, shrine) {
        this.physics.pause();
        this.popo.setTint(0x0000ff);
        this.popo.anims.play('turn');
        this.gameOver = true;
        this.scene.start('CharacterMenu');
    }
}