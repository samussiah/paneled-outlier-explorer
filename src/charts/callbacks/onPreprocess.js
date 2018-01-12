import setYdomain from './onPreprocess/setYdomain';
import syncTimeScale from './onPreprocess/syncTimeScale';

export default function onPreprocess() {
    //Set the y-domain individually for each measure.
    setYdomain.call(this);

    //Sync config with X-axis selection.
    syncTimeScale.call(this);
}
