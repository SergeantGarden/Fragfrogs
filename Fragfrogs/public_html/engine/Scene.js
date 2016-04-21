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

function Scene()
{
    var _private = {};
    _private._gameObjects = { "background": [],
                         "game": [],
                         "foreground": []};
    
    Object.defineProperty(this, "private", {
        get: function() { return _private; }
    });
    
    this.AddGameObject = function(gameobject, layer)
    {
        if(this.private._gameObjects.hasOwnProperty(layer))
        {
            if(gameobject instanceof GameObject)
            {
                this.private._gameObjects[layer].push(gameobject);
            }else
            {
                console.log("object must be instance of GameObject");
                return false;
            }
        }else
        {
            console.log("layer not found");
            return false;
        }
    };
    
    
    Scene.prototype.CheckCollision = function(gameObject)
    {
        for(var layer in this.private._gameObjects)
        {
            this.private._gameObjects[layer].forEach(function(entry)
            {
                if(entry.active && entry.hasCollision)
                {
                    
                }
            });
        }
    };
    
    Scene.prototype.Update = function(input, dt)
    {
        var that = this;
        for(var layer in this.private._gameObjects)
        {
            this.private._gameObjects[layer].forEach(function(entry)
            {
                if(entry.active)
                {
                    entry.Update(input, dt);
                    if(entry.hasCollision)
                    {
                        Scene.prototype.CheckCollision.call(that, entry);
                    }
                }
            });
        }
    };
    
    Scene.prototype.Draw = function(context)
    {
        for(var layer in this.private._gameObjects)
        {
            this.private._gameObjects[layer].forEach(function(entry)
            {
                if(entry.active)
                {
                    entry.Draw(context);
                }
            });
        }
    };
};