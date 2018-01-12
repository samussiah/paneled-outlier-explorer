import { select } from 'd3';
import brushMarks from './brush/brushMarks';

export default function brush() {
    const context = this;

    //lines
    const
        lines = this.svg.selectAll('.line-supergroup g.line path');
        lines.each(function(d, i) {
            d.id = d.values[0].values.raw[0][context.config.id_col];
            d.lln = d.values[0].values.raw[0][context.config.lln_col];
            d.uln = d.values[0].values.raw[0][context.config.uln_col];
            d.lines = d.values.map((di, i) => {
                var line;
                if (i) {
                    line = {
                        x0:
                            context.config.x.type === 'linear'
                                ? d.values[i - 1].values.x
                                : context.x(d.values[i - 1].values.x) + context.x.rangeBand() / 2,
                        y0: d.values[i - 1].values.y,
                        x1:
                            context.config.x.type === 'linear'
                                ? di.values.x
                                : context.x(di.values.x) + context.x.rangeBand() / 2,
                        y1: di.values.y
                    };
                }
                return line;
            });
            d.lines.shift();
        });

    //Highlight previously brushed points.
    if (this.parent.paneledOutlierExplorer.data.selectedIDs.length) {
        lines
            .filter(d => this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
    }

    //Apply brush.
    this.package.brush
        .on('brushstart', function() {})
        .on('brush', function() {
            context.parent.wrap.selectAll('.wc-chart').each(d => {
                if (d.measure !== context.measure) d.overlay.call(d.brush.clear());
            });
            context.config.extent = context.package.brush.extent();

            //brush marks
            brushMarks.call(context, lines);
        })
        .on('brushend', function() {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);

    //Maintain brush on redraw.
    if (!this.config.extent) this.config.extent = this.package.brush.extent();
    if (
        (this.config.extent[0][0] !== this.package.brush.extent()[0][0] ||
            this.config.extent[0][1] !== this.package.brush.extent()[0][1] ||
            this.config.extent[1][0] !== this.package.brush.extent()[1][0] ||
            this.config.extent[1][1] !== this.package.brush.extent()[1][1]) &&
        this.measure === this.parent.brushedMeasure
    ) {
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks.call(this, lines);
    }
}
