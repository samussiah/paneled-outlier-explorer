export default function minimize() {
    const context = this;

    //Remove references to maximized chart.
    delete this.parent.maximizedChart;
    this.wrap.classed('poe-maximized', false);

    //Toggle maximize/minimize buttons.
    this.wrap.select('.poe-maximize-chart').classed('poe-hidden', false);
    this.wrap.select('.poe-minimize-chart').classed('poe-hidden', true);

    //Revert chart dimension settings.
    this.config.width = this.parent.paneledOutlierExplorer.settings.width;
    this.config.max_width = null;
    this.config.height = this.parent.paneledOutlierExplorer.settings.height;
    this.config.aspect = null;

    //Draw the chart.
    this.draw();

    //Revert to default sort.
    this.parent.wrap.selectAll('.wc-chart').sort(function(a, b) {
        return (
            context.POE.data.measures.indexOf(a.measure) -
            context.POE.data.measures.indexOf(b.measure)
        );
    });
}
