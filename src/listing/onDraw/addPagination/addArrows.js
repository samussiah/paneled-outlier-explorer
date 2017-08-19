export default function addArrows() {
    let prev = this.pagination.activeLink - 1,
        next = this.pagination.activeLink + 1;
    if (prev < 0) prev = 0;
    if (next > this.pagination.numPages) next = this.pagination.numPages;

    this.pagination.prev = this.pagination.wrap
        .insert('a', ':first-child')
        .classed('arrow-link', true)
        .attr({
            href: '#',
            rel: prev
        })
        .text('<');

    this.pagination.next = this.pagination.wrap
        .append('a')
        .classed('arrow-link', true)
        .attr({
            href: '#',
            rel: next
        })
        .text('>');

    this.pagination.arrows = this.pagination.wrap.selectAll('a.arrow-link');
}
