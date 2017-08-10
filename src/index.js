import defineStyles from './util/defineStyles';
import clone from './util/clone';
import './util/object-assign';
import defaultSettings, { syncSettings, controlInputs, syncControlInputs } from './defaultSettings';
import { createChart } from 'webcharts';
import init from './init';
import callbacks from './callbacks/index';

export default function paneledOutlierExplorer(element, settings) {
    //Define .css styles to avoid requiring a separate .css file.
    defineStyles();

    //Clone, merge, and sync settings and define chart.
    const initialSettings = clone(settings),
        mergedSettings = Object.assign({}, defaultSettings, initialSettings),
        syncedSettings = syncSettings(mergedSettings),
        syncedControlInputs = syncControlInputs(controlInputs, syncedSettings),
        //controls = createControls(element, {location: 'top', inputs: syncedControlInputs}),
        chart = createChart(element, syncedSettings); //, controls);

    //Define chart callbacks.
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    //Attach element to chart.
    chart.config.element = element;

    //Redefine chart.init() in order to call webCharts.multiply() on paneledOutlierExplorer.init().
    Object.defineProperty(chart, 'init', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: init
    });

    return chart;
}
