import { set } from 'd3';

export default function deriveVariables() {
    //Identify IDs with abnormal results.
    this.measure.IDs.abnormal = set(
        this.measure.data
            .filter(
                d =>
                    d[this.config.value_col] < this.lln(d) || d[this.config.value_col] > this.uln(d)
            )
            .map(d => d[this.config.id_col])
    ).values();

    this.measure.data.forEach(d => {
        //Identify IDs with abnormal results.
        d.abnormalID = this.measure.IDs.abnormal.indexOf(d[this.config.id_col]) > -1;

        //Identify abnormal results.
        d.abnormal =
            d[this.config.value_col] < this.lln(d) || d[this.config.value_col] > this.uln(d);

        //Identify IDs that have been brushed.
        d.brushedID = this.parent.data.selectedIDs.indexOf(d[this.config.id_col]) > -1;
    });
}
