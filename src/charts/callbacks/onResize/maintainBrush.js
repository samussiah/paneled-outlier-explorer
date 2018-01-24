import brushMarks from './applyBrush/brushMarks';

export default function maintainBrush() {
    if (!this.extent) this.extent = this.package.brush.extent();
    if (
        (this.extent[0][0] !== this.package.brush.extent()[0][0] ||
            this.extent[0][1] !== this.package.brush.extent()[0][1] ||
            this.extent[1][0] !== this.package.brush.extent()[1][0] ||
            this.extent[1][1] !== this.package.brush.extent()[1][1]) &&
        this.measure === this.parent.brushedMeasure
    ) {
        this.package.brush.extent(this.extent);
        this.package.overlay.call(this.package.brush);
        brushMarks.call(this);
    }
}
