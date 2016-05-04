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
    Engine.audioVolume = 1;
    Engine.currentGame[title] = { gameAssets: {},
                                  gameAudio: {},
                                  resolution: resolution,
                                  originalResolution: resolution,
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
            if(engine.input !== null) 
            {
                if(engine.input.keyboard.keyPressed(KEY_CODE.PLUS)) Engine.SetAudioVolume((Engine.audioVolume + 0.1));
                if(engine.input.keyboard.keyPressed(KEY_CODE.SUBTRACT)) Engine.SetAudioVolume((Engine.audioVolume - 0.1));
                engine.input.Update(dt/1000);
            }
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
    
    Engine.isString = function(obj)
    {
        return typeof obj === "string";
    };
    
    Engine.isArray = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    
    Engine.isNumber = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };
    
    Engine.isFunction = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    
    Engine.isObject = function(obj)
    {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    
    Engine.isUndefined = function(obj)
    {
        return obj === void 0;
    };
    
    Engine.normalizeArg = function(arg)
    {
        if(Engine.isString(arg))
        {
            arg = arg.replace(/\s+/g, '').split(",");
        }
        if(!Engine.isArray(arg))
        {
            arg = [arg];
        }
        return arg;
    };
    
    Engine.SetAudioVolume = function(volume)
    {
        if(!Engine.isNumber(volume))
        {
            volume = 1;
        }else if(volume > 1)
        {
            volume = 1;
        }else if(volume < 0)
        {
            volume = 0;
        }
        Engine.audioVolume = volume;
        
        for(var game in Engine.currentGame)
        {
            for(var audioFile in Engine.currentGame[game].gameAudio)
            {
                var audio = Engine.currentGame[game].gameAudio[audioFile];
                audio.file.volume = audio.volume * Engine.audioVolume;
            }
        }
    };
    
    Engine.PlayAudio = function(gameTitle, audio, volume)
    {
        if(!Engine.isUndefined(Engine.currentGame[gameTitle]))
        {
            if(!Engine.isUndefined(Engine.currentGame[gameTitle].gameAudio[audio]))
            {
                if(!Engine.isNumber(volume))
                {
                    volume = 1;
                }else if(volume > 1)
                {
                    volume = 1;
                }else if(volume < 0)
                {
                    volume = 0;
                }
                var audioFile = Engine.currentGame[gameTitle].gameAudio[audio];
                audioFile.volume = volume;
                audioFile.file.volume = (volume * Engine.audioVolume);
                audioFile.file.play();
            }else
            {
                console.log("No audio found under the name: " + audio);
            }
        }else
        {
            console.log("No game found under the name: " + gameTitle);
        }
    };
    
    function normalizeAssets(arg)
    {
        var assetArray = {};
        assetArray.images = {};
        assetArray.audio = {};
        arg = Engine.normalizeArg(arg);
        
        for(var i = 0; i < arg.length; i++)
        {
            if(arg[i].indexOf(":") !== -1)
            {
                var subArray = arg[i].split(":");
                switch(subArray[1].split(".")[1])
                {
                    case "png":
                    case "jpeg":
                    case "jpg":
                        if(!Engine.isUndefined(assetArray.images[subArray[0]]))
                        {
                            console.log("Warning: asset with duplicate name," + subArray[0] + " " + subArray[1] + " asset not loaded");
                        }else
                        {
                            assetArray.images[subArray[0]] = subArray[1];
                        }
                        break;
                    case "mp3":
                    case "wav":
                    case "ogg":
                        if(!Engine.isUndefined(assetArray.audio[subArray[0]]))
                        {
                            console.log("Warning: asset with duplicate name," + subArray[0] + " " + subArray[1] + " asset not loaded");
                        }else
                        {
                            assetArray.audio[subArray[0]] = subArray[1];
                        }
                        break;
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
        Engine.currentGame[this.gameTitle].resolution = { x: newResolution.x, y: newResolution.y };
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
        if(keepScene)
        {
            oldScene = Engine.currentGame[engine.gameTitle].currentScene;
        }
        Engine.currentGame[engine.gameTitle].currentScene = scene;
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
        scripts  = Engine.normalizeArg(scripts);
        
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
            for(var key in assets.images)
            {
                Engine.currentGame[engine.gameTitle].gameAssets[key] = loadImage(assets.images[key], key);
            }
            for(var key in assets.audio)
            {
                Engine.currentGame[engine.gameTitle].gameAudio[key] = loadAudio(assets.audio[key], key);
            }
        }else
        {
            console.log("Error: loading assets failed");
            return false;
        }
    };
    
    function loadAudio(soundUrl, key)
    {
        assetsPreloading++;
        var audio = {};
        audio.file = new Audio(soundUrl);
        audio.file.onloadeddata = function()
        {
            assetsLoaded++;
        };
        audio.volume = 1;
        
        return audio;
    }
    
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
    engine.PreloadScripts(["engine/ExtendedMath.js", "engine/Sprite.js", "engine/Animation.js", "engine/Collision.js", "engine/GameObject.js", "engine/Scene.js", "engine/Particle.js", "engine/Emitter.js", "engine/ReadTextFile.js"]);
    
    return engine;
};