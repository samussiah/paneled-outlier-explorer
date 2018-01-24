export default function addBrushOverlay() {
    this.package.overlay
        .append('rect')
        .attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });
    this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.measure });
}
