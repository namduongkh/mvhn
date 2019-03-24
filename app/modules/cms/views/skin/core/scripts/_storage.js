var Storage = (function(window) {
    'use strict';
    var configs = {
        prefix: 'skeleton'
    };

    return {
        get: get,
        set: set,
        remove: remove,
        clear: clear
    };

    function get(name) {
        var date = new Date();
        var current = Math.round(+date / 1000);
        var storedData = JSON.parse(
            window.localStorage.getItem(configs.prefix + '.' + name)
        ) || {};
        var storedTime = storedData.storageExpireTime || 0;

        if (storedTime && storedTime < current) {
            remove(configs.prefix + '.' + name);
            return undefined;
        } else {
            return storedData.store;
        }
    }

    function set(name, value, seconds) {
        var date = new Date();
        var schedule = Math.round(
            date.setSeconds(date.getSeconds() + seconds) / 1000
        );
        var data = JSON.stringify({ storageExpireTime: schedule, store: value });

        try {
            window.localStorage.setItem(configs.prefix + '.' + name, data);
        } catch (e) {
            if (e == window.QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!');
            }
        }

        return data;
    }

    function remove(name) {
        window.localStorage.removeItem(configs.prefix + '.' + name);
    }

    function clear() {
        window.localStorage.clear();
    }
})(window);

window.Storage = Storage
export default Storage;