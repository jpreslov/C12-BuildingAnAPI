const fetchChirps = () => {
    $("#chirp-container").empty();
    $.ajax("/api/chirps", { type: "GET" })
        .then(data => {
            delete data.nextid
            const chirpArr = Object.entries(data);
            chirpArr.reverse();
            chirpArr.forEach(chirp => {
                $("#chirp-container").append(`
                    <div class="card m-3">
                        <div class="card-body">
                            <h5 class="card-title">${chirp[1].username}</h5>
                            <p class="card-text">${chirp[1].message}</p>
                            <svg onclick="deleteChirp(${chirp[0]})" width="1em" height="1em" viewBox="0 0 16 16" class="delete-icon bi bi-trash float-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <svg data-toggle="modal" data-target="#editModal${chirp[0]}" width="1em" height="1em" viewBox="0 0 16 16" class="edit-icon float-right mx-1 bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="modal fade" id="editModal${chirp[0]}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${chirp[1].username}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <textarea id="edit-new-message${chirp[0]}" class="modal-body m-3" rows="3">${chirp[1].message}</textarea>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onclick="editChirp(${chirp[0]}, '${chirp[1].username}', $('#edit-new-message${chirp[0]}').val())" type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
}

fetchChirps();

const createChirp = () => {
    const newChirp = {
        username: $("#username-input").val(),
        message: $("#message-input").val()
    }

    $.ajax({
        type: "POST",
        url: "/api/chirps",
        data: JSON.stringify(newChirp),
        contentType: "application/json",
    })
        .then(res => fetchChirps());
}

const deleteChirp = id => {
    $.ajax({
        type: "DELETE",
        url: `/api/chirps/${id}`,
    }).then(res => fetchChirps());
}

const editChirp = (id, username, message) => {
    $(".modal").modal('hide').on('hidden.bs.modal')
    const newChirp = {
        username: username,
        message: message
    }

    $.ajax({
        type: "PUT",
        url: `/api/chirps/${id}`,
        data: JSON.stringify(newChirp),
        contentType: "application/json",
    }).then(res => fetchChirps());
}