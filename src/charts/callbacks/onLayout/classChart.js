export default function classChart() {
    this.wrap
        .classed(this.measure.replace(/[^a-z0-9-]/gi, '-'), true)
        .classed(
            'poe-hidden',
            this.parent.paneledOutlierExplorer.data.currentMeasures.indexOf(this.measure) === -1
        );
}
