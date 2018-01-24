import doLineSegmentsIntersect from './brushMarks/doLineSegmentsIntersect';
import { select } from 'd3';
import '../../../../util/moveToFront';

export default function brushMarks() {
    this.parent.brushedMeasure = this.measure;

    const extent = this.extent,
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
    this.POE.data.selectedIDs = brushedLines.data().map(d => d.id);

    //Highlight brushed lines.
    this.parent.wrap
        .selectAll('.line-supergroup g.line path')
        .classed('poe-brushed', d => this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1)
        .filter(d => this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1)
        .each(function(d) {
            select(this.parentNode).moveToFront();
        });

    //Draw listing displaying brushed IDs first.
    if (this.POE.data.selectedIDs.length) {
        this.POE.data.filtered.forEach(d => {
            d.brushed =
                this.POE.data.selectedIDs.indexOf(d[this.config.id_col]) >
                -1;
        });
        this.POE.data.brushed = this.POE.data.filtered.filter(
            d => d.brushed
        );
        console.log(this.POE.data.brushed);
        this.POE.listing.draw(this.POE.data.brushed);
        select('#poe-listing-nav').classed('poe-brushed', true);
    } else {
        this.POE.data.brushed = [];
        this.POE.listing.draw(this.POE.data.filtered);
        select('#poe-listing-nav').classed('poe-brushed', false);
    }
}
