import { set } from 'd3';
import { multiply } from 'webcharts';
import layout from './init/layout';

export default function init(data) {
    const sortedData = data.sort((a, b) => {
        const aValue = a[this.config.measure_col],
            bValue = b[this.config.measure_col],
            leftSort = aValue < bValue,
            rightSort = aValue > bValue;

        if (this.config.measures && this.config.measures.length) {
            const aPos = this.config.measures.indexOf(aValue),
                bPos = this.config.measures.indexOf(bValue),
                diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

            return diff ? diff : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
        } else return leftSort ? -1 : rightSort ? 1 : 0;
    });

    //Capture unique measures.
    this.config.allMeasures = set(data.map(d => d[this.config.measure_col]))
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

    this.data = data;
    layout.call(this);

  //Charts
    this.wrap.attr('id', 'Charts');
    multiply(this, sortedData, this.config.measure_col);

  //Listing
    this.listing.wrap.attr('id', 'Listing');
    this.listing.init(data.splice(0,25));
    this.listing.wrap.classed('hidden', true);
}
