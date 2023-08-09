"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateTags = void 0;
function iterateTags(tags) {
    const tagArr = [];
    if (tags) {
        const keys = Object.keys(tags);
        for (let i = 0; i < keys.length; i++) {
            tagArr.push(`${keys[i]}:${tags[keys[i]]}`);
        }
    }
    return tagArr;
}
exports.iterateTags = iterateTags;
