class Enemy extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/run.png",
            frames: { max: 6 },
            img: { width: 90, height: 150 },
            offset: { x: 0, y: -50 },
        });
        this.isDead = false;
        this.randomEnemyFlyDirection = Math.floor(Math.random() * 2);
        this.width = 100;
        this.height = 100;
        this.healthBarWidth = 100;
        this.radius = 50;
        this.waypointIndex = 1;
        this.health = 280;
        this.healthBar = this.health;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
    }
    draw() {
        super.draw();
        if (this.health > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x, this.position.y - 15 + this.offset.y, this.healthBarWidth, 10);
            ctx.fillStyle = "green";
            ctx.fillRect(
                this.position.x,
                this.position.y - 15 + this.offset.y,
                (this.healthBarWidth * this.health) / this.healthBar,
                10
            );
        }
    }
    update() {
        this.draw();
        super.update();
        const waypoint = waypoints[this.waypointIndex];
        let yDistance = waypoint.y - this.center.y;
        let xDistance = waypoint.x - this.center.x;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
        const angle = Math.atan2(yDistance, xDistance);
        this.position.x += Math.cos(angle) * enemy1Speed;
        this.position.y += Math.sin(angle) * enemy1Speed;
        if (
            this.center.x > waypoint.x - 30 &&
            this.center.x < waypoint.x + 30 &&
            this.center.y > waypoint.y - 30 &&
            this.center.y < waypoint.y + 30 &&
            this.waypointIndex < waypoints.length
        ) {
            this.waypointIndex++;
        }
    }
}

class Enemy2 extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/run2.png",
            frames: { max: 6 },
            img: { width: 90, height: 150 },
            offset: { x: 0, y: -50 },
        });
        this.isDead = false;
        this.randomEnemyFlyDirection = Math.floor(Math.random() * 2);
        this.width = 100;
        this.height = 100;
        this.healthBarWidth = 100;
        this.radius = 50;
        this.waypointIndex = 1;
        this.health = 800;
        this.healthBar = this.health;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
    }
    draw() {
        super.draw();
        if (this.health > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x, this.position.y - 15 + this.offset.y, this.healthBarWidth, 10);
            ctx.fillStyle = "green";
            ctx.fillRect(
                this.position.x,
                this.position.y - 15 + this.offset.y,
                (this.healthBarWidth * this.health) / this.healthBar,
                10
            );
        }
    }
    update() {
        this.draw();
        super.update();
        const waypoint = waypoints[this.waypointIndex];
        let yDistance = waypoint.y - this.center.y;
        let xDistance = waypoint.x - this.center.x;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
        const angle = Math.atan2(yDistance, xDistance);
        this.position.x += Math.cos(angle) * enemy2Speed;
        this.position.y += Math.sin(angle) * enemy2Speed;
        if (
            this.center.x > waypoint.x - 30 &&
            this.center.x < waypoint.x + 30 &&
            this.center.y > waypoint.y - 30 &&
            this.center.y < waypoint.y + 30 &&
            this.waypointIndex < waypoints.length
        ) {
            this.waypointIndex++;
        }
    }
}

class Enemy3 extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/run3.png",
            frames: { max: 8 },
            img: { width: 90, height: 150 },
            offset: { x: 0, y: -50 },
        });
        this.isDead = false;
        this.randomEnemyFlyDirection = Math.floor(Math.random() * 2);
        this.width = 100;
        this.height = 100;
        this.healthBarWidth = 100;
        this.radius = 50;
        this.waypointIndex = 1;
        this.health = 3000;
        this.healthBar = this.health;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
    }
    draw() {
        super.draw();
        if (this.health > 0) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x, this.position.y - 15 + this.offset.y, this.healthBarWidth, 10);
            ctx.fillStyle = "green";
            ctx.fillRect(
                this.position.x,
                this.position.y - 15 + this.offset.y,
                (this.healthBarWidth * this.health) / this.healthBar,
                10
            );
        }
    }
    update() {
        this.draw();
        super.update();
        const waypoint = waypoints[this.waypointIndex];
        let yDistance = waypoint.y - this.center.y;
        let xDistance = waypoint.x - this.center.x;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2,
        };
        const angle = Math.atan2(yDistance, xDistance);
        this.position.x += Math.cos(angle) * enemy3Speed;
        this.position.y += Math.sin(angle) * enemy3Speed;
        if (
            this.center.x > waypoint.x - 30 &&
            this.center.x < waypoint.x + 30 &&
            this.center.y > waypoint.y - 30 &&
            this.center.y < waypoint.y + 30 &&
            this.waypointIndex < waypoints.length
        ) {
            this.waypointIndex++;
        }
    }
}

class Mage extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/standandshoot.png",
            frames: { max: 30 },
            offset: { x: -27, y: -30 },
            img: { width: 115, height: 115 },
        });
        this.size = 64;
        this.center = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2,
        };
        this.fireballs = [];
        this.explosions = [];
        this.radius = 40;
        this.detectRadius = 500;
        this.target;
        this.fireballnimationTimer = 0;
    }

    shoot() {
        const fireballAudio = new Audio("./audio/fireball.mp3");
        fireballAudio.volume = 0.4;
        fireballAudio.play();

        this.fireballs.push(
            new Fireball({
                position: { x: this.center.x, y: this.center.y },
                enemy: this.target,
            })
        );
    }
    update() {
        super.draw();
        if (this.target || (!this.target && this.frames.current > 21)) {
            super.update();
        }
        if (this.target && this.frameIndex % fireballSpeed === 0 && this.frames.current === 25) {
            this.shoot();
        }
    }
}

class Mage2 extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/standandshoot2.png",
            frames: { max: 14 },
            offset: { x: -27, y: -30 },
            img: { width: 115, height: 115 },
        });
        this.size = 64;
        this.center = {
            x: this.position.x + this.size / 2,
            y: this.position.y + this.size / 2,
        };
        this.lightnings = [];
        this.explosions = [];
        this.radius = 40;
        this.detectRadius = 500;
        this.target;
        this.fireballnimationTimer = 0;
    }

    shoot() {
        this.lightnings.push(
            new Lightning({
                position: { x: this.center.x, y: this.center.y },
                enemy: this.target,
            })
        );
    }
    update() {
        super.draw();
        if (this.target || (!this.target && this.frames.current > 1)) {
            super.update();
        }
        if (this.target && this.frameIndex % 6 === 0) {
            this.shoot();
        }
    }
}

class MagePlace {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position;
        this.size = 64;
        this.isOccupied = false;
        this.color = "rgba(255,255,255, 0.4)";
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size - 2, this.size - 2);
    }
    update(mouse) {
        this.draw();
        if (
            mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size
        ) {
            this.color = "rgba(255,255,255, 0.8)";
        } else {
            this.color = "rgba(255,255,255, 0.4)";
        }
    }
}

class Fireball extends Skin {
    constructor({ position = { x: 0, y: 0 }, enemy }) {
        super({
            position,
            imageSrc: "./img/fireball2.png",
            frames: { max: 1 },
            offset: { x: -80, y: -50 },
            img: { width: 100, height: 100 },
        });
        this.radius = 20;
        this.width = 40;
        this.height = 40;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.enemy = enemy;
        this.power = 40;
    }
    update() {
        if (!this.enemy.isDead) {
            this.draw();
            const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x);
            this.velocity.x = Math.cos(angle) * this.power;
            this.velocity.y = Math.sin(angle) * this.power;

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}

class Explosion extends Skin {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "./img/explosion.png",
            frames: { max: 12 },
            offset: { x: -20, y: -20 },
            img: { width: 100, height: 100 },
        });
    }
    update() {
        super.draw();
        super.update();
    }
}

class Lightning extends Skin {
    constructor({ position = { x: 0, y: 0 }, enemy }) {
        super({
            position,
            imageSrc: "./img/lightning.png",
            frames: { max: 13 },
            offset: { x: -80, y: -50 },
            img: { width: 50, height: 50 },
        });
        this.radius = 10;
        this.width = 20;
        this.height = 20;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.enemy = enemy;
        this.power = 40;
    }
    update() {
        if (!this.enemy.isDead) {
            lightningAudio.play();
            this.draw();
            super.update();
            const angle = Math.atan2(this.enemy.center.y - this.position.y, this.enemy.center.x - this.position.x);
            this.velocity.x = Math.cos(angle) * this.power;
            this.velocity.y = Math.sin(angle) * this.power;

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }
}
