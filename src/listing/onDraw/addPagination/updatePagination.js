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
    this.draw(this.data.filter((d,i) => this.pagination.startItem <= i && i < this.pagination.endItem));

  //Update displayed page links.
    if (activeLink.classed('hidden'))
        this.pagination.links
            .classed('hidden', true)
            .filter(d => {
                return (this.pagination.activeLink - 3) < d.rel && d.rel < (this.pagination.activeLink + 3);
            })
            .classed('hidden', false);
}
