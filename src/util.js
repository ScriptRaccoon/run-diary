// sum of a list
export function sum(list) {
    return list.reduce((p, el) => p + el, 0);
}

// formats date as yyyy-mm-dd
export function formatDate(date) {
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${d}`;
}

// formats date as dd.mm.yyyy
export function displayedDate(date) {
    const y = date.getFullYear().toString();
    const m = (date.getMonth() + 1).toString();
    const d = date.getDate().toString();
    return `${d}.${m}.${y}`;
}

// formats date as dd.mm
export function shortDate(date) {
    const m = (date.getMonth() + 1).toString();
    const d = date.getDate().toString();
    return `${d}.${m}.`;
}

const dayinms = 1000 * 60 * 60 * 24;

// gets date index with sunday -> 7
function getActualDay(date) {
    return date.getDay() > 0 ? date.getDay() : 7;
}

// add number of days to a date
export function addDays(date, number) {
    return new Date(date.getTime() + number * dayinms);
}

// end of the week of a date
export function weekEndAt(date) {
    const day = getActualDay(date);
    return addDays(date, 7 - day);
}

// start of the week of a date
export function weekStartAt(date) {
    const day = getActualDay(date);
    return addDays(date, 1 - day);
}

// format time as hh:mm:ss
export function formatTime(seconds) {
    const h = Math.floor(seconds / (60 * 60));
    const m = Math.floor((seconds - 60 * 60 * h) / 60);
    const s = seconds - 60 * 60 * h - 60 * m;
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

// converts speed from meters/seconds to minutes/kilometer
export function convertSpeed(speed) {
    const result = 1000 / (speed * 60);
    const minutes = Math.floor(result);
    const rest = result - minutes;
    const seconds = Math.round(rest * 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

// groups array by a key, for example all runs by date
export function groupByKey(array, key) {
    const result = {};
    for (const obj of array) {
        const val = obj[key];
        if (!result[val]) {
            result[val] = [];
        }
        result[val].push(obj);
    }
    return result;
}
