export default function defineStyles() {
    const styles = [
            '.hidden {' + '    display: none !important;' + '}',
            '#measure-list-container {' + '    width: 19%;' + '    float: left;' + '}',
            '#measure-list-header {' +
                '    font-size: 150%;' +
                '    border-bottom: 1px solid lightgray;' +
                '    font-weight: lighter;' +
                '    padding-bottom: 1%;' +
                '    margin-bottom: 1%;' +
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
            'div.wc-layout.wc-small-multiples {' +
                '    width: 80%;' +
                '    float: right;' +
                '    border-left: 1px solid lightgray;' +
                '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart {' + '    padding-right: 1em;' + '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart.full-screen {' +
                '    z-index: 9999;' +
                '    width: 100%;' +
                '    height: 100%;' +
                '    position: fixed;' +
                '    top: 0;' +
                '    left: 0;' +
                '    background: white;' +
                ' }',
            'div.wc-layout.wc-small-multiples > div.wc-chart .chart-button {' +
                '    float: right;' +
                '    cursor: pointer;' +
                '    border: 1px solid black;' +
                '    border-radius: 3px;' +
                '    padding: 0px 4px 1px 3px;' +
                '    margin-left: 5px;' +
                '}',
            'div.wc-layout.wc-small-multiples > div.wc-chart .chart-button:hover {' +
                '    background: black;' +
                '    color: white;' +
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
            'circle.selected {' + '    stroke: orange;' + '    fill: black;' + '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
