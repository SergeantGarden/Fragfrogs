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

function EndScene(engine, player)
{
    Scene.call(this);
    
    var continueButton = new Sprite(Engine.currentGame[engine.gameTitle].gameAssets["Continue"]);
    var selectedPosition = 0;
    var selectedPositionOne = [new Vector(128,270), new Vector(96,270)];
    var selectedPositionTwo = [new Vector(272,270), new Vector(304,270)];
    
    var selectedSprite = new Animation(Engine.currentGame[engine.gameTitle].gameAssets[player], new Vector(16,16));
    selectedSprite.frameIndex = 1;
    
    setInterval(SwitchSelectedPosition, 400);
    
    EndScene.prototype.Update = function(input, dt)
    {
        if(input.keyboard.keyDown(KEY_CODE.SPACE))
        {
            if(!engine.switchOldScene(false))
            {
                engine.switchScene(new MenuScene(engine), false);
            }
        }
    };
    
    EndScene.prototype.Draw = function(context)
    {
        context.save();
        context.fillStyle = "black";
        context.fillRect(0, 0, Engine.currentGame[engine.gameTitle].originalResolution.x, Engine.currentGame[engine.gameTitle].originalResolution.y);
        context.restore();
        
        selectedSprite.Draw(context, new Vector(200, 110), 0, new Vector(1,1));
        
        context.save();
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText("You won the game!", 70, 210);
        context.restore();
        
        continueButton.Draw(context, new Vector(200,270), 0, new Vector(1,1));
        selectedSprite.Draw(context, selectedPositionOne[selectedPosition], 90, new Vector(1,1));
        selectedSprite.Draw(context, selectedPositionTwo[selectedPosition], 270, new Vector(1,1));
    };
    
    function SwitchSelectedPosition()
    {
        if(selectedPosition === 0)
        {
            selectedPosition = 1;
        }else
        {
            selectedPosition = 0;
        }
    };
}

EndScene.prototype = Object.create(Scene.prototype);