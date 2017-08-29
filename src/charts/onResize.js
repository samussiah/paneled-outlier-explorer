import clone from '../util/clone';
import { svg, select } from 'd3';
import '../util/moveToFront';
import brush from './onResize/brush';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    const chart = this;

    //Draw normal range.
    this.svg.select('.normal-range').remove();
    this.svg.insert('rect', '.line-supergroup').classed('normal-range', true).attr({
        x: this.x(this.x_dom[0]) - 1,
        y: this.y(this.filtered_data[0][this.config.uln_col]),
        width: this.plot_width + 2,
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
        brush: svg.brush().x(this.x).y(this.y)
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

    // rotate ticks
    if (this.config.x.rotate_tick_labels) {
        adjustTicks.call(this, 'x', -10, 10, -45, 'end', 8);
    }
}
