class Level4 extends Phaser.Scene{
    constructor(){
        super('Level4');
    }

    preload() {
        this.nCoins=0;
        this.load.image('cemetery', '../ShrineLand/resources/backgrounds/Cemetery.png');
        this.load.spritesheet('zaraG', '../ShrineLand/resources/characters/zaraGSheet.png', {frameWidth: 85, frameHeight: 96});
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

        this.zarag = this.physics.add.sprite(110, 430, 'zaraG');

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

        this.physics.add.collider(this.zarag, this.platforms);
        this.physics.add.collider(this.zarag, this.objects, this.hitEnemies, null, this);
        this.physics.add.collider(this.zarag, this.shrine, this.reachShrine, null, this);
        this.physics.add.overlap(this.zarag, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.zarag, this.enemies, this.hitEnemies, null, this);
        this.physics.add.collider(this.enemies, this.platforms);

        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.zarag);

    }

    update() {
        if (this.controls.left.isDown) {
            this.zarag.setVelocityX(-160);
            this.zarag.anims.play('left', true);
        } else if (this.controls.right.isDown) {
            this.zarag.setVelocityX(160);
            this.zarag.anims.play('right', true);
        } else {
            this.zarag.setVelocityX(0);
            this.zarag.anims.play('turn');
        }

        if (this.controls.up.isDown && this.zarag.body.touching.down) {
            this.zarag.setVelocityY(-320);
        }
    }
    spawnEnemie(zarag, enemies) {
        this.enemies.create(400, 100, 'boo');
        this.enemies.create(1000, 100, 'boo');
        this.enemies.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    collectCoins(zarag, coins) {
        coins.disableBody(true, true);

        this.nCoins++;
        this.coinsText.setText('coins: ' + this.nCoins);
        this.spawnEnemie(this.zarag, this.enemies);
    }

    hitEnemies(zarag, enemies) {
        this.physics.pause();
        this.zarag.setTint(0xff0000);
        this.zarag.anims.play('turn');
        this.gameOver = true;
        this.scene.start('Level4')
    }


    reachShrine(zarag, shrine) {
        this.physics.pause();
        this.zarag.setTint(0x0000ff);
        this.zarag.anims.play('turn');
        this.gameOver = true;
        this.scene.start('CharacterMenu')
    }

}