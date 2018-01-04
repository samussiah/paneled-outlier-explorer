import { set } from 'd3';

export default function defineData(data) {
    //Capture variable names.
    this.data.variables = Object.keys(data[0]);

    //Define set of unique IDs.
    this.data.population = set(data.map(d => d[this.settings.id_col])).values().sort();

    //Define set of unique measures.
    this.data.measures = set(data.map(d => d.measure_unit)).values().sort();

    //Filter data on observations with numeric results.
    this.data.raw = data
        .filter(
            d =>
                /^[0-9.]+$/.test(d[this.settings.value_col])
        );

    if (data.length !== this.data.raw.length)
        console.warn(
            `${data.length -
                this.data.raw.length} non-numeric observations have been removed from the data.`
        );

    //Define set of unique quantitative measures.
    this.data.quantitativeMeasures = set(this.data.raw.map(d => d.measure_unit)).values().sort();

    //Define set of unique qualitative measures.
    this.data.qualitativeMeasures = this.data.measures
        .filter(measure => this.data.quantitativeMeasures.indexOf(measure) < 0);

    //Define additional variables.
    this.data.raw
        .forEach(d => {
            //Concatenate measure and unit.
            if (d[this.settings.unit_col])
                d.measure_unit = `${d[this.settings.measure_col]} (${d[this.settings.unit_col]})`;
            else
                d.measure_unit = d[this.settings.measure_col];

            d.brushed = false;
        });

    //Define set of initially displayed measures.
    this.data.currentMeasures = this.settings.measures && this.settings.measures.length
        ? this.settings.measures
        : this.data.quantitativeMeasures;

    //Filter data on the specified subset of measures.
    this.data.filtered = this.data.raw
        .filter(d => this.data.currentMeasures.indexOf(d[this.settings.measure_col]) > -1);

    //Placeholder data arrays.
    this.data.brushed = [];
    this.data.selectedIDs = [];
}
