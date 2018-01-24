import clone from '../../../util/clone';
import { svg } from 'd3';
import defineLineDataArray from './definePackage/defineLineDataArray';

export default function definePackage() {
    this.package = {
        measure: this.measure,
        container: this.wrap,
        overlay: this.svg.append('g'),
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
    this.wrap.datum(this.package);
}
