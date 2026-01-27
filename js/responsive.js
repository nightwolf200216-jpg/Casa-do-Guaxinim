/* js/responsive.js
   Helper para sidebar em mobile: cria backdrop e fecha com ESC.
   Incluir este script após os outros scripts (ou junto) no index.html.
*/

(function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  function createBackdrop() {
    let backdrop = document.getElementById('sidebarBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebarBackdrop';
      backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1050;';
      backdrop.addEventListener('click', () => {
        closeSidebar();
      });
      document.body.appendChild(backdrop);
    }
  }

  function removeBackdrop() {
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) backdrop.remove();
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('active');
    document.body.classList.add('sidebar-open');
    createBackdrop();
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('active');
    document.body.classList.remove('sidebar-open');
    removeBackdrop();
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('active')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
    }
  });

  // Fecha a sidebar ao clicar em um link do menu (útil para mobile)
  document.querySelectorAll('.sidebar-menu li').forEach(li => {
    li.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });
})();