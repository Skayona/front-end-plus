function eventsFilter(weather, events) {
  const temp = weather.main.temp;
  const pageList = [{
    id: '#events-page',
    title: `${weather.name}, ${temp.toFixed(0)}°C`,
    toShow: 3
  }, {
    id: '#total-page',
    title: 'All events',
    toShow: events.length
  }];
  const PAGE = {};
  for (let page of pageList) {
    if (document.querySelector(page.id)) {
      PAGE.content = document.querySelector(page.id);
      PAGE.title = page.title;
      PAGE.toShow = page.toShow;
    }
  }

  if (!PAGE.content) return;

  let toVisit = [];

  for (let event of events) {
    const t = event.temp;
    const tLength = Object.keys(t).length;

    switch (tLength) {
      case 1:
        if ((t.min && t.min < temp) || (t.max && temp < t.max)) {
          event.temp = `${t.min || t.max}°C`;
          toVisit = [...toVisit, event];
        }
        break;
      case 2:
        if (t.min < temp && temp < t.max) {
          event.temp = `${t.min}-${t.max}°C`;
          toVisit = [...toVisit, event];
        }
        break;
      default:
        event.temp = '-';
        toVisit = [...toVisit, event];
        break;
    }
  }

  PAGE.content.innerHTML = `
    <div class="container">
      <section class="section events">
        <h1 class="h1 events__title">${PAGE.title}</h1>
        ${toVisit.map((e, i) => {
          if (i >= PAGE.toShow) return;
          return `
            <article class="events__item event">
              <p class="event__img">
                <img src="${e.img}" alt="${e.title}" />
              </p>
              <div>
                <h2 class="h2 event__title">${e.title}</h2>
                <p class="event__address">${e.address}</p>
                <time class="time">${e.time}</time>
                <p class="event__temp">Сприятлива температура: ${e.temp}</p>
                <p class="event__description">${e.description}</p>
                <p class="event__price">${e.price} грн.</p>
              </div>
            </article>
          `;
        }).join('')}
      </section>
    </div>
  `;

}