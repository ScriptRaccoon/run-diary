<script>
    import {
        displayedDate,
        formatDate,
        formatTime,
        convertSpeed,
    } from "./util.js";
    import { fade } from "svelte/transition";
    import { chosenDate, runsByDate } from "./stores.js";
    $: date = $chosenDate ? formatDate($chosenDate) : null;
    function closeDialog() {
        $chosenDate = null;
    }
</script>

{#if $chosenDate != null}
    <div
        on:click={closeDialog}
        transition:fade={{ duration: 150 }}
        class="overlay"
    />
    <aside transition:fade={{ duration: 150 }}>
        <button class="closeBtn" on:click={closeDialog}>
            <i class="fa-solid fa-xmark" />
        </button>
        <h2>Runs on {displayedDate($chosenDate)}</h2>
        <div>
            {#each $runsByDate[date] as run}
                <div class="run">
                    <h3 title="Name of run">
                        <a
                            href="https://www.strava.com/activities/{run.id}"
                            target="_blank"
                        >
                            {run.name}
                        </a>
                    </h3>
                    <p class="stats">
                        <span title="distance"
                            ><i class="fa-regular fa-map" />
                            {run.distance.toFixed(2)}km</span
                        >
                        <span title="moving time"
                            ><i class="fa-regular fa-clock" />
                            {formatTime(run["moving_time"])}</span
                        >
                        <span title="average speed">
                            <i class="fa-solid fa-gauge-high" />
                            {convertSpeed(run["average_speed"])}/km
                        </span>
                    </p>
                </div>
            {/each}
        </div>
    </aside>
{/if}

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background-color: #000a;
        cursor: pointer;
    }
    aside {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 0px 20px #0009;
        padding: 20px 30px;
        outline: none;
        border: none;
        border-radius: 15px;
        background-color: #fff;
        width: min(90vw, 400px);
    }
    button {
        position: absolute;
        top: 5px;
        right: 10px;
    }
    button:focus,
    button:hover {
        color: #000;
    }
    h2 {
        font-size: 28px;
        font-weight: 500;
        padding: 10px 0px;
        text-align: center;
    }
    h3 {
        font-size: 22px;
        font-weight: 400;
        padding: 7px 0px 10px 0px;
    }
    .stats {
        display: flex;
        justify-content: flex-start;
        gap: 30px;
        color: var(--gray-color);
        font-size: 16px;
    }
    .run {
        padding: 10px 0px;
    }
    a {
        color: inherit;
        outline: none;
    }
    a:hover,
    a:focus {
        color: var(--primary-color);
    }
</style>
