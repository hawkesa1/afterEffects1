{
 app.beginUndoGroup("Demo Script");
  
  // Creating project
  var currentProject   = (app.project) ? app.project : app.newProject();
  
  // Creating comp
  var compSettings     = cs = [1280, 720, 1, 10, 24];
  var defaultCompName  = "Demo"
  var currentComp      = (currentProject.activeItem) ? currentProject.activeItem : currentProject.items.addComp(defaultCompName, cs[0], cs[1], cs[2], cs[3], cs[4]);
  currentComp.openInViewer();
  
  // Creating background layer
  var backgroundLayer  = currentComp.layers.addSolid([93, 5, 2], "Background", cs[0], cs[1], cs[2]);
  
  // Adding the grid effect
  backgroundLayer.Effects.addProperty("Grid");
  backgroundLayer.property("Effects").property("Grid").property("Anchor").setValue([0,0]);
  backgroundLayer.property("Effects").property("Grid").property("Corner").expression = "[width/2, height/2]";
  backgroundLayer.property("Effects").property("Grid").property("Color").setValue([0,0,0]);
  backgroundLayer.property("Effects").property("Grid").property("Blending Mode").setValue(2);


  // Creating the wipe layer
  var wipeLayer        = currentComp.layers.addSolid([0.1, 0.1, 0.1], "Wipe", cs[0], cs[1], cs[2]);

  // Adding the wipe property
  wipeLayer.Effects.addProperty("Radial Wipe");

  // Setting wipe property to counterclockwise
  wipeLayer.property("Effects").property("Radial Wipe").property("Wipe").setValue(2);

  // Lowering the opacity
  wipeLayer.property("Opacity").setValue(50);

  // Setting wipe transition completion animation
  wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").setValueAtTime(0, 100);
  wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").setValueAtTime(1, 0);
  wipeLayer.property("Effects").property("Radial Wipe").property("Transition Completion").expression = "loopOut('Cycle')";

  // Adding text layer
  var textLayer                   = currentComp.layers.addText("Countdown");
  var textProperty                = textLayer.property("Source Text");
  var textPropertyValue           = textProperty.value;
  
  // Changing source text settings
  textPropertyValue.resetCharStyle();
  textPropertyValue.fontSize      = 200;
  textPropertyValue.fillColor     = [0, 0, 0];
  textPropertyValue.justification = ParagraphJustification.CENTER_JUSTIFY;
  textProperty.setValue(textPropertyValue);
  
  // Adding expression to source text
  textProperty.expression         = "Math.floor(10-time)";
  
  // Adjusting text layer anchor point
  var textLayerHeight             = textLayer.sourceRectAtTime(0, false);
  textLayer.property("Anchor Point").setValue([0, textLayerHeight.height / 2 * -1]);
  
  // Adding shape layer for the circles
  var shapeLayer                  = currentComp.layers.addShape();  
  
  // Adding circle shapes group
  var shapeGroup                  = shapeLayer.property("Contents").addProperty("ADBE Vector Group");

  // Adding circle shapes
  create_ellipse(shapeGroup, 200);
  create_ellipse(shapeGroup, 400);
  
  // Adding black stroke to the shapes
  var stroke = shapeGroup.property("Contents")
               .addProperty("ADBE Vector Graphic - Stroke")
               .property("Color").setValue([0, 0, 0]);

  function create_ellipse(shapeGroup, size) {
    var ellipse     = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");
    var ellipseSize = ellipse.property("Size").setValue([size,size]);
  }
  
  app.endUndoGroup();
}