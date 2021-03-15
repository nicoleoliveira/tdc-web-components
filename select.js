const style = `
 select {
    padding: 8px;
    width: 200px;
 }
`;
class SelectComponent extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get items() {
        return JSON.parse(this.getAttribute('items'));
    }

    set items(value) {
        this.setAttribute('items', value);
    }

    static get observedAttributes() {
        return ['items'];
    }

    attributeChangedCallback() {
        this.render();
      }

    connectedCallback() {
        this.render();
    }

    render() {
        const options = this.items.reduce((acc, item)=> {
           return acc + `<option value="${item.value}">${item.label}</option>`
        }, '');

        this.shadow.innerHTML = `
        <style>${style}</style>
        <select>
            ${options}
        </select>
      `;
    }
}

customElements.define('tdc-select', SelectComponent);