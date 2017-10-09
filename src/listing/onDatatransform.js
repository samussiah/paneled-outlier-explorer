export default function onDatatransform() {
    //Hide system variables.
    this.config.cols = this.config.cols.filter(
        col => ['brushed', 'measure_unit'].indexOf(col) === -1
    );
}
