// const firstSummaryElements = document.querySelectorAll('.property-container details:nth-of-type(1)');

// // [...firstSummaryElements].forEach(summaryElement => summaryElement.classList.add('black'))

// // [...firstSummaryElements].forEach(summaryElement => summaryElement.setAttribute('open', 'true'));
// [...firstSummaryElements].forEach(summaryElement => summaryElement.open = true);

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.property-container');

    sections.forEach(section => {
        const detailsElement = section.querySelectorAll('details');
        const firstDetailsElement = detailsElement[0];
        firstDetailsElement.open = true;

        console.log(firstDetailsElement);
        

        return section;
    })
});