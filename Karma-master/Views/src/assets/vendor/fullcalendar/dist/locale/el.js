!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('moment'), require('fullcalendar')))
    : 'function' == typeof define && define.amd
    ? define(['moment', 'fullcalendar'], t)
    : 'object' == typeof exports
    ? t(require('moment'), require('fullcalendar'))
    : t(e.moment, e.FullCalendar);
})('undefined' != typeof self ? self : this, function (e, t) {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var r = (n[o] = { i: o, l: !1, exports: {} });
      return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function (e, n, o) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o,
          });
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 97))
    );
  })({
    0: function (t, n) {
      t.exports = e;
    },
    1: function (e, n) {
      e.exports = t;
    },
    97: function (e, t, n) {
      Object.defineProperty(t, '__esModule', { value: !0 }), n(98);
      var o = n(1);
      o.datepickerLocale('el', 'el', {
        closeText: 'Κλείσιμο',
        prevText: 'Προηγούμενος',
        nextText: 'Επόμενος',
        currentText: 'Σήμερα',
        monthNames: [
          'Ιανουάριος',
          'Φεβρουάριος',
          'Μάρτιος',
          'Απρίλιος',
          'Μάιος',
          'Ιούνιος',
          'Ιούλιος',
          'Αύγουστος',
          'Σεπτέμβριος',
          'Οκτώβριος',
          'Νοέμβριος',
          'Δεκέμβριος',
        ],
        monthNamesShort: [
          'Ιαν',
          'Φεβ',
          'Μαρ',
          'Απρ',
          'Μαι',
          'Ιουν',
          'Ιουλ',
          'Αυγ',
          'Σεπ',
          'Οκτ',
          'Νοε',
          'Δεκ',
        ],
        dayNames: [
          'Κυριακή',
          'Δευτέρα',
          'Τρίτη',
          'Τετάρτη',
          'Πέμπτη',
          'Παρασκευή',
          'Σάββατο',
        ],
        dayNamesShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
        dayNamesMin: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
        weekHeader: 'Εβδ',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: '',
      }),
        o.locale('el', {
          buttonText: {
            month: 'Μήνας',
            week: 'Εβδομάδα',
            day: 'Ημέρα',
            list: 'Ατζέντα',
          },
          allDayText: 'Ολοήμερο',
          eventLimitText: 'περισσότερα',
          noEventsMessage: 'Δεν υπάρχουν γεγονότα για να εμφανιστεί',
        });
    },
    98: function (e, t, n) {
      !(function (e, t) {
        t(n(0));
      })(0, function (e) {
        function t(e) {
          return (
            e instanceof Function ||
            '[object Function]' === Object.prototype.toString.call(e)
          );
        }
        return e.defineLocale('el', {
          monthsNominativeEl: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split(
            '_'
          ),
          monthsGenitiveEl: 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split(
            '_'
          ),
          months: function (e, t) {
            return e
              ? 'string' == typeof t &&
                /D/.test(t.substring(0, t.indexOf('MMMM')))
                ? this._monthsGenitiveEl[e.month()]
                : this._monthsNominativeEl[e.month()]
              : this._monthsNominativeEl;
          },
          monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split(
            '_'
          ),
          weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split(
            '_'
          ),
          weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
          weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
          meridiem: function (e, t, n) {
            return e > 11 ? (n ? 'μμ' : 'ΜΜ') : n ? 'πμ' : 'ΠΜ';
          },
          isPM: function (e) {
            return 'μ' === (e + '').toLowerCase()[0];
          },
          meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
          longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A',
          },
          calendarEl: {
            sameDay: '[Σήμερα {}] LT',
            nextDay: '[Αύριο {}] LT',
            nextWeek: 'dddd [{}] LT',
            lastDay: '[Χθες {}] LT',
            lastWeek: function () {
              switch (this.day()) {
                case 6:
                  return '[το προηγούμενο] dddd [{}] LT';
                default:
                  return '[την προηγούμενη] dddd [{}] LT';
              }
            },
            sameElse: 'L',
          },
          calendar: function (e, n) {
            var o = this._calendarEl[e],
              r = n && n.hours();
            return (
              t(o) && (o = o.apply(n)),
              o.replace('{}', r % 12 == 1 ? 'στη' : 'στις')
            );
          },
          relativeTime: {
            future: 'σε %s',
            past: '%s πριν',
            s: 'λίγα δευτερόλεπτα',
            ss: '%d δευτερόλεπτα',
            m: 'ένα λεπτό',
            mm: '%d λεπτά',
            h: 'μία ώρα',
            hh: '%d ώρες',
            d: 'μία μέρα',
            dd: '%d μέρες',
            M: 'ένας μήνας',
            MM: '%d μήνες',
            y: 'ένας χρόνος',
            yy: '%d χρόνια',
          },
          dayOfMonthOrdinalParse: /\d{1,2}η/,
          ordinal: '%dη',
          week: { dow: 1, doy: 4 },
        });
      });
    },
  });
});
