import { multiply } from 'webcharts';

export default function init(data) {
    multiply(this, data, this.config.measure_col);
}
