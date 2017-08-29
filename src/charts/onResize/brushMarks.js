import { select } from 'd3';
import doLineSegmentsIntersect from './lineIntersection';

export default function brushMarks(chart, lines) {
    chart.parent.brushedMeasure = chart.currentMeasure;

    const extent = chart.config.extent,
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
    const brushedLines = lines.filter((d, i) => {
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
    chart.parent.data.selectedIDs = brushedLines.data().map(d => d.id);

    //Highlight brushed lines.
    chart.parent.wrap
        .selectAll('.line-supergroup g.line path')
        .classed('brushed', false)
        .filter(d => chart.parent.data.selectedIDs.indexOf(d.id) > -1)
        .classed('brushed', true)
        .each(function(d) {
            select(this.parentNode).moveToFront();
        });

    //Draw listing displaying brushed IDs first.
    if (chart.parent.data.selectedIDs.length) {
        chart.parent.data.filtered.forEach(d => {
            d.brushed = chart.parent.data.selectedIDs.indexOf(d[chart.config.id_col]) > -1;
        });
        chart.parent.data.brushed = chart.parent.data.filtered.filter(d => d.brushed);
        chart.parent.listing.draw(chart.parent.data.brushed);
        select('#Listing-nav').classed('brushed', true);
    } else {
        chart.parent.data.brushed = [];
        chart.parent.listing.draw(chart.parent.data.filtered.filter((d, i) => i < 25));
        select('#Listing-nav').classed('brushed', false);
    }
}
