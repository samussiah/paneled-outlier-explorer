import { select } from 'd3';

export default function applyFilters(d) {
    this.data.brushed = [];
    this.data.selectedIDs = [];

    //Reset brush.
    this.multiples.forEach(multiple => {
        multiple.package.overlay.call(multiple.package.brush.clear());
        multiple.config.extent = multiple.package.brush.extent();
    });

    //De-highlight brushed lines.
    this.wrap.selectAll('.line-supergroup g.line path').classed('brushed', false);

    //De-highlight listing.
    select('#Listing-nav').classed('brushed', false);

    //Define filtered data.
    if (d.type === 'subsetter') {
        this.data.filtered = this.data.sorted.filter(d => {
            let filtered = false;

            this.controls.config.inputs.filter(d => d.type === 'subsetter').forEach(filter => {
                if (!filtered && filter.value && filter.value !== 'All')
                    filtered = d[filter.value_col] !== filter.value;
            });

            return !filtered;
        });

        //Reset listing pagination.
        this.listing.pagination.activeLink = 0;
        this.listing.pagination.startItem =
            this.listing.pagination.activeLink * this.listing.pagination.rowsShown;
        this.listing.pagination.endItem =
            this.listing.pagination.startItem + this.listing.pagination.rowsShown;
    }

    //Redraw listing.
    this.listing.draw(
        this.data.filtered.filter(
            (d, i) => this.listing.pagination.startItem <= i && i < this.listing.pagination.endItem
        )
    );
}
