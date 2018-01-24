import brushMarks from './applyBrush/brushMarks';

export default function applyBrush() {
    const context = this;

    //Define brush events.
    this.package.brush
        .on('brushstart', function() {})
        .on('brush', function() {
            context.parent.wrap.selectAll('.wc-chart').each(d => {
                if (d.measure !== context.measure) d.overlay.call(d.brush.clear());
            });
            context.extent = context.package.brush.extent();

            //brush marks
            brushMarks.call(context);
        })
        .on('brushend', function() {});

    //Initialize brush on brush overlay.
    this.package.overlay.call(this.package.brush);
}
