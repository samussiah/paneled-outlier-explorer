import { set } from 'd3';

export default function defineData(data) {
    //Capture variable names.
    this.data.variables = Object.keys(data[0]);

    //Define set of unique IDs.
    this.data.population = set(data.map(d => d[this.settings.synced.id_col])).values().sort();

    //Define set of unique measures.
    this.data.measures = set(data.map(d => d.measure_unit)).values().sort();

    //Filter data on observations with numeric results.
    this.data.raw = data
        .filter(
            d =>
                /^[0-9.]+$/.test(d[this.settings.synced.value_col])
        );

    if (data.length !== this.data.raw.length)
        console.warn(
            `${data.length -
                this.data.raw.length} non-numeric observations have been removed from the data.`
        );

    //Define set of unique quantitative measures.
    this.data.quantitativeMeasures = set(this.data.raw.map(d => d.measure_unit)).values().sort();

    //Define set of initially displayed measures.
    this.data.currentMeasures = this.settings.synced.measures && this.settings.synced.measures.length
        ? this.settings.synced.measures
        : this.data.quantitativeMeasures;

    //Define set of unique qualitative measures.
    this.data.qualitativeMeasures = this.data.measures
        .filter(measure => this.data.quantitativeMeasures.indexOf(measure) < 0);

    //Define additional variables.
    this.data.raw
        .forEach(d => {
            //Concatenate measure and unit.
            if (d[this.settings.synced.unit_col])
                d.measure_unit = `${d[this.settings.synced.measure_col]} (${d[this.settings.synced.unit_col]})`;
            else
                d.measure_unit = d[this.settings.synced.measure_col];

            d.brushed = false;
        });
    this.data.filtered = this.data.raw;
    this.data.brushed = [];
    this.data.selectedIDs = [];
}
