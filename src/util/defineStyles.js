export default function defineStyles() {
    const styles = [
            /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer #controls-header {' +
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
            '#paneled-outlier-explorer #left-side {' + '    width: 24%;' + '    float: left;' + '}',
            '#paneled-outlier-explorer #left-side > * {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '}',
            '#paneled-outlier-explorer #left-side .wc-controls {' + '    padding: 10px 0;' + '}',
            '#paneled-outlier-explorer #left-side .wc-controls .control-group {' +
                '    float: left;' +
                '    clear: left;' +
                '    margin: 0 0 2px 0;' +
                '}',
            '#paneled-outlier-explorer #left-side .wc-controls .control-group > * {' +
                '    display: inline-block;' +
                '    margin-left: 3px;' +
                '}',
            '#paneled-outlier-explorer #left-side #measure-list-container {' + '   padding:0' + '}',
            '#paneled-outlier-explorer #left-side #measure-list-container #measure-list-header {' +
                '    font-size: 150%;' +
                '    border-top: 1px solid lightgray;' +
                '    font-weight: lighter;' +
                '    padding: 14px 0;' +
                '}',
            '#paneled-outlier-explorer #left-side #measure-list-container #measure-list-checkbox {' +
                '    margin: 5px;' +
                '}',
            '#paneled-outlier-explorer #left-side #measure-list-container #measure-list {' +
                '    list-style-type: none;' +
                '    font-weight: lighter;' +
                '}',
            '#paneled-outlier-explorer #left-side #measure-list-container .measure-item {' + '}',
            '#paneled-outlier-explorer #left-side #measure-list-container .measure-item-container {' +
                '}',
            '#paneled-outlier-explorer #left-side #measure-list-container .measure-checkbox {' +
                '    margin: 5px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Navigation
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer ul#navigation-bar {' +
                '    list-style-type: none;' +
                '    margin: 0;' +
                '    padding: 0;' +
                '    overflow: hidden;' +
                '    background-color: #333;' +
                '    width: 75%;' +
                '    float: right;' +
                '}',
            '#paneled-outlier-explorer ul#navigation-bar li.navigation {' +
                '    float: left;' +
                '    cursor: pointer;' +
                '    font-size: 150%;' +
                '    display: block;' +
                '    color: white;' +
                '    text-align: center;' +
                '    padding: 14px 16px;' +
                '    text-decoration: none;' +
                '}',
            '#paneled-outlier-explorer ul#navigation-bar li.navigation.active {' +
                '    background-color: #111;' +
                '}',
            '#paneled-outlier-explorer ul#navigation-bar li.navigation:hover {' +
                '    background-color: #111;' +
                '}',
            '#paneled-outlier-explorer ul#navigation-bar li.navigation#Listing-nav.brushed {' +
                '    color: orange;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Charts
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart {' +
                '    padding-right: 1em;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart.expanded {' +
                '    width: 100%;' +
                ' }',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .wc-chart-title {' +
                '    text-align: left;' +
                '    padding-left: 10px;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 3px 1px 3px;' +
                '    font-size: 75%;' +
                '    margin-left: 5px;' +
                '    visibility:hidden;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart .x.axis text.axis-title{' +
                'display:none;' +
                '}',
            '#paneled-outlier-explorer div.wc-layout.wc-small-multiples#Charts > div.wc-chart div.no-data{' +
                'width:365px;' +
                'padding-left:10px;' +
                'color:red;' +
                'font-size:0.8em;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer div.wc-chart#Listing {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            '#paneled-outlier-explorer div.wc-chart#Listing table {' +
                '    padding-left: 10px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          General styles
        \--------------------------------------------------------------------------------------***/

            '#paneled-outlier-explorer .hidden {' + '    display: none !important;' + '}',
            '#paneled-outlier-explorer circle.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 2px;' +
                '    fill: black;' +
                '    r: 4px;' +
                '}',
            '#paneled-outlier-explorer path.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 3px;' +
                '    stroke-opacity: 1;' +
                '}',
            '#paneled-outlier-explorer path.hover {' +
                '    stroke: orange;' +
                '    stroke-opacity: 1;' +
                '}',
            '#paneled-outlier-explorer circle.selected {' +
                '    stroke: orange;' +
                '    fill: black;' +
                '}',
            '#paneled-outlier-explorer tr.brushed {' + '    background: orange !important;' + '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
