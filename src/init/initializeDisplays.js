import { multiply } from 'webcharts';

export default function initializeDisplays() {
    //Initialize charts.
    multiply(this.charts, this.data.raw, 'measure_unit');

    //Initialize listing.
    this.listing.init(this.data.raw);
}
