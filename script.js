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
