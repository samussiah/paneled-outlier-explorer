import { set } from 'd3';

export default function onInit() {
    this.currentMeasure = this.filters[0].val;

    //Sort data by key variables.
    this.raw_data = this.raw_data.sort((a, b) => {
        //sort first by panel
        let sort =
            a[this.config.panel_col] < b[this.config.panel_col]
                ? -1
                : a[this.config.panel_col] > b[this.config.panel_col] ? 1 : 0;

        //then sort by key variables
        if (sort === 0) {
            [this.config.id_col, this.config.time_col].forEach(key => {
                if (sort === 0) sort = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
            });
        }

        return sort;
    });

    //Define unique identifier.
    let key;
    this.raw_data.forEach((d, i) => {
        const previousMeasure = i > 0 ? this.raw_data[i - 1][this.config.panel_col] : null;

        if (d[this.config.panel_col] !== previousMeasure) key = 0;
        key++;

        d.key = key;
    });

    //Capture unique measures.
    this.config.allMeasures = set(this.raw_data.map(d => d[this.config.measure_col]))
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
}
