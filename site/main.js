function insert_html(file, container_id) {
    fetch(file)
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.getElementById(container_id).innerHTML = data;
        });
}
