import removeVisitsWithoutData from './setXoptions/removeVisitsWithoutData';

export default function setXoptions() {
    //Update x-object.
    Object.assign(
        this.config.x,
        this.config.time_cols.find(time_col => time_col.value_col === this.config.x.column)
    );

    //Remove visits without data from x-domain if x-type is ordinal.
    if (this.config.x.type === 'ordinal') {
        removeVisitsWithoutData.call(this);
    }

    //Delete domain setting if x-type is linear
    if (this.config.x.type !== 'ordinal') delete this.config.x.domain;

    //Update bottom margin.
    this.config.margin.bottom = this.config.x.vertical_space;
}
