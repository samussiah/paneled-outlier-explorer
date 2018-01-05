import { createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function charts() {
    this.charts = createChart(this.containers.charts.node(), this.settings, this.controls);

    for (const callback in callbacks)
        this.charts.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    this.charts.paneledOutlierExplorer = this;
}
