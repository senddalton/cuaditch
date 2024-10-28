const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
let currentDate = new Date();

const events = [
    { date: '2023-11-02', title: 'Cita con el doctor' },
    { date: '2023-11-15', title: 'Reunión de trabajo' },
];

document.getElementById("prevMonth").addEventListener("click", () => changeMonth(-1));
document.getElementById("nextMonth").addEventListener("click", () => changeMonth(1));

function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    monthYear.textContent = `${currentDate.toLocaleString("es", { month: "long" })} ${year}`;
    calendarDays.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.innerHTML += '<div class="day"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const eventToday = events.find(event => event.date === dayDate);
        const dayClass = eventToday ? "day event-day" : "day";

        calendarDays.innerHTML += `<div class="${dayClass}" data-date="${dayDate}">${day}</div>`;
    }

    document.querySelectorAll(".event-day").forEach(dayElement => {
        dayElement.addEventListener("click", function() {
            const date = this.getAttribute("data-date");
            const event = events.find(event => event.date === date);
            if (event) alert(`Evento: ${event.title}`);
        });
    });
}

function changeMonth(step) {
    currentDate.setMonth(currentDate.getMonth() + step);
    renderCalendar();
}

renderCalendar();

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el calendario
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: async function(fetchInfo, successCallback, failureCallback) {
            try {
                const response = await axios.get('http://localhost:3000/citas');
                const eventos = response.data.map(cita => ({
                    title: cita.nombre,
                    start: `${cita.fecha}T${cita.hora}`,
                }));
                successCallback(eventos);
            } catch (error) {
                console.error("Error al cargar las citas:", error);
                failureCallback(error);
            }
        },
        dateClick: function(info) {
            // Redirigir a la vista de horas con la fecha seleccionada en el parámetro de la URL
            const selectedDate = info.dateStr;
            window.location.href = `/citas/dia?fecha=${selectedDate}`;
        }
    });
    calendar.render();

    // Verificar si estamos en la vista diaria de citas
    const urlParams = new URLSearchParams(window.location.search);
    const fecha = urlParams.get('fecha');
    if (fecha) {
        // Si estamos en la vista de horas, cargar las citas de la fecha
        document.getElementById('fecha-seleccionada').textContent = fecha;

        async function cargarCitas() {
            try {
                const response = await axios.get(`/citas/dia?fecha=${fecha}`);
                const citas = response.data;
                const listaCitas = document.getElementById('lista-citas');

                citas.forEach(cita => {
                    const li = document.createElement('li');
                    li.textContent = `${cita.hora}: ${cita.nombre}`;
                    listaCitas.appendChild(li);
                });
            } catch (error) {
                console.error("Error al cargar las citas:", error);
            }
        }

        cargarCitas();
    }
});
