const base_url = "https://api.github.com/repos/spikespaz/EssentialAdditions";

update();

setInterval(update(), 60000);

function update() {
    $.getJSON(base_url, (response) => {
        $('#fork-count').html(response.forks);
    });

    $.getJSON(base_url + "/contributors", (response) => {
        $('#contributor-count').html(response.length);
        const commit_count = response.reduce((count, item) => count += item.contributions, 0);

        $('#commit-count').html(commit_count);
    });

    $.getJSON(base_url + "/releases/latest", (response) => {
        const version_title = response.name.split("-");

        $('#latest-release').html(version_title[0]);
        $('#minecraft-version').html(version_title[1]);
        $('#download-release').attr("href", response.assets[0].browser_download_url);
    });

    $.getJSON(base_url + "/releases", (response) => {
        $('#release-count').html(response.length);
    });
}
