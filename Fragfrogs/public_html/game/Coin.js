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

function Coin(position, rotation, scale, size)
{
    GameObject.call(this, position, rotation, scale, new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Coin"], size, 1), false);
    this.sprite.AddAnimation("rotate", [0,1,2,3]);
    
    var _rotationTime = 0.6;
    this.sprite.Play("rotate", true, _rotationTime);
    
    this.HandleCollision = function(other, side)
    {
        if(other instanceof Player)
        {
            Engine.PlayAudio("Fragfrogs", "Coin", 0.5);
            this.active = false;
            delete this;
        }
    };
};

Coin.prototype = Object.create(GameObject.prototype);