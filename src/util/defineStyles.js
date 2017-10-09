export default function defineStyles() {
    const styles = [
            /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '#safety-outlier-explorer #controls-header {' +
                '    margin: 0;' +
                '    overflow: hidden;' +
                '    background-color: #333;' +
                '    width: 24%;' +
                '    float: left;' +
                '    font-size: 150%;' +
                '    display: block;' +
                '    color: white;' +
                '    padding: 14px 16px;' +
                '    box-sizing: border-box;' +
                '}',
            '#safety-outlier-explorer #left-side {' + '    width: 24%;' + '    float: left;' + '}',
            '#safety-outlier-explorer #left-side > * {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '}',
            '#safety-outlier-explorer #left-side .wc-controls {' + '    padding: 10px 0;' + '}',
            '#safety-outlier-explorer #left-side .wc-controls .control-group {' +
                '    float: left;' +
                '    clear: left;' +
                '    margin: 0 0 2px 0;' +
                '}',
            '#safety-outlier-explorer #left-side .wc-controls .control-group > * {' +
                '    display: inline-block;' +
                '    margin-left: 3px;' +
                '}',
            '#safety-outlier-explorer #left-side #measure-list-container {' + '   padding:0' + '}',
            '#safety-outlier-explorer #left-side #measure-list-container #measure-list-header {' +
                '    font-size: 150%;' +
                '    border-top: 1px solid lightgray;' +
                '    font-weight: lighter;' +
                '    padding: 14px 0;' +
                '}',
            '#safety-outlier-explorer #left-side #measure-list-container #measure-list-checkbox {' +
                '    margin: 5px;' +
                '}',
            '#safety-outlier-explorer #left-side #measure-list-container #measure-list {' +
                '    list-style-type: none;' +
                '    font-weight: lighter;' +
                '}',
            '#safety-outlier-explorer #left-side #measure-list-container .measure-item {' + '}',
            '#safety-outlier-explorer #left-side #measure-list-container .measure-item-container {' +
                '}',
            '#safety-outlier-explorer #left-side #measure-list-container .measure-checkbox {' +
                '    margin: 5px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Navigation
        \--------------------------------------------------------------------------------------***/

            '#safety-outlier-explorer ul#navigation-bar {' +
                '    list-style-type: none;' +
                '    margin: 0;' +
                '    padding: 0;' +
                '    overflow: hidden;' +
                '    background-color: #333;' +
                '    width: 75%;' +
                '    float: right;' +
                '}',
            '#safety-outlier-explorer ul#navigation-bar li.navigation {' +
                '    float: left;' +
                '    cursor: pointer;' +
                '    font-size: 150%;' +
                '    display: block;' +
                '    color: white;' +
                '    text-align: center;' +
                '    padding: 14px 16px;' +
                '    text-decoration: none;' +
                '}',
            '#safety-outlier-explorer ul#navigation-bar li.navigation.active {' +
                '    background-color: #111;' +
                '}',
            '#safety-outlier-explorer ul#navigation-bar li.navigation:hover {' +
                '    background-color: #111;' +
                '}',
            '#safety-outlier-explorer ul#navigation-bar li.navigation#Listing-nav.brushed {' +
                '    color: orange;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Charts
        \--------------------------------------------------------------------------------------***/

            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart {' +
                '    padding-right: 1em;' +
                '}',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart.expanded {' +
                '    width: 100%;' +
                ' }',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .wc-chart-title {' +
                '    text-align: left;' +
                '    padding-left: 10px;' +
                '}',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 3px 1px 3px;' +
                '    font-size: 75%;' +
                '    margin-left: 5px;' +
                '    visibility:hidden;' +
                '}',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
                '}',
            '#safety-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .x.axis text.axis-title{' +
                'display:none;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            '#safety-outlier-explorer div.wc-chart#Listing {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            '#safety-outlier-explorer div.wc-chart#Listing table {' +
                '    padding-left: 10px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          General styles
        \--------------------------------------------------------------------------------------***/

            '#safety-outlier-explorer .hidden {' + '    display: none !important;' + '}',
            '#safety-outlier-explorer circle.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 2px;' +
                '    fill: black;' +
                '    r: 4px;' +
                '}',
            '#safety-outlier-explorer path.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 3px;' +
                '    stroke-opacity: 1;' +
                '}',
            '#safety-outlier-explorer path.hover {' +
                '    stroke: orange;' +
                '    stroke-opacity: 1;' +
                '}',
            '#safety-outlier-explorer circle.selected {' +
                '    stroke: orange;' +
                '    fill: black;' +
                '}',
            '#safety-outlier-explorer tr.brushed {' + '    background: orange !important;' + '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
