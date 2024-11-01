document.addEventListener('DOMContentLoaded', () => {
    // Variables generales
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const bookingModal = document.getElementById("booking-modal");
    const closeModal = document.getElementById("close-modal");
    const bookingForm = document.getElementById("booking-form");
    const selectedDateElem = document.getElementById('selected-date');
    const hoursList = document.getElementById('hours-list');

    let currentDate = new Date();

    // Función para renderizar el calendario
    function renderCalendar(date) {
        if (!calendarGrid) return;

        const dayCells = calendarGrid.querySelectorAll('.day-cell');
        dayCells.forEach(cell => cell.remove());

        const year = date.getFullYear();
        const month = date.getMonth();
        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDay = firstDayOfMonth.getDay();

        for (let i = 0; i < startDay; i++) {
            const blankCell = document.createElement('div');
            blankCell.classList.add('day-cell');
            calendarGrid.appendChild(blankCell);
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;
            dayCell.classList.add('day-cell');
            dayCell.dataset.date = `${year}-${month + 1}-${day}`;

            dayCell.addEventListener('click', () => {
                window.location.href = `horas.html?fecha=${dayCell.dataset.date}`;
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // Eventos de navegación entre meses
    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });

        renderCalendar(currentDate);
    }

    // Mostrar la fecha seleccionada y generar horas (para la página de horas)
    if (selectedDateElem && hoursList) {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedDate = urlParams.get('fecha');
        selectedDateElem.textContent = `Citas para el día: ${selectedDate}`;

        const hours = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
            '05:00 PM', '06:00 PM'
        ];

        const bookedHours = ['10:00 AM', '02:00 PM'];

        hours.forEach(hour => {
            const hourSlot = document.createElement('div');
            hourSlot.textContent = hour;
            hourSlot.classList.add('hour-slot');

            if (bookedHours.includes(hour)) {
                hourSlot.classList.add('booked');
            } else {
                hourSlot.addEventListener('click', () => {
                    openBookingModal(selectedDate, hour);
                    hourSlot.classList.add('booked');
                });
            }

            hoursList.appendChild(hourSlot);
        });
    }

    // Abrir y cerrar el modal de reserva
    function openBookingModal(selectedDate, hour) {
        bookingModal.style.display = "block";
        document.getElementById("modal-date").textContent = `Fecha: ${selectedDate} - Hora: ${hour}`;
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            bookingModal.style.display = "none";
        });
    }

    // Enviar datos y cerrar modal
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const phone = document.getElementById("phone").value;
            const message = `Hola, soy ${name}. Me gustaría reservar una cita para el día seleccionado. Mi número es ${phone}.`;
            const whatsappURL = `https://wa.me/+526183274838/?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");

            bookingModal.style.display = "none";
            bookingForm.reset();
        });
    }
});
