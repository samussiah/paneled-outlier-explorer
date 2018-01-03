export default function defineData(data) {
    this.data = {
        raw: data,
        sorted: data
            .filter(
                d =>
                    /^[0-9.]+$/.test(d[this.config.value_col]) &&
                    !/^\s*$/.test(d[this.config.measure_col])
            )
            .sort((a, b) => {
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
    if (this.data.raw.length !== this.data.sorted.length)
        console.warn(
            `${this.data.raw.length -
                this.data.sorted.length} non-numeric observations have been removed from the data.`
        );
    this.data.sorted.forEach(d => {
        d.brushed = false;
        if (d[this.config.unit_col])
            d.measure_unit = `${d[this.config.measure_col]} (${d[this.config.unit_col]})`;
        else d.measure_unit = d[this.config.measure_col];
    });
    this.data.filtered = this.data.sorted;
    this.data.brushed = [];
    this.data.selectedIDs = [];
}
