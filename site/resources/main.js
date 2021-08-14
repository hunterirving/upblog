function insert_html(file, container_id) {
    fetch(file + '?v=' + Date.now())
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById(container_id).innerHTML = data;
        });
}
