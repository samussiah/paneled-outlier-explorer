d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d) {
        return d;
    },
    function(data) {
        const measures = [...new Set(data.map(d => d.TEST)).values()]
            .sort(() => .5 - Math.random());
        data.forEach(d => {
            d.TESTN = measures.findIndex(measure => measure === d.TEST);
        });

        const instance = paneledOutlierExplorer(
            '#container', // element
            {
                filters: [
                    {value_col: 'SITEID', label: 'Site ID', start: '01'},
                    {value_col: 'SEX', label: 'Sex'},
                    {value_col: 'RACE', label: 'Race'},
                    {value_col: 'ARM', label: 'Treatment Group'},
                    {value_col: 'USUBJID', label: 'Participant ID'},
                ],
                inliers: true,
            } // settings
        );
        instance.init(data);

        //quick test of participantSelected event
        instance.wrap.on('participantsSelected', function() {
          console.log('Participant Selected Event:');
          console.log(d3.event.data);
        });
    }
);
