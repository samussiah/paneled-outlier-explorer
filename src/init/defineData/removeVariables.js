import { set, merge } from 'd3';

export default function removeVariables() {
    this.config.variables = set(
        merge([
            [this.config.measure_col],
            [this.config.id_col],
            this.config.time_cols.map(time_col => time_col.value_col),
            [this.config.value_col],
            [this.config.unit_col],
            [this.config.lln_col],
            [this.config.uln_col],
            this.config.filters ? this.config.filters.map(filter => filter.value_col) : []
        ])
    )
        .values()
        .filter(variable => Object.keys(this.data.initial[0]).indexOf(variable) > -1);

    this.data.initial.forEach(d => {
        for (const variable in d)
            if (this.config.variables.indexOf(variable) < 0) delete d[variable];
    });
}
