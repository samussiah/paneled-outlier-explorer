export default function defineStyles() {
    const styles = [
            '.hidden {' + '    display: none !important;' + '}',

            '#measure-list-container {' + '    width: 19%;' + '    float: left;' + '}',
            '#measure-list-header {' +
                '    font-size: 150%;' +
                '    border-bottom: 1px solid lightgray;' +
                '    font-weight: lighter;' +
                '    padding: 14px 0;' +
                '    text-align: right;' +
                '}',
            '#measure-list-checkbox {' + '    margin-left: 5px;' + '}',
            '#measure-list {' + '    list-style-type: none;' + '    font-weight: lighter;' + '}',
            '.measure-item {' + '}',
            '.measure-item-container {' + '    text-align: right;' + '}',
            '.measure-checkbox {' +
                '    margin-left: 5px;' +
                '    margin-top: 5px;' +
                '    float: right;' +
                '}',

            'ul#navigation-bar {' +
                '    list-style-type: none;' +
                '    margin: 0;' +
                '    padding: 0;' +
                '    overflow: hidden;' +
                '    background-color: #333;' +
                '    width: 80%;' +
                '    border-left: 2px solid lightgray;' +
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

            'div.wc-layout.wc-small-multiples#Charts,' +
                'div.wc-chart#Listing {' +
                '    width: 80%;' +
                '    float: right;' +
                '    border-left: 2px solid lightgray;' +
                '    padding-top: 10px;' +
                '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart {' + '    padding-right: 1em;' + '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart.expanded {' +
                '    width: 100%;' +
                ' }',
            'div.wc-layout.wc-small-multiples > div.wc-chart .wc-chart-title {' +
                '    text-align: left;' +
                '    padding-left: 10px;' +
                '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart .chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 3px 1px 3px;' +
                '    font-size: 75%;' +
                '    margin-left: 5px;' +
                '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart .chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
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
            'circle.selected {' + '    stroke: orange;' + '    fill: black;' + '}',
            'tr.brushed {' + '    background: orange;' + '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
