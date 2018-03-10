export default function setXoptions() {
    //Sync config with X-axis selection.
    const xInput = this.controls.config.inputs.find(input => input.label === 'X-axis'),
        time_col = this.config.time_cols.find(
            time_col => time_col.value_col === this.config.x.column
        );

    this.config.x.type = time_col.type;
    this.config.x.order = time_col.order;
    this.config.x.rotate_tick_labels = time_col.rotate_tick_labels;
    this.config.margin.bottom = time_col.vertical_space;
}
