const url = window.location.href;
const u = new URL(url)
if (url[url.length - 1] != '/') {
    if (u.searchParams.get('device')) {
        const buttons = document.querySelectorAll('button')[1];
        buttons.classList.add('active');
    }
    else {
        window.location.href = '/error';
    }

}
else if (url[url.length - 1] === '/') {
    const buttons = document.querySelectorAll('button')[0];
    buttons.classList.add('active');
}