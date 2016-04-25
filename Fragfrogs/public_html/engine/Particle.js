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

function Particle(sprite, position, lifeDuration, velocity)
{
    GameObject.call(this, position, 0, new Vector(1,1), sprite);
    
    var _lifeDuration = lifeDuration || 1;
    var _alive = true;
    
    Object.defineProperty(this, "alive", {
        get: function() { return _alive; }
    });
    
    this.velocity = new Vector(velocity.x, velocity.y);
    setTimeout(Die.bind(this), _lifeDuration * 1000);
    
    function Die()
    {
        _alive = false;
    }
    
    Particle.prototype.Update = function(input, dt)
    {
        if(_alive) GameObject.prototype.Update.call(this, input, dt);
    };
    
    Particle.prototype.Draw = function(context)
    {
        if(_alive) GameObject.prototype.Draw.call(this, context);
    };
};

Particle.prototype = new GameObject();