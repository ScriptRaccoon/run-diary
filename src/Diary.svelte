<script>
    import DiaryWeek from "./DiaryWeek.svelte";
    import { weeks } from "./stores.js";
    const weekDays = ["Mo", "Tu", "We", "Thu", "Fr", "Sa", "Su"];
</script>

<section class="diary">
    <table>
        <thead>
            <tr>
                {#each weekDays as weekDay}
                    <td>{weekDay}</td>
                {/each}
            </tr>
        </thead>
        {#each $weeks as week}
            <DiaryWeek {week} />
        {/each}
    </table>
</section>

<style>
    table {
        width: min(95vw, 600px);
        margin: 0 auto;
    }
    thead td {
        text-align: center;
        padding-bottom: 10px;
    }
</style>
