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

GameScene = function(engine, playerOneSprite, playerTwoSprite, level)
{
    Scene.call(this, engine, 3);
    
    GameScene.spawnLocations = [];
    
    var canvasSize = new Vector(400, 320);
    var tileSize = new Vector(16,16);
    var tiles = new Vector(parseInt(canvasSize.x / tileSize.x), parseInt((canvasSize.y - (2 * tileSize.y)) / tileSize.y));
    var totalTiles = tiles.x * tiles.y;
    var gameEnded = false;
    
    var playerOne = new Player(1, this, new Vector(24,24), 0, new Vector(1,1), playerOneSprite, new Vector(16, 16));
    var playerTwo = new Player(2, this, new Vector(152,152), 0, new Vector(1,1), playerTwoSprite, new Vector(16, 16));
    
    this.AddGameObject(new GameObject(new Vector(200,144), 0, new Vector(1,1), new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["BG"]), false), "background");
    var scoreBar = new ScoreBar(playerOneSprite, playerTwoSprite, new Vector(0, tiles.y * tileSize.y), 0, new Vector(1,1), new Vector(canvasSize.x, 32), tileSize, false);
    this.AddGameObject(scoreBar, "foreground");
    
    GameScene.prototype.Update = function(input, dt)
    {
        if(!gameEnded) Engine.PlayAudio("Fragfrogs", "GameSound", 0.1);
        scoreBar.UpdateText(playerOne.score, playerTwo.score);
        
        if(input.keyboard.keyPressed(KEY_CODE.ESCAPE))
        {
            Engine.StopAllGameAudio("Fragfrogs");
            engine.switchOldScene(false);
        }
        
        if(playerOne.score >= 10 && !gameEnded)
        {
            Engine.StopAllGameAudio("Fragfrogs");
            Engine.PlayAudio("Fragfrogs", "Winner", 0.1);
            setTimeout(GameWon.bind(this, playerOneSprite), 2000);
            gameEnded = true;
        }else if(playerTwo.score >= 10 && !gameEnded)
        {
            Engine.StopAllGameAudio("Fragfrogs");
            Engine.PlayAudio("Fragfrogs", "Winner", 0.1);
            setTimeout(GameWon.bind(this, playerTwoSprite), 2000);
            gameEnded = true;
        }
        if(!gameEnded) Scene.prototype.Update.call(this, input, dt);
    };
    
    function GameWon(playerSprite)
    {
        var scene = new EndScene(engine, playerSprite);
        engine.switchScene(scene, false);
    };
    
    GameScene.prototype.Draw = function(context)
    {
        Scene.prototype.Draw.call(this, context);
    };
    
    function LoadLevel(level)
    {
        var levelData = ReadFile("levels/Scene_" + level + ".txt");
        for(var i = 0; i < totalTiles; i++)
        {
            var height = (Math.floor((i / tiles.x)) * tileSize.y) + (tileSize.y / 2);
            var width = ((i % tiles.x) * tileSize.x) + (tileSize.x / 2);
            
            switch(levelData[i])
            {
                case "1":
                    var wallBlock = new WallBlock(new Vector(width, height), 0, new Vector(1,1), new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["Wall"]), false);
                    this.AddGameObject(wallBlock, "game");
                    break;
                case "2":
                    var crop = new Crop(new Vector(width, height), 0, new Vector(1,1), tileSize, this);
                    this.AddGameObject(crop, "game");
                    break;
                case "3":
                    GameScene.spawnLocations.push(new Vector(width, height));
                    break;
            }
        }
    };
    
    LoadLevel.call(this, level);
    
    var spawnLocation = GameScene.spawnLocations[Math.ceil(Math.random() * GameScene.spawnLocations.length - 1)];
    playerOne.position = new Vector(spawnLocation.x, spawnLocation.y);
    var i = 0;
    while(spawnLocation.x === playerOne.position.x && spawnLocation.y === playerOne.position.y || i > 10)
    {
        i++;
        spawnLocation = GameScene.spawnLocations[Math.ceil(Math.random() * GameScene.spawnLocations.length - 1)];
    }
    playerTwo.position = new Vector(spawnLocation.x, spawnLocation.y);
    
    this.AddGameObject(playerOne, "game");
    this.AddGameObject(playerTwo, "game");
};

GameScene.prototype = Object.create(Scene.prototype);