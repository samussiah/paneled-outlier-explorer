import { select, selectAll } from 'd3';
import brushMarks from './brushMarks';

export default function brush() {
    const chart = this;

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
    if (this.parent.selectedIDs.length) {
        lines
            .filter(d => this.parent.selectedIDs.indexOf(d[this.config.id_col]) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
    }

    //Apply brush.
    this.package.brush
        .on('brushstart', function() {})
        .on('brush', function() {
            chart.parent.wrap.selectAll('.wc-chart').each(d => {
                if (d.measure !== chart.currentMeasure) d.overlay.call(d.brush.clear());
            });
            chart.config.extent = chart.package.brush.extent();

            //brush marks
            brushMarks(chart, lines);
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
        this.currentMeasure === chart.parent.brushedMeasure
    ) {
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks(chart, lines);
    }
}
