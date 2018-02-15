import { set } from 'd3';

export default function defineMeasureData() {
    this.measure = {
        value: this.filters[0].val
    };
    this.measure.data = this.raw_data.filter(d => d.measure_unit === this.measure.value);
    this.measure.results = this.measure.data
        .map(d => +d[this.config.value_col])
        .sort((a, b) => a - b);
    this.measure.IDs = {
        all: set(this.measure.data.map(d => d[this.config.id_col]))
            .values()
            .sort()
    };
}
