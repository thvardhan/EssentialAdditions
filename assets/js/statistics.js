update();

setInterval(function() { update(); }, 5000);

function update() {
    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions/forks", function(response) {
        $('#fork-count').html(response.length);
    });

    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions/contributors", function(response) {
        $('#contributor-count').html(response.length);
        var commit_count = 0;
        for (var i = 0; i < response.length; i++) {
            commit_count += response[i].contributions;
        }

        $('#commit-count').html(commit_count);
    });

    $.getJSON("https://api.github.com/repos/spikespaz/EssentialAdditions/releases", function(response) {
        var filteredReleases = response.filter(function(obj) {
            return (obj.prerelease === false);
        });

        if (!$.isEmptyObject(filteredReleases)) {
            var lastRelease = filteredReleases[0];
            var version_title = lastRelease.name.split("-");

            $('#latest-release').html(version_title[0]);
            $('#minecraft-version').html(version_title[1]);
            $('#download-release').attr("href", lastRelease.assets[0].browser_download_url);
        }
    });
}
