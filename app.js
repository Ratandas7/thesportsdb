document.getElementById("button").addEventListener("click", () => {
    const inputValue = document.getElementById("searchField").value;

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";
            if(data.player == null){
                document.getElementById("msg").style.display = "block";
            }
            else{
                document.getElementById("msg").style.display = "none";
                data.player.forEach(ply => {
                    const itemDiv = document.createElement("div");

                    itemDiv.className = 'm-2 singleItem';

                    const salary = ply.strWage ? `<p><b>Salary:</b> ${ply.strWage}</p>` : '';

                    const facebook = ply.strFacebook ? `<a class="icon-link icon-link-hover link-dark pe-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strFacebook}" target="_blank"><i class="bi bi-facebook"></i></a>` : '';

                    const twitter = ply.strTwitter ? `<a class="icon-link icon-link-hover link-dark pe-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strTwitter}" target="_blank"><i class="bi bi-twitter"></i></a>` : '';

                    const instagram = ply.strInstagram ? `<a class="icon-link icon-link-hover link-dark" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strInstagram}" target="_blank"><i class="bi bi-instagram"></i></a>` : '';

                    const thumbUrl = ply.strThumb ? ply.strThumb : 'image/default-img.png';

                    const itemInfo = `
                        <div class="card" style="width: 20rem;">
                            
                            <img src="${thumbUrl}" class="card-img-top" alt="Player image">

                            <div class="card-body">
                                <h5 class="card-text">${ply.strPlayer}</h5>
                                <hr>
                                <p><b>Nationality:</b> ${ply.strNationality}</p>
                                <p><b>Team:</b> ${ply.strTeam}</p>
                                <p><b>Sport:</b> ${ply.strSport}</p>
                                ${salary}
                                <p>${ply.strDescriptionEN ? ply.strDescriptionEN.slice(0, 50) + '...' : ''}</p>
                                
                                <hr>
                                <p class="d-inline-flex">
                                    ${facebook}
                                    ${twitter}
                                    ${instagram}
                                </p>
                                <div class="d-grid gap-2 d-md-block">
                                    <button class="btn btn-outline-dark" onclick="showDetails('${ply.idPlayer}')">Details</button>
                                    <button class="btn btn-dark" onclick="addToGroup('${ply.strPlayer}')">Add to group</button>
                                </div>
                            </div>
                        </div>
                    `
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv)
                })
            }
        })
    document.getElementById("searchField").value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=Danny')
        .then(res => res.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";
            if(data.player == null){
                document.getElementById("msg").style.display = "block";
            } else {
                document.getElementById("msg").style.display = "none";
                data.player.forEach(ply => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = 'm-2 singleItem';

                    const salary = ply.strWage ? `<p><b>Salary:</b> ${ply.strWage}</p>` : '';

                    const facebook = ply.strFacebook ? `<a class="icon-link icon-link-hover link-dark pe-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strFacebook}" target="_blank"><i class="bi bi-facebook"></i></a>` : '';

                    const twitter = ply.strTwitter ? `<a class="icon-link icon-link-hover link-dark pe-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strTwitter}" target="_blank"><i class="bi bi-twitter"></i></a>` : '';

                    const instagram = ply.strInstagram ? `<a class="icon-link icon-link-hover link-dark" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${ply.strInstagram}" target="_blank"><i class="bi bi-instagram"></i></a>` : '';

                    const thumbUrl = ply.strThumb ? ply.strThumb : 'image/default-img.png';

                    const itemInfo = `
                        <div class="card" style="width: 20rem;">

                             <img src="${thumbUrl}" class="card-img-top" alt="Player image">

                            <div class="card-body">
                                <h5 class="card-text">${ply.strPlayer}</h5>
                                <hr>
                                <p><b>Nationality:</b> ${ply.strNationality}</p>
                                <p><b>Team:</b> ${ply.strTeam}</p>
                                <p><b>Sport:</b> ${ply.strSport}</p>
                                ${salary}
                                <p>${ply.strDescriptionEN ? ply.strDescriptionEN.slice(0, 50) + '...' : ''}</p>
                                
                                <hr>
                                <p class="d-inline-flex">
                                    ${facebook}
                                    ${twitter}
                                    ${instagram}
                                </p>
                                <div class="d-grid gap-2 d-md-block">
                                    <button class="btn btn-outline-dark" onclick="showDetails('${ply.idPlayer}')">Details</button>
                                    <button class="btn btn-dark" onclick="addToGroup('${ply.strPlayer}')">Add to group</button>
                                </div>
                            </div>
                        </div>
                    `
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv)
                })
            }
        });
});

function showDetails(id) {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0];

            const thumbUrl = player.strThumb ? player.strThumb : 'image/default-img.png';

            const salary = player.strWage ? `<p><b>Salary:</b> ${player.strWage}</p>` : '';

            const description = player.strDescriptionEN ? `<p><b>Description:</b> ${player.strDescriptionEN}</p>` : '';

            const facebook = player.strFacebook ? `<a class="icon-link icon-link-hover link-dark pe-2 ps-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${player.strFacebook}" target="_blank"><i class="bi bi-facebook"></i></a>` : '';

            const twitter = player.strTwitter ? `<a class="icon-link icon-link-hover link-dark pe-2 ps-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${player.strTwitter}" target="_blank"><i class="bi bi-twitter"></i></a>` : '';

            const instagram = player.strInstagram ? `<a class="icon-link icon-link-hover link-dark ps-2" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="https://${player.strInstagram}" target="_blank"><i class="bi bi-instagram"></i></a>` : '';

            const socialFollow = (facebook || twitter || instagram) ? `<p class="d-inline-flex align-items-start"><b>Follow:</b> ${facebook}${twitter}${instagram}</p>` : '';

            const modalBody = document.getElementById("modal-body");

            modalBody.innerHTML = `

                <img src="${thumbUrl}" class="card-img-top pb-3" alt="Player image">

                <p><b>Name:</b> ${player.strPlayer}</p>
                <p><b>Nationality:</b> ${player.strNationality}</p>
                <p><b>Team:</b> ${player.strTeam}</p>
                <p><b>Sport:</b> ${player.strSport}</p>
                ${salary}
                ${description}
                ${socialFollow}
                
            `;
            const playerModal = new bootstrap.Modal(document.getElementById('playerModal'));
            playerModal.show();
        });
}


const group = [];

function addToGroup(name) {

    if (group.length >= 11) {
        alert("You can't add more than 11 players to the group!");
        return;
    }
    
    if (!group.includes(name)) {
        group.push(name);

        const groupList = document.getElementById("group-list");

        const groupItem = document.createElement("p");
        
        groupItem.textContent = name;
        groupList.appendChild(groupItem);

        const groupCount = document.getElementById("group-count");
        groupCount.textContent = `Total Players: ${group.length}`;

        groupList.style.display = "block";
    }
}

