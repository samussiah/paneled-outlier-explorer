import setXoptions from './onPreprocess/setXoptions';
import setYoptions from './onPreprocess/setYoptions';
import handleInliers from './onPreprocess/handleInliers';

export default function onPreprocess() {
    setXoptions.call(this);
    setYoptions.call(this);
    handleInliers.call(this);
}
