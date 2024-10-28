document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        // Configuración del calendario
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
                // Redirigir a la vista de horas con la fecha seleccionada
                const selectedDate = info.dateStr;
                window.location.href = `/citas/dia?fecha=${selectedDate}`;
            }
        });
        calendar.render();
    }

    // Comprobar si estamos en la vista de horas
    const urlParams = new URLSearchParams(window.location.search);
    const fecha = urlParams.get('fecha');
    if (fecha) {
        // Si estamos en la vista diaria, mostrar la fecha y cargar las citas
        const fechaSeleccionada = document.getElementById('fecha-seleccionada');
        const listaCitas = document.getElementById('lista-citas');

        if (fechaSeleccionada && listaCitas) {
            fechaSeleccionada.textContent = fecha;

            async function cargarCitas() {
                try {
                    const response = await axios.get(`/citas/dia?fecha=${fecha}`);
                    const citas = response.data;

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
    }
});
