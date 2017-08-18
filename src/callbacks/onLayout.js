import { select, selectAll } from 'd3';
import toggleCharts from './onLayout/toggleCharts';
import toggleChart from './onLayout/toggleChart';
import m__imize from './onLayout/m__imize';

export default function onLayout() {
    const chart = this;

    //Define chart display toggles.
    if (select('#measure-list-container').size() === 0) {
        const measureListContainer = select(this.div.parentNode)
                .insert('div', ':first-child')
                .attr('id', 'measure-list-container'),
            measureListHeader = measureListContainer
                .append('div')
                .attr('id', 'measure-list-header')
                .text('Measures'),
            measureListCheckbox = measureListHeader
                .append('input')
                .attr({
                    id: 'measure-list-checkbox',
                    type: 'checkbox',
                    title:
                        this.config.measures.length === this.config.allMeasures.length
                            ? 'Remove all charts'
                            : 'Display all charts'
                })
                .property('checked', this.config.measures.length === this.config.allMeasures.length)
                .on('click', function() {
                    toggleCharts(chart, this);
                }),
            measureList = measureListContainer.append('ul').attr('id', 'measure-list'),
            measureItems = measureList
                .selectAll('li.measure-item')
                .data(this.config.allMeasures)
                .enter()
                .append('li')
                .attr('class', d => 'measure-item ' + d.replace(/[^a-z0-9-]/gi, '-'))
                .each(function(d) {
                    //Append div inside list item.
                    const measureItemContainer = select(this)
                            .append('div')
                            .classed('measure-item-container', true)
                            .text(d),
                        //Check whether measure should by displayed initially.
                        checked = chart.config.measures.indexOf(d) > -1,
                        //Append checkbox inside div.
                        measureItemCheckbox = measureItemContainer
                            .append('input')
                            .classed('measure-checkbox', true)
                            .attr({
                                type: 'checkbox',
                                title: checked ? 'Remove chart' : 'Display chart'
                            })
                            .property('checked', checked);
                });
        measureItems.on('change', function(d) {
            toggleChart(chart, this);
        });
    }

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
