import setCurrentMeasure from './onInit/setCurrentMeasure';
import identifyNormalParticipants from './onInit/identifyNormalParticipants';

export default function onInit() {
    setCurrentMeasure.call(this);
    identifyNormalParticipants.call(this);
}
