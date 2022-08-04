<script>
    import { sum } from "./util.js";
    import { chosenDate } from "./stores";
    export let date;
    export let currentRuns;
    function totalDistance(listOfRuns) {
        return sum(listOfRuns.map((a) => a.distance)).toFixed(1);
    }
    function openDialog() {
        if ($chosenDate) return;
        $chosenDate = date;
    }
</script>

<td>
    <div class="cell">
        {#if currentRuns}
            {@const distance = totalDistance(currentRuns)}
            <div
                on:click={() => openDialog()}
                class="circle"
                style="--totalDistance: {distance}"
            >
                {distance}
                {#if currentRuns.length > 1}
                    <div class="amount">
                        {currentRuns.length}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="emptyCircle" />
        {/if}
    </div>
</td>

<style>
    .cell {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle {
        width: calc(20px + var(--totalDistance) * 1.2px);
        aspect-ratio: 1 / 1;
        background-color: rgb(43, 143, 75);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        position: relative;
    }
    .emptyCircle {
        width: 5px;
        height: 5px;
        border: 1px solid #aaa;
        border-radius: 50%;
    }
    .amount {
        position: absolute;
        top: -5px;
        right: -5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #222;
        color: #fff;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 10px;
        box-shadow: 0px 0px 4px #fff8;
    }
</style>
