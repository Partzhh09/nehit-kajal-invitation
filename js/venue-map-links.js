(function () {
  var venues = [
    {
      name: 'Quality Inn Patria Suites, Rajkot',
      map: 'https://maps.app.goo.gl/51YKkDrfGw1rZD9G8?g_st=ac'
    },
    {
      name: 'Rameshwar Banquet, Kalavad Rd, Rajkot',
      map: 'https://maps.app.goo.gl/zo9fLK4SzeYNJAdFA'
    }
  ];

  function addVenueLinks() {
    var cards = document.querySelectorAll('#ttkGrid .ttk-card');
    var venueCard = null;

    for (var i = 0; i < cards.length; i++) {
      var label = cards[i].querySelector('.ttk-card-label');
      if (label && label.textContent.trim() === 'Venue') {
        venueCard = cards[i];
        break;
      }
    }

    if (!venueCard) return;

    var body = venueCard.querySelector('.ttk-card-body');
    if (!body) return;

    body.textContent = '';
    venues.forEach(function (venue) {
      var link = document.createElement('a');
      link.className = 'ttk-venue-link';
      link.href = venue.map;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Open map for ' + venue.name);
      link.textContent = venue.name;
      body.appendChild(link);
    });

    var defaultMapLink = venueCard.querySelector('.ttk-card-link');
    if (defaultMapLink) defaultMapLink.remove();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addVenueLinks, { once: true });
  } else {
    addVenueLinks();
  }
})();
