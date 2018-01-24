import { select } from 'd3';
import applyFilters from '../addFilterEventListeners/applyFilters';

export default function toggleMeasure(input, d) {
    //Determine state of checkbox.
    const checkbox = select(input),
        checked = checkbox.property('checked');

    //Toggle tooltip.
    checkbox.attr('title', checked ? 'Remove chart' : 'Display chart');

    //Hide/display associated chart.
    this.containers.charts
        .selectAll('.wc-chart')
        .filter(di => di.measure === d.measure)
        .classed('poe-hidden', !checked);

    //Update currently selected measures.
    if (checked) this.data.currentMeasures.push(d.measure).sort();
    else this.data.currentMeasures.splice(this.data.currentMeasures.indexOf(d.measure), 1);
    applyFilters.call(this);

    //Toggle all measures checkbox
    const allChecked =
        this.containers.measureToggles.size() ===
        this.containers.measureToggles
            .filter(function() {
                return this.checked;
            })
            .size();
    this.allMeasuresToggle
        .attr('title', allChecked ? 'Remove all charts.' : 'Display all charts.')
        .property('checked', allChecked);
}
