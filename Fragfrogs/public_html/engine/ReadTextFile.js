/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ReadFile(filePath)
{
    var rawFile = new XMLHttpRequest();
    var returnText = {};
    rawFile.open("GET", filePath, false);
    rawFile.onloadend = function()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = new Array();
                allText = rawFile.responseText.split(/[,]/);
                for(var i = 0; i < allText.length; i++)
                {
                    if(allText[i].length > 1)
                    {
                        allText[i] = allText[i].substring(allText[i].length -1,allText[i].length);
                    }
                }
                returnText = allText;
            }
        }
    };
    rawFile.send(null);
    
    return returnText;
}

