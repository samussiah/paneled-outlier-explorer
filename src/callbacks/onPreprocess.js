import { extent } from 'd3';

export default function onPreprocess() {
    //Set the y-domain individually for each measure.
    this.currentMeasure = this.filters[0].val;
    this.config.y.domain = extent(
        this.raw_data.filter(d => d.TEST === this.currentMeasure),
        d => +d.STRESN
    );
}
