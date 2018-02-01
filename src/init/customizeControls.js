import { select } from 'd3';
import applyFilters from './customizeControls/applyFilters';

export default function customizeControls() {
    const context = this,
        controls = this.controls.wrap.selectAll('.control-group');
    controls
        .classed(
            'hidden',
            d =>
                (this.config.normal_range_method !== 'Standard Deviation' &&
                    /standard deviation/i.test(d.label)) ||
                (this.config.normal_range_method !== 'Quantiles' && /quantile/i.test(d.label))
        )
        .filter(control => control.label === 'X-axis')
        .selectAll('option')
        .property(
            'label',
            d => this.config.time_cols.filter(time_col => time_col.value_col === d).pop().label
        );

    controls.on('change', function(d) {
        if (d.type === 'subsetter' || d.label === 'X-axis') {
            d.value = select(this)
                .selectAll('option')
                .filter(function() {
                    return this.selected;
                })
                .text();
            applyFilters.call(context, d);
        } else if (d.label === 'Normal range method') {
            const normal_range_method = select(this)
                .select('option:checked')
                .text();

            controls.classed(
                'hidden',
                d =>
                    (normal_range_method !== 'Standard Deviation' &&
                        /standard deviation/i.test(d.label)) ||
                    (normal_range_method !== 'Quantiles' && /quantile/i.test(d.label))
            );
        }
    });
}
