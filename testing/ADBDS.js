const
    POE = {
        containers: {},
        data: {},
        settings: {
            margins: {
                top: 0,
                right: 0,
                bottom: 25,
                left: 50
            }
        }
    };
    POE.containers.main = d3.select('body')
        .append('div')
        .datum(POE)
        .attr('id', 'paneled-outlier-explorer');
    POE.settings.width = document.body.clientWidth - POE.settings.margins.left - POE.settings.margins.right;
    POE.settings.height = 340 - POE.settings.margins.top - POE.settings.margins.bottom;
    POE.settings.devicePixelRatio = window.devicePixelRatio || 1;

d3.csv(
    'ADBDS.csv',
    d => {
        d.DY = /^-?\d+\.?\d*$/.test(d.DY) || /^-?\d*\.?\d+$/.test(d.DY)
            ? +d.DY
            : NaN;
        d.STRESN = /^-?\d+\.?\d*$/.test(d.STRESN) || /^-?\d*\.?\d+$/.test(d.STRESN)
            ? +d.STRESN
            : NaN;

        return d;
    },
    (error,data) => {
        if (error) throw error;

        POE.data.raw = data;
        POE.data.clean = data
            .filter(d => !isNaN(d.DY) && !isNaN(d.STRESN));

        //y-scale
        POE.xScale =  d3.scaleLinear()
            .domain(d3.extent(POE.data.clean, di => di.DY))
            .range([0,POE.settings.width]);

        //Nest data by measure and ID.
        POE.data.nested = d3.nest()
            .key(d => d.TEST)
            .key(d => d.USUBJID)
            .entries(POE.data.clean);

        //Add container for each chart.
        POE.containers.charts = POE.containers.main
            .selectAll('div.poe-chart')
                .data(POE.data.nested)
                .enter()
            .append('div')
            .classed('poe-multiple', true);

        //Define chart container layout.
        POE.containers.charts
            .each(function(d) {
                //container
                d.container = d3.select(this);

                //title container
                d.titleContainer = d.container
                    .append('div')
                    .classed('poe-title', true)
                    .style('width', POE.settings.width + POE.settings.margins.left + POE.settings.margins.right + 'px')
                    .text(d => d.key);

                //chart container
                d.chartContainer = d.container
                    .append('div')
                    .classed('poe-chart', true)
                    .style('width', POE.settings.width + POE.settings.margins.left + POE.settings.margins.right + 'px')
                    .style('height', POE.settings.height + POE.settings.margins.top + POE.settings.margins.bottom + 'px')

                //SVG
                d.svg = d.chartContainer
                    .append('svg')
                    .attr('width', POE.settings.width + POE.settings.margins.left + POE.settings.margins.right)
                    .attr('height', POE.settings.height + POE.settings.margins.top + POE.settings.margins.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + POE.settings.margins.left + ',' + POE.settings.margins.top + ')');

                //canvas
                d.canvas = d.chartContainer
                    .append('canvas')
                    .attr('width', POE.settings.width * POE.settings.devicePixelRatio)
                    .attr('height', POE.settings.height * POE.settings.devicePixelRatio);
                d.canvasContext = d.canvas
                    .node()
                    .getContext('2d')
                    .translate(POE.settings.margins.left, POE.settings.margins.top);
                console.log(d.canvas);

                //x-axis
                d.xAxis = d.svg
                    .append('g')
                    .attr('transform', 'translate(0,' + POE.settings.height + ')')
                    .call(d3.axisBottom(POE.xScale));

                //y-scale
                d.yScale = d3.scaleLinear()
                    .domain(d3.extent(POE.data.clean.filter(di => di.TEST === d.key), di => di.STRESN))
                    .range([POE.settings.height,0]);

                //y-axis
                d.yAxis = d.svg
                    .append('g')
                    .call(d3.axisLeft(d.yScale));

                //line function
                d.lineFunction = d3.line()
                    .x(di => POE.xScale(di.DY))
                    .y(di => d.yScale(di.STRESN))
                    .context(d.canvasContext);

                //lines
                d.values
                    .forEach(di => {
                        d.canvasContext.beginPath();
                        d.lineFunction(di.values);
                        d.canvasContext.lineWidth = 1.5;
                        d.canvasContext.strokeStyle = 'steelblue';
                        d.canvasContext.stroke();
                        //di.path = d.svg
                        //    .append('path')
                        //    .attr('class', d => 'poe-line id-' + d.key)
                        //    .data([di.values])
                        //    .attr('d', d.lineFunction);
                    });
            });
    }
);
