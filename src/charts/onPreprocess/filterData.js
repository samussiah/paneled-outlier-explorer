import { set } from 'd3';

export default function filterData() {
    this.raw_data = this.measure.data;

    //Count number of IDs given current filters.
    if (this.filters.some(filter => filter.col !== 'measure_unit' && filter.val !== 'All'))
        this.measure.IDs.filtered = d3
            .set(
                this.raw_data
                    .filter(d => {
                        let filtered = false;

                        this.filters
                            .filter(filter => filter.col !== 'measure_unit')
                            .forEach(filter => {
                                if (filtered === false && filter.val !== 'All')
                                    filtered =
                                        filter.val instanceof Array
                                            ? filter.val.indexOf(d[filter.col]) < 0
                                            : filter.val !== d[filter.col];
                            });

                        return !filtered;
                    })
                    .map(d => d[this.config.id_col])
            )
            .values()
            .sort();
    else this.measure.IDs.filtered = this.measure.IDs.all;

    //Remove inlier IDs from data.
    if (!this.config.inliers)
        this.raw_data = this.raw_data.filter(d => d.abnormalID || d.brushedID);

    //Remove unscheduled visits from data.
    if (!this.config.unscheduled_visits) this.raw_data = this.raw_data.filter(d => !d.unscheduled);

    this.measure.IDs.current = this.measure.IDs.filtered.filter(
        ID =>
            set(this.raw_data.map(d => d[this.config.id_col]))
                .values()
                .indexOf(ID) > -1
    );
}
