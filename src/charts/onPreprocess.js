import { extent } from 'd3';

export default function onPreprocess() {
    //Set the y-domain individually for each measure.
    this.config.y.domain = extent(
        this.raw_data.filter(d => d.measure_unit === this.currentMeasure),
        d => +d[this.config.value_col]
    );
    const range = this.config.y.domain[1] - this.config.y.domain[0];
    this.config.y.format = range < 0.1 ? '.3f' : range < 1 ? '.2f' : range < 10 ? '.1f' : '1d';

    //Sync config with X-axis selection.
    const xInput = this.controls.config.inputs.filter(input => input.label === 'X-axis')[0],
        time_col = this.config.time_cols.filter(
            time_col => time_col.label === this.config.x.label
        )[0];

    this.config.x.column = time_col.value_col;
    this.config.x.type = time_col.type;
    this.config.x.label = time_col.label;
    this.config.x.rotate_tick_labels = time_col.rotate_tick_labels;
}
