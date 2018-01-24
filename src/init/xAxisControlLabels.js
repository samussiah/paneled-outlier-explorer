export default function xAxisControlLabels() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.label === 'X-axis')
        .selectAll('option')
        .property(
            'label',
            d =>
                this.settings.synced.time_cols.filter(time_col => time_col.value_col === d).pop()
                    .label
        );
}
