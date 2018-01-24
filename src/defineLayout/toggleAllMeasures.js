import { select } from 'd3';
import toggleMeasure from '../init/addMeasureItems/toggleMeasure';

export default function toggleAllMeasures() {
    const context = this,
        checked = this.containers.allMeasureToggle.property('checked');

    this.containers.allMeasureToggle.attr(
        'title',
        checked ? 'Remove all charts' : 'Display all charts'
    );

    this.containers.measureToggles.each(function(d) {
        select(this).property('checked', checked);
        toggleMeasure(context, this, d);
    });
}
