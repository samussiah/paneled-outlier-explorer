import { set } from 'd3';

export default function defineMeasureData() {
    this.measure_data = this.raw_data.filter(d => d.measure_unit === this.currentMeasure);
    this.measure_results = this.measure_data
        .map(d => +d[this.config.value_col])
        .sort((a, b) => a - b);
    this.measure_IDs = set(this.measure_data.map(d => d[this.config.id_col]))
        .values()
        .sort();
}
