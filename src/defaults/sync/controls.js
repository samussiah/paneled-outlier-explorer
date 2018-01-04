import controls from '../settings/controls';

export default function syncControls() {
    //Set x-axis control options to settings.time_cols[].value_col;
    controls
        .filter(control => control.label === 'X-axis')
        .pop()
        .values = settings.time_cols.map(d => d.value_col);

    //Add user-defined filters to controls.
    if (this.settings.synced.filters && this.settings.synced.filters.length)
        this.settings.synced.filters
            .forEach(filter => {
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
