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
        /*var engine2 = new Engine({x: 100, y: 100}, "TestGame");
        engine2.onLoaded(function()
        {
            engine2.Start(new Scene());
        });*/
        
        var scene = null;
        var engine = new Engine({x: 800, y: 400}, "Fragfrogs");
        engine.PreloadAssets(["BG:images/bg.png"]);
        engine.onLoaded(function() {
            scene = new Scene();
            engine.Start(scene);
            scene.AddGameObject(new GameObject(new Vector(0,0), 0, new Vector(1,1), Engine.currentGame["Fragfrogs"].gameAssets["BG"]), "game");
        });
    });
};
