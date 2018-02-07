import { set } from 'd3';

export default function filterData() {
    this.raw_data = this.measure_data;

    //Remove inlier IDs from data.
    if (!this.config.inliers)
        this.raw_data = this.raw_data.filter(d => d.abnormalID || d.brushedID);

    //Remove unscheduled visits from data.
    if (!this.config.unscheduled_visits) this.raw_data = this.raw_data.filter(d => !d.unscheduled);

    //Define set of displayed IDs.
    this.displayedIDs = set(this.raw_data.map(d => d[this.config.id_col])).values();
}
