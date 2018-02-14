import { median, mean, deviation, quantile } from 'd3';

export default function deriveStatistics() {
    if (this.config.normal_range_method === 'LLN-ULN') {
        this.lln = d =>
            d instanceof Object
                ? +d[this.config.lln_col]
                : median(this.measure_data, d => +d[this.config.lln_col]);
        this.uln = d =>
            d instanceof Object
                ? +d[this.config.uln_col]
                : median(this.measure_data, d => +d[this.config.uln_col]);
    } else if (this.config.normal_range_method === 'Standard Deviation') {
        this.mean = mean(this.measure_results);
        this.sd = deviation(this.measure_results);
        this.lln = () => this.mean - this.config.normal_range_sd * this.sd;
        this.uln = () => this.mean + this.config.normal_range_sd * this.sd;
    } else if (this.config.normal_range_method === 'Quantiles') {
        this.lln = () => quantile(this.measure_results, this.config.normal_range_quantile_low);
        this.uln = () => quantile(this.measure_results, this.config.normal_range_quantile_high);
    } else {
        this.lln = d =>
            d instanceof Object ? d[this.config.value_col] + 1 : this.measure_results[0];
        this.uln = d =>
            d instanceof Object
                ? d[this.config.value_col] - 1
                : this.measure_results[this.measure_results.length - 1];
    }
}
