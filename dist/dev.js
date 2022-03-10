"use strict";
// import {urn_log} from './index';
Object.defineProperty(exports, "__esModule", { value: true });
// // urn_log.init(urn_log.LogLevel.FUNCTION_DEBUG);
// urn_log.init({
//   log_level: urn_log.LogLevel.FUNCTION_DEBUG,
//   debug_info: false,
//   prefix_type: true,
//   color: true
// });
// urn_log.warn(`Hello`);
// urn_log.warn(`Hello`);
// urn_log.fn_debug(`Hello`);
// urn_log.fn_debug(`Hello`);
// urn_log.error(`Hello`);
// urn_log.error(`Hello`);
// urn_log.debug(`Hello`);
// urn_log.debug(`Hello`);
// urn_log.warn(`Hello`);
const index_1 = require("./index");
const def = {
    fetch: 'axios',
    log_prefix: 'A',
    dev_log_prefix: 'B',
    service_obj: {
        p1: 'a',
        p2: {
            p3: 'd'
        }
    }
};
const over = {
    dev_log_prefix: 'C',
    service_obj: {
        p1: '',
        p2: {
            p3: '222'
        }
    }
};
const over2 = {
    dev_log_prefix: 'C2222222'
};
const ctx = index_1.urn_context.init(def, over, false);
ctx.set(over2);
const o = ctx.get('log_prefix');
console.log(o);
//# sourceMappingURL=dev.js.map