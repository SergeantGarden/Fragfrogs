/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Sprite(sprite, size, alpha)
{
    var _private = {};
    _private._sprite = sprite;
    _private._size = size || new Vector(sprite.width, sprite.height);
    _private._alpha = alpha || 1;
    
    Object.defineProperty(this, "size", {
        get: function() { return _private._size; },
        set: function(value) { if(value.hasOwnProperty("x") && value.hasOwnProperty("y")) _private._size = value; }
    });
    
    Object.defineProperty(this, "alpha", {
        get: function() { return _private._alpha; },
        set: function(value) { if( $.isNumeric(value) && value <= 1 && value >= 0) _private._alpha = value; }
    });
    
    Object.defineProperty(this, "private", {
        get: function() { return _private; }
    });
    
    Sprite.prototype.Update = function(dt) { };
    
    Sprite.prototype.Draw = function(ctx, position, rotation, scale)
    {
        ctx.save();
        ctx.translate(position.x - (this.size.x * scale.x) / 2, position.y - (this.size.y * scale.y) / 2);
        ctx.rotate(rotation * (Math.PI/180));
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.private._sprite, 0, 0, (this.size.x * scale.x), (this.size.y * scale.y));
        ctx.restore();
    };
};