import setXoptions from './onPreprocess/setXoptions';
import setYoptions from './onPreprocess/setYoptions';
import deriveStatistics from './onPreprocess/deriveStatistics';
import deriveVariables from './onPreprocess/deriveVariables';
import identifyNormalParticipants from './onPreprocess/identifyNormalParticipants';
import filterData from './onPreprocess/filterData';
import hideNormalRangeControls from './onPreprocess/hideNormalRangeControls';

export default function onPreprocess() {
    setXoptions.call(this);
    setYoptions.call(this);
    deriveStatistics.call(this);
    deriveVariables.call(this);
    identifyNormalParticipants.call(this);
    filterData.call(this);
    hideNormalRangeControls.call(this);
}
