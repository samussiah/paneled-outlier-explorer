import clone from './util/clone';

export default {
    measure_col: 'TEST',
    time_col: 'DY',
    value_col: 'STRESN',
    id_col: 'USUBJID',
    unit_col: 'STRESU',
    normal_col_low: 'STNRLO',
    normal_col_high: 'STNRHI',
    measures: null,
    filters: null,

    x: {
        type: 'linear',
        column: null, // sync to [ time_col ]
        label: 'Study Day'
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
        //{
        //    type: 'circle',
        //    per: null, // sync to [ id_col ], [ measure_col ], [ time_col ], and [ value_col ]
        //    radius: 2,
        //    attributes: {
        //        'stroke-width': 0.5,
        //        'stroke-opacity': 0.5,
        //        'fill-opacity': 1
        //    }
        //}
    ],
    resizable: false,
    scale_text: false,
    width: 400,
    height: 200,
    margin: {
        left: 40
    },
    gridlines: 'xy'
};

export function syncSettings(settings) {
    const syncedSettings = clone(settings);
    syncedSettings.x.column = settings.time_col;
    syncedSettings.y.column = settings.value_col;
    syncedSettings.marks[0].per = [settings.id_col, settings.measure_col];
    //syncedSettings.marks[1].per = [
    //    settings.id_col,
    //    settings.measure_col,
    //    settings.time_col,
    //    settings.value_col
    //];

    return syncedSettings;
}

export const controlInputs = [
    {
        type: 'subsetter',
        value_col: null,
        label: 'Measures',
        multiple: true
    }
];

export function syncControlInputs(controlInputs, settings) {
    const syncedControlInputs = clone(controlInputs);
    syncedControlInputs.filter(controlInput => controlInput.label === 'Measures')[0].value_col =
        settings.measure_col;

    return syncedControlInputs;
}
