async function getWorks(device_id, firstDate, secondDate) {
    let works;
    const response = await fetch(`/getWork`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({device_id: device_id, firstDate: firstDate, secondDate: secondDate})
    });
    const prom = response.json();
    await prom.then(data => {
        works = data;
    });
    return works;
}

async function putWork(work) {
    await fetch('/work', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(work)
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err));
}

async function deleteWork(id){
    await fetch (`/work/${id}`, {
        method: 'DELETE'
    }).then((res => console.log(res))).catch(err => console.log(err));
}