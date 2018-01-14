import './util/object-assign';
import clone from './util/clone';
import defaults from './defaults/index';

export default function defineSettings() {
    this.settings.merged = Object.assign(
        Object.assign(defaults.rendererSettings, defaults.webchartsSettings),
        clone(this.settings.user)
    );
    defaults.syncSettings.call(this);
    Object.assign(this.settings, this.settings.synced); // attach settings to top-level settings object
    defaults.syncControls.call(this);
}
