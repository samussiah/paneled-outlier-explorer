export default function addBrushOverlay() {
    this.package.overlay
        .append('rect')
        .datum({ measure: this.measure })
        .classed('poe-brush-overlay', true)
        .attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });
}
