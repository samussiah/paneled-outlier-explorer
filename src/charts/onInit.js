import setCurrentMeasure from './onInit/setCurrentMeasure';
import defineData from './onInit/defineData';
import identifyNormalParticipants from './onInit/identifyNormalParticipants';

export default function onInit() {
    setCurrentMeasure.call(this);
    defineData.call(this);
    identifyNormalParticipants.call(this);
}
