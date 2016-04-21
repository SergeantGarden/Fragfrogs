/* 
 *  Copyright 2016 Hugo Mater
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
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
