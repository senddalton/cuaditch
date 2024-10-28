document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    // Renderizar el calendario sin eliminar las etiquetas de los días
    function renderCalendar(date) {
        // Borramos solo las celdas de los días (dejando las etiquetas de los días)
        const dayCells = calendarGrid.querySelectorAll('.day-cell');
        dayCells.forEach(cell => cell.remove());

        const year = date.getFullYear();
        const month = date.getMonth();

        // Configurar el encabezado de mes y año
        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        // Obtener el primer y último día del mes
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDay = firstDayOfMonth.getDay();

        // Crear espacios en blanco para los días de la semana anteriores
        for (let i = 0; i < startDay; i++) {
            const blankCell = document.createElement('div');
            blankCell.classList.add('day-cell');
            calendarGrid.appendChild(blankCell);
        }

        // Crear las celdas de los días del mes
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.classList.add('day-cell');
            dayCell.dataset.date = `${year}-${month + 1}-${day}`;

            // Agregar evento para seleccionar el día
            dayCell.addEventListener('click', () => {
                window.location.href = `horas.html?fecha=${dayCell.dataset.date}`;
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // Eventos de navegación entre meses
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
