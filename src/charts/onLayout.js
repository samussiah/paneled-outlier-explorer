import { select, selectAll } from 'd3';
import toggleChart from '../init/toggleChart';
import m__imize from './onLayout/m__imize';

export default function onLayout() {
    const chart = this;

    //Add ability to remove charts in the chart title.
    this.wrap
        .on('mouseover', () => {
            this.wrap.select('.wc-chart-title span').style('visibility', 'visible');
        })
        .on('mouseout', () => {
            this.wrap.select('.wc-chart-title span').style('visibility', 'hidden');
        })
        .select('.wc-chart-title')
        .append('span')
        .classed('remove-chart chart-button', true)
        .html('&#10006;')
        .attr('title', 'Remove chart')
        .style('visibility', 'hidden')
        .on('click', () => {
            //Minimize chart.
            if (this.wrap.classed('full-screen')) m__imize(this);

            const li = d3.select(
                'li.measure-item.' + this.currentMeasure.replace(/[^a-z0-9-]/gi, '-')
            );
            li.select('input').property('checked', false);
            toggleChart(this, li.node());
        });

    //Add ability to maximize charts in the chart title.
    const m__imizeButton = this.wrap
        .select('.wc-chart-title')
        .append('span')
        .classed('m__imize-chart chart-button', true)
        .html('&plus;')
        .attr('title', 'Maximize chart');
    m__imizeButton.on('click', () => {
        m__imize(this);
    });

    //Hide measures not listed in [ settings.measures ].
    this.wrap
        .classed(this.currentMeasure.replace(/[^a-z0-9-]/gi, '-'), true)
        .classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
}
