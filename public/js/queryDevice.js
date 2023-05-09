async function getDevices() {
    let devices;
    const response = await fetch('/device');
    const prom = response.json();
    await prom.then(data => {
        devices = data;
    });
    return devices;
}

async function getFavoriteDevices() {
    let devices;
    const response = await fetch('/favorite/device');
    const prom = response.json();
    await prom.then(data => {
        devices = data;
    });
    return devices;
}


async function getOneDevice(id){
    let device;
    const response = await fetch(`/device/${id}`);
    const prom = response.json();
    await prom.then(data => {
        device = data;
    });
    return device[0];
}

async function getOneFavoriteDevice(device_id, user_id = 2){
    let device;
    const response = await fetch(`/favorite/device/${device_id}/${user_id}`);
    const prom = response.json();
    await prom.then(data => {
        device = data;
    });
    return device;
}

async function putDevice(device) {
    await fetch('/device', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(device)
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
}

async function createFavoriteDevice(device_id, user_id = 2){
    await fetch('/favorite/device', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({device_id: device_id, user_id: user_id})
    }).then(res => console.log(res)).catch(err => console.log(err));
}

async function deleteFavoriteDevice(device_id, user_id = 2){
    await fetch (`/favorite/device/${device_id}/${user_id}`, {
        method: 'DELETE'
    }).then((res => console.log(res))).catch(err => console.log(err));
}
export { getDevices, getOneDevice, putDevice, getFavoriteDevices, getOneFavoriteDevice, deleteFavoriteDevice, createFavoriteDevice }