export default function syncTimeScale() {
    const xInput = this.controls.config.inputs.filter(input => input.label === 'X-axis')[0],
        time_col = this.parent.paneledOutlierExplorer.settings.time_cols.filter(
            time_col => time_col.value_col === this.config.x.column
        )[0];

    this.config.x.type = time_col.type;
    this.config.x.order = time_col.order;
    this.config.x.rotate_tick_labels = time_col.rotate_tick_labels;
    this.config.margin.bottom = time_col.vertical_space;
}
