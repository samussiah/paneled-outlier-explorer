import minimize from './minimize';
import { select } from 'd3';
import toggleMeasure from '../../../../init/addMeasureItems/toggleMeasure';

export default function removeChart() {
    if (this.wrap.classed('poe-maximized')) minimize.call(this);

    const checkbox = select(
        `#poe-measure-item-checkbox-${this.measure.replace(/[^a-z0-9-]/gi, '-')}`
    );
    checkbox.property('checked', false);
    toggleMeasure.call(this.parent.paneledOutlierExplorer, checkbox.node(), {
        measure: this.measure
    });
}
