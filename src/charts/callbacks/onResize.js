import clone from '../../util/clone';
import { svg, select } from 'd3';
import '../../util/moveToFront';
import brush from './onResize/brush';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    const context = this;

    //Draw normal range.
    if (this.filtered_data.length == 0) {
        this.svg.selectAll('*').classed('hidden', true);
        this.svg.select('text.no-data').remove();
        this.svg
            .append('text')
            .classed('no-data', true)
            .attr({
                x: 0,
                dx: -this.config.margin.left,
                y: 0,
                dy: 10
            })
            .text('No data selected.');
    } else {
        this.svg.selectAll('*').classed('hidden', false);
        this.svg.select('text.no-data').remove();
        this.svg.select('.normal-range').remove();
        this.svg
            .insert('rect', '.line-supergroup')
            .classed('normal-range', true)
            .attr({
                x: this.x(this.x_dom[0]) - 5, // make sure left side of normal range does not appear in chart
                y: this.y(this.filtered_data[0][this.config.uln_col]),
                width: this.plot_width + 10, // make sure right side of normal range does not appear in chart
                height:
                    this.y(this.filtered_data[0][this.config.lln_col]) -
                    this.y(this.filtered_data[0][this.config.uln_col]),
                fill: 'green',
                'fill-opacity': 0.05,
                stroke: 'green',
                'stroke-opacity': 1,
                'clip-path': `url(#${this.id})`
            });

        //Capture each multiple's scale.
        this.package = {
            measure: this.currentMeasure,
            container: this.wrap,
            overlay: this.svg.append('g').classed('brush', true),
            value: this.currentMeasure,
            domain: clone(this.config.y.domain),
            xScale: clone(this.x),
            yScale: clone(this.y),
            brush: svg
                .brush()
                .x(this.x)
                .y(this.y)
        };
        this.wrap.datum(this.package);

        //Define invisible brush overlay.
        this.package.overlay.append('rect').attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });

        //Attach additional data to SVG and marks.
        this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.currentMeasure });

        //Add brush functionality.
        brush.call(this);

        //Rotate x-axis tick labels.
        if (this.config.x.rotate_tick_labels) {
            adjustTicks.call(this, 'x', -10, 10, -45, 'end', 10);
        }
    }
}
