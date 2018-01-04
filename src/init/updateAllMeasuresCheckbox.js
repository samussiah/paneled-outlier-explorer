export default function updateAllMeasuresCheckbox() {
    this.containers.allMeasuresToggle
        .attr('title', this.data.currentMeasures.length === this.config.quantitativeMeasures.length
            ? 'Remove all charts'
            : 'Display all charts'
        )
        .property('checked', this.data.currentMeasures.length === this.config.quantitativeMeasures.length)
}
