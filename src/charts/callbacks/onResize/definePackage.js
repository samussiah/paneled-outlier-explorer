import clone from '../../../util/clone';
import { svg } from 'd3';
import defineLineDataArray from './definePackage/defineLineDataArray';

export default function definePackage() {
    this.package = {
        measure: this.measure,
        container: this.wrap,
        overlay: this.svg
            .append('g')
            .classed('brush', true),
        domain: clone(this.config.y.domain),
        xScale: clone(this.x),
        yScale: clone(this.y),
        brush: svg
            .brush()
            .x(this.x)
            .y(this.y)
    };

    //Define line data arrays.
    defineLineDataArray.call(this);

    //Attach packge to chart container.
    console.log(this.wrap.select('.poe-chart-button').datum());
    this.wrap.select('.wc-title').datum(function() { return null; });
    console.log(this.wrap.select('.wc-title'));
    this.wrap.datum(this.package);
    console.log(this.wrap.select('.poe-chart-button').datum());
}
