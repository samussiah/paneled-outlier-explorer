import { set } from 'd3';

export default function displayedIDs() {
    this.currentIDs = set(this.filtered_data.map(d => d[this.config.id_col])).values();
}
