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

var PLAYER_FACING = 
{
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

function Player(player, scene, position, rotation, scale, imageName, size)
{
    GameObject.call(this, position, rotation, scale, new Animation(Engine.currentGame["Fragfrogs"].gameAssets[imageName], size, 1), true);
    
    var _player = player || 0;
    var _score = 0;
    var _tongue = new Tongue(_player, this.position, this.rotation, this.scale, new Vector(6,6));
    var _facing = PLAYER_FACING.DOWN;
    var _speed = 75;
    var _specialAbility = true;
    var _shooting = false;
    var _dashing = false;
    var _dashTimer = 0.2;
    var _direction = {
        up: false,
        down: false,
        left: false,
        right: false
    };
    
    var _glow = new Animation(Engine.currentGame["Fragfrogs"].gameAssets["Glow"],new Vector(25,25), 1);
    _glow.AddAnimation("glow", [0,1,2,1]);
    
    Object.defineProperty(this, "player", {
        get: function() { return _player; }
    });
    
    Object.defineProperty(this, "score", {
        get: function()
        {
            var score = _score;
            return score;
        }
    });
    
    Object.defineProperty(this, "tongue", {
        get: function() { return _tongue; }
    });
    
    Object.defineProperty(this, "direction", {
        get: function() { return _direction; }
    });
    
    Object.defineProperty(this, "speed", {
        get: function() { return _speed; }
    });
    
    Object.defineProperty(this, "facing", {
        get: function() { return _facing; },
        set: function(value) { if($.isNumeric(value) && value >= 0 && value <= 3) _facing = value; }
    });
    
    Object.defineProperty(this, "specialAbility", {
        get: function() { return _specialAbility; }
    });
    
    Object.defineProperty(this, "shooting", {
        get: function() { return _shooting; }
    });
    
    Object.defineProperty(this, "glow", {
        get: function() { return _glow; }
    });
    
    this.sprite.AddAnimation("idleUp", [1]);
    this.sprite.AddAnimation("idleDown", [0]);
    this.sprite.AddAnimation("idleLeft", [2]);
    this.sprite.AddAnimation("idleRight", [3]);
    this.sprite.AddAnimation("up", [1,5,1,5]);
    this.sprite.AddAnimation("down", [0,4,0,4]);
    this.sprite.AddAnimation("left", [2,6,2,6]);
    this.sprite.AddAnimation("right", [3,7,3,7]);
    
    scene.AddGameObject(_tongue, "game");
    
    this.Update = function(input, dt)
    {
        if(this.player === 1)
        {
            PlayerOneUpdate.call(this, input, dt);
        }else if(this.player === 2)
        {
            PlayerTwoUpdate.call(this, input, dt);
        }
        if(!this.shooting)
        {
            if(this.direction.up)
            {
                this.velocity = new Vector(0, -this.speed);
            }else if(this.direction.down)
            {
                this.velocity = new Vector(0, this.speed);
            }else if(this.direction.left)
            {
                this.velocity = new Vector(-this.speed, 0);
            }else if (this.direction.right)
            {
                this.velocity = new Vector(this.speed, 0);
            }else
            {
                this.velocity = new Vector(0,0);
            }
        }else
        {
            this.velocity = new Vector(0,0);
        }
        
        if(this.specialAbility)
        {
            this.glow.Update(dt);
        }
        
        GameObject.prototype.Update.call(this, input, dt);
    };
    
    function Shoot()
    {
        _tongue.Fire(_facing, this.position , size);
        _specialAbility = false;
        _shooting = true;
    };
    
    function PlayerOneUpdate(input, dt)
    {
        if(input.keyboard.keyDown(KEY_CODE.SPACE) && this.specialAbility)
        {
            Shoot.call(this);
        }
        if(!this.shooting)
        {
            if(input.keyboard.keyDown(KEY_CODE.w))
            {
                this.direction.up = true;
                this.direction.down = this.direction.left = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.s))
            {
                this.direction.down = true;
                this.direction.up = this.direction.left = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.a))
            {
                this.direction.left = true;
                this.direction.up = this.direction.down = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.d))
            {
                this.direction.right = true;
                this.direction.up = this.direction.down = this.direction.left = false;
            }else
            {
                this.direction.up = this.direction.down = this.direction.left = this.direction.right = false;
            }
        }else
        {
            this.direction.up = this.direction.down = this.direction.left = this.direction.right = false;
        }
    };
    
    function PlayerTwoUpdate(input, dt)
    {
        if(input.keyboard.keyDown(KEY_CODE.FSLASH) && this.specialAbility && !_dashing)
        {
            Shoot.call(this);
        }
        if(!this.shooting && !_dashing)
        {
            if(input.keyboard.keyDown(KEY_CODE.UP))
            {
                this.direction.up = true;
                this.direction.down = this.direction.left = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.DOWN))
            {
                this.direction.down = true;
                this.direction.up = this.direction.left = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.LEFT))
            {
                this.direction.left = true;
                this.direction.up = this.direction.down = this.direction.right = false;
            }else if(input.keyboard.keyDown(KEY_CODE.RIGHT))
            {
                this.direction.right = true;
                this.direction.up = this.direction.down = this.direction.left = false;
            }else
            {
                this.direction.up = this.direction.down = this.direction.left = this.direction.right = false;
            }
        }else
        {
            this.direction.up = this.direction.down = this.direction.left = this.direction.right = false;
        }
    };
    
    this.Draw = function(context)
    {
        if(this.direction.up)
        {
            if(this.facing !== PLAYER_FACING.UP)
            {
                this.sprite.Stop();
                this.facing = PLAYER_FACING.UP;
            }
            this.sprite.Play("up", false, 0.25);
        }else if(this.direction.down)
        {
            if(this.facing !== PLAYER_FACING.DOWN)
            {
                this.sprite.Stop();
                this.facing = PLAYER_FACING.DOWN;
            }
            this.sprite.Play("down", false, 0.25);
        }else if(this.direction.left)
        {
            if(this.facing !== PLAYER_FACING.LEFT)
            {
                this.sprite.Stop();
                this.facing = PLAYER_FACING.LEFT;
            }
            this.sprite.Play("left", false, 0.25);
        }else if (this.direction.right)
        {
            if(this.facing !== PLAYER_FACING.RIGHT)
            {
                this.sprite.Stop();
                this.facing = PLAYER_FACING.RIGHT;
            }
            this.sprite.Play("right", false, 0.4);
        }else
        {
            switch(this.facing)
            {
                case PLAYER_FACING.UP:
                    this.sprite.Play("idleUp");
                    break;
                case PLAYER_FACING.DOWN:
                    this.sprite.Play("idleDown");
                    break;
                case PLAYER_FACING.LEFT:
                    this.sprite.Play("idleLeft");
                    break;
                case PLAYER_FACING.RIGHT:
                    this.sprite.Play("idleRight");
                    break;
            }
        }
        
        if(this.specialAbility)
        {
            this.glow.Play("glow");
            this.glow.Draw(context, this.position, this.rotation, this.scale);
        }
        
        GameObject.prototype.Draw.call(this, context);
    };
    
    Respawn = function()
    {
        _specialAbility = false;
        this.sprite.Flash(2, 0.3, 0.05);
        var spawnLocation = GameScene.spawnLocations[Math.ceil(Math.random() * GameScene.spawnLocations.length - 1)];
        this.position = new Vector(spawnLocation.x, spawnLocation.y);
    };
    
    ResetDashing = function()
    {
        _dashing = false;
    };
    
    this.HandleCollision = function(other, side)
    {
        if(other instanceof Crop)
        {
            setTimeout(ResetDashing.bind(this), (_dashTimer * 1000));
            var extraSetBack = 0;
            _dashing = true;
            
            if(_facing === PLAYER_FACING.UP || _facing === PLAYER_FACING.DOWN)
            {
                extraSetBack = (this.sprite.size.y / 4);
            }else if(_facing === PLAYER_FACING.LEFT || _facing === PLAYER_FACING.RIGHT)
            {
                extraSetBack = (this.sprite.size.x / 4);
            }
            
            switch(_facing)
            {
            case PLAYER_FACING.UP:
                this.position.y += extraSetBack;
                break;
            case PLAYER_FACING.DOWN:
                this.position.y -= extraSetBack;
                break;
            case PLAYER_FACING.LEFT:
                this.position.x += extraSetBack;
                break;
            case PLAYER_FACING.RIGHT:
                this.position.x -= extraSetBack;
                break;
            }
        }
        
        if(other instanceof WallBlock || other instanceof Player)
        {
            switch(side)
            {
            case "top":
                this.position.y = other.position.y + this.sprite.size.y;
                break;
            case "bottom":
                this.position.y = other.position.y - this.sprite.size.y;
                break;
            case "left":
                this.position.x = other.position.x + this.sprite.size.x;
                break;
            case "right":
                this.position.x = other.position.x - this.sprite.size.x;
                break;
            }
        }
        
        if(other instanceof Tongue)
        {
            if(other !== this.tongue && !this.sprite.isFlashing)
            {
                Respawn.call(this);
            }else
            {
                _shooting = false;
            }
        }
        
        if(other instanceof Fly)
        {
            _specialAbility = true;
        }
        
        if(other instanceof Coin)
        {
            _score++;
        }
    };
};

Player.prototype = Object.create(GameObject.prototype);