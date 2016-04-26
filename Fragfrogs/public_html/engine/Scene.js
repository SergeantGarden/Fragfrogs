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
    _private._gameObjects = [];
    
    Object.defineProperty(this, "private", {
        get: function() { return _private; }
    });
    
    this.AddLayer = function(layerName)
    {
        if(_private._gameObjects[layerName] === undefined || _private._gameObjects[layerName] === null)
        {
            _private._gameObjects[layerName] = {moveable: [], immoveable: []};
        }
    };
    
    this.AddGameObject = function(gameobject, layer)
    {
        if(this.private._gameObjects.hasOwnProperty(layer))
        {
            if(gameobject instanceof GameObject)
            {
                if(gameobject.moveable)
                {
                    this.private._gameObjects[layer].moveable.push(gameobject);
                    console.log(layer + " : " + this.private._gameObjects[layer].moveable.length);
                }else
                {
                    this.private._gameObjects[layer].immoveable.push(gameobject);
                }
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
    
    this.AddLayer("background");
    this.AddLayer("game");
    this.AddLayer("foreground");
};

Scene.prototype.CheckCollision = function()
{
    var gameObjectsArray = this.private._gameObjects;
    for(var layer in gameObjectsArray)
    {
        var moveable = gameObjectsArray[layer].moveable;
        for(var i = 0; i < moveable.length; i++)
        {
            if(moveable[i].active && moveable[i].hasCollision)
            {
                for(var j = 0; j < moveable.length; j++)
                {
                    if(moveable[j].active && moveable[j].hasCollision)
                    {
                        if(moveable[j].collision.type === COLLISION_TYPE.RECTANGLE)
                        {
                            if(moveable[i].collision.type === COLLISION_TYPE.RECTANGLE)
                            {
                                if(Collision.CheckRectangles(moveable[i].collision, moveable[j].collision))
                                {
                                    console.log("collision");
                                }
                            }
                        }
                    }
                }

                var immoveable = gameObjectsArray[layer].immoveable;
                for(var j = 0; j < immoveable.length; j++)
                {
                    if(immoveable[j].active && immoveable[j].hasCollision)
                    {
                        if(immoveable[j].collision.type === COLLISION_TYPE.RECTANGLE)
                        {
                            if(moveable[i].collision.type === COLLISION_TYPE.RECTANGLE)
                            {
                                if(Collision.CheckRectangles(moveable[i].collision, immoveable[j].collision))
                                {
                                    console.log("collision");
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

Scene.prototype.Update = function(input, dt)
{
    var that = this;
    for(var layer in this.private._gameObjects)
    {
        this.private._gameObjects[layer].moveable.forEach(function(entry)
        {
            if(entry === null || entry === undefined)
            {
                that.private._gameObjects[layer].splice(that.private._gameObjects[layer].indexOf(entry, 1));
            }else if(entry.active)
            {
                entry.Update(input, dt);
                if(entry.hasCollision)
                {
                    that.CheckCollision.call(that, entry, layer);
                }
            }
        });

        this.private._gameObjects[layer].immoveable.forEach(function(entry)
        {
            if(entry === null || entry === undefined)
            {
                that.private._gameObjects[layer].splice(that.private._gameObjects[layer].indexOf(entry, 1));
            }else if(entry.active)
            {
                entry.Update(input, dt);
            }
        });
    }
};

Scene.prototype.Draw = function(context)
{
    for(var layer in this.private._gameObjects)
    {
        this.private._gameObjects[layer].moveable.forEach(function(entry)
        {
            if(entry.active)
            {
                entry.Draw(context);
            }
        });

        this.private._gameObjects[layer].immoveable.forEach(function(entry)
        {
            if(entry.active)
            {
                entry.Draw(context);
            }
        });
    }
};