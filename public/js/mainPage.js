window.onload = function () {
    awd();
}

async function awd() {
    const devices = await getFavoriteDevices();
    outPutDivices(devices);
    setEventSearch(devices);
}

function setEvent(children, device) {
    const columnFirstText = children.querySelector('.first_column span');
    const columnFirstImg = children.querySelector('.first_column img');
    const select = children.querySelector('select');
    const columnSecondBtn = children.querySelector('.device_notification')
    const columnSecondImg = children.querySelector('.device_notification img');
    columnFirstText.innerHTML = `${device.name}`;
    columnFirstImg.src = device.img ? device.img : '../imges/unknow.png';
    columnSecondImg.src = device.notification ? '../imges/Color-full.png' : '../imges/Color.png'
    select.value = device.at_work;



    setActiveSelect(select);
    columnFirstText.onclick = () => {
        window.location.href = `analytics?device=${device.id}`;
    }
    select.onchange = async (event) => {
        const select = event.target;
        device.at_work = select.value === 'true';
        console.log(device);
        await putDevice(device);
        setActiveSelect(select);
    }
    columnSecondBtn.onclick = () => {
        device.notification = !device.notification;
        columnSecondImg.src = device.notification ? '../imges/Color-full.png' : '../imges/Color.png';
        putFavoriteDevice({ id: device.favorite_id, notification: device.notification});
    }
}

function outPutDivices(devices) {
    const tbody = document.querySelector('tbody');
    const row = document.getElementById('table_row');

    for (let i = 0; i < devices.length; i++) {
        const el = row.content.cloneNode(true);

        tbody.appendChild(el);
        setEvent(tbody.children[i], devices[i]);
    }
}

async function setEventSearch(devices) {
    const tbody = document.querySelector('tbody');
    const search = document.querySelector('.search');

    search.onkeyup = () => {
        console.log('test');
        tbody.replaceChildren();
        outPutDivices(devices.filter(el => {
            return (el.name && el.name.toLowerCase().includes(search.value.toLowerCase())) ||
                (el.division && el.division.toLowerCase().includes(search.value.toLowerCase())) ||
                (el.number && el.number.toLowerCase().includes(search.value.toLowerCase()));
        }))
    }
}