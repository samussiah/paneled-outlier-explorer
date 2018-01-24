export default {
    x: {
        type: null, // sync to [ time_cols[0].type ]
        column: null, // sync to [ time_cols[0].value_col ]
        label: ''
    },
    y: {
        type: 'linear',
        column: null, // sync to [ value_col ]
        label: ''
    },
    marks: [
        {
            type: 'line',
            per: null, // sync to [ id_col ]
            attributes: {
                'stroke-width': 1,
                'stroke-opacity': 0.2,
                stroke: 'black'
            }
        }
    ],
    resizable: false,
    scale_text: false,
    width: 400,
    height: 200,
    margin: {
        bottom: 0,
        left: 50
    },
    gridlines: 'xy'
};
