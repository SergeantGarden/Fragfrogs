/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var COLLISION_TYPE = {
    SQUARE: 0,
    CIRCLE: 1
};

function GameObject(position, rotation, scale, sprite)
{
    var _position = position || new Vector(0,0);
    var _scale = scale || new Vector(1,1);
    var _velocity = new Vector(0,0);
    var _rotation = rotation || 0;
    var _hasCollision = true;
    var _collisionType = COLLISION_TYPE.SQUARE;
    var _active = true;
     
    var _sprite = sprite || null;
    
    Object.defineProperty(this, "position", {
        get: function() { return _position; },
        set: function(value) { if(value.hasOwnProperty("x") && value.hasOwnProperty("y")) 
                                    _position.x = value.x, _position.y = value.y; }
    });
    
    Object.defineProperty(this, "scale", {
        get: function() { return _scale; },
        set: function(value) { if(value.hasOwnProperty("x") && value.hasOwnProperty("y")) 
                                    _scale.x = value.x, _scale.y = value.y; }
    });
    
    Object.defineProperty(this, "rotation", {
        get: function() { return _rotation; },
        set: function(value) { if(Number.isInteger(value)) _rotation = value;}
    });
    
    Object.defineProperty(this, "velocity", {
        get: function() { return _velocity; },
        set: function(value) { if(value.hasOwnProperty("x") && value.hasOwnProperty("y")) 
                                    _velocity.x = value.x, _velocity.y = value.y; 
                                if(Number.isInteger(value)) _velocity.x = value, _velocity.y = value;}
    });
    
    Object.defineProperty(this, "active", {
        get: function() { return _active; },
        set: function(value) { if(typeof(value) === "boolean") _active = value; }
    });
    
    Object.defineProperty(this, "hasCollision", {
        get: function() { return _hasCollision; },
        set: function(value) { if(typeof(value) === "boolean") _hasCollision = value; }
    });
    
    Object.defineProperty(this, "collisionType", {
        get: function() { return _collisionType; },
        set: function(value) { if($.isNumeric(value)) _collisionType = value; }
    });
    
    GameObject.prototype.Update = function(dt)
    {
        this.position.add(this.velocity.multiplyByNumber(dt));
    };
    
    GameObject.prototype.Draw = function(context)
    {
        context.drawImage(_sprite, _position.x, _position.y);
    };
    
    GameObject.prototype.HandleCollision = function(cO)
    {
        
    };
};