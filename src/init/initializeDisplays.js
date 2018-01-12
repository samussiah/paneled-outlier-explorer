import { multiply } from 'webcharts';

export default function initializeDisplays() {
    //Initialize charts.
    multiply(this.charts, this.data.raw, 'measure_unit', this.data.measures);

    //Initialize listing.
    this.listing.init(this.data.raw);
    this.containers.listing.classed('poe-hidden', true);
}
