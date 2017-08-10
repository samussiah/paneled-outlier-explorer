import { multiply } from 'webcharts';

export default function init(data) {
    const sortedData = data.sort((a, b) => {
        const aValue = a[this.config.measure_col],
            bValue = b[this.config.measure_col],
            leftSort = aValue < bValue,
            rightSort = aValue > bValue;

        if (this.config.measures && this.config.measures.length) {
            const aPos = this.config.measures.indexOf(aValue),
                bPos = this.config.measures.indexOf(bValue),
                diff = aPos > -1 && bPos > -1 ? aPos - bPos : null;

            return diff ? diff : aPos > -1 ? -1 : bPos > -1 ? 1 : leftSort ? -1 : rightSort ? 1 : 0;
        } else return leftSort ? -1 : rightSort ? 1 : 0;
    });
    multiply(this, sortedData, this.config.measure_col);
}
