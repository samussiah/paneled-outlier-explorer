import addPagination from './onDraw/addPagination';

export default function onDraw() {
    //Add pagination functionality.
    if (this.parent.brushedData.length === 0) {
        this.pagination.wrap.classed('hidden', false);
        addPagination.call(this);
    } else this.pagination.wrap.classed('hidden', true);

    //Highlight selected rows.
    this.table.selectAll('tbody tr').classed('brushed', d => d.raw.brushed);
}
