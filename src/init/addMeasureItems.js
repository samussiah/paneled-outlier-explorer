import { select } from 'd3';
import toggleMeasure from './addMeasureItems/toggleMeasure';

export default function addMeasureList() {
    const context = this;

    //Append a list item for each measure.
    this.containers.measureList
        .selectAll('li.poe-measure-item')
        .data(
            this.data.measures.map(measure => {
                return {
                    measure: measure,
                    selector: measure.replace(/[^a-z0-9-]/gi, '-')
                };
            })
        )
        .enter()
        .append('li')
        .classed('poe-measure-item', true)
        .attr('id', d => `poe-measure-item-${d.selector}`)
        .each(function(d) {
            //Append div inside list item.
            const measureItemContainer = select(this)
                    .append('div')
                    .classed('poe-measure-item-container', true),
                checked = context.data.currentMeasures.indexOf(d.measure) > -1,
                measureItemCheckbox = measureItemContainer
                    .append('input')
                    .classed('poe-measure-item-checkbox', true)
                    .attr({
                        id: `poe-measure-item-checkbox-${d.selector}`,
                        type: 'checkbox',
                        title: checked ? 'Remove chart' : 'Display chart'
                    })
                    .property('checked', checked),
                measureItemLabel = measureItemContainer
                    .append('label')
                    .attr('for', `poe-measure-item-checkbox-${d.selector}`)
                    .text(d.measure);
        });
    this.containers.measureToggles = this.containers.measureList.selectAll('input');

    //Add event listeners to checkboxes.
    this.containers.measureToggles.on('change', function(d) {
        toggleMeasure.call(context, this, d);
    });
}
