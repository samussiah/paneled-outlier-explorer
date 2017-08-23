export default function updatePagination() {
    //Reset pagination.
    this.pagination.links.classed('active', false);

    //Set to active the selected page link.
    const activeLink = this.pagination.links
        .filter(link => +link.rel === +this.pagination.activeLink)
        .classed('active', true);

    //Define and draw selected page.
    this.pagination.startItem = this.pagination.activeLink * this.pagination.rowsShown;
    this.pagination.endItem = this.pagination.startItem + this.pagination.rowsShown;
    this.draw(
        this.parent.data.filter(
            (d, i) => this.pagination.startItem <= i && i < this.pagination.endItem
        )
    );
}
