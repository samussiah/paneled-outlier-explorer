var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = canvas.width - margin.left - margin.right,
    height = canvas.height - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.DY); })
    .y(function(d) { return y(d.STRESN); })
    .context(context);

context.translate(margin.left, margin.top);

d3.csv(
    'ADBDS.csv',
    d => {
        d.DY = /^-?\d+\.?\d*$/.test(d.DY) || /^-?\d*\.?\d+$/.test(d.DY)
            ? +d.DY
            : NaN;
        d.STRESN = /^-?\d+\.?\d*$/.test(d.STRESN) || /^-?\d*\.?\d+$/.test(d.STRESN)
            ? +d.STRESN
            : NaN;

        return d;
    },
    (error,data) => {
        if (error) throw error;
data = data.filter(d => d.TEST === 'Albumin').sort((a,b) =>
      a.USUBJID < b.USUBJID ? -1 :
      a.USUBJID > b.USUBJID ?  1 :
      a.DY < b.DY ? -1 :
      a.DY > b.DY ?  1 : 0
    )
  x.domain(d3.extent(data, function(d) { return d.DY; }));
  y.domain(d3.extent(data, function(d) { return d.STRESN; }));

  xAxis();
  yAxis();

    function drawLine(data) {
        context.beginPath();
        line(data.sort((a,b) =>
            a.DY < b.DY ? -1 :
            a.DY > b.DY ?  1 : 0
            ));
        context.lineWidth = 1.5;
        context.strokeStyle = "steelblue";
        context.stroke();
    }
var IDs = d3.set(data.map(d => d.USUBJID)).values();
IDs.forEach(ID => {
    drawLine(data.filter(d => d.USUBJID === ID));
});
    });

function xAxis() {
  var tickCount = 10,
      tickSize = 6,
      ticks = x.ticks(tickCount),
      tickFormat = x.tickFormat();

  context.beginPath();
  ticks.forEach(function(d) {
    context.moveTo(x(d), height);
    context.lineTo(x(d), height + tickSize);
  });
  context.strokeStyle = "black";
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "top";
  ticks.forEach(function(d) {
    context.fillText(tickFormat(d), x(d), height + tickSize);
  });
}

function yAxis() {
  var tickCount = 10,
      tickSize = 6,
      tickPadding = 3,
      ticks = y.ticks(tickCount),
      tickFormat = y.tickFormat(tickCount);

  context.beginPath();
  ticks.forEach(function(d) {
    context.moveTo(0, y(d));
    context.lineTo(-6, y(d));
  });
  context.strokeStyle = "black";
  context.stroke();

  context.beginPath();
  context.moveTo(-tickSize, 0);
  context.lineTo(0.5, 0);
  context.lineTo(0.5, height);
  context.lineTo(-tickSize, height);
  context.strokeStyle = "black";
  context.stroke();

  context.textAlign = "right";
  context.textBaseline = "middle";
  ticks.forEach(function(d) {
    context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
  });

  context.save();
  context.rotate(-Math.PI / 2);
  context.textAlign = "right";
  context.textBaseline = "top";
  context.font = "bold 10px sans-serif";
  context.fillText("Result", -10, 10);
  context.restore();
}
