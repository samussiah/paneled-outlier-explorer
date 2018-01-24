import { select } from 'd3';
import toggleAllMeasures from './defineLayout/toggleAllMeasures';
import navClick from './defineLayout/navClick';

export default function defineLayout() {
    const context = this;

    //Top-level container
    this.containers.main = select(this.element)
        .append('div')
        .attr('id', 'paneled-outlier-explorer');

    /**-------------------------------------------------------------------------------------------\
      Left column
    \-------------------------------------------------------------------------------------------**/

    this.containers.leftColumn = this.containers.main
        .append('div')
        .classed('poe-column', true)
        .attr('id', 'poe-left-column');
    this.containers.leftColumnHeader = this.containers.leftColumn
        .append('div')
        .classed('poe-header', true)
        .attr('id', 'poe-left-column-header')
        .text('Controls');
    this.containers.controls = this.containers.leftColumn.append('div').attr('id', 'poe-controls');

    //Measure controls
    this.containers.measures = this.containers.leftColumn.append('div').attr('id', 'poe-measures');
    this.containers.allMeasures = this.containers.measures
        .append('div')
        .attr('id', 'poe-all-measures');
    this.containers.allMeasuresToggle = this.containers.allMeasures
        .append('input')
        .attr({
            id: 'poe-toggle-all-measures',
            type: 'checkbox'
        })
        .on('change', () => {
            toggleAllMeasures.call(context);
        });
    this.containers.allMeasures
        .append('label')
        .attr('for', 'poe-toggle-all-measures')
        .text('Measures');
    this.containers.measureList = this.containers.measures
        .append('ul')
        .attr('id', 'poe-measure-list');

    /**-------------------------------------------------------------------------------------------\
      Right column
    \-------------------------------------------------------------------------------------------**/

    this.containers.rightColumn = this.containers.main
        .append('div')
        .classed('poe-column', true)
        .attr('id', 'poe-right-column');
    this.containers.rightColumnHeader = this.containers.rightColumn
        .append('div')
        .classed('poe-header', true)
        .attr('id', 'poe-right-column-header');
    this.containers.navBar = this.containers.rightColumnHeader
        .append('ul')
        .attr('id', 'poe-nav-bar');
    this.containers.navs = this.containers.navBar
        .selectAll('li.poe-nav')
        .data(['Charts', 'Listing'])
        .enter()
        .append('li')
        .classed('poe-nav', true)
        .classed('active', d => d === 'Charts')
        .attr('id', d => `poe-${d.toLowerCase()}-nav`)
        .text(d => d);
    this.containers.navs.on('click', d => {
        navClick.call(this, d);
    });
    this.containers.charts = this.containers.rightColumn
        .append('div')
        .classed('poe-display', true)
        .attr('id', 'poe-charts');
    this.containers.listing = this.containers.rightColumn
        .append('div')
        .classed('poe-display', true)
        .attr('id', 'poe-listing');
}
