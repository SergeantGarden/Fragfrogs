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

var CROP_STATE = 
{
    PICKED: 0,
    REGENERATING: 1,
    FULLGROWN: 2
};

function Crop(position, rotation, scale, size, scene)
{
    GameObject.call(this, position, rotation, scale, new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Crop"], size, 1), false);
    
    this.sprite.AddAnimation("regen", [0,1,2,3]);
    this.sprite.frameIndex = 3;
    
    var _regenTime = 10;
    var _state = CROP_STATE.FULLGROWN;
    var _emitter = new Emitter(scene, new Vector(position.x, position.y));
    
    Object.defineProperty(this, "state", {
        get: function() { return _state; }
    });
    
    this.Update = function(input, dt)
    {
        _emitter.Update(input, dt);
        GameObject.prototype.Update.call(this, input, dt);
    };
    
    this.Draw = function(context)
    {
        if(_state === CROP_STATE.PICKED)
        {
            this.hasCollision = false;
            _state = CROP_STATE.REGENERATING;
            this.sprite.Stop();
            this.sprite.Play("regen", false, _regenTime);
        }else if(_state === CROP_STATE.REGENERATING)
        {
            if(this.sprite.currentFrame >= 1)
            {
                this.hasCollision = true;
            }
            if(!this.sprite.isPlaying)
            {
                _state = CROP_STATE.FULLGROWN;
            }
        }
        _emitter.Draw(context);
        GameObject.prototype.Draw.call(this, context);
    };
    
    this.HandleCollision = function(other, side)
    {
        if(this.state === CROP_STATE.FULLGROWN)
        {
            var randomDrop = Math.ceil(Math.random() * 28);
            var spawnFlyArray = [1,4,7,13,18];
            var spawnCoinArray = [5,15,16];
            
            if(spawnCoinArray.indexOf(randomDrop) !== -1)
            {
                var coin = new Coin(this.position, this.rotation, this.scale, this.sprite.size);
                Engine.currentGame["Fragfrogs"].currentScene.AddGameObject(coin, "game");
            }else if(spawnFlyArray.indexOf(randomDrop) !== -1)
            {
                var fly = new Fly(this.position, this.rotation, this.scale, this.sprite.size);
                Engine.currentGame["Fragfrogs"].currentScene.AddGameObject(fly, "game");
            }
            //_emitter.EmitRandom(new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["Leaf"]), 3, 0.75, new Vector(60,60));
        }
        _state = CROP_STATE.PICKED;
    };
};

Crop.prototype = Object.create(GameObject.prototype);