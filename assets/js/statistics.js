const github_url = "https://api.github.com/repos/spikespaz/EssentialAdditions";
const curse_url = "https://widget.mcf.li/mc-mods/minecraft/259003-essential-additions.json";
const files_base = "https://minecraft.curseforge.com/projects/essential-additions/files/";

$(document).ready(function () {
    update($('#release-table'));
});


function update(table) {
    $.getJSON(github_url, (response) => {
        $('#fork-count').html(response.forks);
    });

    $.getJSON(github_url + "/contributors", (response) => {
        $('#contributor-count').html(response.length);
        const commit_count = response.reduce((count, item) => count += item.contributions, 0);

        $('#commit-count').html(commit_count);
    });

    $.getJSON(curse_url, (response) => {
        const version_number = response.download.name.split(/[\s-]+/g)[1];
        const download_direct = files_base + response.download.id + "/download";

        $('#latest-release').html(version_number);
        $('#minecraft-version').html(response.download.version);
        $('#download-count').html(response.downloads.total);
        $('#download-release').attr("href", download_direct);
        $('#release-count').html(Object.keys(response.files).length);

        if (table) {
            releasesTable(response);
            table.tablesorter({
                textExtraction: releaseTextExtraction,
                sortList: [[0, 0]]
            });
        }
    });
}


function releasesTable(response) {
    let table_data;

    let key, i = 0;
    for (key in response.files) {
        i++;
        let file = response.files[key];
        let split_name = file.name.split(/[\s-]+/g);

        let date_created = new Date(file.created_at);
        date_created = date_created.toDateString();
        table_data = "<tr>" +
            "\n    <td>#" + i + "</td>" +
            "\n    <td><b>" + split_name[0] + "</b></td>" +
            "\n    <td>" + split_name[1] + "</td>" +
            "\n    <td>" + split_name[2] + "</td>" +
            "\n    <td>" + date_created + "</td>" +
            "\n    <td>" + file.downloads + "</td>" +
            "\n    <td>" +
            "<a class=\"icon fa-download\" href=\"" + files_base + file.id + "/download\"> <i>#" + file.id + "</i></a></td>" +
            "</tr>\n" + table_data;

        $('#release-content').html(table_data)
    }
}

const releaseTextExtraction = function(node) {
    if (node.innerHTML.match(/^[#v]/)) {
        return node.innerHTML.substr(1);
    } else {
        return node.innerHTML;
    }
};
