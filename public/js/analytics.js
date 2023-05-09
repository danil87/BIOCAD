import { getOneDevice, getOneFavoriteDevice, deleteFavoriteDevice, createFavoriteDevice, putDevice } from "js/queryDevice.js";
import { getWorks } from "js/queryWorks.js";
import { setActiveSelect } from "js/functions.js";

const url = new URL(window.location.href);

window.onload = function () {
    test();
    defaultValue();
}

async function test() {
    const device = await getOneDevice(url.searchParams.get('device'));
    if(!device){
        window.location.href = '/error';
    }
    let isFavoriteDevice = Boolean((await getOneFavoriteDevice(device.id)).length);

    const nameDevice = document.querySelector('.name_device');
    const divisionDevice = document.querySelector('.division_device');
    const numberDevice = document.querySelector('.number_device');
    const deviceAtWork = document.querySelector('#device_at_work');
    const iconDevice = document.querySelector('.icon_device');
    const isFavorite = document.querySelector('#is_favorite');

    nameDevice.innerHTML = device.name;
    divisionDevice.innerHTML = device.division;
    numberDevice.innerHTML = device.number;
    deviceAtWork.value = device.at_work;
    iconDevice.src = device.img && device.img !== 'undefined' ? device.img : '../imges/unknow.png';

    setActiveSelect(deviceAtWork);
    if (isFavoriteDevice) {
        const children = isFavorite.children;
        children[0].style.display = 'none';
        children[1].style.display = 'block';
    }
    isFavorite.onclick = async () => {
        const children = isFavorite.children;
        if (isFavoriteDevice) {
            await deleteFavoriteDevice(device.id);
            children[1].style.display = 'none';
            children[0].style.display = 'block';
        }
        else {
            await createFavoriteDevice(device.id);
            children[0].style.display = 'none';
            children[1].style.display = 'block';
        }
        isFavoriteDevice = !isFavoriteDevice
    };

    deviceAtWork.onchange = async (event) => {
        const select = event.target;
        device.at_work = select.value === 'true';

        await putDevice(device);
        setActiveSelect(deviceAtWork);

    }
}

async function defaultValue() {
    let now = new Date();

    const firstDate = document.querySelector('#first_date')
    firstDate.valueAsDate = now;

    now.setDate(now.getDate() + 1);

    const secondDate = document.querySelector('#second_date');
    secondDate.valueAsDate = now;
    const query = async () => {
        if (firstDate.value !== '' && secondDate.value !== '') {
            const works = await getWorks(url.searchParams.get('device'), firstDate.value, secondDate.value);
            setWorks(works);
        }
    }

    query();

    const buttons = document.querySelectorAll('.change_date button');
    buttons.forEach(element => {
        element.onclick = () => {
            document.querySelector('.active_btn').classList.remove('active_btn');
            element.classList.add('active_btn');
            now = new Date(firstDate.value);
            now.setDate(now.getDate() + Number(element.value));
            secondDate.valueAsDate = now;
            query();
        }
    });


    firstDate.onchange = query;
    secondDate.onchange = query;
}

function setWorks(works) {
    const tbody = document.querySelector('tbody');
    const rows = document.getElementById('works_table');
    const row = rows.content.querySelector('tr');
    tbody.replaceChildren();

    works.forEach(element => {
        row.replaceChildren();
        for (let i in element) {
            if (i != 'id') {
                const column = document.createElement('td');
                column.innerHTML = element[i];
                row.appendChild(column);
                column.setAttribute('valign', 'top');
            }
        }
        const el = rows.content.cloneNode(true);
        tbody.appendChild(el);
    });
}