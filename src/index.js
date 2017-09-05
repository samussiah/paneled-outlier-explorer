import defineStyles from './util/defineStyles';
import clone from './util/clone';
import './util/object-assign';
import defaultSettings, { syncSettings, controlInputs, syncControlInputs } from './defaultSettings';
import { createControls, createChart, createTable } from 'webcharts';
import init from './init';
import chartCallbacks from './charts/index';
import listingCallbacks from './listing/index';
import { select } from 'd3';

export default function paneledOutlierExplorer(element, settings) {
    //Define .css styles to avoid requiring a separate .css file.
    defineStyles();

    //Create container for controls.
    select(element).append('div').attr('id', 'left-side');

    //Clone, merge, and sync settings and define chart.
    const initialSettings = clone(settings),
        mergedSettings = Object.assign({}, defaultSettings, initialSettings),
        syncedSettings = syncSettings(mergedSettings),
        syncedControlInputs = syncControlInputs(controlInputs, syncedSettings),
        controls = createControls(element + ' div#left-side', {
            location: 'top',
            inputs: syncedControlInputs
        }),
        chart = createChart(element, syncedSettings, controls),
        listing = createTable(element, {}, controls);
    chart.element = element;
    chart.config.initialSettings = clone(syncedSettings);
    chart.listing = listing;
    listing.chart = chart;

    //Define chart callbacks.
    for (const callback in chartCallbacks)
        chart.on(callback.substring(2).toLowerCase(), chartCallbacks[callback]);

    //Define listing callbacks.
    for (const callback in listingCallbacks)
        listing.on(callback.substring(2).toLowerCase(), listingCallbacks[callback]);

    //Redefine chart.init() in order to call webCharts.multiply() on paneledOutlierExplorer().init().
    Object.defineProperty(chart, 'init', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: init
    });

    return chart;
}
