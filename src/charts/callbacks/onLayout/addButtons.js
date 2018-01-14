import remove from './addButtons/remove';
import maximize from './addButtons/maximize';
import minimize from './addButtons/minimize';

export default function addButtons() {
    //Add buttons in chart title.
    this.buttons = this.wrap.select('.wc-chart-title')
        .selectAll('span.poe-chart-button')
        .data(
            [{
                function: remove,
                text: '&#10006;',
                title: 'Remove chart.'
            },{
                function: maximize,
                text: '&plus;',
                title: 'Maximize chart.'
            },{
                function: minimize,
                text: '&minus;',
                title: 'Minimize chart.'
            }]
        )
        .enter()
        .append('span')
        .attr({
            'class': d => `poe-chart-button ${
                d.text === '&minus;' ? 'poe-hidden' : ''} poe-${
                d.title.split(' ')[0].toLowerCase()}-chart`,
            'title': d => d.title
        })
        .style('visibility', 'hidden')
        .html(d => d.text);

    //Add event listeners to chart buttons.
    this.buttons.on('click', d => {
        d.function.call(this);
    });
}
