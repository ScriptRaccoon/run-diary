import {
    groupByKey,
    weekStartAt,
    weekEndAt,
    addDays,
} from "./util.js";
import { writable, derived } from "svelte/store";

export const chosenDate = writable(null);
export const runs = writable([]);
export const runsByDate = derived(runs, (r) => groupByKey(r, "date"));

export const weeks = derived(runs, (r) => {
    const w = [];
    if (r?.length == 0) return w;
    const firstDate = weekStartAt(new Date(r[r.length - 1].date));
    const lastDate = weekEndAt(new Date(r[0].date));
    let dayCount = 1;
    let weekIndex = 0;
    let date = firstDate;
    w[0] = [];
    while (date <= lastDate) {
        if (!w[weekIndex]) w[weekIndex] = [];
        w[weekIndex].push(date);
        date = addDays(date, 1);
        dayCount++;
        if ((dayCount - 1) % 7 == 0) {
            weekIndex++;
        }
    }
    w.reverse();
    return w;
});
