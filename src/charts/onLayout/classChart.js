export default function classChart() {
    this.wrap
        .classed(this.currentMeasure.replace(/[^a-z0-9-]/gi, '-'), true)
        .classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
}
