export default function minimize(chart) {
    //Modify chart config and redraw.
    chart.wrap
        .select('.m__imize-chart')
        .html('&plus;')
        .attr('title', 'Maximize chart');
    chart.wrap.classed('expanded', false);

    chart.config.width = chart.config.initialSettings.width;
    chart.config.max_width = null;
    chart.config.height = chart.config.initialSettings.height;
    chart.config.aspect = null;

    chart.draw();
}
