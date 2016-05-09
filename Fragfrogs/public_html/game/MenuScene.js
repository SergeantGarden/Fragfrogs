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

var MENUSTATE =
{
    MainMenu:0,
    Instructions: 1,
    PickLevel: 2,
    PickCharacter: 3,
    ReadyCheck: 4
};

var PLAYER_PICKS =
{
    green: "PlayerGreen",
    brown: "PlayerBrown",
    blue: "PlayerBlue",
    gray: "PlayerGray",
    pink: "PlayerPink",
    red: "PlayerRed",
    skyBlue: "PlayerSkyBlue",
    yellow: "PlayerYellow"
};

function MenuScene(engine)
{
    Scene.call(this);
    
    var currentMenuState = MENUSTATE.MainMenu;
    var mainMenuChoice = 0;
    
    var selectedSprite = new Animation(Engine.currentGame[engine.gameTitle].gameAssets["PlayerGreen"], new Vector(16,16));
    selectedSprite.frameIndex = 1;
    var selectedPositionOne = [new Vector(0,0), new Vector(0,0)];
    var selectedPositionTwo = [new Vector(0,0), new Vector(0,0)];
    var selectedPosition = 0;
    
    var playerOneReady = false;
    var playerTwoReady = false;
    
    var levelChosen = 0;
    var playerOneChoice = PLAYER_PICKS.green;
    var playerTwoChoice = PLAYER_PICKS.brown;
    var playerOneCurrentPick = 0;
    var playerTwoCurrentPick = 1;
    
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
    
    var levels = [];
    levels[0] = LoadLevel(1, new Vector(10,10));
    levels[1] = LoadLevel(2, new Vector(10,10));
    levels[2] = LoadLevel(3, new Vector(10,10));
    
    setInterval(SwitchSelectedPosition, 400);
    
    Engine.PlayAudio("Fragfrogs", "Menu", 0.2);
    
    function HandlePlayerOnePick(input)
    {
        if(input.keyboard.keyPressed(KEY_CODE.a))
        {
            playerOneCurrentPick--;
            if(playerOneCurrentPick < 0)
            {
                playerOneCurrentPick = 7;
            }
            if(playerOneCurrentPick === playerTwoCurrentPick)
            {
                if(playerTwoCurrentPick !== 0)
                {
                    playerOneCurrentPick--;
                }else
                {
                    playerOneCurrentPick = 7;
                }
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.d))
        {
            playerOneCurrentPick++;
            if(playerOneCurrentPick > 7)
            {
                playerOneCurrentPick = 0;
            }
            if(playerOneCurrentPick === playerTwoCurrentPick)
            {
                if(playerTwoCurrentPick !== 7)
                {
                    playerOneCurrentPick++;
                }else
                {
                    playerOneCurrentPick = 0;
                }
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.w))
        {
            if(playerOneCurrentPick - 4 !== playerTwoCurrentPick && playerOneCurrentPick >= 4)
            {
                playerOneCurrentPick -= 4;
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.s))
        {
            if(playerOneCurrentPick + 4 !== playerTwoCurrentPick && playerOneCurrentPick < 4)
            {
                playerOneCurrentPick += 4;
            }
        }
    };
    
    function HandlePlayerTwoPick(input)
    {
        if(input.keyboard.keyPressed(KEY_CODE.LEFT))
        {
            playerTwoCurrentPick--;
            if(playerTwoCurrentPick < 0)
            {
                playerTwoCurrentPick = 7;
            }
            if(playerTwoCurrentPick === playerOneCurrentPick)
            {
                if(playerOneCurrentPick !== 0)
                {
                    playerTwoCurrentPick--;
                }else
                {
                    playerTwoCurrentPick = 7;
                }
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.RIGHT))
        {
            playerTwoCurrentPick++;
            if(playerTwoCurrentPick > 7)
            {
                playerTwoCurrentPick = 0;
            }
            if(playerTwoCurrentPick === playerOneCurrentPick)
            {
                if(playerOneCurrentPick !== 7)
                {
                    playerTwoCurrentPick++;
                }else
                {
                    playerTwoCurrentPick = 0;
                }
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.UP))
        {
            if(playerTwoCurrentPick - 4 !== playerOneCurrentPick && playerTwoCurrentPick >= 4)
            {
                playerTwoCurrentPick -= 4;
            }
        }else if(input.keyboard.keyPressed(KEY_CODE.DOWN))
        {
            if(playerTwoCurrentPick + 4 !== playerOneCurrentPick && playerTwoCurrentPick < 4)
            {
                playerTwoCurrentPick += 4;
            }
        }
    };
    
    MenuScene.prototype.Update = function(input, dt)
    {
        switch(currentMenuState)
        {
            case MENUSTATE.MainMenu:
                if(input.keyboard.keyPressed(KEY_CODE.SPACE) || input.keyboard.keyPressed(KEY_CODE.ENTER))
                {
                    if(mainMenuChoice === 0)
                    {
                        currentMenuState = MENUSTATE.PickLevel;
                    }else if(mainMenuChoice === 1)
                    {
                        currentMenuState = MENUSTATE.Instructions;
                    }
                }
                
                if(input.keyboard.keyPressed(KEY_CODE.w) || input.keyboard.keyPressed(KEY_CODE.UP))
                {
                    mainMenuChoice--;
                    if(mainMenuChoice < 0) mainMenuChoice = 1;
                }else if(input.keyboard.keyPressed(KEY_CODE.s) || input.keyboard.keyPressed(KEY_CODE.DOWN))
                {
                    mainMenuChoice++;
                    if(mainMenuChoice > 1) mainMenuChoice = 0;
                }
                break;
            case MENUSTATE.Instructions:
                if(input.keyboard.keyPressed(KEY_CODE.SPACE) || input.keyboard.keyPressed(KEY_CODE.ENTER) || input.keyboard.keyPressed(KEY_CODE.ESCAPE))
                {
                    currentMenuState = MENUSTATE.MainMenu;
                }
                break;
            case MENUSTATE.PickLevel:
                if(input.keyboard.keyPressed(KEY_CODE.d) || input.keyboard.keyPressed(KEY_CODE.RIGHT))
                {
                    levelChosen++;
                    if(levelChosen >= levels.length) levelChosen = 0;
                }else if(input.keyboard.keyPressed(KEY_CODE.a) || input.keyboard.keyPressed(KEY_CODE.LEFT))
                {
                    levelChosen--;
                    if(levelChosen < 0) levelChosen = levels.length -1;
                }
                
                if(input.keyboard.keyPressed(KEY_CODE.SPACE) || input.keyboard.keyPressed(KEY_CODE.ENTER))
                {
                    currentMenuState = MENUSTATE.PickCharacter;
                }else if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
                {
                    currentMenuState = MENUSTATE.MainMenu;
                }
                
                break;
            case MENUSTATE.PickCharacter:
                if(input.keyboard.keyPressed(KEY_CODE.SPACE) || input.keyboard.keyPressed(KEY_CODE.ENTER))
                {
                    currentMenuState = MENUSTATE.ReadyCheck;
                }
                
                if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
                {
                    playerOneChoice = PLAYER_PICKS.green;
                    playerTwoChoice = PLAYER_PICKS.brown;
                    currentMenuState = MENUSTATE.PickLevel ;
                }
                HandlePlayerOnePick(input);
                HandlePlayerTwoPick(input);
                break;
            case MENUSTATE.ReadyCheck:
                if(input.keyboard.keyPressed(KEY_CODE.SPACE))
                {
                    playerOneReady = !playerOneReady;
                }
                
                if(input.keyboard.keyPressed(KEY_CODE.FSLASH))
                {
                    playerTwoReady = !playerTwoReady;
                }
                
                if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
                {
                    playerOneReady = false;
                    playerTwoReady = false;
                    currentMenuState = MENUSTATE.PickCharacter;
                }
                
                if(playerOneReady && playerTwoReady)
                {
                    Engine.StopAllGameAudio("Fragfrogs");
                    var scene = new GameScene(engine, playerOneChoice, playerTwoChoice, levelChosen + 1);
                    currentMenuState = MENUSTATE.MainMenu;
                    playerOneReady = false;
                    playerTwoReady = false;
                    engine.switchScene(scene, true);
                }
                break;
        }
    };
    
    MenuScene.prototype.Draw = function(context)
    {
        context.save();
        context.fillStyle = "black";
        context.fillRect(0, 0, Engine.currentGame[engine.gameTitle].originalResolution.x, Engine.currentGame[engine.gameTitle].originalResolution.y);
        context.restore();
        
        switch(currentMenuState)
        {
            case MENUSTATE.MainMenu:
                DrawMainMenu(context);
                break;
            case MENUSTATE.Instructions:
                DrawControls(context);
                break;
            case MENUSTATE.PickLevel:
                DrawLevelChoice(context);
                break;
            case MENUSTATE.PickCharacter:
                DrawPlayerChoice(context);
                break;
            case MENUSTATE.ReadyCheck:
                DrawReadyCheck(context);
                break;
        }
    };
    
    function LoadLevel(level, size)
    {
        var levelData = ReadFile("levels/Scene_" + level + ".txt");
        var spriteList = [];
        for(var i = 0; i < levelData.length; i++)
        {
            var startWidth = 75;
            var startHeight = 20;
            var height = startHeight + (Math.floor((i / 25)) * size.y) + (size.y / 2);
            var width = startWidth + ((i % 25) * size.x) + (size.x / 2);
            
            switch(levelData[i])
            {
                case "1":
                    spriteList.push({ position: new Vector(width, height), sprite: new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["Wall"], size, 1), scale: new Vector(1,1) });
                    break;
                case "2":
                    var crop = new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Crop"], new Vector(16,16), 1);
                    crop.frameIndex = 3;
                    spriteList.push({ position: new Vector(width, height), sprite: crop, scale: new Vector(size.x/16, size.y/16) });
                    break;
            }
        }
        return spriteList;
    };
    
    function DrawSelectedButton(context)
    {
        selectedSprite.Draw(context, selectedPositionOne[selectedPosition], 90, new Vector(1,1));
        selectedSprite.Draw(context, selectedPositionTwo[selectedPosition], 270, new Vector(1,1));
    };
    
    function DrawMainMenu(context)
    {
        fragfrogsLogo.Draw(context, new Vector(200,50), 0, new Vector(1,1));
        startButton.Draw(context, new Vector(200,150), 0, new Vector(1,1));
        instructionButton.Draw(context, new Vector(200,200), 0, new Vector(1,1));
        if(mainMenuChoice === 0)
        {
            selectedPositionOne = [new Vector(128,150), new Vector(96,150)];
            selectedPositionTwo = [new Vector(272,150), new Vector(304,150)];
        }else
        {
            selectedPositionOne = [new Vector(128,200), new Vector(96,200)];
            selectedPositionTwo = [new Vector(272,200), new Vector(304,200)];
        }
        DrawSelectedButton(context);
    };
    
    function DrawLevelChoice(context)
    {
        arrow.Draw(context, new Vector(370, 110), 0, new Vector(0.5,1));
        arrow.Draw(context, new Vector(30, 110), 180, new Vector(0.5,1));

        for(var i = 0; i < levels[levelChosen].length; i++)
        {
            context.save();
            levels[levelChosen][i].sprite.Draw(context, levels[levelChosen][i].position, 0, levels[levelChosen][i].scale);
            context.restore();
        }
        
        context.save();
        context.font = "10px Arial";
        context.fillStyle = "white";
        context.fillText("Press A/Left or D/Right to change map", 110, 210);
        context.restore();
        
        startButton.Draw(context, new Vector(200,260), 0, new Vector(1,1));
        selectedPositionOne = [new Vector(128,260), new Vector(96,260)];
        selectedPositionTwo = [new Vector(272,260), new Vector(304,260)];
        DrawSelectedButton(context);
    };
    
    function DrawPlayerChoice(context)
    {
        optionGreen.Draw(context, new Vector(146,110), 0, new Vector(1,1));
        optionBrown.Draw(context, new Vector(182,110), 0, new Vector(1,1));
        optionBlue.Draw(context, new Vector(218,110), 0, new Vector(1,1));
        optionGray.Draw(context, new Vector(254,110), 0, new Vector(1,1));
        optionPink.Draw(context, new Vector(146,150), 0, new Vector(1,1));
        optionRed.Draw(context, new Vector(182,150), 0, new Vector(1,1));
        optionSkyBlue.Draw(context, new Vector(218,150), 0, new Vector(1,1));
        optionYellow.Draw(context, new Vector(254,150), 0, new Vector(1,1));
        
        var p1Position = new Vector(0,0);
        var p2Position = new Vector(0,0);
        
        switch(playerOneCurrentPick)
        {
            case 0:
                p1Position = new Vector(146,110);
                playerChoiceOne = optionGreen;
                playerOneChoice = PLAYER_PICKS.green;
                break;
            case 1:
                p1Position = new Vector(182,110);
                playerChoiceOne = optionBrown;
                playerOneChoice = PLAYER_PICKS.brown;
                break;
            case 2:
                p1Position = new Vector(218,110);
                playerChoiceOne = optionBlue;
                playerOneChoice = PLAYER_PICKS.blue;
                break;
            case 3:
                p1Position = new Vector(254,110);
                playerChoiceOne = optionGray;
                playerOneChoice = PLAYER_PICKS.gray;
                break;
            case 4:
                p1Position = new Vector(146,150);
                playerChoiceOne = optionPink;
                playerOneChoice = PLAYER_PICKS.pink;
                break;
            case 5:
                p1Position = new Vector(182,150);
                playerChoiceOne = optionRed;
                playerOneChoice = PLAYER_PICKS.red;
                break;
            case 6:
                p1Position = new Vector(218,150);
                playerChoiceOne = optionSkyBlue;
                playerOneChoice = PLAYER_PICKS.skyBlue;
                break;
            case 7:
                p1Position = new Vector(254,150);
                playerChoiceOne = optionYellow;
                playerOneChoice = PLAYER_PICKS.yellow;
                break;
        }
        
        switch(playerTwoCurrentPick)
        {
            case 0:
                p2Position = new Vector(146,110);
                playerChoiceTwo = optionGreen;
                playerTwoChoice = PLAYER_PICKS.green;
                break;
            case 1:
                p2Position = new Vector(182,110);
                playerChoiceTwo = optionBrown;
                playerTwoChoice = PLAYER_PICKS.brown;
                break;
            case 2:
                p2Position = new Vector(218,110);
                playerChoiceTwo = optionBlue;
                playerTwoChoice = PLAYER_PICKS.blue;
                break;
            case 3:
                p2Position = new Vector(254,110);
                playerChoiceTwo = optionGray;
                playerTwoChoice = PLAYER_PICKS.gray;
                break;
            case 4:
                p2Position = new Vector(146,150);
                playerChoiceTwo = optionPink;
                playerTwoChoice = PLAYER_PICKS.pink;
                break;
            case 5:
                p2Position = new Vector(182,150);
                playerChoiceTwo = optionRed;
                playerTwoChoice = PLAYER_PICKS.red;
                break;
            case 6:
                p2Position = new Vector(218,150);
                playerChoiceTwo = optionSkyBlue;
                playerTwoChoice = PLAYER_PICKS.skyBlue;
                break;
            case 7:
                p2Position = new Vector(254,150);
                playerChoiceTwo = optionYellow;
                playerTwoChoice = PLAYER_PICKS.yellow;
                break;
        }
        
        p1.Draw(context, p1Position, 0, new Vector(1,1));
        p2.Draw(context, p2Position, 0, new Vector(1,1));
        
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
        
        startButton.Draw(context, new Vector(200,260), 0, new Vector(1,1));
        selectedPositionOne = [new Vector(128,260), new Vector(96,260)];
        selectedPositionTwo = [new Vector(272,260), new Vector(304,260)];
        DrawSelectedButton(context);
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
        
        if(playerOneReady) 
        {
            selectedSprite.Draw(context, new Vector(70, 267), 90, new Vector(0.75, 0.75));
            context.save();
            context.font = "10px Arial";
            context.fillStyle = "white";
            context.fillText("Ready", 82, 270);
            context.restore();
            selectedSprite.Draw(context, new Vector(125, 267), 270, new Vector(0.75, 0.75));
        }
        if(playerTwoReady)
        {
            selectedSprite.Draw(context, new Vector(276, 267), 90, new Vector(0.75, 0.75));
            context.save();
            context.font = "10px Arial";
            context.fillStyle = "white";
            context.fillText("Ready", 288, 270);
            context.restore();
            selectedSprite.Draw(context, new Vector(331, 267), 270, new Vector(0.75, 0.75));
        }
    };
    
    function DrawControls(context)
    {
        instructionsImage.Draw(context, new Vector(200, 160), 0, new Vector(1,1));
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

MenuScene.prototype = Object.create(Scene.prototype);