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
        var engine = Engine({x: 400, y: 320 }, "Fragfrogs");
        engine.PreloadScripts("game/GameScene.js, game/Tongue.js, game/Player.js, game/Crop.js, game/Coin.js, game/Fly.js, game/ScoreBar.js");
        engine.PreloadAssets("BG:images/bg.png, PlayerGreen:images/player.png, PlayerRed:images/playerred.png, PlayerBlue:images/playerblue.png, Glow:images/tongueGlow.png, Wall:images/WallBlock.png, Crop:images/crop.png, Coin:images/coin.png, Fly:images/fly.png, Leaf:images/blaatjeparticle.png, TongueBody:images/tongue.png, TongueEnd:images/tongueEnd.png");
        engine.onLoaded(function() {
            engine.Resize({x: 600, y: 480});
            scene = new GameScene(engine, "PlayerGreen", "PlayerRed");
            engine.Start(scene);
        });
    });
};
