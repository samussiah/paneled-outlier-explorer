export default function defineData() {
    this.measure_data = this.raw_data.filter(d => d.measure_unit === this.currentMeasure);
}
