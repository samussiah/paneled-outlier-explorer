import clone from '../../../util/clone';
import { svg } from 'd3';

export default function definePackage() {
    this.package = {
        measure: this.measure,
        container: this.wrap,
        overlay: this.svg
            .append('g')
            .classed('brush', true),
        value: this.measure,
        domain: clone(this.config.y.domain),
        xScale: clone(this.x),
        yScale: clone(this.y),
        brush: svg
            .brush()
            .x(this.x)
            .y(this.y)
    };
    this.wrap.datum(this.package);
}
