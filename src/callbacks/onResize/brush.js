import { select, selectAll } from 'd3';
import brushMarks from './brushMarks';

export default function brush() {
    const chart = this;

    //points
    const points = this.svg.selectAll('.point-supergroup g.point circle');
    points.each((d, i) => {
        d.id = d.values.raw[0][chart.config.id_col];
        d.time = d.values.raw[0][chart.config.time_col];
        d.key1 = d.id + '|' + d.time;
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

    //Highlight previously brushed points.
    const multiplesContainer = select(this.wrap.node().parentNode);
    if (multiplesContainer.datum()) {
        points
            .filter(d => multiplesContainer.datum().points.indexOf(d.key1) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
        lines
            .filter(d => multiplesContainer.datum().lines.indexOf(d.id) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
        points
            .filter(d => multiplesContainer.datum().lines.indexOf(d.id) > -1)
            .classed('selected', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
    }

    //Apply brush.
    this.package.brush
        .on('brushstart', function() {})
        .on('brush', function() {
            selectAll(chart.config.element).selectAll('.wc-chart').each(d => {
                if (d.measure !== chart.currentMeasure) d.overlay.call(d.brush.clear());
            });
            chart.config.extent = chart.package.brush.extent();

            //brush marks
            brushMarks(chart, points, lines);
        })
        .on('brushend', function() {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);

    if (!this.config.extent) this.config.extent = this.package.brush.extent();
    if (
        (this.config.extent[0][0] !== this.package.brush.extent()[0][0] ||
            this.config.extent[0][1] !== this.package.brush.extent()[0][1] ||
            this.config.extent[1][0] !== this.package.brush.extent()[1][0] ||
            this.config.extent[1][1] !== this.package.brush.extent()[1][1]) &&
        this.currentMeasure === select(chart.wrap.node().parentNode).datum().measure
    ) {
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks(chart, points, lines);
    }
}
