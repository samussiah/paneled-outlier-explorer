import clone from '../util/clone';
import { svg, select } from 'd3';
import '../util/moveToFront';
import doLineSegmentsIntersect from '../util/lineIntersection';

export default function onResize() {
    const chart = this;

    //Capture each multiple's scale.
    var bbox = this.svg.node().getBBox();
    this.package = {
        overlay: this.svg.append('g').classed('brush', true),
        value: this.currentMeasure,
        domain: clone(this.config.y.domain),
        xScale: clone(this.x),
        yScale: clone(this.y),
        brush: svg.brush().x(this.x).y(this.y)
    };

    //define invisible brush overlay
    this.package.overlay.append('rect').attr({
        x: 0,
        y: 0,
        width: this.plot_width,
        height: this.plot_height,
        'fill-opacity': 0
    });
    if (!this.measures)
        this.measures = {};
    this.measures[this.currentMeasure] = this.package;

    //Attach additional data to SVG and marks.
    this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.currentMeasure });

    //points
    const points = this.svg.selectAll('.point-supergroup g.point circle');
    points.each(d => {
        d.key1 = d.values.raw[0].key;
        d.id = d.values.raw[0][chart.config.id_col];
    });

    //lines
    const lines = this.svg.selectAll('.line-supergroup g.line path');
    lines.each(function(d, i) {
        d.id = d.values[0].values.raw[0][chart.config.id_col];
        d.lines = d.values.map((di, i) => {
            var line;
            if (i) {
                line = {
                    x0: d.values[i - 1].values.x,
                    y0: d.values[i - 1].values.y,
                    x1: di.values.x,
                    y1: di.values.y
                };
            }
            return line;
        });
        d.lines.shift();
    });

    //Apply brush.
    this.measures[this.currentMeasure].brush
        .on('brushstart', function() {})
        .on('brush', function() {
            const measure = select(this).datum().measure;
            for (const prop in chart.measures) {
                if (prop !== measure)
                    chart.measures[prop].overlay.call(chart.measures[prop].brush.clear());
            }

            //brush
            const extent = chart.measures[measure].brush.extent(),
                x0 = extent[0][0], // top left x-coordinate
                y0 = extent[1][1], // top left y-coordinate
                x1 = extent[1][0], // bottom right x-coordinate
                y1 = extent[0][1], // bottom right y-coordinate
                top = { x0: x1, y0: y0, x1: x0, y1: y0 },
                right = { x0: x1, y0: y1, x1: x1, y1: y0 },
                bottom = { x0: x0, y0: y1, x1: x1, y1: y1 },
                left = { x0: x0, y0: y0, x1: x0, y1: y1 },
                sides = [top, right, bottom, left];

            //brushed points
            const brushedPoints = points
                    .filter(d => {
                        return (
                            x0 <= d.values.x &&
                            y0 >= d.values.y &&
                            x1 >= d.values.x &&
                            y1 <= d.values.y
                        );
                    })
                    .data()
                    .map(d => d.key1),
                allPoints = select(chart.config.element)
                    .selectAll('.point-supergroup g.point circle')
                    .classed('brushed selected', false);
            allPoints
                .filter(d => brushedPoints.indexOf(d.key1) > -1)
                .classed('brushed', true)
                .each(function() {
                    select(this.parentNode).moveToFront();
                });

            //brushed lines
            const brushedLines = lines
                    .filter((d, i) => {
                        let intersection = false;
                        d.lines.forEach((line, j) => {
                            sides.forEach((side, k) => {
                                if (!intersection) {
                                    intersection = doLineSegmentsIntersect(
                                        { x: line.x0, y: line.y0 },
                                        { x: line.x1, y: line.y1 },
                                        { x: side.x0, y: side.y0 },
                                        { x: side.x1, y: side.y1 }
                                    );
                                }
                            });
                        });
                        return intersection;
                    })
                    .data()
                    .map(d => d.id),
                allLines = select(chart.config.element)
                    .selectAll('.line-supergroup g.line path')
                    .classed('brushed', false);
            allLines
                .filter(d => brushedLines.indexOf(d.id) > -1)
                .classed('brushed', true)
                .each(function() {
                    select(this.parentNode).moveToFront();
                });
            allPoints
                .filter(d => brushedLines.indexOf(d.id) > -1)
                .classed('selected', true)
                .each(function() {
                    select(this.parentNode).moveToFront();
                });
        })
        .on('brushend', function() {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);
}
