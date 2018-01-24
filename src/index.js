import defineStyles from './defineStyles';
import defineLayout from './defineLayout';
import defineSettings from './defineSettings';
import controls from './controls';
import charts from './charts/index';
import listing from './listing/index';
import recurse from './recurse';
import init from './init';

export default function paneledOutlierExplorer(element = 'body', settings = {}) {
    const paneledOutlierExplorer = {
        element: element,
        settings: {
            user: settings
        },
        containers: {},
        init: init,
        data: {},
        filters: {}
    };

    //Define layout.
    defineLayout.call(paneledOutlierExplorer);

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles.call(paneledOutlierExplorer);

    //Define settings.
    defineSettings.call(paneledOutlierExplorer);

    //Create controls.
    controls.call(paneledOutlierExplorer);

    //Create charts.
    charts.call(paneledOutlierExplorer);

    //Create listing.
    listing.call(paneledOutlierExplorer);

    //Point paneledOutlierExplorer, charts, and listing objects at each other.
    recurse.call(paneledOutlierExplorer);

    return paneledOutlierExplorer;
}
