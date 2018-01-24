import { select } from 'd3';

export default function maintainHighlighting() {
    if (this.POE.data.selectedIDs.length) {
        const context = this;
        this.package.lines
            .classed('poe-brushed', d => this.POE.data.selectedIDs.indexOf(d.id) > -1)
            .each(function(d) {
                if (context.POE.data.selectedIDs.indexOf(d.id) > -1)
                    select(this.parentNode).moveToFront();
            });
    }
}
