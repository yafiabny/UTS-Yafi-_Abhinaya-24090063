const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Email dan Password tidak boleh kosong.');
            return;
        }

        alert('Login berhasil');
        window.location.href = 'dashboard.html';
        });
    }

    const summaryContainer = document.getElementById('summaryCards');
    if (summaryContainer) {
        renderSummary(summaryContainer);
        const viewBtn = document.getElementById('viewProductsBtn');
        if (viewBtn) viewBtn.addEventListener('click', () => {
        window.location.href = 'products.html';
        });
    }

    const table = document.getElementById('productsTable');
    if (table) {
        renderProductsTable();
    }
});

function formatRp(num) {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderSummary(container) {
    container.innerHTML = '';
    const cards = [
        { title: "Total Produk", value: summary.totalProducts },
        { title: "Total Sales", value: summary.totalSales },
        { title: "Total Revenue", value: formatRp(summary.totalRevenue) }
    ];

    cards.forEach(c => {
        const el = document.createElement('div');
        el.className = 'summary-card';
        el.innerHTML = `<h3>${c.title}</h3><p>${c.value}</p>`;
        container.appendChild(el);
    });
}

function renderProductsTable() {
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';

    products.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.dataset.id = p.id;
        tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>
            <button class="action-btn edit-btn" data-id="${p.id}">✏️</button>
            <button class="action-btn delete-btn" data-id="${p.id}">🗑️</button>
        </td>
        `;
        tbody.appendChild(tr);
    });

    // attach listeners
    tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const product = products.find(x => x.id === id);
        if (product) alert(`Edit produk (${product.name})`);
        });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
        const id = Number(e.currentTarget.dataset.id);
        const product = products.find(x => x.id === id);
        if (!product) return;
        if (confirm(`Yakin hapus produk ini? (${product.name})`)) {
            products = products.filter(x => x.id !== id);
            const row = document.querySelector(`tr[data-id="${id}"]`);
            if (row) row.remove();
            if (typeof summary.totalProducts === 'number') {
            summary.totalProducts = Math.max(0, summary.totalProducts - 1);
            }
        }
        });
    });
}