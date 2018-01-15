import resetSVG from './onResize/resetSVG';
import noData from './onResize/noData';
import definePackage from './onResize/definePackage';
import addBrushOverlay from './onResize/addBrushOverlay';
import maintainHighlighting from './onResize/maintainHighlighting';
import applyBrush from './onResize/applyBrush';
import maintainBrush from './onResize/maintainBrush';
import drawNormalRange from './onResize/drawNormalRange';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    const context = this;

    //Reset SVG.
    resetSVG.call(this);

    if (this.filtered_data.length === 0) {
        noData.call(this);
    } else {
        //Capture each multiple's scale.
        definePackage.call(this);

        //Define invisible brush overlay.
        addBrushOverlay.call(this);

        //Highlight previously brushed points.
        maintainHighlighting.call(this);

        //Apply brush.
        applyBrush.call(this);

        //Maintain brush on redraw.
        maintainBrush.call(this);

        //Draw normal range.
        drawNormalRange.call(this);

        //Rotate x-axis tick labels.
        adjustTicks.call(this);
    }
}
