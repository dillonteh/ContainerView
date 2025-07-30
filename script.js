const containers = [
    { id: 'CKAU1234567', status: 'In Transit', eta: '20-07-2025', location: 'Port Klang' },
    { id: 'CKAU9876543', status: 'Delivered', eta: '16-07-2025', location: 'Singapore' },
    { id: 'CKAU4567890', status: 'Delayed', eta: '29-07-2025', location: 'Manila' },
    { id: 'CKAU5287497', status: 'In Transit', eta: '22-07-2025', location: 'Pasir Gudang' },
    { id: 'CKAU1238972', status: 'In Transit', eta: '23-07-2025', location: 'Kota Kinabalu' },
    { id: 'CKAU1262969', status: 'Delivered', eta: '18-07-2025', location: 'Tokyo' },
    { id: 'CKAU2396014', status: 'Delayed', eta: '24-07-2025', location: 'Guangzhou' },
    { id: 'CKAU5509861', status: 'Delivered', eta: '17-07-2025', location: 'Busan' },
    { id: 'CKAU4205208', status: 'Delayed', eta: '02-08-2025', location: 'Singapore' }
  ];
  
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const containerTable = document.querySelector('#containerTable tbody');
  
  // MK01 -- General Filter Functionality w no View Details Page
  /*function renderTable(data) {
    containerTable.innerHTML = '';
    data.forEach(container => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${container.id}</td>
        <td><span class="status ${container.status}">${container.status}</span></td>
        <td>${container.eta}</td>
        <td>${container.location}</td>
      ;
      containerTable.appendChild(row);
    });
  }*/
  
  // MK02 -- Implemented View Details page, while maintaining general status and location filter functionality
  function renderTable(data) {
    containerTable.innerHTML = '';
  
    data.forEach((container, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${container.id}</td>
        <td><span class="status ${container.status}">${container.status}</span></td>
        <td>${container.eta}</td>
        <td>${container.location}</td>
        <td><button class="view-btn" data-index="${index}">View</button></td>
      `;
  
      containerTable.appendChild(row);
    });
  
    // Attach click event for all view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const container = data[button.dataset.index];
        localStorage.setItem("selectedContainer", JSON.stringify(container));
        window.location.href = 'details.html';
      });
    });
  }
  
  function filterAndSearch() {
    const query = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedLocation = locationFilter.value;
  
    const filtered = containers.filter(c => {
      const matchesSearch = c.id.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
      const matchesLocation = selectedLocation === 'All' || c.location === selectedLocation;
      return matchesSearch && matchesStatus && matchesLocation;
    });
  
    renderTable(filtered);
  }
  
  searchInput.addEventListener('input', filterAndSearch);
  statusFilter.addEventListener('change', filterAndSearch);
  locationFilter.addEventListener('change', filterAndSearch);
  

  // Initial render
  renderTable(containers);