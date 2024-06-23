const app = new PIXI.Application({ width: 960, height: 540});
document.body.appendChild(app.view);
PIXI.Assets.load(["../character.json", "scene/background.png"]).then(() => {
    const background = PIXI.Sprite.from("scene/background.png");
    app.stage.addChild(background);
    const middleground = PIXI.Sprite.from("scene/middleground.png");
    app.stage.addChild(middleground);

    // const bo = PIXI.Sprite.from("Bo.png")
    // bo.position.set(1400, 310);
    // app.stage.addChild(bo);
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    const animations = PIXI.Assets.cache.get('../character.json').data.animations;
    const character = PIXI.AnimatedSprite.fromFrames(animations["character/walk"]);
    character.animationSpeed = 1 / 6;
    character.position.set(150, background.height - 780);
    app.stage.addChild(character)
    
    let isMoving = false;
    const movementSpeed = 6;

    // Event listener for keydown events
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') character.y -= 50;
        if (event.key === 'ArrowDown') character.y += 50;
        if (event.key === '0') character.x = 0;
        if (event.key === 'ArrowRight') {
            isMoving = true;
            character.play();
        } else if (event.key === 'ArrowLeft') {
            isMoving = false;
            character.stop();
            character.x -= 50;
        }
    });
    app.ticker.add(delta => {
        if (isMoving) {
            character.x = (character.x + movementSpeed * delta + 400) % (background.width + 800) - 400;
            // if (character.x >= 1100) {
            //     character.stop();
            //     isMoving = false;
            // }
        }
    });

        // Function to resize the canvas and scale the stage
        function resize() {
            const parent = app.view.parentNode;
            app.renderer.resize(parent.clientWidth, parent.clientHeight);
    
            const scaleX = parent.clientWidth / background.width;
            const scaleY = parent.clientHeight / background.height;
    
            const scale = Math.min(scaleX, scaleY);
            app.stage.scale.set(scale);
    
            background.x = (app.screen.width - background.width * scale) / 2;
            background.y = (app.screen.height - background.height * scale) / 2;
        }
    
        // Add event listener to handle window resize
        window.addEventListener('resize', resize);
    
        // Initial resize to set up the canvas correctly
        resize();

});