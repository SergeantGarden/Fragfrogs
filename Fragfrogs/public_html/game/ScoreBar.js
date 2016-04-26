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

function ScoreBar(playerOne, playerTwo, position, rotation, scale, size, playerSize)
{
    GameObject.call(this, position, rotation, scale, new Animation(Engine.currentGame["Fragfrogs"].gameAssets[playerOne], playerSize, 1));
    this.sprite.frameIndex = 1;
    var _playerSpriteTwo = new Animation(Engine.currentGame["Fragfrogs"].gameAssets[playerTwo], playerSize, 1);
    _playerSpriteTwo.frameIndex = 1;
    
    var _size = size || new Vector(320, 32);
    var _spriteOnePosition = new Vector(this.position.x + (_size.x * 0.25), this.position.y + _size.y / 2);
    var _spriteTwoPosition = new Vector(this.position.x + (_size.x * 0.60), this.position.y + _size.y / 2);
    var _playerOneScore = 0, _playerTwoScore = 0;
    
    this.Update = function(input, dt)
    {
        _playerSpriteTwo.Update(dt);
        GameObject.prototype.Update.call(this, input, dt);
    };
    
    this.Draw = function(context)
    {
        context.save();
        context.fillStyle = "#492600";
        context.fillRect(this.position.x, this.position.y, _size.x, _size.y);
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(_playerOneScore, _spriteOnePosition.x + 20, this.position.y + 22);
        context.fillText(_playerTwoScore, _spriteTwoPosition.x + 20, this.position.y + 22);
        context.restore();
        
        this.sprite.Draw(context, _spriteOnePosition, this.rotation, this.scale);
        _playerSpriteTwo.Draw(context, _spriteTwoPosition, this.rotation, this.scale);
    };
    
    this.UpdateText = function(scoreOne, scoreTwo)
    {
        if(scoreOne !== null && scoreOne !== undefined) _playerOneScore = scoreOne;
        if(scoreTwo !== null && scoreTwo !== undefined) _playerTwoScore = scoreTwo;
    };
};
ScoreBar.prototype = Object.create(GameObject.prototype);