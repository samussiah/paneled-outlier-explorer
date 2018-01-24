export default function navClick(d) {
    this.containers.navs.classed('poe-active', di => di === d);
    this.containers.rightColumn.selectAll('.poe-display').classed('poe-hidden', true);
    this.containers.rightColumn.select(`#poe-${d.toLowerCase()}`).classed('poe-hidden', false);
}
