export default function handleInliers() {
    if (this.config.inliers) this.raw_data = this.measure_data;
    else this.raw_data = this.measure_data.filter(d => d.abnormalID);
}
