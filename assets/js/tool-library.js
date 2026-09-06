const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.tool-card');
    const searchInput = document.getElementById('toolSearch');
    const noResult = document.getElementById('noResult');
    let activeType = 'all';

    function applyFilter() {
        const q = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;
        cards.forEach(card => {
            const matchesType = activeType === 'all' || card.dataset.type === activeType;
            const matchesQuery = !q || card.dataset.name.toLowerCase().includes(q) || card.textContent.toLowerCase().includes(q);
            const show = matchesType && matchesQuery;
            card.classList.toggle('show', show);
            if (show) visibleCount++;
        });
        noResult.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeType = chip.dataset.filter;
            applyFilter();
        });
    });
    searchInput.addEventListener('input', applyFilter);
