import { select } from 'd3';

export default function maintainHighlighting() {
    if (this.parent.paneledOutlierExplorer.data.selectedIDs.length) {
        this.package.lines
            .filter(d => this.parent.paneledOutlierExplorer.data.selectedIDs.indexOf(d.id) > -1)
            .classed('brushed', true)
            .each(function() {
                select(this.parentNode).moveToFront();
            });
    }
}
