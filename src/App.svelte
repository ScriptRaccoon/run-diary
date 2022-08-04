<script>
    import Header from "./Header.svelte";
    import Dialog from "./Dialog.svelte";
    import Diary from "./Diary.svelte";

    import { runs } from "./stores";
    import { onMount } from "svelte";
    import { parse } from "csv-parse";

    onMount(async () => {
        const res = await fetch("./data/export.csv", {
            encoding: "utf8",
        });
        const csvString = await res.text();
        parse(
            csvString,
            {
                columns: true,
                skip_empty_lines: true,
            },
            (err, activities) => {
                if (err) {
                    console.log(err);
                } else {
                    $runs = activities
                        .filter((r) => r.type === "Run")
                        .map((r) => {
                            return {
                                name: r.name,
                                id: r.id,
                                date: r["start_date_local"].substring(
                                    0,
                                    10
                                ),
                                moving_time: r["moving_time"],
                                distance: r["distance"] / 1000,
                                average_speed: r["average_speed"],
                            };
                        });
                }
            }
        );
    });
</script>

<svelte:head>
    <title>My run diary</title>
</svelte:head>

<Header />

<main>
    <Diary />
</main>

<Dialog />

<style>
    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :global(body) {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #111;
        font-size: 20px;
    }
    :global(.centered) {
        text-align: center;
    }
    :global(:root) {
        --primary-color: rgb(194, 63, 34);
        --gray-color: #666;
    }
    :global(button) {
        background: none;
        border: none;
        outline: none;
        color: inherit;
        font-size: inherit;
        cursor: pointer;
        color: #777;
        font-size: 20px;
    }
    :global(button:hover, button:focus) {
        color: #000;
    }
    main {
        padding: 20px 10px;
    }
</style>
