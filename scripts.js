// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Custom JavaScript code can go here
});


/*JS di catalogo.html*/


    document.addEventListener('DOMContentLoaded', function () {
        const pages = document.querySelectorAll('.catalog-page');
        const paginationLinks = document.querySelectorAll('.page-link[data-page]');
        const prevPageLink = document.getElementById('prev-page');
        const nextPageLink = document.getElementById('next-page');
        const catalog = document.getElementById('catalog'); // Assicurati che questo ID esista
        let currentPage = 1;


/*Ordine del catalogo*/

        const sortCatalog = (criteria, order) => {
            const items = Array.from(catalog.children);
            items.sort((a, b) => {
                let aValue, bValue;
                if (criteria === 'title') {
                    aValue = a.querySelector('.card-title').textContent;
                    bValue = b.querySelector('.card-title').textContent;
                } else if (criteria === 'inventory') {
                    aValue = parseInt(a.querySelector('.card-text strong').nextSibling.textContent.replace(/[^0-9]/g, ''));
                    bValue = parseInt(b.querySelector('.card-text strong').nextSibling.textContent.replace(/[^0-9]/g, ''));
                }
                return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
            });
            items.forEach(item => catalog.appendChild(item));
        };



        document.getElementById('sort-title-asc').addEventListener('click', function (event) {
            event.preventDefault();
            sortCatalog('title', 'asc');
        });

        document.getElementById('sort-title-desc').addEventListener('click', function (event) {
            event.preventDefault();
            sortCatalog('title', 'desc');
        });

        document.getElementById('sort-inventory').addEventListener('click', function (event) {
            event.preventDefault();
            sortCatalog('inventory', 'asc');
        });

/*mostra la pagina*/

        function showPage(pageNumber) {
            pages.forEach((page, index) => {
                page.classList.toggle('d-none', index !== pageNumber - 1);
            });
            currentPage = pageNumber;
            prevPageLink.parentElement.classList.toggle('disabled', currentPage === 1);
            nextPageLink.parentElement.classList.toggle('disabled', currentPage === pages.length);
        }

        paginationLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showPage(parseInt(this.dataset.page));
            });
        });

        prevPageLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });

        nextPageLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPage < pages.length) {
                showPage(currentPage + 1);
            }
        });

/*Filtraggio del catalogo*/

        const filterCatalog = () => {
            const titleFilter = document.getElementById('filter-title').value.toLowerCase();
            const inventoryFilter = document.getElementById('filter-inventory').value.toLowerCase();
            const locationFilter = document.getElementById('filter-location').value.toLowerCase();
            const authorFilter = document.getElementById('filter-author').value.toLowerCase();
            const publisherFilter = document.getElementById('filter-publisher').value.toLowerCase();
            const translatorFilter = document.getElementById('filter-translator').value.toLowerCase();
            const editionDateFilter = document.getElementById('filter-edition-date').value.toLowerCase();
            const pagesFilter = document.getElementById('filter-pages').value.toLowerCase();
            const subjectFilter = document.getElementById('filter-subject').value.toLowerCase();
            const geographicFilter = document.getElementById('filter-geographic').value.toLowerCase();
            const linguisticFilter = document.getElementById('filter-linguistic').value.toLowerCase();
            const manuscriptFilter = document.getElementById('filter-manuscript').value.toLowerCase();

            Array.from(catalog.children).forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const inventory = card.querySelector('.card-text strong').nextSibling.textContent.replace(/[^0-9]/g, '').toLowerCase();
                const location = card.querySelector('.card-text.location')?.textContent.toLowerCase() || '';
                const author = card.querySelector('.card-text.author')?.textContent.toLowerCase() || '';
                const publisher = card.querySelector('.card-text.publisher')?.textContent.toLowerCase() || '';
                const translator = card.querySelector('.card-text.translator')?.textContent.toLowerCase() || '';
                const editionDate = card.querySelector('.card-text.edition-date')?.textContent.toLowerCase() || '';
                const pages = card.querySelector('.card-text.pages')?.textContent.toLowerCase() || '';
                const subject = card.querySelector('.card-text.subject')?.textContent.toLowerCase() || '';
                const geographic = card.querySelector('.card-text.geographic')?.textContent.toLowerCase() || '';
                const linguistic = card.querySelector('.card-text.linguistic')?.textContent.toLowerCase() || '';
                const manuscript = card.querySelector('.card-text.manuscript')?.textContent.toLowerCase() || '';

                const matches = (
                    (!titleFilter || title.includes(titleFilter)) &&
                    (!inventoryFilter || inventory.includes(inventoryFilter)) &&
                    (!locationFilter || location.includes(locationFilter)) &&
                    (!authorFilter || author.includes(authorFilter)) &&
                    (!publisherFilter || publisher.includes(publisherFilter)) &&
                    (!translatorFilter || translator.includes(translatorFilter)) &&
                    (!editionDateFilter || editionDate.includes(editionDateFilter)) &&
                    (!pagesFilter || pages.includes(pagesFilter)) &&
                    (!subjectFilter || subject.includes(subjectFilter)) &&
                    (!geographicFilter || geographic.includes(geographicFilter)) &&
                    (!linguisticFilter || linguistic.includes(linguisticFilter)) &&
                    (!manuscriptFilter || manuscript.includes(manuscriptFilter))
                );

                card.classList.toggle('d-none', !matches);
            });
        };

        document.getElementById('filter-button').addEventListener('click', function (e) {
            e.preventDefault();
            filterCatalog();
        });

        showPage(1);
    });

/*JS di item.html*/

    /*pacchetto di grafici google charts*/

    /* Carica il pacchetto di grafici*/
    google.charts.load('current', {'packages':['corechart']});

    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        /*tabella di dati*/
        var data = google.visualization.arrayToDataTable([
            ['Tipo di Nota', 'Percentuale'],
            ['Dedica Autografa', 3],
            ['Nessuna Annotazione', 5],
            ['Sottolineature', 2],
            ['Note', 2],
            ['Allegati', 2]
        ]);

        /*opzioni del grafico*/
       var options = {
                    title: 'Percentuale di Note nei Volumi del Catalogo caricati sulla pagina',
                    is3D: true,
                    width: '100%',
                    height: '100%'
                };


        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    /*istener per ridimensionare il grafico quando la finestra cambia dimensione*/
                window.addEventListener('resize', () => {
                    chart.draw(data, options);
                });







