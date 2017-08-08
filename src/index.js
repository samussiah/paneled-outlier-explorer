import clone from './util/clone';
import './util/object-assign';
import defaultSettings, { syncSettings } from './defaultSettings';
import { createControls, createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function paneledOutlierExplorer(element, settings) {
    const initialSettings = clone(settings),
        mergedSettings = Object.assign({}, defaultSettings, initialSettings),
        syncedSettings = syncSettings(mergedSettings),
        chart = createChart(element, syncedSettings);
    chart.measures = {};

    for (const callback in callbacks) chart.on(callback, callbacks[callback]);

    return chart;
}
