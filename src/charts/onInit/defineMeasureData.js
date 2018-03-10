export default function defineMeasureData() {
    this.measure_data = this.raw_data.filter(d => d.measure_unit === this.currentMeasure);
    this.results = this.measure_data.map(d => +d[this.config.value_col]).sort((a, b) => a - b);
}
