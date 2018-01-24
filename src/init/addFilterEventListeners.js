import { select as d3select } from 'd3';

export default function addFilterEventListeners() {
    const context = this;
    console.log(this);

    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.type === 'subsetter')
        .select('select')
        .on('change', function(d) {
            context.filters[d.value_col] = d3select(this)
                .selectAll('option:checked')
                .data();

            applyFilters.call(context);
        });
}
