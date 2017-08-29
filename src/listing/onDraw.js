import addPagination from './onDraw/addPagination';

export default function onDraw() {
    //Add pagination functionality.
    addPagination.call(this);

    //Highlight selected rows.
    this.table.selectAll('tbody tr').classed('brushed', d => d.raw.brushed);
}
