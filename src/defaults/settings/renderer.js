export default {
    measure_col: 'TEST',
    time_cols: [
        {
            value_col: 'DY',
            type: 'linear',
            label: 'Study Day',
            order: null,
            rotate_tick_labels: false,
            vertical_space: 0
        },
        {
            value_col: 'VISIT',
            type: 'ordinal',
            label: 'Visit',
            order: null,
            rotate_tick_labels: true,
            vertical_space: 75
        },
        {
            value_col: 'VISITN',
            type: 'ordinal',
            label: 'Visit Number',
            order: null,
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
    rotate_x_tick_labels: false
};
