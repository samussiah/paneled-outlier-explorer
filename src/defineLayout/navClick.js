export default function navClick(d) {
    this.containers.navs
        .classed('active', di => di === d);
    this.containers.rightColumn
        .selectAll('.poe-display')
        .classed('hidden', true);
    this.containers.rightColumn
        .select(`#poe-${d.toLowerCase()}`)
        .classed('hidden', false);
}
