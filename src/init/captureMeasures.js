import { dataOps } from 'webcharts';

export default function captureMeasures() {
    // Define set of measure values with units (in ADaM units are already attached; in SDTM units are captured in a separate variable).
    this.config.allMeasures = this.data.raw[0].hasOwnProperty(this.config.measure_order_col)
        ? [...new Set(this.data.raw.map(d => +d[this.config.measure_order_col])).values()]
              .sort((a, b) => a - b)
              .map(
                  value =>
                      this.data.raw.find(d => +d[this.config.measure_order_col] === value)
                          .measure_unit
              ) // sort measures by measure order
        : [...new Set(this.data.raw.map(d => d.measure_unit)).values()].sort(
              dataOps.naturalSorter
          ); // sort measures alphabetically

    this.config.measures =
        this.config.measures && this.config.measures.length
            ? this.config.measures
            : this.config.allMeasures;
}
