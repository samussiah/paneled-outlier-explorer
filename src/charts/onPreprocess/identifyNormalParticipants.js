import { set } from 'd3';

export default function identifyNormalParticipants() {
    this.abnormalIDs = set(
        this.measure_data.filter(d => d.abnormal).map(d => d[this.config.id_col])
    ).values();
    this.measure_data.forEach(d => {
        d.abnormalID = this.abnormalIDs.indexOf(d[this.config.id_col]) > -1;
    });
}
