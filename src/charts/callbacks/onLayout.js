import classChart from './onLayout/classChart';
import addButtons from './onLayout/addButtons';
import addChartHover from './onLayout/addChartHover';

export default function onLayout() {
    //Assign initial chart classes.
    classChart.call(this);

    //Add buttons to maximize, minimize, and remove charts.
    addButtons.call(this);

    //Add chart hover functionality.
    addChartHover.call(this);
}
