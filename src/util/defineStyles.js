export default function defineStyles() {
    const styles = [
            'div.wc-layout.wc-small-multiples > div.wc-chart {' + '    padding-right: 1em;' + '}',
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
