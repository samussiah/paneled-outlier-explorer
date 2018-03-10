import { extent } from 'd3';

export default function setYoptions() {
    this.config.y.domain = extent(this.measure_data, d => +d[this.config.value_col]);
    const range = this.config.y.domain[1] - this.config.y.domain[0];
    this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';
}
