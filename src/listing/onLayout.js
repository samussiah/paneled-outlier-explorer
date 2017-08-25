export default function onLayout() {
    //pagination config
    this.pagination = {};
    this.pagination.wrap = this.wrap.append('div').classed('pagination-container', true);
    this.pagination.rowsShown = 25;
    this.pagination.activeLink = 0;
}
