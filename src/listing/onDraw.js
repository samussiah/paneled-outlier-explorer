export default function onDraw() {
    //Highlight selected rows.
    this.table.selectAll('tbody tr')
        .classed('brushed', d => d ? d.brushed : false);
}
