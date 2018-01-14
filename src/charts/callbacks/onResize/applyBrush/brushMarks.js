import doLineSegmentsIntersect from './brushMarks/doLineSegmentsIntersect';
import { select } from 'd3';
import '../../../../util/moveToFront';

export default function brushMarks() {
    this.parent.brushedMeasure = this.measure;

    const extent = this.config.extent,
        x0 = extent[0][0], // top left x-coordinate
        y0 = extent[1][1], // top left y-coordinate
        x1 = extent[1][0], // bottom right x-coordinate
        y1 = extent[0][1], // bottom right y-coordinate
        top = { x0: x1, y0: y0, x1: x0, y1: y0 },
        right = { x0: x1, y0: y1, x1: x1, y1: y0 },
        bottom = { x0: x0, y0: y1, x1: x1, y1: y1 },
        left = { x0: x0, y0: y0, x1: x0, y1: y1 },
        sides = [top, right, bottom, left];

    //Determine which lines fall inside the brush.
    const brushedLines = this.package.lines.filter((d, i) => {
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
    this.parent.paneledOutlierExplorer.data.selectedIDs = brushedLines.data().map(d => d.id);

    //Highlight brushed lines.
    this.parent.wrap
        .selectAll('.line-supergroup g.line path')
        .classed('brushed', false)
        .filter(d => this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1)
        .classed('brushed', true)
        .each(function(d) {
            select(this.parentNode).moveToFront();
        });

    //Draw listing displaying brushed IDs first.
    if (this.parent.paneledOutlierExplorer.data.selectedIDs.length) {
        this.parent.paneledOutlierExplorer.data.filtered.forEach(d => {
            d.brushed = this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d[this.config.id_col]) > -1;
        });
        this.parent.paneledOutlierExplorer.data.brushed = this.parent.paneledOutlierExplorer.data.filtered.filter(d => d.brushed);
        this.parent.listing.draw(this.parent.paneledOutlierExplorer.data.brushed);
        select('#Listing-nav').classed('brushed', true);
    } else {
        this.parent.paneledOutlierExplorer.data.brushed = [];
        this.parent.listing.draw(this.parent.paneledOutlierExplorer.data.filtered);
        select('#Listing-nav').classed('brushed', false);
    }
}
