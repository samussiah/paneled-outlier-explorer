import clone from './util/clone';

export const rendererSettings = {
    measure_col: 'TEST',
    time_cols: [
        {
            value_col: 'VISIT',
            type: 'ordinal',
            order: null,
            order_col: 'VISITNUM',
            label: 'Visit',
            rotate_tick_labels: true,
            vertical_space: 75
        },
        {
            value_col: 'DY',
            type: 'linear',
            order: null,
            order_col: 'DY',
            label: 'Study Day',
            rotate_tick_labels: false,
            vertical_space: 0
        }
    ],
    value_col: 'STRESN',
    id_col: 'USUBJID',
    unit_col: 'STRESU',
    lln_col: 'STNRLO',
    uln_col: 'STNRHI',
    measures: null,
    filters: null,
    multiples_sizing: {
        width: 350,
        height: 175
    },
    inliers: false,
    visits_without_data: false,
    unscheduled_visits: false,
    unscheduled_visit_pattern: '/unscheduled|early termination/i',
    unscheduled_visit_values: null // takes precedence over unscheduled_visit_pattern   visits_without_data: false,
};

export const webchartsSettings = {
    x: {
        type: null, // sync to [ time_cols[0].type ]
        column: null, // sync to [ time_cols[0].value_col ]
        label: '' // sync to [ time_cols[0].label ]
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
    margin: {
        bottom: 0,
        left: 50
    },
    gridlines: 'xy'
};

export default Object.assign(rendererSettings, webchartsSettings);

export function syncSettings(settings) {
    const syncedSettings = clone(settings);
    syncedSettings.x.type = settings.time_cols[0].type;
    syncedSettings.x.order = settings.time_cols[0].order;
    syncedSettings.x.column = settings.time_cols[0].value_col;
    syncedSettings.x.rotate_tick_labels = settings.time_cols[0].rotate_tick_labels;
    syncedSettings.y.column = settings.value_col;
    syncedSettings.marks[0].per = [settings.id_col, settings.measure_col];
    syncedSettings.width = syncedSettings.multiples_sizing.width;
    syncedSettings.height = syncedSettings.multiples_sizing.height;

    //Convert unscheduled_visit_pattern from string to regular expression.
    if (
        typeof syncedSettings.unscheduled_visit_pattern === 'string' &&
        syncedSettings.unscheduled_visit_pattern !== ''
    ) {
        const flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
            pattern = settings.unscheduled_visit_pattern.replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            );
        syncedSettings.unscheduled_visit_regex = new RegExp(pattern, flags);
    }

    return syncedSettings;
}

export const controlInputs = [
    {
        type: 'dropdown',
        label: 'X-axis',
        option: 'x.column',
        require: true
    },
    {
        type: 'checkbox',
        label: 'Inliers',
        option: 'inliers'
    },
    {
        type: 'checkbox',
        label: 'Visits without data',
        option: 'visits_without_data'
    },
    {
        type: 'checkbox',
        label: 'Unscheduled visits',
        option: 'unscheduled_visits'
    },
    {
        type: 'dropdown',
        label: 'Normal Range Method',
        option: 'normal_range_method',
        values: ['Data-driven', 'Standard Deviations', 'Quantiles', 'User-defined']
    },
    {
        type: 'number',
        label: 'Normal Range - Standard Deviations',
        option: 'normal_range_sd'
    },
    {
        type: 'number',
        label: 'Normal Range - Lower Quantile',
        option: 'normal_range_quantile_low'
    },
    {
        type: 'number',
        label: 'Normal Range - Upper Quantile',
        option: 'normal_range_quantile_high'
    },
    {
        type: 'number',
        label: 'Normal Range - Lower Value',
        option: 'normal_range_value_low'
    },
    {
        type: 'number',
        label: 'Normal Range - Upper Value',
        option: 'normal_range_value_high'
    }
];

export function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);

    syncedControlInputs.filter(
        controlInput => controlInput.label === 'X-axis'
    )[0].values = settings.time_cols.map(d => d.value_col || d);

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

    //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
    if (!(settings.unscheduled_visit_regex || settings.unscheduled_visit_values))
        controlInputs.splice(
            controlInputs.map(controlInput => controlInput.label).indexOf('Unscheduled visits'),
            1
        );

    return syncedControlInputs;
}
