class Level4s extends Phaser.Scene{
    constructor(){
        super('Level4s');
    }

    preload() {
        this.nCoins=0;
        this.load.image('cemetery', '../ShrineLand/resources/backgrounds/Cemetery.png');
        this.load.spritesheet('zaraG', '../ShrineLand/resources/characters/zaraGSheet.png', {frameWidth: 83.9, frameHeight: 68});
        this.load.image('leaf', '../ShrineLand/resources/coins/goldenLeaf.png');
        this.load.image('boo', '../ShrineLand/resources/enemies/booNoSheet.png');
        this.load.image('shrine', '../ShrineLand/resources/logo/shrineDoor.png');
        this.load.image('bush', '../ShrineLand/resources/tiles/cemeteryBush.png');
        this.load.image('skeleton', '../ShrineLand/resources/tiles/cemeterySkeleton.png');
        this.load.image('cemeteryTile1', '../ShrineLand/resources/tiles/cemeteryTiles1.png');
        this.load.image('cemeteryTile2', '../ShrineLand/resources/tiles/cemeteryTiles2.png');
        this.load.image('cemeteryTile3', '../ShrineLand/resources/tiles/cemeteryTiles3.png');
    }


    create() {
        this.add.image(800, 300, 'cemetery');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(154, 568, 'cemeteryTile1').setScale(2).refreshBody();
        this.platforms.create(250, 400, 'cemeteryTile2').setScale(2).refreshBody();
        this.platforms.create(70, 230, 'cemeteryTile2').setScale(2).refreshBody();
        this.platforms.create(580, 568, 'cemeteryTile1').setScale(2).refreshBody();
        this.platforms.create(580, 235, 'cemeteryTile3').setScale(2).refreshBody();
        this.platforms.create(1110, 568, 'cemeteryTile1').setScale(2).refreshBody();
        this.platforms.create(1300, 400, 'cemeteryTile2').setScale(2).refreshBody();
        this.platforms.create(1505, 230, 'cemeteryTile3').setScale(2).refreshBody();

        this.objects = this.physics.add.staticGroup();
        this.objects.create(200, 521, 'skeleton');
        this.objects.create(370, 568, 'bush').setScale(2).refreshBody();
        this.objects.create(30, 521, 'skeleton').flipX = true;
        this.objects.create(600, 521, 'skeleton');
        this.objects.create(790, 568, 'bush').setScale(2).refreshBody();
        this.objects.create(900, 568, 'bush').setScale(2).refreshBody();
        this.objects.create(1000, 521, 'skeleton').flipX = true;
        this.objects.create(1200, 521, 'skeleton');
        this.objects.create(1325, 568, 'bush').setScale(2).refreshBody();
        this.objects.create(1440, 568, 'bush').setScale(2).refreshBody();
        this.objects.create(1550, 568, 'bush').setScale(2).refreshBody();

        this.characterZ = this.physics.add.sprite(110, 430, 'zaraG');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('zaraG', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'zaraG', frame: 6}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('zaraG', {start: 7, end: 12}),
            frameRate: 10,
            repeat: -1
        });

        this.controls = this.input.keyboard.createCursorKeys();

        this.shrine = this.physics.add.staticGroup();
        this.shrine.create(1550, 149, 'shrine');

        this.coins = this.physics.add.staticGroup();
        this.coins.create(110, 350, 'leaf');
        this.coins.create(250, 300, 'leaf');
        this.coins.create(70, 150, 'leaf');
        this.coins.create(20, 150, 'leaf');
        this.coins.create(120, 150, 'leaf');
        this.coins.create(580, 450, 'leaf');
        this.coins.create(790, 200, 'leaf');
        this.coins.create(1110, 450, 'leaf');
        this.coins.create(1350, 300, 'leaf');

        this.coinsText = this.add.text(16, 16, 'coins: 0', {fontSize: '32px', fill: '#d17abb'});

        this.enemies = this.physics.add.group();

        this.physics.add.collider(this.characterZ, this.platforms);
        this.physics.add.collider(this.characterZ, this.objects, this.hitEnemies, null, this);
        this.physics.add.collider(this.characterZ, this.shrine, this.reachShrine, null, this);
        this.physics.add.overlap(this.characterZ, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.characterZ, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.enemies, this.platforms);

        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.characterZ);

    }

    update() {
        if (this.controls.left.isDown) {
            this.characterZ.setVelocityX(-160);
            this.characterZ.anims.play('left', true);
        } else if (this.controls.right.isDown) {
            this.characterZ.setVelocityX(160);
            this.characterZ.anims.play('right', true);
        } else {
            this.characterZ.setVelocityX(0);
            this.characterZ.anims.play('turn');
        }

        if (this.controls.up.isDown && this.characterZ.body.touching.down) {
            this.characterZ.setVelocityY(-320);
        }
    }
    spawnEnemie(characterZ, enemies) {
        this.enemies.create(400, 100, 'boo');
        this.enemies.create(1000, 100, 'boo');
        this.enemies.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    collectCoins(characterZ, coins) {
        coins.disableBody(true, true);

        this.nCoins++;
        this.coinsText.setText('coins: ' + this.nCoins);
        this.spawnEnemie(this.characterZ, this.enemies);
    }

    hitEnemies(characterZ, enemies) {
        this.physics.pause();
        this.characterZ.setTint(0xff0000);
        this.characterZ.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level1s')
    }


    reachShrine(characterZ, shrine) {
        this.physics.pause();
        this.characterZ.setTint(0x0000ff);
        this.characterZ.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level5s')
    }

}
