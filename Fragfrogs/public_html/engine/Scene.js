/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Scene()
{
    var _gameObjects = { "background": [],
                         "game": [],
                         "foreground": []};
    
    this.AddGameObject = function(gameobject, layer)
    {
        if(_gameObjects.hasOwnProperty(layer))
        {
            if(gameobject instanceof GameObject)
            {
                _gameObjects[layer].push(gameobject);
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
        for(var layer in _gameObjects)
        {
            _gameObjects[layer].forEach(function(entry)
            {
                if(entry.active && entry.hasCollision)
                {
                    
                }
            });
        }
    };
    
    Scene.prototype.Update = function(input, dt)
    {
        for(var layer in _gameObjects)
        {
            _gameObjects[layer].forEach(function(entry)
            {
                if(entry.active)
                {
                    entry.Update();
                    if(entry.hasCollision)
                    {
                        Scene.prototype.CheckCollision.apply(this, [entry]);
                    }
                }
            });
        }
    };
    
    Scene.prototype.Draw = function(context)
    {
        for(var layer in _gameObjects)
        {
            _gameObjects[layer].forEach(function(entry)
            {
                if(entry.active)
                {
                    entry.Draw(context);
                }
            });
        }
    };
};