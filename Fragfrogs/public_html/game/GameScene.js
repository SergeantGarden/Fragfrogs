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

GameScene = function(engine)
{
    Scene.call(this);
    
    //var canvasSize = new Vector(engine.canvas.width, engine.canvas.height);
    //var tileSize = new Vector(16,16);
    //var tiles = new Vector(parseInt(canvasSize.x / tileSize.x), parseInt(canvasSize.y / tileSize.y));
    
    this.AddGameObject(new GameObject(new Vector(200,144), 0, new Vector(1,1), new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["BG"])), "background");
    this.AddGameObject(new Player(1, new Vector(10,10), 0, new Vector(1,1), "Player", new Vector(16, 16)), "game");
    
    GameScene.prototype.Update = function(input, dt)
    {
        Scene.prototype.Update.call(this, input, dt);
    };
    
    GameScene.prototype.Draw = function(context)
    {
        Scene.prototype.Draw.call(this, context);
    };
};

GameScene.prototype = new Scene();