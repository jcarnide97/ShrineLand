class Level5 extends Phaser.Scene {
    constructor() {
        super('Level5');
    }


    preload() {
        this.load.image('industrial', '../ShrineLand/resources/backgrounds/Industrial.png');
        this.load.image('industrialTile1', '../ShrineLand/resources/tiles/industrialTiles1.png');
        this.load.image('industrialTile2', '../ShrineLand/resources/tiles/industrialTiles2.png');
        this.load.image('industrialTile3', '../ShrineLand/resources/tiles/industrialTiles3.png');
        this.load.image('industrialTile4', '../ShrineLand/resources/tiles/industrialTiles4.png');
        this.load.image('acid', '../ShrineLand/resources/tiles/industrialAcid.png');
        this.load.image('spikes', '../ShrineLand/resources/tiles/industrialSpikes.png');
        this.load.spritesheet('megaMan', '../ShrineLand/resources/characters/megamanSheet.png', {frameWidth: 56, frameHeight: 58});
        this.load.image('shrine', '../ShrineLand/resources/logo/shrineDoor.png');
        this.load.image('screw', '../ShrineLand/resources/coins/screwdriver.png');
        this.load.spritesheet('yDevil', '../ShrineLand/resources/enemies/yellowDevilSheet.png', {frameWidth: 64, frameHeight: 50});

    }


    create() {
        this.add.image(800, 300, 'industrial');
        this.nCoins=0;
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(220, 568, 'industrialTile1').setScale(2).refreshBody();
        this.platforms.create(300, 420, 'industrialTile4').setScale(2).refreshBody();
        this.platforms.create(100, 320, 'industrialTile2').setScale(2).refreshBody();
        this.platforms.create(470, 190, 'industrialTile3').setScale(2).refreshBody();
        this.platforms.create(630, 230, 'industrialTile4').setScale(2).refreshBody();
        this.platforms.create(700, 270, 'industrialTile4').setScale(2).refreshBody();
        this.platforms.create(770, 310, 'industrialTile4').setScale(2).refreshBody();
        this.platforms.create(950, 500, 'industrialTile3').setScale(2).refreshBody();
        this.platforms.create(1200, 400, 'industrialTile2').setScale(2).refreshBody();
        this.platforms.create(1400, 300, 'industrialTile3').setScale(2).refreshBody();
        this.platforms.create(1550, 450, 'industrialTile3').setScale(2).refreshBody();

        this.others = this.physics.add.staticGroup();
        this.others.create(656, 568, 'acid').setScale(2).refreshBody();
        this.others.create(70, 289, 'spikes').setScale(1.5).refreshBody();
        this.others.create(1000, 568, 'acid').setScale(2).refreshBody();
        this.others.create(1400, 568, 'acid').setScale(2).refreshBody();
        this.others.create(770, 279, 'spikes').setScale(1.5).refreshBody();

        this.megaman = this.physics.add.sprite(110, 430, 'megaMan');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('megaMan', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'megaMan', frame: 5}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('megaMan', {start: 6, end: 10}),
            frameRate: 10,
            repeat: -1
        });

        this.shrine = this.physics.add.staticGroup();
        this.shrine.create(1480, 385, 'shrine');

        this.coins = this.physics.add.staticGroup();
        this.coins.create(200, 450, 'screw').setScale(0.7).refreshBody();
        this.coins.create(140, 270, 'screw').setScale(0.7).refreshBody();
        this.coins.create(470, 150, 'screw').setScale(0.7).refreshBody();
        this.coins.create(700, 230, 'screw').setScale(0.7).refreshBody();
        this.coins.create(950, 450, 'screw').setScale(0.7).refreshBody();
        this.coins.create(1200, 350, 'screw').setScale(0.7).refreshBody();
        this.coins.create(1400, 250, 'screw').setScale(0.7).refreshBody();

        this.coinsText = this.add.text(16, 16, 'coins: 0', {fontSize: '32px', fill: '#d17abb'});

        this.enemies = this.physics.add.sprite(400, 430, 'yDevil');

        this.anims.create({
            key: 'a',
            frames: this.anims.generateFrameNumbers('yDevil', {start: 0, end: 9}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'w',
            frames: [{key: 'yDevil', frame: 10}],
            frameRate: 20
        });
        this.anims.create({
            key: 'd',
            frames: this.anims.generateFrameNumbers('yDevil', {start: 10, end: 19}),
            frameRate: 20,
            repeat: -1
        });

        this.controlsC = this.input.keyboard.createCursorKeys();

        this.controlsE = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.physics.add.collider(this.megaman, this.platforms);
        this.physics.add.collider(this.megaman, this.others, this.hitEnemies, null, this);
        this.physics.add.collider(this.megaman, this.shrine,this.reachShrine, null, this);
        this.physics.add.overlap(this.megaman, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.megaman, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.enemies, this.others);

        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.megaman);
    }


    update() {
        if (this.controlsC.left.isDown) {
            this.megaman.setVelocityX(-160);
            this.megaman.anims.play('left', true);
        } else if (this.controlsC.right.isDown) {
            this.megaman.setVelocityX(160);
            this.megaman.anims.play('right', true);
        } else {
            this.megaman.setVelocityX(0);
            this.megaman.anims.play('turn');
        }

        if (this.controlsC.up.isDown && this.megaman.body.touching.down) {
            this.megaman.setVelocityY(-320);
        }

        if (this.controlsE.left.isDown) {
            this.enemies.setVelocityX(-160);
            this.enemies.anims.play('a', true);
        } else if (this.controlsE.right.isDown) {
            this.enemies.setVelocityX(160);
            this.enemies.anims.play('d', true);
        } else {
            this.enemies.setVelocityX(0);
            this.enemies.anims.play('w', true);
        }

        if (this.controlsE.up.isDown && this.enemies.body.touching.down) {
            this.enemies.setVelocityY(-320);
        }
    }


    collectCoins(megaman, coins) {
        coins.disableBody(true, true);

        this.nCoins++;
        this.coinsText.setText('coins: ' + this.nCoins);
    }

    hitEnemies(megaman, enemies) {
        this.physics.pause();
        this.megaman.setTint(0xff0000);
        this.megaman.anims.play('turnC');
        this.gameOver = true;
        this.scene.start('Level5');
    }


    reachShrine(megaman, shrine) {
        this.physics.pause();
        this.megaman.setTint(0x0000ff);
        this.megaman.anims.play('turnC');
        this.gameOver = true;
        this.scene.start('CharacterMenu');
    }

}