function setActiveSelect(select) {
    if (select.value === 'true') {
        select.classList.add('active_select');
    }
    else {
        select.classList.remove('active_select');
    }
}