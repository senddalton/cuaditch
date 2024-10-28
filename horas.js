document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('fecha');
    const selectedDateElem = document.getElementById('selected-date');
    const hoursList = document.getElementById('hours-list');

    // Mostrar la fecha seleccionada
    selectedDateElem.textContent = `Citas para el día: ${selectedDate}`;

    // Horas disponibles en el día
    const hours = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];

    // Simular horas agendadas
    const bookedHours = ['10:00 AM', '02:00 PM'];

    // Generar la lista de horas
    hours.forEach(hour => {
        const hourSlot = document.createElement('div');
        hourSlot.textContent = hour;
        hourSlot.classList.add('hour-slot');

        // Verificar si la hora ya está agendada
        if (bookedHours.includes(hour)) {
            hourSlot.classList.add('booked');
        } else {
            hourSlot.addEventListener('click', () => {
                alert(`Cita agendada para ${selectedDate} a las ${hour}`);
                hourSlot.classList.add('booked');
                hourSlot.removeEventListener('click', arguments.callee);
            });
        }

        hoursList.appendChild(hourSlot);
    });
});
