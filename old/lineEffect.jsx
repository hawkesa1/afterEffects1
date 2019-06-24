
{
    var textProperty;
    var textPropertyValue;

    function setFont(textLayer)
    {
        textProperty = textLayer.property("Source Text");
        textPropertyValue = textProperty.value;
        textPropertyValue.resetCharStyle();
        textPropertyValue.fontSize = 100;
        textPropertyValue.fillColor = [1, 1, 1];
        textPropertyValue.font = "SavingsBond";
        textProperty.setValue(textPropertyValue);          
    }
 
    function oneWordPerPage(line)
    {
        var wordXPosition=0;
        var spaceWidth=10;
        var word;
        var textWidth;
        var maxTextWidth=600;
        var maxTextHeight=600;
        var desiredLines=3;
        var targetLineLength=0;
        var scalingXAmount=0;
         var scalingYAmount=0;
        var wordXPosition=0;
        var wordYPosition=0;
        var wordWidth;
        var wordHeight;
    
   // Build the lines
      for (var j=0; j<line.words.length; j++)
        {        
            word=line .words[j];
            textLayer=currentComp.layers.addText(removePunctuation(word.word).toUpperCase());
            setFont(textLayer);        
            word.afterEffectsTextLayer=textLayer;
        }    
    
    
            for (var i=0; i<line.words.length; i++)
            {

            word=line.words[i];
            
            word.afterEffectsTextLayer.startTime=word.startTime/1000;
            word.afterEffectsTextLayer.outPoint=word.endTime/1000 ;
            
            wordWidth=word.afterEffectsTextLayer.sourceRectAtTime(0,false).width;
            wordHeight=word.afterEffectsTextLayer.sourceRectAtTime(0,false).height;
            scalingXAmount=maxTextWidth/wordWidth;
            scalingYAmount=maxTextHeight/wordHeight;
            
            scalingXAmount=1;
            scalingYAmount=1;
            
            wordXPosition=cs[0]/2-((wordWidth*scalingXAmount)/2);
            wordYPosition=cs[1]/2+((wordHeight*scalingXAmount)/2);
            
            setPositionAndScale(word,wordXPosition,wordYPosition,scalingXAmount,scalingXAmount);
        
            }
        
        
    }

    function removePunctuation(originalString)
    {
            var punctuationless = originalString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            var finalString = punctuationless.replace(/\s{2,}/g," ");
            return finalString;
    }

    function setPositionAndScale(word,wordXPosition,wordYPosition,scalingXAmount,scalingYAmount)
    {
        word.afterEffectsTextLayer.property("Position").setValueAtTime(word.startTime/1000,[wordXPosition,wordYPosition]);
        word.afterEffectsTextLayer.property("Position").setValueAtTime(word.endTime/1000 ,[wordXPosition,wordYPosition]); 
        word.afterEffectsTextLayer.property("Scale").setValueAtTime(word.startTime/1000,[100*scalingXAmount,100*scalingYAmount]);
        word.afterEffectsTextLayer.property("Scale").setValueAtTime(word.endTime/1000 ,[100 * scalingXAmount, 100*scalingYAmount]); 
    }
}