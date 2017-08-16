import clone from '../util/clone';
import { svg } from 'd3';
import '../util/moveToFront';
import brush from './onResize/brush';

export default function onResize() {
    const chart = this;

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
}
