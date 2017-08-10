import { select, selectAll } from 'd3';
import doLineSegmentsIntersect from './lineIntersection';

export default function brush() {
    const chart = this;

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
    this.package.brush
        .on('brushstart', function() {})
        .on('brush', function() {
            const measure = select(this).datum().measure;
            selectAll(chart.config.element).selectAll('.wc-chart').each(d => {
                if (d.measure !== measure) d.overlay.call(d.brush.clear());
            });

            //brush
            const extent = chart.package.brush.extent(),
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
