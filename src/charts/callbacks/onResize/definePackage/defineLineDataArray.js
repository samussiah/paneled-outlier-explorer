export default function defineLineDataArray() {
    const context = this;

    //For each line capture the coordinates of each of its points.
    this.package.lines = this.svg.selectAll('.line-supergroup g.line path').each(function(d, i) {
        d.id = d.values[0].values.raw[0][context.config.id_col];
        d.lln = d.values[0].values.raw[0][context.config.lln_col];
        d.uln = d.values[0].values.raw[0][context.config.uln_col];
        d.lines = d.values.map((di, i) => {
            var line;
            if (i) {
                line = {
                    x0:
                        context.config.x.type === 'linear'
                            ? d.values[i - 1].values.x
                            : context.x(d.values[i - 1].values.x) + context.x.rangeBand() / 2,
                    y0: d.values[i - 1].values.y,
                    x1:
                        context.config.x.type === 'linear'
                            ? di.values.x
                            : context.x(di.values.x) + context.x.rangeBand() / 2,
                    y1: di.values.y
                };
            }
            return line;
        });
        d.lines.shift();
    });
}
