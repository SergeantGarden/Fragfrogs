/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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
    
    engine.canvas = document.createElement('canvas');
    engine.canvas.oncontextmenu = function() { return false; };
    
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
        engine.canvas.id = engine.gameTitle;
        engine.canvas.width = Engine.currentGame[engine.gameTitle].resolution.x;
        engine.canvas.height = Engine.currentGame[engine.gameTitle].resolution.y;
        engine.canvas.style.border = "1px solid";
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
            
            Engine.currentGame[engine.gameTitle].currentScene.Update.apply(engine, [engine.input, dt/1000]);
            Draw(engine.canvas.getContext('2d'));
            if(engine.input !== null) engine.input.Update(dt/1000);
            engine.lastFrame = now;
        };
        scheduleFrame(engine.gameLoopCallback);
    };
    
    function Draw(context)
    {
        context.clearRect(0,0, Engine.currentGame[engine.gameTitle].resolution.x, Engine.currentGame[engine.gameTitle].resolution.y);
        context.fillStyle = "#000";
        context.save();
        context.scale(1,1);
        
        Engine.currentGame[engine.gameTitle].currentScene.Draw.apply(Engine, [engine.canvas.getContext('2d')]);
        
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
    engine.PreloadScripts(["engine/ExtendedMath.js", "engine/GameObject.js", "engine/Scene.js"]);
    
    return engine;
};