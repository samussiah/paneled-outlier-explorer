export default function filterData() {
    this.raw_data = this.measure_data;
    if (!this.config.inliers)
        this.raw_data = this.raw_data.filter(d => d.abnormalID || d.brushedID);
    if (!this.config.unscheduled_visits) this.raw_data = this.raw_data.filter(d => !d.unscheduled);
}
