export default function defineFilteredData() {
    this.
    const
        filters = this.controls.wrap
            .selectAll('.control-group')
            .filter(control => control.type === 'subsetter');

    if (filters.
    this.containers.controls.
    controls.on('change', function(d) {
        d.value = select(this)
            .selectAll('option')
            .filter(function() {
                return this.selected;
            })
            .text();
        applyFilters.call(chart, d);
    });
}
