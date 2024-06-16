const app = new PIXI.Application({ width: 960, height: 540});
document.body.appendChild(app.view);
PIXI.Assets.load([
    "../character.json",
    "scene/background.png"
]).then(() => {
    const background = PIXI.Sprite.from("scene/background.png");
    app.stage.addChild(background);
    const middleground = PIXI.Sprite.from("scene/middleground.png");
    app.stage.addChild(middleground);
    
    // scale stage container to match the background size
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    const animations = PIXI.Assets.cache.get('../character.json').data.animations;
    const character = PIXI.AnimatedSprite.fromFrames(animations["character/walk"]);
    character.animationSpeed = 1 / 6;
    character.position.set(150, background.height - 780);
    character.play();
    app.stage.addChild(character)
    console.log(character.x, character.y);

    app.ticker.add(delta => {
        const speed = 6;
        character.x = (character.x + speed * delta + 400) % (background.width + 800) - 400;
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            character.y -= 50;
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            character.y += 50;
        }
    });
});