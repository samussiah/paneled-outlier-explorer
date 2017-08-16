export default function m__imize(chart) {
    //Maximize chart.
    if (!chart.wrap.classed('full-screen')) {
        chart.wrap.select('.m__imize-chart').html('&minus;').attr('title', 'Minimize chart');
        chart.wrap.classed('full-screen', true);
        chart.config.width = null;
        chart.config.height = null;
        chart.config.aspect = 2;
        chart.draw();
    } else {
        //Minimize chart
        chart.wrap.select('.m__imize-chart').html('&plus;').attr('title', 'Maximize chart');
        chart.wrap.classed('full-screen', false);
        chart.config.width = chart.config.initialSettings.width;
        chart.config.height = chart.config.initialSettings.height;
        chart.config.aspect = null;
        chart.draw();
    }
}
