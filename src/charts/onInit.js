import defineData from './onInit/defineData';
import defineYsettings from './onInit/defineYsettings';

export default function onInit() {
    defineData.call(this);
    defineYsettings.call(this);
}
