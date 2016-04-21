/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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