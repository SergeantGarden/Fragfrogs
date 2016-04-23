/* 
 * Copyright 2016 hugo.
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

function Crop(position, rotation, scale, size)
{
    GameObject.call(this, position, rotation, scale, new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Crop"], size, 1));
    
    this.sprite.AddAnimation("regen", [0,1,2,3]);
    this.sprite.frameIndex = 3;
    
    var _regenTime = 10;
    var _state = CROP_STATE.FULLGROWN;
    
    Object.defineProperty(this, "state", {
        get: function() { return _state; }
    });
    
    this.Update = function(input, dt)
    {
        GameObject.prototype.Update.call(this, input, dt);
    };
    
    this.Draw = function(context)
    {
        if(_state === CROP_STATE.PICKED)
        {
            this.hasCollision = false;
            _state = CROP_STATE.REGENERATING;
            this.sprite.Stop();
            this.sprite.Play("regen", _regenTime);
        }else if(_state === CROP_STATE.REGENERATING)
        {
            if(this.sprite.getCurrentFrameIndex() >= 1)
            {
                this.hasCollision = true;
            }
            if(!this.sprite.isPlaying())
            {
                _state = CROP_STATE.FULLGROWN;
            }
        }
        GameObject.prototype.Draw.call(this, context);
    };
    
    this.HandleCollision = function(other)
    {
        if(this.state === CROP_STATE.FULLGROWN)
        {
            console.log("crops");
        }
        _state = CROP_STATE.PICKED;
    };
};

Crop.prototype = new GameObject();