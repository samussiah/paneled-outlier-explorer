import { extent } from 'd3';

export default function setYdomain() {
    //Set y-domain manually for each measure.
    this.config.y.domain = extent(
        this.raw_data.filter(d => d.measure_unit === this.measure),
        d => +d[this.config.value_col]
    );

    //Set y-format based on range of y-domain.
    const range = this.config.y.domain[1] - this.config.y.domain[0];

    this.config.y.format =
        range < 0.0002
            ? '.5f'
            : range < 0.002
              ? '.4f'
              : range < 0.02 ? '.3f' : range < 0.2 ? '.2f' : range < 2.0 ? '.1f' : '1d';
}
