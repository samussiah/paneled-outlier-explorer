import { select } from 'd3';

export default function onLayout() {
    const chart = this;

    //Define displayed measures.
    if (select('#measure-list-container').size() === 0) {
        const measureListContainer = select(this.config.element)
                .insert('div', ':first-child')
                .attr('id', 'measure-list-container'),
            measureListHeader = measureListContainer
                .append('div')
                .attr('id', 'measure-list-header')
                .text('Measure List'),
            measureList = measureListContainer.append('ul').attr('id', 'measure-list'),
            measureItems = measureList
                .selectAll('li.measure')
                .data(this.config.allMeasures)
                .enter()
                .append('li')
                .classed('measure-item', true)
                .each(function(d) {
                    const measureItemContainer = select(this)
                            .append('div')
                            .classed('measure-item-container', true)
                            .text(d),
                        checked = chart.config.measures.indexOf(d) > -1,
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
            const checkbox = d3.select(this).select('input'),
                checked = checkbox.property('checked');
            checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');
            d3
                .select(chart.config.element)
                .selectAll('.wc-chart')
                .filter(di => di.measure === d)
                .classed('hidden', !checked);
        });
    }

    //Add ability to remove charts.
    this.wrap
        .select('.wc-chart-title')
        .append('span')
        .classed('delete-chart', true)
        .html('&#10006;')
        .attr('title', 'Remove chart')
        .on('click', () => {
            d3
                .selectAll('.measure-item')
                .filter(d => d === this.currentMeasure)
                .select('input')
                .property('checked', false);
            this.wrap.classed('hidden', true);
        });

    //Hide measures not listed in [ settings.measures ].
    this.wrap.classed('hidden', this.config.measures.indexOf(this.currentMeasure) === -1);
}
