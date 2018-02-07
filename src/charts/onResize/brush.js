import { select, selectAll } from 'd3';
import '../../util/moveToFront';
import brushMarks from './brush/brushMarks';

export default function brush() {
    //Highlight previously brushed points.
    if (this.parent.data.selectedIDs.length) {
        this.lines
            .filter(d => this.parent.data.selectedIDs.indexOf(d.id) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
    }

    //Apply brush.
    this.package.brush
        .on('brushstart', () => {
            //Clear previous brush.
            if (this.parent.brushedChart)
                this.parent.brushedChart.package.overlay.call(
                    this.parent.brushedChart.package.brush.clear()
                );

            //Attach current brushed chart to parent.
            this.parent.brushedChart = this;
            this.parent.brushedMeasure = this.currentMeasure;
        })
        .on('brush', () => {})
        .on('brushend', () => {
            this.config.extent = this.package.brush.extent();

            //Brush marks.
            brushMarks.call(this);

            if (this.parent.data.selectedIDs.length > 0)
                this.parent.multiples
                    .filter(
                        multiple =>
                            this.parent.data.selectedIDs.filter(
                                ID => multiple.displayedIDs.indexOf(ID) < 0
                            ).length > 0
                    )
                    .forEach(multiple => {
                        multiple.draw();
                    });
        });

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);

    //Maintain brush on redraw.
    if (!this.config.extent) this.config.extent = this.package.brush.extent();
    if (
        (this.config.extent[0][0] !== this.package.brush.extent()[0][0] ||
            this.config.extent[0][1] !== this.package.brush.extent()[0][1] ||
            this.config.extent[1][0] !== this.package.brush.extent()[1][0] ||
            this.config.extent[1][1] !== this.package.brush.extent()[1][1]) &&
        this.currentMeasure === this.parent.brushedMeasure
    ) {
        if (this.config.x.type === 'ordinal') {
            this.config.extent[0][0] =
                this.config.extent[0][0] * this.plot_width / this.config.previous_plot_width;
            this.config.extent[1][0] =
                this.config.extent[1][0] * this.plot_width / this.config.previous_plot_width;
        }
        this.package.brush.extent(this.config.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks.call(this);
    }
}
