import { select } from 'd3';
import doLineSegmentsIntersect from './brushMarks/doLineSegmentsIntersect';

export default function brushMarks() {
    const extent = this.config.extent;
    const x0 = extent[0][0]; // top left x-coordinate
    const y0 = extent[1][1]; // top left y-coordinate
    const x1 = extent[1][0]; // bottom right x-coordinate
    const y1 = extent[0][1]; // bottom right y-coordinate
    const top = { x0: x1, y0: y0, x1: x0, y1: y0 };
    const right = { x0: x1, y0: y1, x1: x1, y1: y0 };
    const bottom = { x0: x0, y0: y1, x1: x1, y1: y1 };
    const left = { x0: x0, y0: y0, x1: x0, y1: y1 };
    const sides = [top, right, bottom, left];

    //Determine which lines fall inside the brush.
    const brushedLines = this.lines.filter((d, i) => {
        let intersection = false;
        d.lines.forEach((line, j) => {
            sides.forEach((side, k) => {
                if (!intersection)
                    intersection = doLineSegmentsIntersect(
                        { x: line.x0, y: line.y0 },
                        { x: line.x1, y: line.y1 },
                        { x: side.x0, y: side.y0 },
                        { x: side.x1, y: side.y1 }
                    );
            });
        });

        return intersection;
    });

    //Attached brushed IDs to chart parent object.
    this.parent.data.IDs.selected = brushedLines.data().map(d => d.id);

    //Highlight brushed lines.
    this.parent.wrap
        .selectAll('.line-supergroup g.line path')
        .classed('brushed', false)
        .filter(d => this.parent.data.IDs.selected.indexOf(d.id) > -1)
        .classed('brushed', true)
        .each(function(d) {
            select(this.parentNode).moveToFront();
        });

    //Draw listing displaying brushed IDs first.
    if (this.parent.data.IDs.selected.length) {
        select('#Listing-nav').classed('brushed', true);
        this.parent.listing.data.raw = this.parent.data.raw.filter(
            d => this.parent.data.IDs.selected.indexOf(d[this.config.id_col]) > -1
        );
        this.parent.listing.draw();
    } else {
        select('#Listing-nav').classed('brushed', false);
        this.parent.listing.data.raw = this.parent.data.raw;
        this.parent.listing.draw();
    }
}
