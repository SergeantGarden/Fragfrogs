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

var TONGUE_FACING = 
{
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

function Tongue(player, position, rotation, scale, size)
{
    GameObject.call(this, position, rotation, scale, new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["TongueEnd"], size, 1));
    var _tongueBody = new Sprite(Engine.currentGame["Fragfrogs"].gameAssets["TongueBody"], size, 1);
    var _tongueBodyPosition = new Vector(position.x, position.y);
    var _tongueBodyScale = new Vector(1,1);
    
    
    var _playerTongue = player;
    var _playerPosition = new Vector(position.x, position.y);
    var _playerSize = new Vector(0,0);
    var _speed = 300;
    var _shooting = false;
    var _retreating = false;
    
    this.active = false;
    
    this.Fire = function(facing, position, playerSize)
    {
        _playerPosition = new Vector(position.x, position.y);
        _playerSize = new Vector(playerSize.x, playerSize.y);
        
        switch(facing)
        {
            case TONGUE_FACING.UP:
                this.rotation = 0;
                this.position = new Vector(position.x, position.y - (playerSize.y / 2 + (size.y / 2)));
                this.velocity = (new Vector(0, -_speed));
                break;
            case TONGUE_FACING.DOWN:
                this.rotation = 180;
                this.position = new Vector(position.x, position.y + (playerSize.y / 2 + (size.y / 2)));
                this.velocity = (new Vector(0, _speed));
                break;
            case TONGUE_FACING.LEFT:
                this.rotation = 270;
                this.position = new Vector(position.x - (playerSize.x / 2 + (size.x / 2)), position.y);
                this.velocity = (new Vector(-_speed, 0));
                break;
            case TONGUE_FACING.RIGHT:
                this.rotation = 90;
                this.position = new Vector(position.x + (playerSize.x / 2 + (size.x / 2)), position.y);
                this.velocity = (new Vector(_speed, 0));
                break;
        }
        _shooting = true;
        this.active = true;
    };
    
    this.Update = function(input, dt)
    {
        if(_shooting)
        {
            if(this.velocity.x !== 0)
            {
                if(this.velocity.x > 0)
                {
                    _tongueBodyScale.y = ((this.position.x - size.x) - _playerPosition.x) / size.y;
                    _tongueBodyPosition.x = _playerPosition.x + ((_playerSize.x / 2) + (size.y * _tongueBodyScale.y) / 2);
                }
                if(this.velocity.x < 0)
                {
                    _tongueBodyScale.y = ((this.position.x + size.x) - _playerPosition.x) / size.y;
                    _tongueBodyPosition.x = _playerPosition.x - ((_playerSize.x / 2) - (size.y * _tongueBodyScale.y) / 2);
                }
                _tongueBodyPosition.y = this.position.y;
            }else if(this.velocity.y !== 0)
            {
                if(this.velocity.y > 0)
                {
                    _tongueBodyScale.y = ((this.position.y - size.y) - _playerPosition.y) / size.y;
                    _tongueBodyPosition.y = _playerPosition.y + ((_playerSize.y / 2) + (size.y * _tongueBodyScale.y) / 2);
                }
                if(this.velocity.y < 0)
                {
                    _tongueBodyScale.y = ((this.position.y + size.y) - _playerPosition.y) / size.y;
                    _tongueBodyPosition.y = _playerPosition.y - ((_playerSize.y / 2) - (size.y * _tongueBodyScale.y) / 2);
                }
                _tongueBodyPosition.x = this.position.x;
            }
        }
        _tongueBody.Update(dt);
        GameObject.prototype.Update.call(this, input, dt);
    };
    
    this.Draw = function(context)
    {
        _tongueBody.Draw(context, _tongueBodyPosition, this.rotation, _tongueBodyScale);
        GameObject.prototype.Draw.call(this, context);
    };
    
    this.HandleCollision = function(other)
    {
        GameObject.prototype.HandleCollision.call(this, other);
    };
};

Tongue.prototype = new GameObject();