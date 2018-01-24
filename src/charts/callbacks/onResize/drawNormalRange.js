export default function drawNormalRange() {
    this.svg.select('.poe-normal-range').remove();
    if (
        this.filtered_data[0].hasOwnProperty(this.config.lln_col) &&
        this.filtered_data[0].hasOwnProperty(this.config.uln_col)
    ) {
        const y0 = this.y(this.filtered_data[0][this.config.uln_col]);
        this.svg
            .insert('rect', '.line-supergroup')
            .classed('poe-normal-range', true)
            .attr({
                x: this.x(this.x_dom[0]) - 5, // make sure left side of normal range does not appear in chart
                y: y0,
                width: this.plot_width + 10, // make sure right side of normal range does not appear in chart
                height: this.y(this.filtered_data[0][this.config.lln_col]) - y0,
                fill: 'green',
                'fill-opacity': 0.05,
                stroke: 'green',
                'stroke-opacity': 1,
                'clip-path': `url(#${this.id})`
            });
    }
}
