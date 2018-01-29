export default function defineData() {
    this.data.raw = this.data.initial.filter(
        d => /^[0-9.]+$/.test(d[this.config.value_col]) && !/^\s*$/.test(d[this.config.measure_col])
    );

    if (this.data.raw.length !== this.data.initial.length)
        console.warn(
            `${this.data.initial.length -
                this.data.raw.length} non-numeric observations have been removed from the data.`
        );

    this.data.filtered = this.data.raw;
    this.data.brushed = [];
    this.data.selectedIDs = [];
}
