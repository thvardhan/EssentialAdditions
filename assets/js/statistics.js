update();

setInterval(() => { update(); }, 5000);

function update() {
    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions", (response) => {
        $('#fork-count').html(response.forks);
    });

    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions/contributors", (response) => {
        $('#contributor-count').html(response.length);
        const commit_count = response.reduce((count, item) => count += item.contributions, 0);

        $('#commit-count').html(commit_count);
    });

    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions/releases", (response) => {
        const filteredReleases = response.filter(function(obj) {
            return (obj.prerelease === false);
        });

        if (!$.isEmptyObject(filteredReleases)) {
            const lastRelease = filteredReleases[0];
            const version_title = lastRelease.name.split("-");

            $('#latest-release').html(version_title[0]);
            $('#release-count').html(response.length);
            $('#minecraft-version').html(version_title[1]);
            $('#download-release').attr("href", lastRelease.assets[0].browser_download_url);
        }
    });
}
