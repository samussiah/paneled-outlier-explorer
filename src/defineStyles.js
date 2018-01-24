export default function defineStyles() {
    const
        styles = [

        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer {' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '}',
            '#paneled-outlier-explorer .poe-column {' +
                '    display: inline-block;' +
                '}',
            '#paneled-outlier-explorer #poe-left-column {' +
                '    width: 20%;' +
                '    float: left;' +
                '}',
            '#paneled-outlier-explorer #poe-right-column {' +
                '    width: 79%;' +
                '    float: right;' +
                '}',
            '#paneled-outlier-explorer .poe-column > * {' +
                '    width: 100%;' +
                '    vertical-align: top;' +
                '    display: inline-block;' +
                '    margin-bottom: 10px;' +
                '    border: 1px solid #eee;' +
                '}',
            '#paneled-outlier-explorer .poe-column .poe-header {' +
                '    box-sizing: border-box;' +
                '    padding: 14px 16px;' +
                '    background-color: #333;' +
                '    color: white;' +
                '    font-size: 150%;' +
                '}',
            '#paneled-outlier-explorer .poe-column > * > * {' +
                '    margin: 10px;' +
                '}',
            '#paneled-outlier-explorer .poe-hidden {' +
                '    display: none !important;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Left column elements
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer #poe-left-column > * {' +
                '}',

          //webcharts controls
            '#paneled-outlier-explorer #poe-controls .wc-controls {' +
                '    margin-bottom: 0;' +
                '    clear: left;' +
                '}',
            '#paneled-outlier-explorer #poe-controls .control-group {' +
                '    margin: 0 0 5px 0;' +
                '    display: block;' +
                '    float: right;' +
                '    clear: both;' +
                '    width: 100%;' +
                '}',
            '#paneled-outlier-explorer #poe-controls .control-group > * {' +
                '    display: inline-block;' +
                '    vertical-align: top;' +
                '    float: right;' +
                '}',
            '#paneled-outlier-explorer #poe-controls .span-description {' +
                '    font-size: 90%;' +
                '}',
            '#paneled-outlier-explorer #poe-controls .changer {' +
                '    margin-left: 5px;' +
                '    width: 50%;' +
                '    clear: right;' +
                '    box-sizing: border-box;' +
                '}',

            //measure list
            '#paneled-outlier-explorer #poe-all-measures {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '    clear: both;' +
                '}',
            '#paneled-outlier-explorer #poe-all-measures > * {' +
                '    float: right;' +
                '}',
            '#paneled-outlier-explorer #poe-measure-list {' +
                '    list-style-type: none;' +
                '    font-weight: lighter;' +
                '    padding-left: 0;' +
                '}',
            '#paneled-outlier-explorer #poe-measure-list .poe-measure-item-container {' +
                '    width: 100%;' +
                '    clear: both;' +
                '}',
            '#paneled-outlier-explorer #poe-measure-list .poe-measure-item-container > * {' +
                '    float: right;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Right column elements
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer #poe-right-column > * {' +
                '}',

            //navigation
            '#paneled-outlier-explorer #poe-nav-bar {' +
                '    list-style-type: none;' +
                '    padding: 0;' +
                '    margin: 0;' +
                '}',
            '#paneled-outlier-explorer #poe-nav-bar .poe-nav {' +
                '    cursor: pointer;' +
                '    text-decoration: none;' +
                '    display: inline-block;' +
                '}',
            '#paneled-outlier-explorer #poe-nav-bar .poe-nav:not(:last-child) {' +
                '    margin-right: 14px;' +
                '}',
            '#paneled-outlier-explorer #poe-nav-bar .poe-nav:hover {' +
                '    background-color: #111;' +
                '}',
            '#paneled-outlier-explorer #poe-nav-bar .poe-nav.poe-active {' +
                '    background-color: #111;' +
                '}',
            '#paneled-outlier-explorer #poe-nav-bar .poe-nav.poe-brushed {' +
                '    color: orange;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Charts
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer path.poe-brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 3px;' +
                '    stroke-opacity: 1;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .wc-chart {' +
                '    padding: 0 1em 0 0;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .wc-chart.poe-maximized {' +
                '    width: 100%;' +
                ' }',
            '#paneled-outlier-explorer #poe-charts .wc-chart-title {' +
                '    text-align: left;' +
                '    font-size: .9em;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .poe-chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 3px 1px 3px;' +
                '    font-size: 75%;' +
                '    margin-left: 5px;' +
                '    visibility: hidden;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .poe-chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .poe-no-data {' +
                '    fill: red;' +
                '    font-size: 0.8em;' +
                '}',
            '#paneled-outlier-explorer #poe-charts .poe-brush-overlay {' +
                '    cursor: crosshair;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer #poe-listing .poe-brushed {' +
                '    border: 2px solid orange !important;' +
                '}',
            '#paneled-outlier-explorer #poe-listing {' +
                '    overflow-x: scroll;' +
                '}'
        ],
        style = this.test
            ? this.dom.window.document.createElement('style')
            : document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

    if (this.test)
        this.dom.window.document.getElementsByTagName('head')[0].appendChild(style);
    else
        document.getElementsByTagName('head')[0].appendChild(style);
}
