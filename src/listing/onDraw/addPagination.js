import addLinks from './addPagination/addLinks';
import addArrows from './addPagination/addArrows';
import updatePagination from './addPagination/updatePagination';
import { select } from 'd3';

export default function addPagination() {
    const listing = this;

    //Render page links.
    addLinks.call(this);

    //Render a different page on click.
    this.pagination.links.on('click', function() {
        listing.pagination.activeLink = +select(this).attr('rel');
        updatePagination.call(listing);
    });

    //Render arrow links.
    addArrows.call(this);

    //Render a different page on click.
    this.pagination.arrows.on('click', function() {
        if (listing.pagination.activeLink !== +select(this).attr('rel')) {
            listing.pagination.activeLink = +select(this).attr('rel');
            listing.pagination.prev.attr(
                'rel',
                listing.pagination.activeLink > 0 ? listing.pagination.activeLink - 1 : 0
            );
            listing.pagination.next.attr(
                'rel',
                listing.pagination.activeLink < listing.pagination.numPages
                    ? listing.pagination.activeLink + 1
                    : listing.pagination.numPages - 1
            );
            updatePagination.call(listing);
        }
    });

    //Render a different page on click.
    this.pagination.doubleArrows.on('click', function() {
        listing.pagination.activeLink = +select(this).attr('rel');
        updatePagination.call(listing);
    });
}
