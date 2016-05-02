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

function Emitter(scene, position)
{
    this.scene = scene;
    this.position = position || new Vector(0,0);
    this.particles = [];
    
    Emitter.prototype.Emit = function(sprite, amount, lifeDuration, velocity)
    {
        for(var i = 0; i < amount; i++)
        {
            var particle = new Particle(sprite, new Vector(this.position.x, this.position.y), lifeDuration, velocity);
            this.particles.push(particle);
            this.scene.AddGameObject(particle, "foreground");
        }
    };
    
    Emitter.prototype.EmitRandom = function(sprite, amount, lifeDuration, maxVelocity)
    {
        for(var i = 0; i < amount; i++)
        {
            var velocity = new Vector((Math.random() * (maxVelocity.x * 2)) - maxVelocity.x, (Math.random() * (maxVelocity.y * 2)) - maxVelocity.y);
            var particle = new Particle(sprite, new Vector(this.position.x, this.position.y), lifeDuration, velocity);
            this.particles.push(particle);
            this.scene.AddGameObject(particle, "foreground");
        }
    };
    
    Emitter.prototype.Update = function(input, dt)
    {
        var that = this;
        this.particles.forEach(function(entry)
        {
            if(!entry.alive)
            {
                that.particles.splice(that.particles.indexOf(entry), 1);
                that.scene.RemoveGameObject(entry, "foreground");
            }else
            {
                entry.Update(dt);
            }
        });
    };
    
    Emitter.prototype.Draw = function(context)
    {
        this.particles.forEach(function(entry)
        {
            entry.Draw(context);
        });
    };
};