import clone from '../../util/clone';

export default function syncSettings() {
    this.settings.synced = clone(this.settings.merged);

    //x
    this.settings.synced.x.type = this.settings.synced.time_cols[0].type;
    this.settings.synced.x.column = this.settings.synced.time_cols[0].value_col;
    this.settings.synced.x.order = this.settings.synced.time_cols[0].order;
    this.settings.synced.x.rotate_tick_labels = this.settings.synced.time_cols[0].rotate_tick_labels;

    //y
    this.settings.synced.y.column = this.settings.synced.value_col;

    //marks
    this.settings.synced.marks[0].per = [
        this.settings.synced.id_col,
        this.settings.synced.measure_col
    ];
}
