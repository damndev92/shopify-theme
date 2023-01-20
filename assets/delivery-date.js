const template = document.createElement('template');
template.innerHTML = `
<style>

.date, .space, .title {
    margin-bottom: 0;
}

.date, .space {
    font-weight: 900;
}

.space {
    margin-left: 5px;
    margin-right: 5px;
}

.title {
    margin-right: 0.5rem;
}
</style>`;

class DeliveryDate extends HTMLElement {
    static get observedAttributes() {
        return ['fromdate', 'todate', 'id', 'label'];
    }

    connectedCallback() {
        this.fromDate = getDeliveryDate(this.getAttribute('fromdate'))
        this.toDate = getDeliveryDate(this.getAttribute('todate'));
        this.id = this.getAttribute('id')
        this.label = this.getAttribute('label')
        const shadow = this.attachShadow({mode: 'open'});

        shadow.appendChild(template.content.cloneNode(true));
        shadow.appendChild(createElement('p', 'title', this.label))
        shadow.appendChild(createElement('p', 'date', this.fromDate))
        shadow.appendChild(createElement('p','space', '-'))
        shadow.appendChild(createElement('p','date', this.toDate))
    }
}

const createElement = (tag, className, content) => {
    const element = document.createElement(tag)
    element.classList.add(className)
    element.innerHTML = content

    return element
}

const getDeliveryDate = (numberOfDays) => {
    let date = Date.today().addDays(parseInt(numberOfDays, 10));

    while (date.is().saturday() || date.is().sunday()) {
        date = date.next().monday();
    }
    return date.toString('MMM dS');
}

export { DeliveryDate }