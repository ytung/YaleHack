// VexFlow - Basic Tests

Vex.Flow.Test.TimeSignature = {}

Vex.Flow.Test.TimeSignature.Start = function() {
  module("TimeSignature");
  test("Time Signature Parser", Vex.Flow.Test.TimeSignature.parser);
  Vex.Flow.Test.runTest("Basic Time Signatures", Vex.Flow.Test.TimeSignature.basic);
  Vex.Flow.Test.runRaphaelTest("Basic Time Signatures (Raphael)", 
      Vex.Flow.Test.TimeSignature.basic);
  Vex.Flow.Test.runTest("Big Signature Test", Vex.Flow.Test.TimeSignature.big);
  Vex.Flow.Test.runRaphaelTest("Big Signature Test (Raphael)", 
      Vex.Flow.Test.TimeSignature.big);

  Vex.Flow.Test.runTest("Time Signature multiple staves alignment test",
      Vex.Flow.Test.TimeSignature.multiStave);

}

Vex.Flow.Test.TimeSignature.catchError = function(ts, spec) {
  try {
    ts.parseTimeSpec(spec);
  } catch (e) {  
    equal(e.code, "BadTimeSignature", e.message);
  }
}

Vex.Flow.Test.TimeSignature.parser = function() {
  expect(6);
  var ts = new Vex.Flow.TimeSignature();
  
  // Invalid time signatures
  Vex.Flow.Test.TimeSignature.catchError(ts, "asdf");
  Vex.Flow.Test.TimeSignature.catchError(ts, "123/");
  Vex.Flow.Test.TimeSignature.catchError(ts, "/10");
  Vex.Flow.Test.TimeSignature.catchError(ts, "/");
  Vex.Flow.Test.TimeSignature.catchError(ts, "4567");
  Vex.Flow.Test.TimeSignature.catchError(ts, "C+");

  ts.parseTimeSpec("4/4");
  ts.parseTimeSpec("10/12");
  ts.parseTimeSpec("1/8");
  ts.parseTimeSpec("1234567890/1234567890");
  ts.parseTimeSpec("C");
  ts.parseTimeSpec("C|");

  ok(true, "all pass");
}


Vex.Flow.Test.TimeSignature.basic = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 400, 120);
  var stave = new Vex.Flow.Stave(10, 10, 300);

  stave.addTimeSignature("2/2");
  stave.addTimeSignature("3/4");
  stave.addTimeSignature("4/4");
  stave.addTimeSignature("6/8");
  stave.addTimeSignature("C");
  stave.addTimeSignature("C|");

  stave.setContext(ctx);
  stave.draw();

  ok(true, "all pass");
}

Vex.Flow.Test.TimeSignature.big = function(options, contextBuilder) {
  var ctx = new contextBuilder(options.canvas_sel, 400, 120);
  var stave = new Vex.Flow.Stave(10, 10, 300);

  stave.addTimeSignature("12/8");
  stave.addTimeSignature("7/16");
  stave.addTimeSignature("1234567/890");
  stave.addTimeSignature("987/654321");

  stave.setContext(ctx);
  stave.draw();

  ok(true, "all pass");
}

Vex.Flow.Test.TimeSignature.multiStave = function(options, contextBuilder) {
        var ctx = new contextBuilder(options.canvas_sel, 400, 350);

        var stave = new Vex.Flow.Stave(15, 0, 300);

        for (var i = 0; i < 5; i++) {
            if (i == 2) continue;
            stave.setConfigForLine(i, {visible: false} );
        }

        stave.addClef("percussion");
        // passing the custom padding as second parameter (in pixels)
        stave.addTimeSignature("4/4", 25);
        stave.setContext(ctx).draw();

        var stave2 = new Vex.Flow.Stave(15, 110, 300);
        stave2.addClef("treble");
        stave2.addTimeSignature("4/4");
        stave2.setContext(ctx).draw();

        var connector = new Vex.Flow.StaveConnector(stave, stave2);
        connector.setType(Vex.Flow.StaveConnector.type.SINGLE);
        connector.setContext(ctx).draw();

        var stave3 = new Vex.Flow.Stave(15, 220, 300);
        stave3.addClef("bass");
        stave3.addTimeSignature("4/4");
        stave3.setContext(ctx).draw();

        var connector2 = new Vex.Flow.StaveConnector(stave2, stave3);
        connector2.setType(Vex.Flow.StaveConnector.type.SINGLE);
        connector2.setContext(ctx).draw();

        var connector3 = new Vex.Flow.StaveConnector(stave2, stave3);
        connector3.setType(Vex.Flow.StaveConnector.type.BRACE);
        connector3.setContext(ctx).draw();

    ok(true, "all pass");
}

