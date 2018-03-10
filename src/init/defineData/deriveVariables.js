export default function deriveVariables() {
    const ordinalTimeSettings = this.config.time_cols.find(time_col => time_col.type === 'ordinal');

    this.data.raw.forEach(d => {
        //brushed datum placeholder
        d.brushed = false;

        //Concatenate measure and unit.
        if (d[this.config.unit_col])
            d.measure_unit = `${d[this.config.measure_col]} (${d[this.config.unit_col]})`;
        else d.measure_unit = d[this.config.measure_col];

        //Identify abnormal results.
        const lo =
                d[this.config.lln_col] !== undefined
                    ? +d[this.config.value_col] < +d[this.config.lln_col]
                    : false,
            hi =
                d[this.config.uln_col] !== undefined
                    ? +d[this.config.value_col] > +d[this.config.uln_col]
                    : false;
        d.abnormal = lo || hi;

        //Identify unscheduled visits.
        d.unscheduled = false;
        if (ordinalTimeSettings) {
            if (this.config.unscheduled_visit_values)
                d.unscheduled =
                    this.config.unscheduled_visit_values.indexOf(d[ordinalTimeSettings.value_col]) >
                    -1;
            else if (this.config.unscheduled_visit_regex)
                d.unscheduled = this.config.unscheduled_visit_regex.test(
                    d[ordinalTimeSettings.value_col]
                );
        }
    });
}
