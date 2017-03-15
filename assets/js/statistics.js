const github_url = "https://api.github.com/repos/spikespaz/EssentialAdditions";
const curse_url = "https://widget.mcf.li/mc-mods/minecraft/259003-essential-additions.json";
const files_base = "https://minecraft.curseforge.com/projects/essential-additions/files/";

update();

function update() {
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

        let table_data;

        for (let key in response.files) {
            let file = response.files[key];
            let split_name = file.name.split(/[\s-]+/g);

            let date_created = new Date(file.created_at);
            date_created = date_created.toDateString();
            table_data = "<tr>" +
                "\n    <td>" + split_name[0] + "</td>" +
                "\n    <td>" + split_name[1] + "</td>" +
                "\n    <td>" + split_name[2] + "</td>" +
                "\n    <td>" + date_created + "</td>" +
                "\n    <td>" + file.downloads + "</td>" +
                "\n    <td>" +
                "<a class=\"icon fa-download\" href=\"" + files_base + file.id + "/download\"> #" + file.id + "</a></td>" +
                "</tr>\n" + table_data;

            $('#release-table').html(table_data)
        }

        $('#latest-release').html(version_number);
        $('#minecraft-version').html(response.download.version);
        $('#download-count').html(response.downloads.total);
        $('#download-release').attr("href", download_direct);
        $('#release-count').html(Object.keys(response.files).length);
    });
}
