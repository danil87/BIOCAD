class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <header class="header">
            <div class="header__content">
                <div class="header__text">
                    <p>botanique</p>
                </div>
                <div class="header__tabs">
                    <button onclick="window.location.href = '/'" class="header__tab">
                        <p>Главная</p>
                    </button>
                    <button class="header__tab">
                        <p>Аналитика</p>
                    </button>
                </div>
                <div class="header__icon">
                    <img src="./imges/ava402.png" alt="">
                </div>
            </div>
        </header>`
    }
}

customElements.define('header-component', Header);