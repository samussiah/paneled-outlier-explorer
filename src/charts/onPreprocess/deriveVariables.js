export default function deriveVariables() {
    this.measure_data.forEach(d => {
        d.abnormal =
            d[this.config.value_col] < this.lln(d) || d[this.config.value_col] > this.uln(d);
    });
}
