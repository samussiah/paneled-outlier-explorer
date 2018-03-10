export default function deriveVariables() {
    this.data.raw.forEach(d => {
        d.brushed = false;
        if (d[this.config.unit_col])
            d.measure_unit = `${d[this.config.measure_col]} (${d[this.config.unit_col]})`;
        else d.measure_unit = d[this.config.measure_col];

        const lo =
                d[this.config.lln_col] !== undefined
                    ? +d[this.config.value_col] < +d[this.config.lln_col]
                    : false,
            hi =
                d[this.config.uln_col] !== undefined
                    ? +d[this.config.value_col] > +d[this.config.uln_col]
                    : false;
        d.abnormal = lo || hi;
    });
}
