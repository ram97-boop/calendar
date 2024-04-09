const template = document.createElement("template");
template.innerHTML = `
    <style>
      * {
          margin: 0;
      }
      
      :host {
          font-family: sans-serif;
          display: flex;
          height: 100vh;
          background-color: lightgray;
      }
      
      #calendar-container {
          flex: 1 1 auto;
          border: 1px solid black;
          display: grid;
          grid-template-rows: 1fr 7fr;
      }
      
      #month-interface {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #ffe699;
      }
      
      #month-interface button {
          height: 100%;
          width: 25%;
          background-color: #fadb7d;
          border: none;
      }
      
      #month-interface button:hover {
          filter: brightness(1.1);
          cursor: pointer;
      }
      
      #month-interface button:active {
          filter: brightness(0.8);
          cursor: grabbing;
      }
      
      #month-and-year {
          text-align: center;
      }
      
      #dates {
          display: grid;
          grid-template-rows: 1fr 6fr;
      }
      
      #days-of-week {
          display: flex;
          /* justify-content: space-evenly; */
          background-color: #fff2cc;
      }
      
      #days-of-month {
          display: flex;
          flex-wrap: wrap;
      }
      
      #days-of-week p,
      #days-of-month p {
          width: 14.28%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      #days-of-month p {
          background-color: white;
      }
      
      #days-of-month p:hover {
          filter: brightness(0.9);
          cursor: pointer;
      }
      
      #days-of-month p:active {
          filter: brightness(0.8);
          cursor: grabbing;
      }
      
      #days-of-month p:empty {
          filter: none;
          cursor: default;
      }
      
      #days-of-month p.full {
          background-color: lightcoral;
          filter: none;
          cursor: default;
      }
      
      .blocked,
      #days-of-month > p:nth-child(7n) {
          background-color: grey;
          color: white;
          filter: none;
          cursor: default;
      }
    </style>
    <div id="calendar-container">
      <div id="month-interface">
        <button id="prev-month">←</button>
        <p id="month-and-year">
        </p>
        <button id="next-month">→</button>
      </div>
      <div id="dates">
        <div id="days-of-week">
          <p>Mon</p>
          <p>Tue</p>
          <p>Wed</p>
          <p>Thu</p>
          <p>Fri</p>
          <p>Sat</p>
          <p>Sun</p>
        </div>
        <div id="days-of-month">
        </div>
      </div>
    </div>
`;

class CustomCalendar extends HTMLElement {
    monthOnDisplay;

    constructor() {
        super();
        this.monthStrings = [
            ["Januari", 31],
            ["Februari", 28],
            ["Mars", 31],
            ["April", 30],
            ["Maj", 31],
            ["Juni", 30],
            ["Juli", 31],
            ["Augusti", 31],
            ["September", 30],
            ["Oktober", 31],
            ["November", 30],
            ["December", 31]
        ];
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));
        this.printMonthAndYear(new Date());
        this.printDates();
        this.makeButtonsChangeMonth();
    }

    connectedCallback() {
    }

    updateFebruaryNrOfDays(date) {
        if (date.getMonth() === 1) {
            const febLastDay = new Date(date);
            febLastDay.setMonth(2);
            febLastDay.setDate(0);
            this.monthStrings[1][1] = febLastDay.getDate();
        }
    }

    getMonthAndYearToday(date) {
        this.monthOnDisplay = new Date(date);
        this.updateFebruaryNrOfDays(date);
        return `${this.monthStrings[
            date.getMonth()
        ][0]} ${date.getFullYear()}`;
    }

    getThisMonthFirstDay() {
        this.monthOnDisplay.setDate(1);
        return this.monthOnDisplay.getDay() - 1; // Make monday have index 0.
    }

    incrementMonth(date) {
        date.setMonth(date.getMonth() + 1);
    }

    decrementMonth(date) {
        const today = new Date();
        const datesMonth = date.getMonth();
        if (datesMonth > today.getMonth()
            || date.getFullYear() > today.getFullYear()) {
            date.setMonth(datesMonth - 1);
        }
    }

    printMonthAndYear(date) {
        const p = this.shadowRoot.getElementById("month-and-year");
        p.textContent = this.getMonthAndYearToday(date);
    }

    printWhitespaceDates(datesContainer) {
        const whitespaces = this.getThisMonthFirstDay();

        for (let i = 0; i < whitespaces; ++i) {
            let emptyP = document.createElement("p");
            datesContainer.appendChild(emptyP);
        }
    }

    printDates() {
        const datesContainer = this.shadowRoot.getElementById("days-of-month");
        const nrOfDays = this.monthStrings[this.monthOnDisplay.getMonth()][1];

        this.printWhitespaceDates(datesContainer);

        for (let i = 1; i <= nrOfDays; ++i) {
            let date = document.createElement("p");
            date.textContent = `${i}`;
            datesContainer.appendChild(date);
        }
    }

    clearDates() {
        const datesContainer = this.shadowRoot.getElementById("days-of-month");

        while (datesContainer.lastChild) {
            datesContainer.removeChild(datesContainer.lastChild);
        }
    }

    makeButtonsChangeMonth() {
        const leftButton = this.shadowRoot.getElementById("prev-month");
        const rightButton = this.shadowRoot.getElementById("next-month");

        leftButton.addEventListener("click", () => {
            const today = new Date();
            if (this.monthOnDisplay.getMonth() > today.getMonth()
                || this.monthOnDisplay.getFullYear() > today.getFullYear()) {
                this.decrementMonth(this.monthOnDisplay);
                this.clearDates();
                this.printMonthAndYear(this.monthOnDisplay); // monthOnDisplay is decremented
                this.printDates();
            }
        });

        rightButton.addEventListener("click", () => {
            this.incrementMonth(this.monthOnDisplay);
            this.clearDates();
            this.printMonthAndYear(this.monthOnDisplay);
            this.printDates();
        });
    }
}

customElements.define("custom-calendar", CustomCalendar);