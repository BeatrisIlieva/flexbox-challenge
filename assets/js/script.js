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

        console.log(currentTargetElement);
        console.log(targetElement);

        if (targetElement.tagName === 'SUMMARY') {
            const detailsElements = currentTargetElement.querySelectorAll('details');

            detailsElements.forEach(detailsElement => (detailsElement.open = false));
        }

        currentTargetElement.open = true;
    });
});
