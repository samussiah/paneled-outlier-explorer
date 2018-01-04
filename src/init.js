import defineData from './init/defineData';
import initializeDisplays from './init/initializeDisplays';
import xAxisControlLabels from './init/xAxisControlLabels';
import updateAllMeasuresCheckbox from './init/updateAllMeasuresCheckbox';
import addMeasureItems from './init/addMeasureItems';
import defineFilteredData from './init/defineFilteredData';

export default function init(data) {
    //Attach data arrays to central chart object.
    defineData.call(this, data);

    //Initialize displays.
    initializeDisplays.call(this);

    //Label x-axis options.
    xAxisControlLabels.call(this);

    //Update all measures checkbox.
    updateAllMeasuresCheckbox.call(this);

    //Add measure items to measure list.
    addMeasureItems.call(this);

    //Add event listenersDefine filtered data array when controls change.
    defineFilteredData.call(this);

    //Define filtered data array when controls change.
    defineFilteredData.call(this);
}
