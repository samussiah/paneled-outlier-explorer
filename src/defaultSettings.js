import clone from './util/clone';

export default {
    measure_col: 'TEST',
    time_cols: [
        {
            value_col: 'DY',
            type: 'linear',
            label: 'Study Day',
            rotate_tick_labels: false,
            vertical_space: 0
        },
        {
            value_col: 'VISITN',
            type: 'ordinal',
            label: 'Visit Number',
            rotate_tick_labels: false,
            vertical_space: 0
        },
        {
            value_col: 'VISIT',
            type: 'ordinal',
            label: 'Visit',
            rotate_tick_labels: true,
            vertical_space: 100
        }
    ],
    value_col: 'STRESN',
    id_col: 'USUBJID',
    unit_col: 'STRESU',
    lln_col: 'STNRLO',
    uln_col: 'STNRHI',
    measures: null,
    filters: null,
    rotate_x_tick_labels: true,

    x: {
        type: null, // sync to [ time_cols[0].type ]
        column: null, // sync to [ time_cols[0].value_col ]
        label: null // sync to [ time_cols[0].label ]
    },
    y: {
        type: 'linear',
        column: null, // sync to [ value_col ]
        label: ''
    },
    marks: [
        {
            type: 'line',
            per: null, // sync to [ id_col ] and [ measure_col ]
            attributes: {
                'stroke-width': 1,
                'stroke-opacity': 0.2,
                stroke: 'black'
            }
        }
    ],
    resizable: false,
    scale_text: false,
    width: 365,
    height: 200,
    margin: {
        left: 40
    },
    gridlines: 'xy'
};

export function syncSettings(settings) {
    const syncedSettings = clone(settings);
    syncedSettings.x.type = settings.time_cols[0].type;
    syncedSettings.x.column = settings.time_cols[0].value_col;
    syncedSettings.x.label = settings.time_cols[0].label;
    syncedSettings.x.rotate_tick_labels = settings.time_cols[0].rotate_tick_labels;
    syncedSettings.y.column = settings.value_col;
    syncedSettings.marks[0].per = [settings.id_col, settings.measure_col];

    return syncedSettings;
}

export const controlInputs = [
    {
        type: 'dropdown',
        label: 'X-axis',
        option: 'x.label',
        require: true
    }
];

export function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);

    syncedControlInputs.filter(
        controlInput => controlInput.label === 'X-axis'
    )[0].values = settings.time_cols.map(d => d.label || d);

    if (settings.filters)
        settings.filters.forEach(filter => {
            syncedControlInputs.push({
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter,
                description: 'filter',
                multiple: false
            });
        });

    return syncedControlInputs;
}
