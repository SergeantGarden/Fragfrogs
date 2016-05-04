/* 
 * Copyright 2016 Hugo Mater.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function MenuScene(engine)
{
    Scene.call(this);
    
    var levelChosen = -1;
    var playerOneChoice = "None";
    var playerTwoChoice = "None";
    
    var fragfrogsLogo = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["MainLogo"]);
    var startButton = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Start"]);
    var instructionButton = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Instructions"]);
    var instructionsImage = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Controls"]);
    
    var arrow = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Arrow"]);
    
    var optionGreen = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceGreen"]);
    var optionRed = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceRed"]);
    var optionBlue = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceBlue"]);
    var optionBrown = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceBrown"]);
    var optionGray = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceGray"]);
    var optionPink = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoicePink"]);
    var optionSkyBlue = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceSkyBlue"]);
    var optionYellow = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceYellow"]);
    
    var p1 = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoicePlayerOne"]);
    var p2 = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoicePlayerTwo"]);
    
    var playerChoiceOne = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceGreen"]);
    var playerChoiceTwo = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["ChoiceBrown"]);
    
    MenuScene.prototype.Update = function(input, dt)
    {
        if(input.keyboard.keyDown(KEY_CODE.SPACE))
        {
            var scene = new GameScene(engine, "PlayerGreen", "PlayerRed", 1);
            engine.switchScene(scene, true);
        }
    };
    
    MenuScene.prototype.Draw = function(context)
    {
        context.save();
        context.fillStyle = "black";
        context.fillRect(0, 0, Engine.currentGame[engine.gameTitle].originalResolution.x, Engine.currentGame[engine.gameTitle].originalResolution.y);
        context.restore();
        
        //DrawMainMenu(context);
        //DrawControls(context);
        //DrawLevelChoice(context);
        //DrawPlayerChoice(context);
        //DrawReadyCheck(context);
    };
    
    function DrawMainMenu(context)
    {
        fragfrogsLogo.Draw(context, new Vector(200,50), 0, new Vector(1,1));
        startButton.Draw(context, new Vector(200,150), 0, new Vector(1,1));
        instructionButton.Draw(context, new Vector(200,200), 0, new Vector(1,1));
    };
    
    function DrawLevelChoice(context)
    {
        arrow.Draw(context, new Vector(370, 110), 0, new Vector(0.5,1));
        arrow.Draw(context, new Vector(30, 110), 180, new Vector(0.5,1));
        
        context.save();
        context.font = "10px Arial";
        context.fillStyle = "white";
        context.fillText("Press A/Left or D/Right to change map", 110, 210);
        context.restore();
        
        startButton.Draw(context, new Vector(200,260), 0, new Vector(1,1));
    };
    
    function DrawPlayerChoice(context)
    {
        startButton.Draw(context, new Vector(200,260), 0, new Vector(1,1));
        
        optionGreen.Draw(context, new Vector(146,110), 0, new Vector(1,1));
        optionBrown.Draw(context, new Vector(182,110), 0, new Vector(1,1));
        optionBlue.Draw(context, new Vector(218,110), 0, new Vector(1,1));
        optionGray.Draw(context, new Vector(254,110), 0, new Vector(1,1));
        optionPink.Draw(context, new Vector(146,150), 0, new Vector(1,1));
        optionRed.Draw(context, new Vector(182,150), 0, new Vector(1,1));
        optionSkyBlue.Draw(context, new Vector(218,150), 0, new Vector(1,1));
        optionYellow.Draw(context, new Vector(254,150), 0, new Vector(1,1));
        
        p1.Draw(context, new Vector(146,110), 0, new Vector(1,1));
        p2.Draw(context, new Vector(182,110), 0, new Vector(1,1));
        
        playerChoiceOne.Draw(context, new Vector(114, 50), 0, new Vector(1,1));
        playerChoiceTwo.Draw(context, new Vector(288, 50), 0, new Vector(1,1));
        
        context.save();
        context.font = "12px Arial";
        context.fillStyle = "white";
        context.fillText("Player 1", 135, 55);
        context.fillText("Player 2", 220 , 55);
        
        context.font = "10px Arial";
        context.fillStyle = "white";
        context.fillText("Press WASD or use the arrow keys to change character", 70, 190);
        
        context.restore();
    };
    
    function DrawReadyCheck(context)
    {
        instructionsImage.Draw(context, new Vector(200, 130), 0, new Vector(1,1));
        
        playerChoiceOne.Draw(context, new Vector(98, 240), 0, new Vector(1,1));
        playerChoiceTwo.Draw(context, new Vector(304, 240), 0, new Vector(1,1));
        
        context.save();
        context.font = "10px Arial";
        context.fillStyle = "white";
        context.fillText("Shoot to ready", 165, 230);
        context.restore();
    };
    
    function DrawControls(context)
    {
        instructionsImage.Draw(context, new Vector(200, 160), 0, new Vector(1,1));
    };
    
    
}

MenuScene.prototype = Object.create(Scene.prototype);