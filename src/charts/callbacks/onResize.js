import resetSVG from './onResize/resetSVG';
import noData from './onResize/noData';
import drawNormalRange from './onResize/drawNormalRange';
import definePackage from './onResize/definePackage';
import addBrushOverlay from './onResize/addBrushOverlay';
import brush from './onResize/brush';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    const context = this;

    //Reset SVG.
    resetSVG.call(this);

    if (this.filtered_data.length === 0) {
        noData.call(this);
    } else {
        //Draw normal range.
        drawNormalRange.call(this);

        //Capture each multiple's scale.
        definePackage.call(this);

        //Define invisible brush overlay.
        addBrushOverlay.call(this);

        //Add brush functionality.
        brush.call(this);

        //Rotate x-axis tick labels.
        adjustTicks.call(this);
    }
}
