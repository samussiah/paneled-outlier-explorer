import setXoptions from './onPreprocess/setXoptions';
import setYoptions from './onPreprocess/setYoptions';
import deriveStatistics from './onPreprocess/deriveStatistics';
import deriveVariables from './onPreprocess/deriveVariables';
import filterData from './onPreprocess/filterData';

export default function onPreprocess() {
    setXoptions.call(this);
    setYoptions.call(this);
    deriveStatistics.call(this);
    deriveVariables.call(this);
    filterData.call(this);
}
