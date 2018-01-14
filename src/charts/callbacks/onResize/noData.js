export default function noData() {
    this.svg
        .append('text')
        .classed('poe-no-data', true)
        .attr({
            x: 0,
            dx: -this.config.margin.left,
            y: 0,
            dy: 10
        })
        .text('No data selected.');
}
