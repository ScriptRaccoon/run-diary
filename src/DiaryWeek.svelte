<script>
    import DiaryCell from "./DiaryCell.svelte";
    import { runsByDate } from "./stores";
    export let week;
    import { formatDate, shortDate, sum } from "./util.js";
    function weekDistance(week) {
        return sum(
            week.map((date) =>
                $runsByDate[formatDate(date)]
                    ? sum(
                          $runsByDate[formatDate(date)].map(
                              (a) => a.distance
                          )
                      )
                    : 0
            )
        ).toFixed(1);
    }
</script>

<tr class="summary">
    <td colspan="7">
        <div class="weekStats">
            <span
                >{shortDate(week[0])} &ndash; {shortDate(
                    week[6]
                )}</span
            >
            <span>{weekDistance(week)}km</span>
        </div>
    </td>
</tr>
<tr class="content">
    {#each week as date}
        <DiaryCell
            {date}
            currentRuns={$runsByDate[formatDate(date)]}
        />
    {/each}
</tr>

<style>
    tr.summary {
        color: var(--gray-color);
        font-size: 12px;
    }
    tr.summary td {
        padding-top: 10px;
        border-top: 1px solid #eee;
    }
    .weekStats {
        display: flex;
        justify-content: space-between;
    }
    tr.content {
        height: 60px;
    }
</style>
