import { select, selectAll } from 'd3';
import m__imize from './onLayout/m__imize';

export default function onLayout() {
    const chart = this;

    //Define chart display toggles.
    if (select('#measure-list-container').size() === 0) {
        const measureListContainer = select(this.config.element)
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
                    const checkbox = select(this),
                        checked = checkbox.property('checked');
                    checkbox.attr('title', checked ? 'Remove all charts' : 'Display all charts');
                    select(chart.config.element).selectAll('.wc-chart').classed('hidden', !checked);
                    selectAll('.measure-checkbox').property('checked', checked);
                }),
            measureList = measureListContainer.append('ul').attr('id', 'measure-list'),
            measureItems = measureList
                .selectAll('li.measure')
                .data(this.config.allMeasures)
                .enter()
                .append('li')
                .classed('measure-item', true)
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
            //Determine state of checkbox.
            const checkbox = select(this).select('input'),
                checked = checkbox.property('checked');
            checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');
            select(chart.config.element)
                .selectAll('.wc-chart')
                .filter(di => di.measure === d)
                .classed('hidden', !checked);
            //If any checkbox is unchecked, uncheck measureListCheckbox.
            if (
                measureItems[0].some(
                    measureItem => measureItem.getElementsByClassName('measure-checkbox')[0].checked
                )
            )
                measureListCheckbox.attr('title', 'Display all charts').property('checked', false);
        });
    }

    //Add ability to remove charts in the chart title.
    this.wrap
        .select('.wc-chart-title')
        .append('span')
        .classed('delete-chart chart-button', true)
        .html('&#10006;')
        .attr('title', 'Remove chart')
        .on('click', () => {
          //Minimize chart.
            if (this.wrap.classed('full-screen'))
                m__imize(this);

          //Hide chart.
            this.wrap.classed('hidden', true);

            //Sync measureItems.
            const measureItems = selectAll('.measure-item');
            measureItems
                .filter(d => d === this.currentMeasure)
                .select('input')
                .property('checked', false);
            //If any checkbox is unchecked, uncheck measureListCheckbox.
            if (
                measureItems[0].some(
                    measureItem => measureItem.getElementsByClassName('measure-checkbox')[0].checked
                )
            )
                select('#measure-list-checkbox')
                    .attr('title', 'Display all charts')
                    .property('checked', false);
        });

    //Add ability to maximize charts in the chart title.
    const
        m__imizeButton = this.wrap
            .select('.wc-chart-title')
            .append('span')
            .classed('m__imize-chart chart-button', true)
            .html('&plus;')
            .attr('title', 'Maximize chart');
    m__imizeButton
        .on('click', () => {
            m__imize(this);
        });

    //Hide measures not listed in [ settings.measures ].
    this.wrap.classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
}
