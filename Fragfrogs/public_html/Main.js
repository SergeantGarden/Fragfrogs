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
    /* BUG: CANNOT INITIATE MORE THAN ONE ENGINE
     * possibly scheduleframe??                                         
     */
    $.getScript("engine/Engine.js", function() 
    {
        /*var engineOne = new Engine({x: 400, y: 320 }, "Temp");
        engineOne.onLoaded(function() {
            var scene = new Scene();
            scene.Draw = function(context)
            {
                context.save();
                context.fillStyle = "black";
                context.fillRect(100,100, 200, 200);
                context.restore();
            };
            engineOne.Start(scene);
        });*/
        
        var scene = null;
        var engine = new Engine({x: 400, y: 320 }, "Fragfrogs");
        engine.Resize({x: 800, y: 640});
        engine.PreloadScripts("game/MenuScene.js, game/EndScene.js, game/GameScene.js, game/Tongue.js, game/Player.js, game/Crop.js, game/Coin.js, game/Fly.js, game/WallBlock.js, game/ScoreBar.js");
        engine.PreloadAssets("BG:images/bg.png, PlayerGreen:images/player.png, PlayerRed:images/playerred.png, PlayerBlue:images/playerblue.png, PlayerBrown:images/playerbrown.png, \n\
        PlayerGray:images/playergray.png, PlayerPink:images/playerpink.png, PlayerSkyBlue:images/playerskyblue.png, PlayerYellow:images/playeryellow.png, Glow:images/tongueGlow.png, \n\
        Wall:images/WallBlock.png, Crop:images/crop.png, Coin:images/coin.png, Fly:images/fly.png, Leaf:images/blaatjeparticle.png, TongueBody:images/tongue.png, TongueEnd:images/tongueEnd.png, \n\
        GameSound:audio/In-game.mp3, Coin:audio/coin.mp3, Dash:audio/dash.mp3, Die:audio/die.mp3, Fly:audio/fly.mp3, Tongue:audio/tongue.mp3, MainLogo:images/logoFrog.png, Continue:images/continue.png, \n\
        Controls:images/controls.png, Instructions:images/instructions.png, Start:images/startButton.png, Arrow:images/pijl.png, ChoiceGreen:images/keuzegreen.png, ChoiceRed:images/keuzered.png, \n\
        ChoiceBlue:images/keuzeblauw.png, ChoiceBrown:images/keuzebrown.png, ChoiceGray:images/keuzegray.png, ChoicePink:images/keuzepink.png, ChoiceSkyBlue:images/keuzeskyblue.png, ChoiceYellow:images/keuzeyellow.png, \n\
        ChoicePlayerOne:images/p1.png, ChoicePlayerTwo:images/p2.png, Menu:audio/menu.mp3, Winner:audio/winner.mp3");
        engine.onLoaded(function() {
            scene = new MenuScene(engine);
            engine.Start(scene);
            
            /*var engineOne = new Engine({x: 400, y: 320 }, "Temp");
            engineOne.onLoaded(function() {
                var scene = new Scene();
                scene.Draw= function(context)
                {
                    context.save();
                    context.fillStyle = "black";
                    context.fillRect(100,100, 200, 200);
                    context.restore();
                };
                engineOne.Start(scene);
            });*/
        });
        
        /*var engineTwo = new Engine({x: 400, y: 320 }, "Temp");
        engineTwo.onLoaded(function() {
            engineTwo.Start(new Scene());
        });*/
    });
};
