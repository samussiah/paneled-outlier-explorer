import remove from './addButtons/remove';
import maximize from './addButtons/maximize';
import minimize from './addButtons/minimize';

export default function addButtons() {
    const chartTitle = this.wrap.select('.wc-chart-title');
    //Remove chart.
    chartTitle
        .append('span')
        .classed('poe-chart-button poe-remove-chart', true)
        .attr('title', 'Remove chart.')
        .html('&#10006;')
        .on('click', () => remove.call(this));

    //Maximize chart.
    chartTitle
        .append('span')
        .classed('poe-chart-button poe-maximize-chart', true)
        .attr('title', 'Maximize chart.')
        .html('&plus;')
        .on('click', () => maximize.call(this));

    //Minimize chart.
    chartTitle
        .append('span')
        .classed('poe-chart-button poe-minimize-chart poe-hidden', true)
        .attr('title', 'Minimize chart.')
        .html('&minus;')
        .on('click', () => minimize.call(this));

    //Attach buttons to chart.
    this.buttons = chartTitle.selectAll('.poe-chart-button');
}
