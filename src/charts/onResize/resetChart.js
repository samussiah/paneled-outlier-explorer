export default function resetChart() {
    this.svg.selectAll('*').classed('hidden', false);
    this.svg.select('text.no-data').remove();
    this.svg.select('.normal-range').remove();
}
