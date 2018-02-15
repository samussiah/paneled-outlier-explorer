export default function classChart() {
    this.wrap
        .classed(this.measure.value.replace(/[^a-z0-9-]/gi, '-'), true)
        .classed('hidden', this.config.measures.indexOf(this.measure.value) === -1);
}
