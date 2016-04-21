/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function(e)
{
    /* BUG: CANNOT INITIATE MORE THAN ONE ENGINE*/
    $.getScript("engine/Engine.js", function() 
    {
        var scene = null;
        var engine = Engine({x: 800, y: 400}, "Fragfrogs");
        engine.PreloadAssets("BG:images/bg.png, Player:images/player.png");
        engine.onLoaded(function() {
            scene = new Scene();
            engine.Start(scene);
            scene.AddGameObject(new GameObject(new Vector(200,144), 0, new Vector(1,1), new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["BG"])), "background");
            var animation = new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Player"], new Vector(16,16));
            animation.AddAnimation("walk", [1,5,1,5]);
            scene.AddGameObject(new GameObject(new Vector(10,10), 0, new Vector(1,1), animation), "game");
        });
    });
};
