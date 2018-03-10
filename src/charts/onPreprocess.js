import setXoptions from './onPreprocess/setXoptions';
import setYoptions from './onPreprocess/setYoptions';
import filterData from './onPreprocess/filterData';

export default function onPreprocess() {
    setXoptions.call(this);
    setYoptions.call(this);
    filterData.call(this);
}
