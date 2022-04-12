"use strict";
/**
 * Util module for URL
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode_params = exports.encode_params = void 0;
function encode_params(params, prefix) {
    let items = [];
    for (const field in params) {
        const key = (prefix) ?
            encodeURIComponent(prefix + "[" + field + "]") :
            encodeURIComponent(field);
        const type = typeof params[field];
        switch (type) {
            case "object":
                // handle arrays appropriately x[]=1&x[]=3
                if (Array.isArray(params[field])) {
                    for (let i = 0; i < params[field].length; i++) {
                        items.push(key + "[]=" + params[field][i]);
                    }
                }
                else {
                    //recusrively construct the sub-object
                    items = items.concat(encode_params(params[field], key));
                }
                break;
            case "function":
                break;
            default:
                // items.push(key + "=" + escape(params[field]));
                items.push(key + "=" + encodeURIComponent(params[field]));
                break;
        }
    }
    return items.join("&");
}
exports.encode_params = encode_params;
/**
 * Decode a deeply nested Url
 */
function decode_params(params) {
    const obj = {};
    const parts = params.split("&");
    parts.forEach(function (kvs) {
        const kvp = kvs.split("=");
        const val = unescape(kvp[1]);
        let key = kvp[0];
        // eslint-disable-next-line no-useless-escape
        const reg_name = /^([^\[]+)/.exec(key);
        const name = (reg_name) ? reg_name[0] : 'undefined';
        if (/\[\w+\]/.test(key)) {
            const rgx = /\[(\w+)\]/g;
            let sub = rgx.exec(key);
            if (typeof obj[name] === 'undefined') {
                obj[name] = {};
            }
            const unroot = function (o) {
                if (sub == null) {
                    return;
                }
                const sub_key = sub[1];
                sub = rgx.exec(key);
                if (!o[sub_key]) {
                    o[sub_key] = sub ? {} : val;
                }
                unroot(o[sub_key]);
            };
            unroot(obj[name]);
        }
        else if (/\[\]$/.test(key)) { // is array
            const w = /(^\w+)/.exec(key);
            key = (w) ? w[0] : 'undefined';
            if (!obj[key]) {
                obj[key] = [];
            }
            obj[key].push(val);
        }
        else {
            obj[key] = val;
        }
    });
    return obj;
}
exports.decode_params = decode_params;
//# sourceMappingURL=url.js.map