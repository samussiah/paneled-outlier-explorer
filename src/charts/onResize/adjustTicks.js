export default function adjustTicks(axis, dx, dy, rotation, anchor, nchar) {
    if (!axis) return;
    var ticks = this.svg
        .selectAll('.' + axis + '.axis .tick text')
        .attr({
            transform: 'rotate(' + rotation + ')',
            dx: dx,
            dy: dy
        })
        .style('text-anchor', anchor || 'start');

    if (nchar) {
        ticks
            .filter(function(d) {
                var dText = '' + d;
                return dText.length > nchar;
            })
            .text(d => d.slice(0, nchar - 3) + '...')
            .style('cursor', 'pointer')
            .append('title')
            .text(d => d);
    }
}
