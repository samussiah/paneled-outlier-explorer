import removeVariables from './defineData/removeVariables';
import deriveVariables from './defineData/deriveVariables';

export default function defineData(data) {
    this.data = {
        initial: data
    };

    //Remove extraneous variables.
    removeVariables.call(this);

    //Remove invalid data.
    this.data.raw = this.data.initial.filter(
        d => !/^\s*$/.test(d[this.config.measure_col]) && /^[0-9.]+$/.test(d[this.config.value_col])
    );

    //Derive additional variables.
    deriveVariables.call(this);

    //Warn user of dropped records.
    if (this.data.raw.length !== this.data.initial.length)
        console.warn(
            `${this.data.initial.length -
                this.data.raw.length} non-numeric observations have been removed from the data.`
        );

    //Define placeholder data array.s
    this.data.filtered = this.data.raw;
    this.data.brushed = [];
    this.data.selectedIDs = [];
}
