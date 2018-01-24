import minimize from './minimize';

export default function maximize() {
    const context = this;

    //Clear previously maximized chart.
    if (this.parent.maximizedChart) minimize.call(this.parent.maximizedChart);

    //Attach maximized chart to parent.
    this.parent.maximizedChart = this;
    this.wrap.classed('poe-maximized', true);

    //Toggle maximize/minimize buttons.
    this.wrap.select('.poe-maximize-chart').classed('poe-hidden', true);
    this.wrap.select('.poe-minimize-chart').classed('poe-hidden', false);

    //Define maximized chart dimensions.
    this.config.width = null;
    this.config.max_width = 9999;
    this.config.height = null;
    this.config.aspect = 2.5;

    //Redraw chart.
    this.draw();

    //Sort maximized chart first.
    this.parent.wrap.selectAll('.wc-chart').sort(function(a, b) {
        return a.measure === context.measure
            ? -1
            : b.measure === context.measure
              ? 1
              : context.parent.paneledOutlierExplorer.data.measures.indexOf(a.measure) -
                context.parent.paneledOutlierExplorer.data.measures.indexOf(b.measure);
    });

    //Scroll window to maximized chart.
    const bodyRect = document.body.getBoundingClientRect(),
        elemRect = this.wrap.node().getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
    window.scrollTo(0, offset);
}
