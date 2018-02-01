import setCurrentMeasure from './onInit/setCurrentMeasure';
import defineMeasureData from './onInit/defineMeasureData';

export default function onInit() {
    setCurrentMeasure.call(this);
    defineMeasureData.call(this);
}
