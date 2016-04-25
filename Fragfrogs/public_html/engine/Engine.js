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

Engine.currentGame = {};

function Engine(resolution, title, canvasParent)
{
    Engine.currentGame[title] = { gameAssets: {},
                                  resolution: resolution,
                                  currentScene: null,
                                  loadingScene: null};

    var engine = {};
    engine.loading = true;
    engine.gameTitle = title;
    engine.scale = { x: 1, y: 1 };
    engine.resizeScale = {x: engine.scale.x, y: engine.scale.y};
    engine.originalScale = {x: engine.scale.x, y: engine.scale.y};
    
    engine.canvas = document.createElement('canvas');
    engine.canvas.oncontextmenu = function() { return false; };
    
    engine.canvas.id = engine.gameTitle;
    engine.canvas.width = Engine.currentGame[engine.gameTitle].resolution.x;
    engine.canvas.height = Engine.currentGame[engine.gameTitle].resolution.y;
    engine.canvas.style.border = "1px solid";
    
    var canvasLocation = canvasParent || 'body';
    var oldScene = null;
    var maxFrameTime = 100;
    
    var scriptsPreloading = 0;
    var scriptsLoaded = 0;
    
    var assetsPreloading = 0;
    var assetsLoaded = 0;
    
    engine.input = null;
    
    $.getScript("engine/Input.js", function()
    {
        engine.input = new Input(["Keyboard", "Mouse", "Controllers"], engine.canvas);
    });
    
    
    engine.Start = function(scene)
    {
        if(engine.loading) 
        { 
            console.log("please use the onloaded function to start up");
            return;
        }
        if(scene instanceof Scene)
        {
            Engine.currentGame[engine.gameTitle].currentScene = scene;
            gameLoop();
        }else
        {
            console.log("the scene has to be an instance of Scene");
            return false;
        }
    };
    
    engine.onLoaded = function(callback)
    {
        if(engine.input === null || scriptsLoaded < scriptsPreloading || assetsLoaded < assetsPreloading)
        {
            scheduleFrame(engine.onLoaded.bind(this, callback));
            return;
        }
        
        engine.loading = false;
        callback();
    };
    
    scheduleFrame = function(callback) 
    {
        return window.requestAnimationFrame(callback);
    };
    
    cancelFrame = function(loop)
    {
        window.cancelAnimationFrame(loop);
    };
    
    gameLoop = function()
    {
        if(canvasLocation !== 'body' && document.getElementById(canvasLocation))
        {
            document.getElementById(canvasLocation).appendChild(engine.canvas);
        }else
        {
            (document.getElementsByTagName('body')[0]).appendChild(engine.canvas);
        }
        
        engine.lastFrame = new Date().getTime();
        engine.loop = true;
        engine.currentFrame = 0;
        
        engine.gameLoopCallback = function()
        {
            var now = new Date().getTime();
            engine.currentFrame++;
            engine.loop = scheduleFrame(engine.gameLoopCallback);
            var dt = now - engine.lastFrame;
            if(dt > maxFrameTime) { dt = maxFrameTime; }
            
            Engine.currentGame[engine.gameTitle].currentScene.Update(engine.input, dt/1000);
            Draw(engine.canvas.getContext('2d'));
            if(engine.input !== null) engine.input.Update(dt/1000);
            engine.lastFrame = now;
        };
        scheduleFrame(engine.gameLoopCallback);
    };
    
    function Draw(context)
    {
        context.clearRect(0,0, Engine.currentGame[engine.gameTitle].resolution.x * engine.resizeScale.x, Engine.currentGame[engine.gameTitle].resolution.y * engine.resizeScale.y);
        context.fillStyle = "#000";
        context.save();
        context.scale(engine.scale.x * engine.resizeScale.x, engine.scale.y * engine.resizeScale.y);
        
        Engine.currentGame[engine.gameTitle].currentScene.Draw(engine.canvas.getContext('2d'));
        
        context.restore();
    }
    
    engine.pauseGame = function()
    {
        if(engine.loop)
        {
            cancelFrame(engine.loop);
        }
        engine.loop = null;
    };
    
    engine.unpauseGame = function()
    {
        if(!engine.loop)
        {
            engine.lastFrame = new Date().getTime();
            engine.loop = scheduleFrame(engine.gameLoopCallback);
        }
    };
    
    engine.isString = function(obj)
    {
        return typeof obj === "string";
    };
    
    engine.isArray = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    
    engine.isNumber = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };
    
    engine.isFunction = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    
    engine.isObject = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    
    engine.isUndefined = function(obj)
    {
        return obj === void 0;
    };
    
    engine.normalizeArg = function(arg)
    {
        if(engine.isString(arg))
        {
            arg = arg.replace(/\s+/g, '').split(",");
        }
        if(!engine.isArray(arg))
        {
            arg = [arg];
        }
        return arg;
    };
    
    function normalizeAssets(arg)
    {
        var assetArray = {};
        arg = engine.normalizeArg(arg);
        
        for(var i = 0; i < arg.length; i++)
        {
            if(arg[i].indexOf(":") !== -1)
            {
                var subArray = arg[i].split(":");
                if(!engine.isUndefined(assetArray[subArray[0]]))
                {
                    console.log("Warning: asset with duplicate name," + subArray[0] + " " + subArray[1] + " asset not loaded");
                }else
                {
                    assetArray[subArray[0]] = subArray[1];
                }
            }else
            {
                console.log("Error: assets are invalid");
                return false;
            }
        }
        
        return assetArray;
    };
    
    engine.Resize = function(newResolution)
    {
        var scale = { x: newResolution.x / Engine.currentGame[engine.gameTitle].resolution.x,
                      y: newResolution.y / Engine.currentGame[engine.gameTitle].resolution.y };
        engine.resizeScale = scale;
        engine.canvas.width = newResolution.x;
        engine.canvas.height = newResolution.y;
    };
    
    engine.ZoomIn = function(scale)
    {
        engine.originalScale = {x: engine.scale.x, y: engine.scale.y};;
        if(scale.hasOwnProperty("x") && scale.hasOwnProperty("y"))
        {
            engine.scale = {x: scale.x, y: scale.y};;
        }else if($.isNumeric(scale))
        {
            engine.scale.x = scale;
            engine.scale.y = scale;
        }
    };
    
    engine.ZoomOut = function()
    {
        engine.scale = {x: engine.originalScale.x, y: engine.originalScale.y };
    };
    
    engine.switchScene = function(scene, keepScene)
    {
        engine.pauseGame();
        oldScene = Engine.currentGame[engine.gameTitle].currentScene;
        Engine.currentGame[engine.gameTitle].currentScene = scene;
        if(!keepScene) delete oldScene;
        engine.unpauseGame();
    };
    
    engine.switchOldScene = function(keepScene)
    {
        if(oldScene !== null)
        {
            engine.switchScene(oldScene, keepScene);
        }
    };
    
    engine.PreloadScripts = function(scripts)
    {
        scripts  = engine.normalizeArg(scripts);
        
        if(scripts !== false)
        {
            for(var i = 0; i < scripts.length; i++)
            {
                scriptsPreloading++;
                $.getScript(scripts[i], function()
                {
                    scriptsLoaded++;
                });
            }
        }else
        {
            console.log("Error: loading scripts failed");
            return false;
        }
    };
    
    engine.PreloadAssets = function(assets)
    {
        assets = normalizeAssets(assets);
        
        if(assets !== false)
        {
            for(var key in assets)
            {
                Engine.currentGame[engine.gameTitle].gameAssets[key] = loadImage(assets[key], key);
            }
        }else
        {
            console.log("Error: loading assets failed");
            return false;
        }
    };
    
    function loadImage(imageUrl, key)
    {
        assetsPreloading++;
        var image = new Image();
        image.name = image.alt = key;
        image.onload = function()
        {
            assetsLoaded++;
        };
        image.src = imageUrl;
        
        return image;
    }
    engine.PreloadScripts(["engine/ExtendedMath.js", "engine/Sprite.js", "engine/Animation.js", "engine/GameObject.js", "engine/Scene.js", "engine/Particle.js", "engine/Emitter.js", "engine/ReadTextFile.js"]);
    
    return engine;
};