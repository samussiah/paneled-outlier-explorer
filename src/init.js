import { set, selectAll, select } from 'd3';
import { multiply } from 'webcharts';
import layout from './init/layout';
import applyFilters from './init/applyFilters';

export default function init(data) {
    const chart = this;

    //Attach data arrays to central chart object.
    this.data = {
        raw: data,
        sorted: data.sort((a, b) => {
            const aValue = a[this.config.measure_col],
                bValue = b[this.config.measure_col],
                leftSort = aValue < bValue,
                rightSort = aValue > bValue,
                aID = a[this.config.id_col],
                bID = b[this.config.id_col],
                aTime = a[this.config.time_col],
                bTime = b[this.config.time_col];

            let sort;
            if (this.config.measures && this.config.measures.length) {
                const aPos = this.config.measures.indexOf(aValue),
                    bPos = this.config.measures.indexOf(bValue),
                    diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

                sort = diff
                    ? diff
                    : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
            } else sort = leftSort ? -1 : rightSort ? 1 : 0;

            if (!sort) sort = aID < bID ? -1 : aID > bID ? 1 : +aTime - +bTime;

            return sort;
        })
    };
    this.data.sorted.forEach(d => {
        d.brushed = false;
        if (d[this.config.unit_col])
            d.measure_unit = `${d[this.config.measure_col]} (${d[this.config.unit_col]})`;
        else d.measure_unit = d[this.config.measure_col];
    });
    this.data.filtered = this.data.sorted;
    this.data.brushed = [];
    this.data.selectedIDs = [];

    //Capture unique measures.
    this.config.allMeasures = set(this.data.sorted.map(d => d.measure_unit))
        .values()
        .sort((a, b) => {
            const leftSort = a < b,
                rightSort = a > b;

            if (this.config.measures && this.config.measures.length) {
                const aPos = this.config.measures.indexOf(a),
                    bPos = this.config.measures.indexOf(b),
                    diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

                return diff
                    ? diff
                    : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
            } else return leftSort ? -1 : rightSort ? 1 : 0;
        });
    this.config.measures =
        this.config.measures && this.config.measures.length
            ? this.config.measures
            : this.config.allMeasures;

    layout.call(this);

    //Charts
    this.wrap.attr('id', 'Charts');
    multiply(this, this.data.sorted, 'measure_unit');

    //Listing
    this.listing.wrap.attr('id', 'Listing');
    this.listing.parent = this;
    this.listing.init(this.data.sorted.filter((d, i) => i < 25));
    this.listing.wrap.classed('hidden', true);

    //Define custom event listener for filters.
    selectAll('#left-side .wc-controls .control-group').on('change', function(d) {
        d.value = select(this)
            .selectAll('option')
            .filter(function() {
                return this.selected;
            })
            .text();
        applyFilters.call(chart);
    });
}
