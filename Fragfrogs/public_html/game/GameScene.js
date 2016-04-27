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

GameScene = function(engine, playerOne, playerTwo)
{
    Scene.call(this);
    
    var canvasSize = new Vector(400, 320);
    var tileSize = new Vector(16,16);
    var tiles = new Vector(parseInt(canvasSize.x / tileSize.x), parseInt((canvasSize.y - (2 * tileSize.y)) / tileSize.y));
    var totalTiles = tiles.x * tiles.y;
    
    this.AddGameObject(new GameObject(new Vector(200,144), 0, new Vector(1,1), new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["BG"]), false), "background");
    this.AddGameObject(new ScoreBar(playerOne, playerTwo, new Vector(0, tiles.y * tileSize.y), 0, new Vector(1,1), new Vector(canvasSize.x, 32), tileSize, false), "foreground");
    
    GameScene.prototype.Update = function(input, dt)
    {
        Scene.prototype.Update.call(this, input, dt);
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
                    var crop = new Crop(new Vector(width, height), 0, new Vector(1,1), tileSize);
                    this.AddGameObject(crop, "game");
                    break;
            }
        }
    };
    
    LoadLevel.call(this, 1);
    this.AddGameObject(new Player(1, this, new Vector(24,24), 0, new Vector(1,1), playerOne, new Vector(16, 16)), "game");
    this.AddGameObject(new Player(2, this, new Vector(152,152), 0, new Vector(1,1), playerTwo, new Vector(16, 16)), "game");
};

GameScene.prototype = Object.create(Scene.prototype);