export default function defineStyles() {
    const styles = [
            /***--------------------------------------------------------------------------------------\
          Controls
        \--------------------------------------------------------------------------------------***/

            '#controls-header {' +
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
            '#left-side {' + '    width: 24%;' + '    float: left;' + '}',
            '#left-side > * {' + '    width: 100%;' + '    display: inline-block;' + '}',
            '#left-side .wc-controls {' + '    padding: 10px 0;' + '}',
            '#left-side .wc-controls .control-group {' +
                '    float: left;' +
                '    clear: left;' +
                '    margin: 0 0 2px 0;' +
                '}',
            '#left-side .wc-controls .control-group > * {' +
                '    display: inline-block;' +
                '    margin-left: 3px;' +
                '}',
            '#left-side #measure-list-container {' + '   padding:0' + '}',
            '#left-side #measure-list-container #measure-list-header {' +
                '    font-size: 150%;' +
                '    border-top: 1px solid lightgray;' +
                '    font-weight: lighter;' +
                '    padding: 14px 0;' +
                '}',
            '#left-side #measure-list-container #measure-list-checkbox {' +
                '    margin: 5px;' +
                '}',
            '#left-side #measure-list-container #measure-list {' +
                '    list-style-type: none;' +
                '    font-weight: lighter;' +
                '}',
            '#left-side #measure-list-container .measure-item {' + '}',
            '#left-side #measure-list-container .measure-item-container {' + '}',
            '#left-side #measure-list-container .measure-checkbox {' + '    margin: 5px;' + '}',

            /***--------------------------------------------------------------------------------------\
          Navigation
        \--------------------------------------------------------------------------------------***/

            'ul#navigation-bar {' +
                '    list-style-type: none;' +
                '    margin: 0;' +
                '    padding: 0;' +
                '    overflow: hidden;' +
                '    background-color: #333;' +
                '    width: 75%;' +
                '    float: right;' +
                '}',
            'ul#navigation-bar li.navigation {' +
                '    float: left;' +
                '    cursor: pointer;' +
                '    font-size: 150%;' +
                '    display: block;' +
                '    color: white;' +
                '    text-align: center;' +
                '    padding: 14px 16px;' +
                '    text-decoration: none;' +
                '}',
            'ul#navigation-bar li.navigation.active {' + '    background-color: #111;' + '}',
            'ul#navigation-bar li.navigation:hover {' + '    background-color: #111;' + '}',
            'ul#navigation-bar li.navigation#Listing-nav.brushed {' + '    color: orange;' + '}',

            /***--------------------------------------------------------------------------------------\
          Charts
        \--------------------------------------------------------------------------------------***/

            'div.wc-layout.wc-small-multiples#Charts {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart {' +
                '    padding-right: 1em;' +
                '}',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart.expanded {' +
                '    width: 100%;' +
                ' }',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart .wc-chart-title {' +
                '    text-align: left;' +
                '    padding-left: 10px;' +
                '}',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 3px 1px 3px;' +
                '    font-size: 75%;' +
                '    margin-left: 5px;' +
                '    visibility:hidden;' +
                '}',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart .chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
                '}',
            'div.wc-layout.wc-small-multiples#Charts > div.wc-chart .x.axis text.axis-title{' +
                'display:none;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Listing
        \--------------------------------------------------------------------------------------***/

            'div.wc-chart#Listing {' +
                '    width: 75%;' +
                '    float: right;' +
                '    padding-top: 10px;' +
                '}',
            'div.wc-chart#Listing table {' + '    padding-left: 10px;' + '}',
            'div.wc-chart#Listing .pagination-container {' + '    padding-top: 10px;' + '}',
            'div.wc-chart#Listing .pagination-container a {' +
                '    text-decoration: none;' +
                '    padding: 5px 10px;' +
                '}',
            'div.wc-chart#Listing .pagination-container a:first-child {' +
                '    margin-left: 5px;' +
                '}',
            'div.wc-chart#Listing .pagination-container a.active {' +
                '    border: 2px solid gray;' +
                '    border-radius: 4px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          General styles
        \--------------------------------------------------------------------------------------***/

            '.hidden {' + '    display: none !important;' + '}',
            'circle.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 2px;' +
                '    fill: black;' +
                '    r: 4px;' +
                '}',
            'path.brushed {' +
                '    stroke: orange;' +
                '    stroke-width: 3px;' +
                '    stroke-opacity: 1;' +
                '}',
            'path.hover {' + '    stroke: orange;' + '    stroke-opacity: 1;' + '}',
            'circle.selected {' + '    stroke: orange;' + '    fill: black;' + '}',
            'tr.brushed {' + '    background: orange;' + '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
