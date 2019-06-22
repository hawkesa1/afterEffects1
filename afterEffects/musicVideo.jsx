{
    #include "json2.js" // jshint ignore:line    
    #include "lineEffect.jsx" // jshint ignore:line    
    
    app.beginUndoGroup("Create Music Video");
  
    var my_JSON_object=readLyricDataFromFile();  
    var lines=my_JSON_object.lyricRecorderSynchronisedLyrics;
  
    // Creating project
    var currentProject   = app.newProject();

    //Import the music file
    var mp3Footage=currentProject.importFile(new ImportOptions(File("H:\\Development\\afterEffects\\LyricRecorder\\audio\\audio.mp3")));

    // Creating comp
    var compSettings     = cs = [1280, 720, 1, mp3Footage.duration, 24];
    var compName  = "MusicVideo"
    var currentComp      = currentProject.items.addComp(compName, cs[0], cs[1], cs[2], cs[3], cs[4]);
    currentComp.openInViewer();
  
    //Add the music file to the composition
    currentComp.layers.add(mp3Footage);  
  
    //Add a background
    var backgroundLayer  = currentComp.layers.addSolid([0.26,0.136,0.26], "Background", cs[0]-100, cs[1]-100, cs[2]); 
    
    for(var i=0; i<lines.length; i++)
    {
        var textLayer;
        var word;
        var line;
        line=lines[i];
        oneWordPerPage(line);
    }
 
    function readLyricDataFromFile()
    {
        var scriptFile = File("H:\\Development\\afterEffects\\LyricRecorder\\lyricData\\LyricRecorder.js");  
        scriptFile.open('r');  
        var content = scriptFile.read();  
        my_JSON_object =  JSON.parse(content);// now evaluate the string from the file
        scriptFile.close();
        return my_JSON_object;
    }

    app.endUndoGroup();
  }
