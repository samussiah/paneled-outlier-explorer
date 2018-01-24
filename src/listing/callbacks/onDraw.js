export default function onDraw() {
    //Highlight selected rows.
    this.table.selectAll('tbody tr').classed('poe-brushed', d => (d ? d.brushed : false));
}
