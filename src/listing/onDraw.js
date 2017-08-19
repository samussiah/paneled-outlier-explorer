import { select as d3select } from 'd3';
import addPagination from './onDraw/addPagination';

export default function onDraw() {
    //Add pagination functionality.
    addPagination.call(this);
}
