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
