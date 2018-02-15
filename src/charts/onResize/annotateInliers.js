import { format } from 'd3';

export default function annotateInliers() {
    this.inliersAnnotation.g.classed('hidden', this.config.inliers);

    if (!this.config.inliers) {
        //text
        const inlierIDs = this.measure.IDs.filtered.filter(
            ID => this.measure.IDs.abnormal.indexOf(ID) < 0
        );
        const abnormalIDs = this.measure.IDs.abnormal.filter(
            ID => this.measure.IDs.filtered.indexOf(ID) > -1
        );
        const nInlierIDs = inlierIDs.length;
        const nAbnormalIDs = abnormalIDs.length;
        this.inliersAnnotation.text
            .attr({
                x: 0,
                dx: -10,
                y: this.plot_height,
                dy: 19
            })
            .text(`${nInlierIDs}`);

        //text box
        const textDimensions = this.inliersAnnotation.text.node().getBBox();
        this.inliersAnnotation.rect.attr({
            x: textDimensions.x - 2,
            y: textDimensions.y,
            width: textDimensions.width + 4,
            height: textDimensions.height
        });

        //tooltip
        this.inliersAnnotation.title.text(
            `${nInlierIDs} of ${this.measure.IDs.filtered.length} participants (${format('%')(
                nInlierIDs / this.measure.IDs.filtered.length
            )}) with entirely normal results are hidden.\nToggle the "Normal range inliers" checkbox to display these participants.`
        );

        //mosue hover
        this.inliersAnnotation.g
            .on('mouseover', () => {
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.option === 'inliers')
                    .classed('inlier-highlighting', true);
            })
            .on('mouseout', () => {
                this.controls.wrap
                    .selectAll('.control-group')
                    .filter(d => d.option === 'inliers')
                    .classed('inlier-highlighting', false);
            });
    }
}
