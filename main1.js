document.getElementById('zipForm').addEventListener('submit', getLocationInfo)
document.querySelector('body').addEventListener('click', deleteFun)

async function getLocationInfo(e) {
    e.preventDefault();
    const stateName = document.querySelector('.zip').value
    const url = `https://api.zippopotam.us/IN/OR/${stateName}`
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.country);
    const state = responseJson.state
    const country = responseJson.country
    if (response.status != 200) {
        showIcon('remove');
        // console.log(response.status);
        document.querySelector('#output').innerHTML =
            `
            <article class="message is-danger">
                <div class="message-body">Invalid City, Please try again</div>
            </article>
        `
    } else {
        showIcon('check');
        let output = "";
        responseJson.places.forEach(place => {
            output += `
            <article class="message is-primary">
                <div class="message-header">
                    <p>Location Info</p>
                    <button class="button">X</button>
                </div>
                    
                    <div class="message-body">
                        <ul>
                            <li><strong>Country : ${country}</strong></li>
                            <li><strong>State : ${state}</strong></li>
                            <li><strong>City : ${place['place name']}</strong></li>
                            <li><strong>Post Code : ${place['post code']}</strong></li>
                            <li><strong>Longitude : ${place['longitude']}</strong></li>
                            <li><strong>Latitude : ${place['latitude']}</strong></li>
                        </ul>
                    </div>
            </article>
            `
        })
        //insert into output div
        document.querySelector('#output').innerHTML = output;
    }
}
//delete function
function deleteFun(e) {

    if (e.target.className == 'button') {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = ""
    }
}
//show the icons
function showIcon(icons) {
    //clear
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';
    //show the correct icons
    document.querySelector(`.icon-${icons}`).style.display = 'inline-flex';
}