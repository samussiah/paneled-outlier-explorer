export default function resetSVG() {
    this.svg.selectAll('*').classed('poe-hidden', false);
    this.svg.select('.poe-no-data').remove();
}
