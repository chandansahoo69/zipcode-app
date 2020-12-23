document.getElementById('zipForm').addEventListener('submit', getLocationInfo)
document.querySelector('body').addEventListener('click', deleteFun)

async function getLocationInfo(e) {
    e.preventDefault();

    // getzip value from input
    const zip = document.querySelector('.zip').value;

    const url = `https://api.zippopotam.us/IN/${zip}`
    const response = await fetch(url);
    const responseJson = await response.json()
    if (response.status != 200) {
        showIcon('remove');
        console.log(response.status);
        document.querySelector('#output').innerHTML =
            `
            <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, Please try again</div>
            </article>
        `
    } else {
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
                            <li><strong>City : ${place['place name']}</strong></li>
                            <li><strong>State : ${place['state']}</strong></li>
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