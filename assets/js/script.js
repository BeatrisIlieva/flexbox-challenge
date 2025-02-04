let lastScrollY = 0;

window.addEventListener('scroll', e => {
    const currentScrollY = window.scrollY;
    const headerElement = document.querySelector('header.layout-item');

    if (currentScrollY > 160 && currentScrollY > lastScrollY) {
        headerElement.classList.remove('visible');
        headerElement.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
        headerElement.classList.remove('hidden');
        headerElement.classList.add('visible');
    }

    lastScrollY = currentScrollY;
});

const navButtons = document.querySelectorAll('header.layout-item nav > ul > li');

const isMobile = window.matchMedia('(max-width: 768px)').matches;

document.addEventListener('click', e => {
    if (isMobile) {
        navButtons.forEach(button => {
            const liElement = e.currentTarget;
            const dropdownMenu = button.querySelector('ul');

            if (dropdownMenu.classList.contains('dropdown-active')) {
                e.stopPropagation();
                dropdownMenu.classList.remove('dropdown-active');
            } else if (button.contains(e.target)) {
                dropdownMenu.classList.add('dropdown-active');
            } else {
                dropdownMenu.classList.remove('dropdown-active');
            }
            e.stopPropagation();
            console.log(dropdownMenu);
        });
    } else {
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', e => {
                const dropdownMenu = button.querySelector('ul');
                dropdownMenu.classList.add('dropdown-active');
            });
        });

        navButtons.forEach(button => {
            button.addEventListener('mouseleave', e => {
                const dropdownMenu = button.querySelector('ul');
                dropdownMenu.classList.remove('dropdown-active');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.property-container');

    sections.forEach(section => {
        const detailsElement = section.querySelectorAll('details');
        const firstDetailsElement = detailsElement[0];
        firstDetailsElement.open = true;
    });
});

const displayDetailsFunctionMapper = {
    next: (delta, lastClassName, currentTargetElement) =>
        displayRelevantDetailsElement(delta, lastClassName, currentTargetElement),
    previous: (delta, lastClassName, currentTargetElement) =>
        displayRelevantDetailsElement(delta, lastClassName, currentTargetElement),
};

const displayNextBoxFunctionMapper = {
    next: boxesContainerElements => displayNextElement(boxesContainerElements),
    previous: boxesContainerElements => displayPreviousElement(boxesContainerElements),
};

const propertyContainerElements = document.querySelectorAll('.property-container');

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const currentTargetElement = e.currentTarget;
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const detailsElements = currentTargetElement.querySelectorAll('details');
            detailsElements.forEach(detailsElement => (detailsElement.open = false));
            currentTargetElement.open = true;
        }
    });
});

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const summaryElementId = targetElement.id;

            const carouselElements = propertyContainerElement.querySelectorAll('.carousel-wrapper');

            carouselElements.forEach(element => (element.style.display = 'none'));

            const carouselElement = [...carouselElements].find(element => {
                const classList = element.classList;
                const lastClassName = classList[classList.length - 1];

                if (lastClassName === summaryElementId) {
                    return element;
                }
            });

            carouselElement.style.display = 'flex';
        }
    });
});

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const currentTargetElement = e.currentTarget;
        const targetElement = e.target;

        const carouselWrapperElements = currentTargetElement.querySelectorAll('.carousel-wrapper');

        const currentCarouselElement = [...carouselWrapperElements].find(
            element => window.getComputedStyle(element).display === 'flex'
        );

        const classList = currentCarouselElement.classList;
        const lastClassName = classList[classList.length - 1];

        const targetElementTagName = targetElement.tagName;

        let delta;

        const deltaMapper = {
            next: 1,
            previous: carouselWrapperElements.length - 1,
        };

        if (targetElementTagName === 'BUTTON') {
            const buttonId = targetElement.id;

            delta = deltaMapper[buttonId];

            displayDetailsFunctionMapper[buttonId](delta, lastClassName, currentTargetElement);
            displayNextBoxFunctionMapper[buttonId](carouselWrapperElements);
        } else if (targetElementTagName === 'I') {
            const buttonElement = targetElement.parentElement;
            const buttonId = buttonElement.id;

            delta = deltaMapper[buttonId];

            displayDetailsFunctionMapper[buttonId](delta, lastClassName, currentTargetElement);
            displayNextBoxFunctionMapper[buttonId](carouselWrapperElements);
        }
    });
});

function displayRelevantDetailsElement(delta, lastClassName, currentTargetElement) {
    const summaryElements = currentTargetElement.querySelectorAll('details summary');

    const detailsElements = currentTargetElement.querySelectorAll('details');
    detailsElements.forEach(detailsElement => (detailsElement.open = false));

    const foundIndex = [...summaryElements].findIndex(element => element.id === lastClassName);

    const index = (foundIndex + delta) % summaryElements.length;
    const summaryElementToBeOpen = summaryElements[index];

    const detailsElement = summaryElementToBeOpen.parentElement;
    detailsElement.open = true;
}

function displayNextElement(elements) {
    for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'flex') {
            currentElement.style.display = 'none';

            const nextIndex = (i + 1) % elements.length;
            elements[nextIndex].style.display = 'flex';

            break;
        }
    }
}

function displayPreviousElement(elements) {
    for (let i = elements.length - 1; i >= 0; i--) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'flex') {
            currentElement.style.display = 'none';

            const previousIndex = (i - 1 + elements.length) % elements.length;
            elements[previousIndex].style.display = 'flex';

            break;
        }
    }
}
