export default function applyFilters() {
    this.data.filtered = this.data.raw.filter(d => {
        let filtered = false;

        for (const variable in this.filters) {
            if (filtered === false && !(values.length === 1 && values[0] === 'All'))
                filtered = this.filters[variable].indexOf(d[variable]) === -1;
        }

        return !filtered;
    });
    this.charts.multiples.forEach(multiple => {
        multiple.draw(this.data.filtered);
    });
    this.listing.draw(this.data.filtered);
}
