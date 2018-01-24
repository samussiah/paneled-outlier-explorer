import controls from '../settings/controls';

export default function syncControls() {
    //Set x-axis control options to settings.time_cols[].value_col;
    controls
        .filter(control => control.label === 'X-axis')
        .pop().values = this.settings.time_cols.map(d => d.value_col);

    //Add user-defined filters to controls.
    if (this.settings.filters && this.settings.filters.length)
        this.settings.filters.forEach(filter => {
            controls.push({
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter,
                description: 'filter',
                multiple: filter.multiple || false
            });
        });

    this.settings.controls = controls;
}
