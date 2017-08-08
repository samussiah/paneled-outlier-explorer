export default function onInit() {
    //Sort data by key variables.
    this.raw_data = this.raw_data.sort((a, b) => {
        //sort first by panel
        let sort =
            a[this.config.panel_col] < b[this.config.panel_col]
                ? -1
                : a[this.config.panel_col] > b[this.config.panel_col] ? 1 : 0;

        //then sort by key variables
        if (sort === 0) {
            this.config.keys.forEach(key => {
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
}
