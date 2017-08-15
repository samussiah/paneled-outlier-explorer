import { select, selectAll } from 'd3';
import brushMarks from './brushMarks';

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
            selectAll(chart.config.element)
                .selectAll('.wc-chart')
                .each(d => {
                    if (d.measure !== measure)
                        d.overlay.call(d.brush.clear());
                });
            chart.config.extent = chart.package.brush.extent();

            //brush marks
            brushMarks(chart, points, lines);
        })
        .on('brushend', function() {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);

    if (!this.config.extent)
        this.config.extent = this.package.brush.extent();
    if (this.config.extent[0][0] !== this.package.brush.extent()[0][0] ||
        this.config.extent[0][1] !== this.package.brush.extent()[0][1] ||
        this.config.extent[1][0] !== this.package.brush.extent()[1][0] ||
        this.config.extent[1][1] !== this.package.brush.extent()[1][1]) {
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks(chart, points, lines);
    } 
}
