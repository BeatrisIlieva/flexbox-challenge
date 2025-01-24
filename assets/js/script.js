document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.property-container');

    sections.forEach(section => {
        const detailsElement = section.querySelectorAll('details');
        const firstDetailsElement = detailsElement[0];
        firstDetailsElement.open = true;
    });
});

const propertyContainerElements = document.querySelectorAll('.property-container');

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const currentTargetElement = e.currentTarget;
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const detailsElements = currentTargetElement.querySelectorAll('details');

            detailsElements.forEach(detailsElement => (detailsElement.open = false));
        }

        currentTargetElement.open = true;
    });
});

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const summaryElementId = targetElement.id;

            const boxesContainerElements =
                propertyContainerElement.querySelectorAll('.carousel-wrapper');

            boxesContainerElements.forEach(element => (element.style.display = 'none'));

            const boxContainerElement = [...boxesContainerElements].find(element => {
                const classList = element.classList;
                const lastClassName = classList[classList.length - 1];

                if (lastClassName === summaryElementId) {
                    return element;
                }
            });

            boxContainerElement.style.display = 'flex';
            console.log(boxContainerElement);
        }
    });
});






// const boxesContainerElements = document.querySelectorAll('.boxes-container');

// boxesContainerElements.forEach(boxesContainerElement => {
//     boxesContainerElement.addEventListener('click', e => {
//         const carouselElement = e.currentTarget;
//         const buttonElement = e.target;

//         // const ulElement = carouselElement.querySelector('ul');
//         // const liElements = Array.from(ulElement.querySelectorAll('li'));

//         if (buttonElement.tagName === 'BUTTON') {
//             const buttonId = buttonElement.id;

//             return functionMapper[buttonId](boxesContainerElements);
//         }
//     });

//     const functionMapper = {
//         next: boxesContainerElements => displayNextElement(boxesContainerElements),
//         previous: boxesContainerElements => displayPreviousElement(boxesContainerElements),
//     };
// });

// function displayNextElement(elements) {
//     for (let i = 0; i < elements.length; i++) {
//         let currentElement = elements[i];

//         if (window.getComputedStyle(currentElement).display === 'flex') {
//             currentElement.style.display = 'none';

//             const nextIndex = (i + 1) % elements.length;
//             elements[nextIndex].style.display = 'flex';

//             break;
//         }
//     }
// }

// function displayPreviousElement(elements) {
//     for (let i = elements.length - 1; i >= 0; i--) {
//         let currentElement = elements[i];

//         if (window.getComputedStyle(currentElement).display === 'flex') {
//             currentElement.style.display = 'none';

//             const previousIndex = (i - 1 + elements.length) % elements.length;
//             elements[previousIndex].style.display = 'flex';

//             break;
//         }
//     }
// }

