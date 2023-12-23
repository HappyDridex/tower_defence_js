const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gameResultDisplay = document.getElementById('gameResult');
const maxWaveNumber = 10;
const maxWaveNumberDisplay = document.getElementById('maxWaveNumber');
maxWaveNumberDisplay.innerHTML = maxWaveNumber;

const waveNumberDisplay = document.getElementById('waveNumber');
let waveNumber = 1;
waveNumberDisplay.innerHTML = waveNumber;

const playerHPDisplay = document.getElementById('healthCount');
let playerHP = 10;
playerHPDisplay.innerHTML = playerHP;

const playerCoinsDisplay = document.getElementById('coinCount');
let playerCoins = 1000;
playerCoinsDisplay.innerHTML = playerCoins;

canvas.width = 1920;
canvas.height = 1088;

const backgroundAudio = new Audio('./audio/backgroundAudio.mp3');
backgroundAudio.loop = true;
const lightningAudio = new Audio('./audio/lightningaudio.mp3');
lightningAudio.volume = 0.2;

const mouse = {
    x: undefined,
    y: undefined,
};
const magePlaceHover = [];
const magePlaces2D = [];
const enemies = [];
const deadEnemies = [];
const mages = [];
const startEnemiesAmount = 5;
const mageCost = 50;
let enemyIncreaseIndex = 0;
const mageChosen = {
    fireMage: false,
    lightningMage: false,
};
let enemy1Speed = 3;
let enemy2Speed = 2;
let enemy3Speed = 1;
const fireballSpeed = 3;
let maxEnemySpeed = 10;
let activeMagePlace = undefined;
const map = new Image();
map.src = './img/map2.png';

map.onload = () => {
    animate();
};

function findMagePlaces() {
    for (let i = 0; i < magePlaces.length; i += 30) {
        magePlaces2D.push(magePlaces.slice(i, i + 30));
    }
}
findMagePlaces();

function createMagePlaces() {
    magePlaces2D.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            if (square === 14) {
                magePlaceHover.push(
                    new MagePlace({
                        position: { x: squareIndex * 64, y: rowIndex * 64 },
                    })
                );
            }
        });
    });
}
createMagePlaces();

function spawnFirstWave() {
    for (let i = 0; i < startEnemiesAmount; i++) {
        const offSet = i * 300;
        enemies.push(
            new Enemy({
                position: { x: waypoints[0].x - offSet, y: waypoints[0].y },
                randomEnemyFlyDirection: Math.floor(Math.random() * 2),
            })
        );
    }
    const crowdAudio = new Audio('./audio/crowd.mp3');
    crowdAudio.volume = 0.3;
    crowdAudio.play();
}
spawnFirstWave();

function enemyMove() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        const random = Math.random() * 15;
        enemy.update();
        if (enemy.health <= 0) {
            enemy.isDead = true;
            if (enemy.randomEnemyFlyDirection === 1) {
                enemy.position.x -= 40;
                enemy.position.y -= random;
            }
            if (enemy.randomEnemyFlyDirection === 0) {
                enemy.position.x -= 40;
                enemy.position.y += random;
            }
        }
        if ((enemy.health <= 0 && enemy.position.x < 0) || enemy.position.y < 0 || enemy.position.y > canvas.height) {
            playerCoins += 30;
            playerCoinsDisplay.innerHTML = playerCoins;
            enemies.splice(i, 1);
        }
        if (enemy.position.x > canvas.width) {
            enemies.splice(i, 1);
            playerHP -= 1;
            playerHPDisplay.innerHTML = playerHP;
        }
    }
}

function placeMages() {
    magePlaceHover.forEach((magePlace) => magePlace.update(mouse));
    mages.forEach((mage) => {
        mage.update();
        mage.target = null;
        const validTarget = enemies.filter((enemy) => {
            const xDistance = enemy.center.x - mage.center.x;
            const yDistance = enemy.center.y - mage.center.y;
            const distance = Math.hypot(xDistance, yDistance);
            return distance < mage.detectRadius + enemy.radius;
        });
        mage.target = validTarget[0];

        if (mage.fireballs) {
            for (let i = mage.fireballs.length - 1; i >= 0; i--) {
                const fireball = mage.fireballs[i];
                fireball.update();
                const xDistance = fireball.enemy.center.x - fireball.position.x;
                const yDistance = fireball.enemy.center.y - fireball.position.y;
                const distance = Math.hypot(xDistance, yDistance);
                if (fireball.enemy.health <= 0) {
                    mage.fireballs.splice(i, 1);
                }
                if (distance <= fireball.enemy.radius) {
                    mage.fireballs.splice(i, 1);
                    fireball.enemy.health -= 21;
                    mage.explosions.push(
                        new Explosion({
                            position: { x: fireball.position.x, y: fireball.position.y },
                        })
                    );
                }
                if (distance <= fireball.enemy.radius && fireball.enemy.health <= 0) {
                    const enemyHitAudio = new Audio('./audio/enemyhit.mp3');
                    enemyHitAudio.volume = 0.2;
                    enemyHitAudio.play();
                }
            }
            for (let i = mage.explosions.length - 1; i >= 0; i--) {
                const explosion = mage.explosions[i];
                explosion.update();
                if (explosion.frames.current === explosion.frames.max - 1) {
                    mage.explosions.splice(i, 1);
                }
            }
        }

        if (mage.lightnings) {
            for (let i = mage.lightnings.length - 1; i >= 0; i--) {
                const lightning = mage.lightnings[i];
                lightning.update();
                const xDistance = lightning.enemy.center.x - lightning.position.x;
                const yDistance = lightning.enemy.center.y - lightning.position.y;
                const distance = Math.hypot(xDistance, yDistance);
                if (lightning.enemy.health <= 0) {
                    mage.lightnings.splice(i, 1);
                }
                if (distance <= lightning.enemy.radius) {
                    mage.lightnings.splice(i, 1);
                    lightning.enemy.health -= 2.2;
                }
                if (distance <= lightning.enemy.radius && lightning.enemy.health <= 0) {
                    const enemyHitAudio = new Audio('./audio/enemyhit.mp3');
                    enemyHitAudio.volume = 0.2;
                    enemyHitAudio.play();
                }
            }
        }
    });
}

function newWave() {
    if (waveNumber < maxWaveNumber) {
        if (enemies.length === 0) {
            enemyIncreaseIndex++;
            if (enemy1Speed < maxEnemySpeed && enemy2Speed < maxEnemySpeed) {
                enemy1Speed++;
                enemy2Speed++;
            }
            for (let i = 0; i < startEnemiesAmount + enemyIncreaseIndex; i++) {
                const offSet = i * 400;
                enemies.push(
                    new Enemy({
                        position: { x: waypoints[0].x - offSet, y: waypoints[0].y },
                    })
                );
                enemies.push(
                    new Enemy2({
                        position: { x: waypoints[0].x - offSet - 200, y: waypoints[0].y },
                    })
                );
            }
            if (waveNumber % 2 === 0) {
                enemies.push(
                    new Enemy3({
                        position: { x: waypoints[0].x, y: waypoints[0].y },
                    })
                );
                const allahAudio = new Audio('./audio/allah.mp3');
                allahAudio.volume = 0.2;
                allahAudio.play();
            }
            waveNumber++;
            waveNumberDisplay.innerHTML = waveNumber;
            const crowdAudio = new Audio('./audio/crowd.mp3');
            crowdAudio.volume = 0.3;
            crowdAudio.play();
        }
    }
}

function reset() {
    const gameLoop = requestAnimationFrame(animate);
    if (playerHP === 0) {
        cancelAnimationFrame(gameLoop);
        document.getElementById('gameOver').style.display = 'block';
        gameResultDisplay.innerHTML = 'TERRORISTS WIN';
    }
    if (waveNumber === maxWaveNumber && enemies.length === 0) {
        cancelAnimationFrame(gameLoop);
        document.getElementById('gameOver').style.display = 'block';
        gameResultDisplay.innerHTML = 'MAGES WIN';
    }
}

function animate() {
    reset();
    ctx.drawImage(map, 0, 0);
    newWave();
    enemyMove();
    placeMages();
}

addEventListener('mousemove', (e) => {
    backgroundAudio.play();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    for (let i = 0; i < magePlaceHover.length; i++) {
        const magePlace = magePlaceHover[i];
        if (
            mouse.x > magePlace.position.x &&
            mouse.x < magePlace.position.x + magePlace.size &&
            mouse.y > magePlace.position.y &&
            mouse.y < magePlace.position.y + magePlace.size
        ) {
            activeMagePlace = magePlace;
            break;
        }
    }
});

fireMage.addEventListener('click', () => {
    fireMage.style.background = 'green';
    lightningMage.style.background = 'black';
    mageChosen.fireMage = true;
    mageChosen.lightningMage = false;
});
lightningMage.addEventListener('click', () => {
    lightningMage.style.background = 'green';
    fireMage.style.background = 'black';
    mageChosen.lightningMage = true;
    mageChosen.fireMage = false;
});

addEventListener('click', () => {
    if (
        mouse.x <= canvas.width &&
        mageChosen.fireMage &&
        activeMagePlace &&
        !activeMagePlace.isOccupied &&
        playerCoins >= mageCost
    ) {
        playerCoins -= mageCost;
        playerCoinsDisplay.innerHTML = playerCoins;
        mages.push(
            new Mage({
                position: {
                    x: activeMagePlace.position.x,
                    y: activeMagePlace.position.y,
                },
            })
        );
        activeMagePlace.isOccupied = true;
        mages.sort((a, b) => {
            return a.position.y - b.position.y;
        });
    }
    if (
        mouse.x <= canvas.width &&
        mageChosen.lightningMage &&
        activeMagePlace &&
        !activeMagePlace.isOccupied &&
        playerCoins >= mageCost
    ) {
        playerCoins -= mageCost;
        playerCoinsDisplay.innerHTML = playerCoins;
        mages.push(
            new Mage2({
                position: {
                    x: activeMagePlace.position.x,
                    y: activeMagePlace.position.y,
                },
            })
        );
        activeMagePlace.isOccupied = true;
        mages.sort((a, b) => {
            return a.position.y - b.position.y;
        });
    }
});
