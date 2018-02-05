import definePackage from './onResize/definePackage';
import drawNormalRange from './onResize/drawNormalRange';
import brush from './onResize/brush';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    const context = this;

    //Define datum for each multiple and attach it to multiple's container.
    definePackage.call(this);

    //Draw normal range.
    if (this.filtered_data.length == 0) {
        this.svg.selectAll('*').classed('hidden', true);
        this.svg.select('text.no-data').remove();
        this.svg
            .append('text')
            .classed('no-data', true)
            .attr({
                x: 0,
                dx: -this.config.margin.left,
                y: 0,
                dy: 10
            })
            .text('No data selected.');
    } else {
        this.svg.selectAll('*').classed('hidden', false);
        this.svg.select('text.no-data').remove();

        //Draw normal range.
        drawNormalRange.call(this);

        //Define invisible brush overlay.
        this.package.overlay.append('rect').attr({
            x: 0,
            y: 0,
            width: this.plot_width,
            height: this.plot_height,
            'fill-opacity': 0
        });

        //Attach additional data to SVG and marks.
        this.package.overlay.style('cursor', 'crosshair').datum({ measure: this.currentMeasure });

        //Add brush functionality.
        brush.call(this);

        //Rotate x-axis tick labels.
        if (this.config.x.rotate_tick_labels) {
            adjustTicks.call(this, 'x', -10, 10, -45, 'end', 10);
        }
    }
}
