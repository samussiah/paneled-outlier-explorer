export default function onDatatransform() {
    //Hide system variables.
    this.config.cols = this.config.cols.filter(
        col => ['brushed', 'measure_unit'].indexOf(col) === -1
    );

    //Use brushed data if available, filtered data otherwise.
    this.data = this.parent.data.brushed.length
        ? this.parent.data.brushed
        : this.parent.data.filtered;
}
