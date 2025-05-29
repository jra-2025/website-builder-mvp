// IMPORTANT: If the JavaScript is not working it is most probably because it relies on external libraries that are linked in the index.html file - however, if you don't have the permission to access them, it's better not to link them.

// Please keep in mind that JS files might also be obfuscated to prevent people from stealing the code and animations.

// However, all the HTML elements and CSS are there are you just need to access them using JS.

var WPacTime = WPacTime || {
    getTime: function(a, b, d) {
        return "chat" == d ? this.getChatTime(a, b || "en") : d ? this.getFormatTime(a, d, b || "en") : this.getDefaultTime(a, b || "en")
    },
    getChatTime: function(a, b) {
        var d = ((new Date).getTime() - a) / 1E3 / 60 / 60,
            c = d / 24;
        return 24 > d ? this.getFormatTime(a, "HH:mm", b) : 365 > c ? this.getFormatTime(a, "dd.MM HH:mm", b) : this.getFormatTime(a, "yyyy.MM.dd HH:mm", b)
    },
    getDefaultTime: function(a, b) {
        return this.getTimeAgo(a, b)
    },
    getTimeAgo: function(a, b) {
        a = ((new Date).getTime() - a) / 1E3;
        var d = a / 60,
            c = d / 60,
            e = c / 24,
            f = e / 365;
        b = WPacTime.Messages[b] ? b : "en";
        return 45 > a ? WPacTime.Messages[b].second : 90 > a ? WPacTime.Messages[b].minute : 45 > d ? WPacTime.Messages[b].minutes(d) : 90 > d ? WPacTime.Messages[b].hour : 24 > c ? WPacTime.Messages[b].hours(c) : 48 > c ? WPacTime.Messages[b].day : 30 > e ? WPacTime.Messages[b].days(e) : 60 > e ? WPacTime.Messages[b].month : 365 > e ? WPacTime.Messages[b].months(e) : 2 > f ? WPacTime.Messages[b].year : WPacTime.Messages[b].years(f)
    },
    getTime12: function(a, b) {
        a = new Date(a);
        return (a.getHours() % 12 ? a.getHours() % 12 : 12) + ":" + a.getMinutes() +
            (12 <= a.getHours() ? " PM" : " AM")
    },
    getFormatTime: function(a, b, d) {
        var c = new Date(a),
            e = {
                SS: c.getMilliseconds(),
                ss: c.getSeconds(),
                mm: c.getMinutes(),
                HH: c.getHours(),
                hh: (c.getHours() % 12 ? c.getHours() % 12 : 12) + (12 <= c.getHours() ? "PM" : "AM"),
                dd: c.getDate(),
                MM: c.getMonth() + 1,
                yyyy: c.getFullYear(),
                yy: String(c.getFullYear()).toString().substr(2, 2),
                ago: this.getTimeAgo(a, d),
                12: this.getTime12(a, d)
            };
        return b.replace(/(SS|ss|mm|HH|hh|DD|dd|MM|yyyy|yy|ago|12)/g, function(a, b) {
            a = e[b];
            return 10 > a ? "0" + a : a
        })
    },
    declineNum: function(a,
        b, d, c) {
        return a + " " + this.declineMsg(a, b, d, c)
    },
    declineMsg: function(a, b, d, c, e) {
        var f = a % 10;
        return 1 == f && (1 == a || 20 < a) ? b : 1 < f && 5 > f && (20 < a || 10 > a) ? d : a ? c : e
    }
};
WPacTime.Messages = {
    ru: {
        second: "\u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e",
        minute: "\u043c\u0438\u043d\u0443\u0442\u0443 \u043d\u0430\u0437\u0430\u0434",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u043c\u0438\u043d\u0443\u0442\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434")
        },
        hour: "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a),
                "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u0430 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u043e\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        day: "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u0435\u0439 \u043d\u0430\u0437\u0430\u0434")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0435\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        year: "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434", "\u0433\u043e\u0434\u0430 \u043d\u0430\u0437\u0430\u0434",
                "\u043b\u0435\u0442 \u043d\u0430\u0437\u0430\u0434")
        }
    },
    en: {
        second: "just now",
        minute: "1m ago",
        minutes: function(a) {
            return Math.round(a) + "m ago"
        },
        hour: "1h ago",
        hours: function(a) {
            return Math.round(a) + "h ago"
        },
        day: "a day ago",
        days: function(a) {
            return Math.round(a) + " days ago"
        },
        month: "a month ago",
        months: function(a) {
            return Math.round(a / 30) + " months ago"
        },
        year: "a year ago",
        years: function(a) {
            return Math.round(a) + " years ago"
        }
    },
    uk: {
        second: "\u0442\u0456\u043b\u044c\u043a\u0438 \u0449\u043e",
        minute: "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d\u0438 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        hour: "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0433\u043e\u0434\u0438\u043d\u0438 \u0442\u043e\u043c\u0443",
                "\u0433\u043e\u0434\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        day: "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456 \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        month: "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
                "\u043c\u0456\u0441\u044f\u0446\u0456 \u0442\u043e\u043c\u0443", "\u043c\u0456\u0441\u044f\u0446\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        year: "\u0440\u0456\u043a \u0442\u043e\u043c\u0443",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0440\u0456\u043a \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0438 \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0456\u0432 \u0442\u043e\u043c\u0443")
        }
    },
    ro: {
        second: "chiar acum",
        minute: "\u00een urm\u0103 minut",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a),
                "o minuta in urma", "minute in urma", "de minute in urma")
        },
        hour: "acum o ora",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "acum o ora", "ore in urma", "de ore in urma")
        },
        day: "o zi in urma",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "o zi in urma", "zile in urma", "de zile in urma")
        },
        month: "o luna in urma",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "o luna in urma", "luni in urma", "de luni in urma")
        },
        year: "un an in urma",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a),
                "un an in urma", "ani in urma", "de ani in urma")
        }
    },
    lv: {
        second: "Maz\u0101k par min\u016bti",
        minute: "Pirms min\u016btes",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "pirms min\u016btes", "pirms min\u016bt\u0113m", "pirms min\u016bt\u0113m")
        },
        hour: "pirms stundas",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "pirms stundas", "pirms stund\u0101m", "pirms stund\u0101m")
        },
        day: "pirms dienas",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "pirms dienas", "pirms dien\u0101m",
                "pirms dien\u0101m")
        },
        month: "pirms m\u0113ne\u0161a",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "pirms m\u0113ne\u0161a", "pirms m\u0113ne\u0161iem", "pirms m\u0113ne\u0161iem")
        },
        year: "pirms gada",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "pirms gada", "pirms gadiem", "pirms gadiem")
        }
    },
    lt: {
        second: "k\u0105 tik",
        minute: "prie\u0161 minut\u0119",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "minut\u0117 prie\u0161", "minut\u0117s prie\u0161", "minu\u010di\u0173 prie\u0161")
        },
        hour: "prie\u0161 valand\u0105",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "valanda prie\u0161", "valandos prie\u0161", "valand\u0173 prie\u0161")
        },
        day: "prie\u0161 dien\u0105",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "diena prie\u0161", "dienos prie\u0161", "dien\u0173 prie\u0161")
        },
        month: "prie\u0161 m\u0117nes\u012f",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "m\u0117nes\u012f prie\u0161", "m\u0117nesiai prie\u0161", "m\u0117nesi\u0173 prie\u0161")
        },
        year: "prie\u0161 metus",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "metai prie\u0161", "metai prie\u0161", "met\u0173 prie\u0161")
        }
    },
    kk: {
        second: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442\u0442\u0430\u043d \u0430\u0437 \u0443\u0430\u049b\u044b\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minute: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
                "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        hour: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        day: "\u0431\u0456\u0440 \u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d")
        },
        month: "\u0431\u0456\u0440 \u0430\u0439 \u0431\u04b1\u0440\u044b\u043d",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d")
        },
        year: "\u0431\u0456\u0440 \u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d")
        }
    },
    ka: {
        second: "\u10ec\u10d0\u10db\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minute: "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        hour: "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        day: "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        month: "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        year: "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc")
        }
    },
    hy: {
        second: "\u0574\u056b \u0584\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576 \u0561\u057c\u0561\u057b",
        minute: "\u0574\u0565\u056f \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b")
        },
        hour: "\u0574\u0565\u056f \u056a\u0561\u0574 \u0561\u057c\u0561\u057b",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b")
        },
        day: "\u0574\u0565\u056f \u0585\u0580 \u0561\u057c\u0561\u057b",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b")
        },
        month: "\u0574\u0565\u056f \u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b")
        },
        year: "\u0574\u0565\u056f \u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b", "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
                "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b")
        }
    },
    fr: {
        second: "tout \u00e0 l'heure",
        minute: "environ une minute",
        minutes: function(a) {
            return Math.round(a) + " minutes"
        },
        hour: "environ une heure",
        hours: function(a) {
            return "environ " + Math.round(a) + " heures"
        },
        day: "un jour",
        days: function(a) {
            return Math.round(a) + " jours"
        },
        month: "environ un mois",
        months: function(a) {
            return Math.round(a / 30) + " mois"
        },
        year: "environ un an",
        years: function(a) {
            return Math.round(a) + " ans"
        }
    },
    es: {
        second: "ahora",
        minute: "hace un minuto",
        minutes: function(a) {
            return "hace " + Math.round(a) + " minuts"
        },
        hour: "hace una hora",
        hours: function(a) {
            return "hace " + Math.round(a) + " horas"
        },
        day: "hace un dia",
        days: function(a) {
            return "hace " + Math.round(a) + " d\u00edas"
        },
        month: "hace un mes",
        months: function(a) {
            return "hace " + Math.round(a / 30) + " meses"
        },
        year: "hace a\u00f1os",
        years: function(a) {
            return "hace " + Math.round(a) + " a\u00f1os"
        }
    },
    el: {
        second: "\u03bb\u03b9\u03b3\u03cc\u03c4\u03b5\u03c1\u03bf \u03b1\u03c0\u03cc \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minute: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minutes: function(a) {
            return Math.round(a) + " minutes"
        },
        hour: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03b7\u03bd \u03bc\u03b9\u03b1 \u03ce\u03c1\u03b1",
        hours: function(a) {
            return "about " + Math.round(a) + " hours"
        },
        day: "\u03bc\u03b9\u03b1 \u03bc\u03ad\u03c1\u03b1",
        days: function(a) {
            return Math.round(a) + " days"
        },
        month: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03bc\u03ae\u03bd\u03b1",
        months: function(a) {
            return Math.round(a / 30) + " months"
        },
        year: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03c7\u03c1\u03cc\u03bd\u03bf",
        years: function(a) {
            return Math.round(a) + " years"
        }
    },
    de: {
        second: "soeben",
        minute: "vor einer Minute",
        minutes: function(a) {
            return "vor " + Math.round(a) + " Minuten"
        },
        hour: "vor einer Stunde",
        hours: function(a) {
            return "vor " + Math.round(a) + " Stunden"
        },
        day: "vor einem Tag",
        days: function(a) {
            return "vor " + Math.round(a) + " Tagen"
        },
        month: "vor einem Monat",
        months: function(a) {
            return "vor " +
                Math.round(a / 30) + " Monaten"
        },
        year: "vor einem Jahr",
        years: function(a) {
            return "vor " + Math.round(a) + " Jahren"
        }
    },
    be: {
        second: "\u043c\u0435\u043d\u0448 \u0437\u0430 \u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minute: "\u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0445\u0432\u0456\u043b\u0456\u043d\u0430 \u0442\u0430\u043c\u0443", "\u0445\u0432\u0456\u043b\u0456\u043d\u044b \u0442\u0430\u043c\u0443",
                "\u0445\u0432\u0456\u043b\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        hour: "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d\u044b \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        day: "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a),
                "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443", "\u0434\u043d\u0456 \u0442\u0430\u043c\u0443", "\u0434\u0437\u0451\u043d \u0442\u0430\u043c\u0443")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430\u045e \u0442\u0430\u043c\u0443")
        },
        year: "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u044b \u0442\u0430\u043c\u0443", "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443")
        }
    },
    it: {
        second: "proprio ora",
        minute: "un minuto fa",
        minutes: function(a) {
            return WPacTime.declineNum(Math.round(a), "un minuto fa", "minuti fa", "minuti fa")
        },
        hour: "un'ora fa",
        hours: function(a) {
            return WPacTime.declineNum(Math.round(a), "un'ora fa", "ore fa", "ore fa")
        },
        day: "un giorno fa",
        days: function(a) {
            return WPacTime.declineNum(Math.round(a),
                "un giorno fa", "giorni fa", "giorni fa")
        },
        month: "un mese fa",
        months: function(a) {
            return WPacTime.declineNum(Math.round(a / 30), "un mese fa", "mesi fa", "mesi fa")
        },
        year: "un anno fa",
        years: function(a) {
            return WPacTime.declineNum(Math.round(a), "un anno fa", "anni fa", "anni fa")
        }
    },
    tr: {
        second: "az \u00f6nce",
        minute: "dakika \u00f6nce",
        minutes: function(a) {
            return Math.round(a) + " dakika \u00f6nce"
        },
        hour: "saat \u00f6nce",
        hours: function(a) {
            return Math.round(a) + " saat \u00f6nce"
        },
        day: "g\u00fcn \u00f6nce",
        days: function(a) {
            return Math.round(a) +
                " g\u00fcn \u00f6nce"
        },
        month: "ay \u00f6nce",
        months: function(a) {
            return Math.round(a / 30) + " ay \u00f6nce"
        },
        year: "y\u0131l \u00f6nce",
        years: function(a) {
            return Math.round(a) + " y\u0131l \u00f6nce"
        }
    },
    nb: {
        second: "n\u00e5 nettopp",
        minute: "ett minutt siden",
        minutes: function(a) {
            return Math.round(a) + " minutter siden"
        },
        hour: "en time siden",
        hours: function(a) {
            return Math.round(a) + " timer siden"
        },
        day: "en dag siden",
        days: function(a) {
            return Math.round(a) + " dager siden"
        },
        month: "en m\u00e5ned siden",
        months: function(a) {
            return Math.round(a /
                30) + " m\u00e5neder siden"
        },
        year: "ett \u00e5r siden",
        years: function(a) {
            return Math.round(a) + " \u00e5r siden"
        }
    },
    da: {
        second: "lige nu",
        minute: "et minut siden",
        minutes: function(a) {
            return Math.round(a) + " minutter siden"
        },
        hour: "en time siden",
        hours: function(a) {
            return Math.round(a) + " timer siden"
        },
        day: "en dag siden",
        days: function(a) {
            return Math.round(a) + " dage siden"
        },
        month: "en m\u00e5ned siden",
        months: function(a) {
            return Math.round(a / 30) + " m\u00e5neder siden"
        },
        year: "et \u00e5r siden",
        years: function(a) {
            return Math.round(a) +
                " \u00e5r siden"
        }
    },
    nl: {
        second: "zojuist",
        minute: "minuten geleden",
        minutes: function(a) {
            return Math.round(a) + " minuten geleden"
        },
        hour: "uur geleden",
        hours: function(a) {
            return Math.round(a) + " uur geleden"
        },
        day: "1 dag geleden",
        days: function(a) {
            return Math.round(a) + " dagen geleden"
        },
        month: "maand geleden",
        months: function(a) {
            return Math.round(a / 30) + " maanden geleden"
        },
        year: "jaar geleden",
        years: function(a) {
            return Math.round(a) + " jaar geleden"
        }
    },
    ca: {
        second: "ara mateix",
        minute: "fa un minut",
        minutes: function(a) {
            return "fa " +
                Math.round(a) + " minuts"
        },
        hour: "fa una hora",
        hours: function(a) {
            return "fa " + Math.round(a) + " hores"
        },
        day: "fa un dia",
        days: function(a) {
            return "fa " + Math.round(a) + " dies"
        },
        month: "fa un mes",
        months: function(a) {
            return "fa " + Math.round(a / 30) + " mesos"
        },
        year: "fa un any",
        years: function(a) {
            return "fa " + Math.round(a) + " anys"
        }
    },
    sv: {
        second: "just nu",
        minute: "en minut sedan",
        minutes: function(a) {
            return Math.round(a) + " minuter sedan"
        },
        hour: "en timme sedan",
        hours: function(a) {
            return Math.round(a) + " timmar sedan"
        },
        day: "en dag sedan",
        days: function(a) {
            return Math.round(a) + " dagar sedan"
        },
        month: "en m\u00e5nad sedan",
        months: function(a) {
            return Math.round(a / 30) + " m\u00e5nader sedan"
        },
        year: "ett \u00e5r sedan",
        years: function(a) {
            return Math.round(a) + " \u00e5r sedan"
        }
    },
    pl: {
        second: "w\u0142a\u015bnie teraz",
        minute: "minut\u0119 temu",
        minutes: function(a) {
            return Math.round(a) + " minut temu"
        },
        hour: "godzin\u0119 temu",
        hours: function(a) {
            return Math.round(a) + " godzin temu"
        },
        day: "wczoraj",
        days: function(a) {
            return Math.round(a) + " dni temu"
        },
        month: "miesi\u0105c temu",
        months: function(a) {
            return Math.round(a / 30) + " miesi\u0119cy temu"
        },
        year: "rok temu",
        years: function(a) {
            return Math.round(a) + " lat temu"
        }
    },
    pt: {
        second: "agora",
        minute: "1 minuto atr\u00e1s",
        minutes: function(a) {
            return Math.round(a) + " minutos atr\u00e1s"
        },
        hour: "1 hora atr\u00e1s",
        hours: function(a) {
            return Math.round(a) + " horas atr\u00e1s"
        },
        day: "1 dia atr\u00e1s",
        days: function(a) {
            return Math.round(a) + " dias atr\u00e1s"
        },
        month: "1 m\u00eas atr\u00e1s",
        months: function(a) {
            return Math.round(a / 30) + " meses atr\u00e1s"
        },
        year: "1 ano atr\u00e1s",
        years: function(a) {
            return Math.round(a) + " anos atr\u00e1s"
        }
    },
    hu: {
        second: "\u00e9pp az im\u00e9nt",
        minute: "1 perccel ezel\u0151tt",
        minutes: function(a) {
            return Math.round(a) + " perccel ezel\u0151tt"
        },
        hour: "\u00f3r\u00e1val ezel\u0151tt",
        hours: function(a) {
            return Math.round(a) + " \u00f3r\u00e1val ezel\u0151tt"
        },
        day: "nappal ezel\u0151tt",
        days: function(a) {
            return Math.round(a) + " nappal ezel\u0151tt"
        },
        month: "h\u00f3nappal ezel\u0151tt",
        months: function(a) {
            return Math.round(a / 30) + " h\u00f3nappal ezel\u0151tt"
        },
        year: "\u00e9vvel ezel\u0151tt",
        years: function(a) {
            return Math.round(a) + " \u00e9vvel ezel\u0151tt"
        }
    },
    fi: {
        second: "juuri nyt",
        minute: "minuutti sitten",
        minutes: function(a) {
            return Math.round(a) + " minuuttia sitten"
        },
        hour: "tunti sitten",
        hours: function(a) {
            return Math.round(a) + " tuntia sitten"
        },
        day: "p\u00e4iv\u00e4 sitten",
        days: function(a) {
            return Math.round(a) + " p\u00e4iv\u00e4\u00e4 sitten"
        },
        month: "kuukausi sitten",
        months: function(a) {
            return Math.round(a / 30) + " kuukautta sitten"
        },
        year: "vuosi sitten",
        years: function(a) {
            return Math.round(a) +
                " vuotta sitten"
        }
    },
    he: {
        second: "\u05d4\u05e8\u05d2\u05e2",
        minute: "\u05dc\u05e4\u05e0\u05d9 \u05d3\u05e7\u05d4",
        minutes: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05d3\u05e7\u05d5\u05ea"
        },
        hour: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e2\u05d4",
        hours: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05e9\u05e2\u05d5\u05ea"
        },
        day: "\u05dc\u05e4\u05e0\u05d9 \u05d9\u05d5\u05dd",
        days: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05d9\u05de\u05d9\u05dd"
        },
        month: "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9",
        months: function(a) {
            return 2 == Math.round(a / 30) ? "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd" : "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a / 30) + " \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"
        },
        year: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e0\u05d4",
        years: function(a) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(a) + " \u05e9\u05e0\u05d9\u05dd"
        }
    },
    bg: {
        second: "\u0432 \u043c\u043e\u043c\u0435\u043d\u0442\u0430",
        minute: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0438\u043d\u0443\u0442\u0430",
        minutes: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " +
                Math.round(a) + " \u043c\u0438\u043d\u0443\u0442\u0438"
        },
        hour: "\u043f\u0440\u0435\u0434\u0438 1 \u0447\u0430\u0441",
        hours: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0447\u0430\u0441\u0430"
        },
        day: "\u043f\u0440\u0435\u0434\u0438 1 \u0434\u0435\u043d",
        days: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0434\u043d\u0438"
        },
        month: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0435\u0441\u0435\u0446",
        months: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a /
                30) + " \u043c\u0435\u0441\u0435\u0446\u0430"
        },
        year: "\u043f\u0440\u0435\u0434\u0438 1 \u0433\u043e\u0434\u0438\u043d\u0430",
        years: function(a) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(a) + " \u0433\u043e\u0434\u0438\u043d\u0438"
        }
    },
    sk: {
        second: "pr\u00e1ve teraz",
        minute: "pred min\u00fatov",
        minutes: function(a) {
            return "pred " + Math.round(a) + " min\u00fatami"
        },
        hour: "pred hodinou",
        hours: function(a) {
            return "pred " + Math.round(a) + " hodinami"
        },
        day: "v\u010dera",
        days: function(a) {
            return "pred " + Math.round(a) + " d\u0148ami"
        },
        month: "pred mesiacom",
        months: function(a) {
            return "pred " + Math.round(a / 30) + " mesiacmi"
        },
        year: "pred rokom",
        years: function(a) {
            return "pred " + Math.round(a) + " rokmi"
        }
    },
    lo: {
        second: "\u0ea7\u0eb1\u0ec8\u0e87\u0e81\u0eb5\u0ec9\u0e99\u0eb5\u0ec9",
        minute: "\u0edc\u0eb6\u0ec8\u0e87\u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        minutes: function(a) {
            return Math.round(a) + " \u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        },
        hour: "\u0edc\u0eb6\u0ec8\u0e87\u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99",
        hours: function(a) {
            return Math.round(a) + " \u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99"
        },
        day: "\u0edc\u0eb6\u0ec8\u0e87\u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99",
        days: function(a) {
            return Math.round(a) + " \u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99"
        },
        month: "\u0edc\u0eb6\u0ec8\u0e87\u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99",
        months: function(a) {
            return Math.round(a / 30) + " \u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99"
        },
        year: "\u0edc\u0eb6\u0ec8\u0e87\u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        years: function(a) {
            return Math.round(a) + " \u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        }
    },
    sl: {
        second: "pravkar",
        minute: "pred eno minuto",
        minutes: function(a) {
            return "pred " + Math.round(a) + " minutami"
        },
        hour: "pred eno uro",
        hours: function(a) {
            return "pred " + Math.round(a) + " urami"
        },
        day: "pred enim dnem",
        days: function(a) {
            return "pred " + Math.round(a) + " dnevi"
        },
        month: "pred enim mesecem",
        months: function(a) {
            return "pred " + Math.round(a / 30) + " meseci"
        },
        year: "pred enim letom",
        years: function(a) {
            return "pred " + Math.round(a) + " leti"
        }
    },
    et: {
        second: "just n\u00fc\u00fcd",
        minute: "minut tagasi",
        minutes: function(a) {
            return Math.round(a) + " minutit tagasi"
        },
        hour: "tund tagasi",
        hours: function(a) {
            return Math.round(a) + " tundi tagasi"
        },
        day: "p\u00e4ev tagasi",
        days: function(a) {
            return Math.round(a) + " p\u00e4eva tagasi"
        },
        month: "kuu aega tagasi",
        months: function(a) {
            return Math.round(a / 30) + " kuud tagasi"
        },
        year: "aasta tagasi",
        years: function(a) {
            return Math.round(a) + " aastat tagasi"
        }
    }
};/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function(q, m) {
    "function" === typeof define && define.amd ? define(m) : "object" === typeof exports ? module.exports = m() : q.Blazy = m()
})(this, function() {
    function q(b) {
        var c = b._util;
        c.elements = E(b.options);
        c.count = c.elements.length;
        c.destroyed && (c.destroyed = !1, b.options.container && l(b.options.container, function(a) {
            n(a, "scroll", c.validateT)
        }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT));
        m(b)
    }

    function m(b) {
        for (var c = b._util, a = 0; a < c.count; a++) {
            var d = c.elements[a],
                e;
            a: {
                var g = d;e = b.options;
                var p = g.getBoundingClientRect();
                if (e.container && y && (g = g.closest(e.containerClass))) {
                    g = g.getBoundingClientRect();
                    e = r(g, f) ? r(p, {
                        top: g.top - e.offset,
                        right: g.right + e.offset,
                        bottom: g.bottom + e.offset,
                        left: g.left - e.offset
                    }) : !1;
                    break a
                }
                e = r(p, f)
            }
            if (e || t(d, b.options.successClass)) b.load(d), c.elements.splice(a, 1), c.count--, a--
        }
        0 === c.count && b.destroy()
    }

    function r(b, c) {
        return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom
    }

    function z(b, c, a) {
        if (!t(b, a.successClass) && (c || a.loadInvisible || 0 < b.offsetWidth && 0 < b.offsetHeight))
            if (c = b.getAttribute(u) || b.getAttribute(a.src)) {
                c = c.split(a.separator);
                var d = c[A && 1 < c.length ? 1 : 0],
                    e = b.getAttribute(a.srcset),
                    g = "img" === b.nodeName.toLowerCase(),
                    p = (c = b.parentNode) && "picture" === c.nodeName.toLowerCase();
                if (g || void 0 === b.src) {
                    var h = new Image,
                        w = function() {
                            a.error && a.error(b, "invalid");
                            v(b, a.errorClass);
                            k(h, "error", w);
                            k(h, "load", f)
                        },
                        f = function() {
                            g ? p || B(b, d, e) : b.style.backgroundImage = 'url("' + d + '")';
                            x(b, a);
                            k(h, "load", f);
                            k(h, "error", w)
                        };
                    p && (h = b, l(c.getElementsByTagName("source"), function(b) {
                        var c = a.srcset,
                            e = b.getAttribute(c);
                        e && (b.setAttribute("srcset", e), b.removeAttribute(c))
                    }));
                    n(h, "error", w);
                    n(h, "load", f);
                    B(h, d, e)
                } else b.src = d, x(b, a)
            } else "video" === b.nodeName.toLowerCase() ? (l(b.getElementsByTagName("source"), function(b) {
                var c = a.src,
                    e = b.getAttribute(c);
                e && (b.setAttribute("src", e), b.removeAttribute(c))
            }), b.load(), x(b, a)) : (a.error && a.error(b, "missing"), v(b, a.errorClass))
    }

    function x(b, c) {
        v(b, c.successClass);
        c.success && c.success(b);
        b.removeAttribute(c.src);
        b.removeAttribute(c.srcset);
        l(c.breakpoints, function(a) {
            b.removeAttribute(a.src)
        })
    }

    function B(b, c, a) {
        a && b.setAttribute("srcset", a);
        b.src = c
    }

    function t(b, c) {
        return -1 !== (" " + b.className + " ").indexOf(" " + c + " ")
    }

    function v(b, c) {
        t(b, c) || (b.className += " " + c)
    }

    function E(b) {
        var c = [];
        b = b.root.querySelectorAll(b.selector);
        for (var a = b.length; a--; c.unshift(b[a]));
        return c
    }

    function C(b) {
        f.bottom = (window.innerHeight || document.documentElement.clientHeight) + b;
        f.right = (window.innerWidth || document.documentElement.clientWidth) + b
    }

    function n(b, c, a) {
        b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, a) : b.addEventListener(c, a, {
            capture: !1,
            passive: !0
        })
    }

    function k(b, c, a) {
        b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, a) : b.removeEventListener(c, a, {
            capture: !1,
            passive: !0
        })
    }

    function l(b, c) {
        if (b && c)
            for (var a = b.length, d = 0; d < a && !1 !== c(b[d], d); d++);
    }

    function D(b, c, a) {
        var d = 0;
        return function() {
            var e = +new Date;
            e - d < c || (d = e, b.apply(a, arguments))
        }
    }
    var u, f, A, y;
    return function(b) {
        if (!document.querySelectorAll) {
            var c = document.createStyleSheet();
            document.querySelectorAll = function(a, b, d, h, f) {
                f = document.all;
                b = [];
                a = a.replace(/\[for\b/gi, "[htmlFor").split(",");
                for (d = a.length; d--;) {
                    c.addRule(a[d], "k:v");
                    for (h = f.length; h--;) f[h].currentStyle.k && b.push(f[h]);
                    c.removeRule(0)
                }
                return b
            }
        }
        var a = this,
            d = a._util = {};
        d.elements = [];
        d.destroyed = !0;
        a.options = b || {};
        a.options.error = a.options.error || !1;
        a.options.offset = a.options.offset || 100;
        a.options.root = a.options.root || document;
        a.options.success = a.options.success || !1;
        a.options.selector = a.options.selector || ".b-lazy";
        a.options.separator = a.options.separator || "|";
        a.options.containerClass = a.options.container;
        a.options.container = a.options.containerClass ? document.querySelectorAll(a.options.containerClass) : !1;
        a.options.errorClass = a.options.errorClass || "b-error";
        a.options.breakpoints = a.options.breakpoints || !1;
        a.options.loadInvisible = a.options.loadInvisible || !1;
        a.options.successClass = a.options.successClass || "b-loaded";
        a.options.validateDelay = a.options.validateDelay || 25;
        a.options.saveViewportOffsetDelay = a.options.saveViewportOffsetDelay || 50;
        a.options.srcset = a.options.srcset || "data-srcset";
        a.options.src = u = a.options.src || "data-src";
        y = Element.prototype.closest;
        A = 1 < window.devicePixelRatio;
        f = {};
        f.top = 0 - a.options.offset;
        f.left = 0 - a.options.offset;
        a.revalidate = function() {
            q(a)
        };
        a.load = function(a, b) {
            var c = this.options;
            void 0 === a.length ? z(a, b, c) : l(a, function(a) {
                z(a, b, c)
            })
        };
        a.destroy = function() {
            var a = this._util;
            this.options.container && l(this.options.container, function(b) {
                k(b, "scroll", a.validateT)
            });
            k(window, "scroll", a.validateT);
            k(window, "resize", a.validateT);
            k(window, "resize", a.saveViewportOffsetT);
            a.count = 0;
            a.elements.length = 0;
            a.destroyed = !0
        };
        d.validateT = D(function() {
            m(a)
        }, a.options.validateDelay, a);
        d.saveViewportOffsetT = D(function() {
            C(a.options.offset)
        }, a.options.saveViewportOffsetDelay, a);
        C(a.options.offset);
        l(a.options.breakpoints, function(a) {
            if (a.width >= window.screen.width) return u = a.src, !1
        });
        setTimeout(function() {
            q(a)
        })
    }
});/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: March 10, 2017
 */
! function() {
    "use strict";
    var e, a = function(s, i) {
        function r(e) {
            return Math.floor(e)
        }

        function n() {
            var e = T.params.autoplay,
                a = T.slides.eq(T.activeIndex);
            a.attr("data-rplgsw-autoplay") && (e = a.attr("data-rplgsw-autoplay") || T.params.autoplay), T.autoplayTimeoutId = setTimeout(function() {
                T.params.loop ? (T.fixLoop(), T._slideNext(), T.emit("onAutoplay", T)) : T.isEnd ? i.autoplayStopOnLast ? T.stopAutoplay() : (T._slideTo(0), T.emit("onAutoplay", T)) : (T._slideNext(), T.emit("onAutoplay", T))
            }, e)
        }

        function o(a, t) {
            var s = e(a.target);
            if (!s.is(t))
                if ("string" == typeof t) s = s.parents(t);
                else if (t.nodeType) {
                var i;
                return s.parents().each(function(e, a) {
                    a === t && (i = t)
                }), i ? t : void 0
            }
            if (0 !== s.length) return s[0]
        }

        function l(e, a) {
            a = a || {};
            var t = window.MutationObserver || window.WebkitMutationObserver,
                s = new t(function(e) {
                    e.forEach(function(e) {
                        T.onResize(!0), T.emit("onObserverUpdate", T, e)
                    })
                });
            s.observe(e, {
                attributes: void 0 === a.attributes || a.attributes,
                childList: void 0 === a.childList || a.childList,
                characterData: void 0 === a.characterData || a.characterData
            }), T.observers.push(s)
        }

        function p(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = e.keyCode || e.charCode;
            if (!T.params.allowSwipeToNext && (T.isHorizontal() && 39 === a || !T.isHorizontal() && 40 === a)) return !1;
            if (!T.params.allowSwipeToPrev && (T.isHorizontal() && 37 === a || !T.isHorizontal() && 38 === a)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === a || 39 === a || 38 === a || 40 === a) {
                    var t = !1;
                    if (T.container.parents("." + T.params.slideClass).length > 0 && 0 === T.container.parents("." + T.params.slideActiveClass).length) return;
                    var s = {
                            left: window.pageXOffset,
                            top: window.pageYOffset
                        },
                        i = window.innerWidth,
                        r = window.innerHeight,
                        n = T.container.offset();
                    T.rtl && (n.left = n.left - T.container[0].scrollLeft);
                    for (var o = [
                            [n.left, n.top],
                            [n.left + T.width, n.top],
                            [n.left, n.top + T.height],
                            [n.left + T.width, n.top + T.height]
                        ], l = 0; l < o.length; l++) {
                        var p = o[l];
                        p[0] >= s.left && p[0] <= s.left + i && p[1] >= s.top && p[1] <= s.top + r && (t = !0)
                    }
                    if (!t) return
                }
                T.isHorizontal() ? (37 !== a && 39 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !T.rtl || 37 === a && T.rtl) && T.slideNext(), (37 === a && !T.rtl || 39 === a && T.rtl) && T.slidePrev()) : (38 !== a && 40 !== a || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && T.slideNext(), 38 === a && T.slidePrev()), T.emit("onKeyPress", T, a)
            }
        }

        function d(e) {
            var a = 0,
                t = 0,
                s = 0,
                i = 0;
            return "detail" in e && (t = e.detail), "wheelDelta" in e && (t = -e.wheelDelta / 120), "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (a = t, t = 0), s = 10 * a, i = 10 * t, "deltaY" in e && (i = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || i) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, i *= 40) : (s *= 800, i *= 800)), s && !a && (a = s < 1 ? -1 : 1), i && !t && (t = i < 1 ? -1 : 1), {
                spinX: a,
                spinY: t,
                pixelX: s,
                pixelY: i
            }
        }

        function u(e) {
            e.originalEvent && (e = e.originalEvent);
            var a = 0,
                t = T.rtl ? -1 : 1,
                s = d(e);
            if (T.params.mousewheelForceToAxis)
                if (T.isHorizontal()) {
                    if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
                    a = s.pixelX * t
                } else {
                    if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
                    a = s.pixelY
                }
            else a = Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
            if (0 !== a) {
                if (T.params.mousewheelInvert && (a = -a), T.params.freeMode) {
                    var i = T.getWrapperTranslate() + a * T.params.mousewheelSensitivity,
                        r = T.isBeginning,
                        n = T.isEnd;
                    if (i >= T.minTranslate() && (i = T.minTranslate()), i <= T.maxTranslate() && (i = T.maxTranslate()), T.setWrapperTransition(0), T.setWrapperTranslate(i), T.updateProgress(), T.updateActiveIndex(), (!r && T.isBeginning || !n && T.isEnd) && T.updateClasses(), T.params.freeModeSticky ? (clearTimeout(T.mousewheel.timeout), T.mousewheel.timeout = setTimeout(function() {
                            T.slideReset()
                        }, 300)) : T.params.lazyLoading && T.lazy && T.lazy.load(), T.emit("onScroll", T, e), T.params.autoplay && T.params.autoplayDisableOnInteraction && T.stopAutoplay(), 0 === i || i === T.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - T.mousewheel.lastScrollTime > 60)
                        if (a < 0)
                            if (T.isEnd && !T.params.loop || T.animating) {
                                if (T.params.mousewheelReleaseOnEdges) return !0
                            } else T.slideNext(), T.emit("onScroll", T, e);
                    else if (T.isBeginning && !T.params.loop || T.animating) {
                        if (T.params.mousewheelReleaseOnEdges) return !0
                    } else T.slidePrev(), T.emit("onScroll", T, e);
                    T.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function c(a, t) {
            a = e(a);
            var s, i, r, n = T.rtl ? -1 : 1;
            s = a.attr("data-rplgsw-parallax") || "0", i = a.attr("data-rplgsw-parallax-x"), r = a.attr("data-rplgsw-parallax-y"), i || r ? (i = i || "0", r = r || "0") : T.isHorizontal() ? (i = s, r = "0") : (r = s, i = "0"), i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t * n + "%" : i * t * n + "px", r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t + "%" : r * t + "px", a.transform("translate3d(" + i + ", " + r + ",0px)")
        }

        function m(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof a)) return new a(s, i);
        var h = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                flip: {
                    slideShadows: !0,
                    limitRotation: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                zoom: !1,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: !0,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                mousewheelEventsTarged: "container",
                hashnav: !1,
                hashnavWatchState: !1,
                history: !1,
                replaceState: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                normalizeSlideIndex: !0,
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "rplgsw-no-swiping",
                passiveListeners: !0,
                containerModifierClass: "rplgsw-container-",
                slideClass: "rplgsw-slide",
                slideActiveClass: "rplgsw-slide-active",
                slideDuplicateActiveClass: "rplgsw-slide-duplicate-active",
                slideVisibleClass: "rplgsw-slide-visible",
                slideDuplicateClass: "rplgsw-slide-duplicate",
                slideNextClass: "rplgsw-slide-next",
                slideDuplicateNextClass: "rplgsw-slide-duplicate-next",
                slidePrevClass: "rplgsw-slide-prev",
                slideDuplicatePrevClass: "rplgsw-slide-duplicate-prev",
                wrapperClass: "rplgsw-wrapper",
                bulletClass: "rplgsw-pagination-bullet",
                bulletActiveClass: "rplgsw-pagination-bullet-active",
                buttonDisabledClass: "rplgsw-button-disabled",
                paginationCurrentClass: "rplgsw-pagination-current",
                paginationTotalClass: "rplgsw-pagination-total",
                paginationHiddenClass: "rplgsw-pagination-hidden",
                paginationProgressbarClass: "rplgsw-pagination-progressbar",
                paginationClickableClass: "rplgsw-pagination-clickable",
                paginationModifierClass: "rplgsw-pagination-",
                lazyLoadingClass: "rplgsw-lazy",
                lazyStatusLoadingClass: "rplgsw-lazy-loading",
                lazyStatusLoadedClass: "rplgsw-lazy-loaded",
                lazyPreloaderClass: "rplgsw-lazy-preloader",
                notificationClass: "rplgsw-notification",
                preloaderClass: "preloader",
                zoomContainerClass: "rplgsw-zoom-container",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            g = i && i.virtualTranslate;
        i = i || {};
        var f = {};
        for (var v in i)
            if ("object" != typeof i[v] || null === i[v] || (i[v].nodeType || i[v] === window || i[v] === document || void 0 !== t && i[v] instanceof t || "undefined" != typeof jQuery && i[v] instanceof jQuery)) f[v] = i[v];
            else {
                f[v] = {};
                for (var w in i[v]) f[v][w] = i[v][w]
            } for (var y in h)
            if (void 0 === i[y]) i[y] = h[y];
            else if ("object" == typeof i[y])
            for (var x in h[y]) void 0 === i[y][x] && (i[y][x] = h[y][x]);
        var T = this;
        if (T.params = i, T.originalParams = f, T.classNames = [], void 0 !== e && void 0 !== t && (e = t), (void 0 !== e || (e = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t)) && (T.$ = e, T.currentBreakpoint = void 0, T.getActiveBreakpoint = function() {
                if (!T.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in T.params.breakpoints) T.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function(e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var s = 0; s < t.length; s++)(e = t[s]) >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, T.setBreakpoint = function() {
                var e = T.getActiveBreakpoint();
                if (e && T.currentBreakpoint !== e) {
                    var a = e in T.params.breakpoints ? T.params.breakpoints[e] : T.originalParams,
                        t = T.params.loop && a.slidesPerView !== T.params.slidesPerView;
                    for (var s in a) T.params[s] = a[s];
                    T.currentBreakpoint = e, t && T.destroyLoop && T.reLoop(!0)
                }
            }, T.params.breakpoints && T.setBreakpoint(), T.container = e(s), 0 !== T.container.length)) {
            if (T.container.length > 1) {
                var b = [];
                return T.container.each(function() {
                    b.push(new a(this, i))
                }), b
            }
            T.container[0].rplgsw = T, T.container.data("rplgsw", T), T.classNames.push(T.params.containerModifierClass + T.params.direction), T.params.freeMode && T.classNames.push(T.params.containerModifierClass + "free-mode"), T.support.flexbox || (T.classNames.push(T.params.containerModifierClass + "no-flexbox"), T.params.slidesPerColumn = 1), T.params.autoHeight && T.classNames.push(T.params.containerModifierClass + "autoheight"), (T.params.parallax || T.params.watchSlidesVisibility) && (T.params.watchSlidesProgress = !0), T.params.touchReleaseOnEdges && (T.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(T.params.effect) >= 0 && (T.support.transforms3d ? (T.params.watchSlidesProgress = !0, T.classNames.push(T.params.containerModifierClass + "3d")) : T.params.effect = "slide"), "slide" !== T.params.effect && T.classNames.push(T.params.containerModifierClass + T.params.effect), "cube" === T.params.effect && (T.params.resistanceRatio = 0, T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.centeredSlides = !1, T.params.spaceBetween = 0, T.params.virtualTranslate = !0), "fade" !== T.params.effect && "flip" !== T.params.effect || (T.params.slidesPerView = 1, T.params.slidesPerColumn = 1, T.params.slidesPerGroup = 1, T.params.watchSlidesProgress = !0, T.params.spaceBetween = 0, void 0 === g && (T.params.virtualTranslate = !0)), T.params.grabCursor && T.support.touch && (T.params.grabCursor = !1), T.wrapper = T.container.children("." + T.params.wrapperClass), T.params.pagination && (T.paginationContainer = e(T.params.pagination), T.params.uniqueNavElements && "string" == typeof T.params.pagination && T.paginationContainer.length > 1 && 1 === T.container.find(T.params.pagination).length && (T.paginationContainer = T.container.find(T.params.pagination)), "bullets" === T.params.paginationType && T.params.paginationClickable ? T.paginationContainer.addClass(T.params.paginationModifierClass + "clickable") : T.params.paginationClickable = !1, T.paginationContainer.addClass(T.params.paginationModifierClass + T.params.paginationType)), (T.params.nextButton || T.params.prevButton) && (T.params.nextButton && (T.nextButton = e(T.params.nextButton), T.params.uniqueNavElements && "string" == typeof T.params.nextButton && T.nextButton.length > 1 && 1 === T.container.find(T.params.nextButton).length && (T.nextButton = T.container.find(T.params.nextButton))), T.params.prevButton && (T.prevButton = e(T.params.prevButton), T.params.uniqueNavElements && "string" == typeof T.params.prevButton && T.prevButton.length > 1 && 1 === T.container.find(T.params.prevButton).length && (T.prevButton = T.container.find(T.params.prevButton)))), T.isHorizontal = function() {
                    return "horizontal" === T.params.direction
                }, T.rtl = T.isHorizontal() && ("rtl" === T.container[0].dir.toLowerCase() || "rtl" === T.container.css("direction")), T.rtl && T.classNames.push(T.params.containerModifierClass + "rtl"), T.rtl && (T.wrongRTL = "-webkit-box" === T.wrapper.css("display")), T.params.slidesPerColumn > 1 && T.classNames.push(T.params.containerModifierClass + "multirow"), T.device.android && T.classNames.push(T.params.containerModifierClass + "android"), T.container.addClass(T.classNames.join(" ")), T.translate = 0, T.progress = 0, T.velocity = 0, T.lockSwipeToNext = function() {
                    T.params.allowSwipeToNext = !1, T.params.allowSwipeToPrev === !1 && T.params.grabCursor && T.unsetGrabCursor()
                }, T.lockSwipeToPrev = function() {
                    T.params.allowSwipeToPrev = !1, T.params.allowSwipeToNext === !1 && T.params.grabCursor && T.unsetGrabCursor()
                }, T.lockSwipes = function() {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !1, T.params.grabCursor && T.unsetGrabCursor()
                }, T.unlockSwipeToNext = function() {
                    T.params.allowSwipeToNext = !0, T.params.allowSwipeToPrev === !0 && T.params.grabCursor && T.setGrabCursor()
                }, T.unlockSwipeToPrev = function() {
                    T.params.allowSwipeToPrev = !0, T.params.allowSwipeToNext === !0 && T.params.grabCursor && T.setGrabCursor()
                }, T.unlockSwipes = function() {
                    T.params.allowSwipeToNext = T.params.allowSwipeToPrev = !0, T.params.grabCursor && T.setGrabCursor()
                }, T.setGrabCursor = function(e) {
                    T.container[0].style.cursor = "move", T.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", T.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", T.container[0].style.cursor = e ? "grabbing" : "grab"
                }, T.unsetGrabCursor = function() {
                    T.container[0].style.cursor = ""
                }, T.params.grabCursor && T.setGrabCursor(), T.imagesToLoad = [], T.imagesLoaded = 0, T.loadImage = function(e, a, t, s, i, r) {
                    function n() {
                        r && r()
                    }
                    var o;
                    e.complete && i ? n() : a ? (o = new window.Image, o.onload = n, o.onerror = n, s && (o.sizes = s), t && (o.srcset = t), a && (o.src = a)) : n()
                }, T.preloadImages = function() {
                    function e() {
                        void 0 !== T && null !== T && T && (void 0 !== T.imagesLoaded && T.imagesLoaded++, T.imagesLoaded === T.imagesToLoad.length && (T.params.updateOnImagesReady && T.update(), T.emit("onImagesReady", T)))
                    }
                    T.imagesToLoad = T.container.find("img");
                    for (var a = 0; a < T.imagesToLoad.length; a++) T.loadImage(T.imagesToLoad[a], T.imagesToLoad[a].currentSrc || T.imagesToLoad[a].getAttribute("src"), T.imagesToLoad[a].srcset || T.imagesToLoad[a].getAttribute("srcset"), T.imagesToLoad[a].sizes || T.imagesToLoad[a].getAttribute("sizes"), !0, e)
                }, T.autoplayTimeoutId = void 0, T.autoplaying = !1, T.autoplayPaused = !1, T.startAutoplay = function() {
                    return void 0 === T.autoplayTimeoutId && (!!T.params.autoplay && (!T.autoplaying && (T.autoplaying = !0, T.emit("onAutoplayStart", T), void n())))
                }, T.stopAutoplay = function(e) {
                    T.autoplayTimeoutId && (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplaying = !1, T.autoplayTimeoutId = void 0, T.emit("onAutoplayStop", T))
                }, T.pauseAutoplay = function(e) {
                    T.autoplayPaused || (T.autoplayTimeoutId && clearTimeout(T.autoplayTimeoutId), T.autoplayPaused = !0, 0 === e ? (T.autoplayPaused = !1, n()) : T.wrapper.transitionEnd(function() {
                        T && (T.autoplayPaused = !1, T.autoplaying ? n() : T.stopAutoplay())
                    }))
                }, T.minTranslate = function() {
                    return -T.snapGrid[0]
                }, T.maxTranslate = function() {
                    return -T.snapGrid[T.snapGrid.length - 1]
                }, T.updateAutoHeight = function() {
                    var e, a = [],
                        t = 0;
                    if ("auto" !== T.params.slidesPerView && T.params.slidesPerView > 1)
                        for (e = 0; e < Math.ceil(T.params.slidesPerView); e++) {
                            var s = T.activeIndex + e;
                            if (s > T.slides.length) break;
                            a.push(T.slides.eq(s)[0])
                        } else a.push(T.slides.eq(T.activeIndex)[0]);
                    for (e = 0; e < a.length; e++)
                        if (void 0 !== a[e]) {
                            var i = a[e].offsetHeight;
                            t = i > t ? i : t
                        } t && T.wrapper.css("height", t + "px")
                }, T.updateContainerSize = function() {
                    var e, a;
                    e = void 0 !== T.params.width ? T.params.width : T.container[0].clientWidth, a = void 0 !== T.params.height ? T.params.height : T.container[0].clientHeight, 0 === e && T.isHorizontal() || 0 === a && !T.isHorizontal() || (e = e - parseInt(T.container.css("padding-left"), 10) - parseInt(T.container.css("padding-right"), 10), a = a - parseInt(T.container.css("padding-top"), 10) - parseInt(T.container.css("padding-bottom"), 10), T.width = e, T.height = a, T.size = T.isHorizontal() ? T.width : T.height)
                }, T.updateSlidesSize = function() {
                    T.slides = T.wrapper.children("." + T.params.slideClass), T.snapGrid = [], T.slidesGrid = [], T.slidesSizesGrid = [];
                    var e, a = T.params.spaceBetween,
                        t = -T.params.slidesOffsetBefore,
                        s = 0,
                        i = 0;
                    if (void 0 !== T.size) {
                        "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * T.size), T.virtualSize = -a, T.rtl ? T.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : T.slides.css({
                            marginRight: "",
                            marginBottom: ""
                        });
                        var n;
                        T.params.slidesPerColumn > 1 && (n = Math.floor(T.slides.length / T.params.slidesPerColumn) === T.slides.length / T.params.slidesPerColumn ? T.slides.length : Math.ceil(T.slides.length / T.params.slidesPerColumn) * T.params.slidesPerColumn, "auto" !== T.params.slidesPerView && "row" === T.params.slidesPerColumnFill && (n = Math.max(n, T.params.slidesPerView * T.params.slidesPerColumn)));
                        var o, l = T.params.slidesPerColumn,
                            p = n / l,
                            d = p - (T.params.slidesPerColumn * p - T.slides.length);
                        for (e = 0; e < T.slides.length; e++) {
                            o = 0;
                            var u = T.slides.eq(e);
                            if (T.params.slidesPerColumn > 1) {
                                var c, m, h;
                                "column" === T.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                                    "-webkit-box-ordinal-group": c,
                                    "-moz-box-ordinal-group": c,
                                    "-ms-flex-order": c,
                                    "-webkit-order": c,
                                    order: c
                                })) : (h = Math.floor(e / p), m = e - h * p), u.css("margin-" + (T.isHorizontal() ? "top" : "left"), 0 !== h && T.params.spaceBetween && T.params.spaceBetween + "px").attr("data-rplgsw-column", m).attr("data-rplgsw-row", h)
                            }
                            "none" !== u.css("display") && ("auto" === T.params.slidesPerView ? (o = T.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), T.params.roundLengths && (o = r(o))) : (o = (T.size - (T.params.slidesPerView - 1) * a) / T.params.slidesPerView, T.params.roundLengths && (o = r(o)), T.isHorizontal() ? T.slides[e].style.width = o + "px" : T.slides[e].style.height = o + "px"), T.slides[e].rplgswSlideSize = o, T.slidesSizesGrid.push(o), T.params.centeredSlides ? (t = t + o / 2 + s / 2 + a, 0 === s && 0 !== e && (t = t - T.size / 2 - a), 0 === e && (t = t - T.size / 2 - a), Math.abs(t) < .001 && (t = 0), i % T.params.slidesPerGroup == 0 && T.snapGrid.push(t), T.slidesGrid.push(t)) : (i % T.params.slidesPerGroup == 0 && T.snapGrid.push(t), T.slidesGrid.push(t), t = t + o + a), T.virtualSize += o + a, s = o, i++)
                        }
                        T.virtualSize = Math.max(T.virtualSize, T.size) + T.params.slidesOffsetAfter;
                        var g;
                        if (T.rtl && T.wrongRTL && ("slide" === T.params.effect || "coverflow" === T.params.effect) && T.wrapper.css({
                                width: T.virtualSize + T.params.spaceBetween + "px"
                            }), T.support.flexbox && !T.params.setWrapperSize || (T.isHorizontal() ? T.wrapper.css({
                                width: T.virtualSize + T.params.spaceBetween + "px"
                            }) : T.wrapper.css({
                                height: T.virtualSize + T.params.spaceBetween + "px"
                            })), T.params.slidesPerColumn > 1 && (T.virtualSize = (o + T.params.spaceBetween) * n, T.virtualSize = Math.ceil(T.virtualSize / T.params.slidesPerColumn) - T.params.spaceBetween, T.isHorizontal() ? T.wrapper.css({
                                width: T.virtualSize + T.params.spaceBetween + "px"
                            }) : T.wrapper.css({
                                height: T.virtualSize + T.params.spaceBetween + "px"
                            }), T.params.centeredSlides)) {
                            for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] < T.virtualSize + T.snapGrid[0] && g.push(T.snapGrid[e]);
                            T.snapGrid = g
                        }
                        if (!T.params.centeredSlides) {
                            for (g = [], e = 0; e < T.snapGrid.length; e++) T.snapGrid[e] <= T.virtualSize - T.size && g.push(T.snapGrid[e]);
                            T.snapGrid = g, Math.floor(T.virtualSize - T.size) - Math.floor(T.snapGrid[T.snapGrid.length - 1]) > 1 && T.snapGrid.push(T.virtualSize - T.size)
                        }
                        0 === T.snapGrid.length && (T.snapGrid = [0]), 0 !== T.params.spaceBetween && (T.isHorizontal() ? T.rtl ? T.slides.css({
                            marginLeft: a + "px"
                        }) : T.slides.css({
                            marginRight: a + "px"
                        }) : T.slides.css({
                            marginBottom: a + "px"
                        })), T.params.watchSlidesProgress && T.updateSlidesOffset()
                    }
                }, T.updateSlidesOffset = function() {
                    for (var e = 0; e < T.slides.length; e++) T.slides[e].rplgswSlideOffset = T.isHorizontal() ? T.slides[e].offsetLeft : T.slides[e].offsetTop
                }, T.currentSlidesPerView = function() {
                    var e, a, t = 1;
                    if (T.params.centeredSlides) {
                        var s, i = T.slides[T.activeIndex].rplgswSlideSize;
                        for (e = T.activeIndex + 1; e < T.slides.length; e++) T.slides[e] && !s && (i += T.slides[e].rplgswSlideSize, t++, i > T.size && (s = !0));
                        for (a = T.activeIndex - 1; a >= 0; a--) T.slides[a] && !s && (i += T.slides[a].rplgswSlideSize, t++, i > T.size && (s = !0))
                    } else
                        for (e = T.activeIndex + 1; e < T.slides.length; e++) T.slidesGrid[e] - T.slidesGrid[T.activeIndex] < T.size && t++;
                    return t
                }, T.updateSlidesProgress = function(e) {
                    if (void 0 === e && (e = T.translate || 0), 0 !== T.slides.length) {
                        void 0 === T.slides[0].rplgswSlideOffset && T.updateSlidesOffset();
                        var a = -e;
                        T.rtl && (a = e), T.slides.removeClass(T.params.slideVisibleClass);
                        for (var t = 0; t < T.slides.length; t++) {
                            var s = T.slides[t],
                                i = (a + (T.params.centeredSlides ? T.minTranslate() : 0) - s.rplgswSlideOffset) / (s.rplgswSlideSize + T.params.spaceBetween);
                            if (T.params.watchSlidesVisibility) {
                                var r = -(a - s.rplgswSlideOffset),
                                    n = r + T.slidesSizesGrid[t];
                                (r >= 0 && r < T.size || n > 0 && n <= T.size || r <= 0 && n >= T.size) && T.slides.eq(t).addClass(T.params.slideVisibleClass)
                            }
                            s.progress = T.rtl ? -i : i
                        }
                    }
                }, T.updateProgress = function(e) {
                    void 0 === e && (e = T.translate || 0);
                    var a = T.maxTranslate() - T.minTranslate(),
                        t = T.isBeginning,
                        s = T.isEnd;
                    0 === a ? (T.progress = 0, T.isBeginning = T.isEnd = !0) : (T.progress = (e - T.minTranslate()) / a, T.isBeginning = T.progress <= 0, T.isEnd = T.progress >= 1), T.isBeginning && !t && T.emit("onReachBeginning", T), T.isEnd && !s && T.emit("onReachEnd", T), T.params.watchSlidesProgress && T.updateSlidesProgress(e), T.emit("onProgress", T, T.progress)
                }, T.updateActiveIndex = function() {
                    var e, a, t, s = T.rtl ? T.translate : -T.translate;
                    for (a = 0; a < T.slidesGrid.length; a++) void 0 !== T.slidesGrid[a + 1] ? s >= T.slidesGrid[a] && s < T.slidesGrid[a + 1] - (T.slidesGrid[a + 1] - T.slidesGrid[a]) / 2 ? e = a : s >= T.slidesGrid[a] && s < T.slidesGrid[a + 1] && (e = a + 1) : s >= T.slidesGrid[a] && (e = a);
                    T.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), t = Math.floor(e / T.params.slidesPerGroup), t >= T.snapGrid.length && (t = T.snapGrid.length - 1), e !== T.activeIndex && (T.snapIndex = t, T.previousIndex = T.activeIndex, T.activeIndex = e, T.updateClasses(), T.updateRealIndex())
                }, T.updateRealIndex = function() {
                    T.realIndex = parseInt(T.slides.eq(T.activeIndex).attr("data-rplgsw-slide-index") || T.activeIndex, 10)
                }, T.updateClasses = function() {
                    T.slides.removeClass(T.params.slideActiveClass + " " + T.params.slideNextClass + " " + T.params.slidePrevClass + " " + T.params.slideDuplicateActiveClass + " " + T.params.slideDuplicateNextClass + " " + T.params.slideDuplicatePrevClass);
                    var a = T.slides.eq(T.activeIndex);
                    a.addClass(T.params.slideActiveClass), i.loop && (a.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + T.realIndex + '"]').addClass(T.params.slideDuplicateActiveClass));
                    var t = a.next("." + T.params.slideClass).addClass(T.params.slideNextClass);
                    T.params.loop && 0 === t.length && (t = T.slides.eq(0), t.addClass(T.params.slideNextClass));
                    var s = a.prev("." + T.params.slideClass).addClass(T.params.slidePrevClass);
                    if (T.params.loop && 0 === s.length && (s = T.slides.eq(-1), s.addClass(T.params.slidePrevClass)), i.loop && (t.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + t.attr("data-rplgsw-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + t.attr("data-rplgsw-slide-index") + '"]').addClass(T.params.slideDuplicateNextClass), s.hasClass(T.params.slideDuplicateClass) ? T.wrapper.children("." + T.params.slideClass + ":not(." + T.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + s.attr("data-rplgsw-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass) : T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + s.attr("data-rplgsw-slide-index") + '"]').addClass(T.params.slideDuplicatePrevClass)), T.paginationContainer && T.paginationContainer.length > 0) {
                        var r, n = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length;
                        if (T.params.loop ? (r = Math.ceil((T.activeIndex - T.loopedSlides) / T.params.slidesPerGroup), r > T.slides.length - 1 - 2 * T.loopedSlides && (r -= T.slides.length - 2 * T.loopedSlides), r > n - 1 && (r -= n), r < 0 && "bullets" !== T.params.paginationType && (r = n + r)) : r = void 0 !== T.snapIndex ? T.snapIndex : T.activeIndex || 0, "bullets" === T.params.paginationType && T.bullets && T.bullets.length > 0 && (T.bullets.removeClass(T.params.bulletActiveClass), T.paginationContainer.length > 1 ? T.bullets.each(function() {
                                e(this).index() === r && e(this).addClass(T.params.bulletActiveClass)
                            }) : T.bullets.eq(r).addClass(T.params.bulletActiveClass)), "fraction" === T.params.paginationType && (T.paginationContainer.find("." + T.params.paginationCurrentClass).text(r + 1), T.paginationContainer.find("." + T.params.paginationTotalClass).text(n)), "progress" === T.params.paginationType) {
                            var o = (r + 1) / n,
                                l = o,
                                p = 1;
                            T.isHorizontal() || (p = o, l = 1), T.paginationContainer.find("." + T.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")").transition(T.params.speed)
                        }
                        "custom" === T.params.paginationType && T.params.paginationCustomRender && (T.paginationContainer.html(T.params.paginationCustomRender(T, r + 1, n)), T.emit("onPaginationRendered", T, T.paginationContainer[0]))
                    }
                    T.params.loop || (T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.isBeginning ? (T.prevButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.prevButton)) : (T.prevButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.prevButton))), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.isEnd ? (T.nextButton.addClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.disable(T.nextButton)) : (T.nextButton.removeClass(T.params.buttonDisabledClass), T.params.a11y && T.a11y && T.a11y.enable(T.nextButton))))
                }, T.updatePagination = function() {
                    if (T.params.pagination && T.paginationContainer && T.paginationContainer.length > 0) {
                        var e = "";
                        if ("bullets" === T.params.paginationType) {
                            for (var a = T.params.loop ? Math.ceil((T.slides.length - 2 * T.loopedSlides) / T.params.slidesPerGroup) : T.snapGrid.length, t = 0; t < a; t++) e += T.params.paginationBulletRender ? T.params.paginationBulletRender(T, t, T.params.bulletClass) : "<" + T.params.paginationElement + ' class="' + T.params.bulletClass + '"></' + T.params.paginationElement + ">";
                            T.paginationContainer.html(e), T.bullets = T.paginationContainer.find("." + T.params.bulletClass), T.params.paginationClickable && T.params.a11y && T.a11y && T.a11y.initPagination()
                        }
                        "fraction" === T.params.paginationType && (e = T.params.paginationFractionRender ? T.params.paginationFractionRender(T, T.params.paginationCurrentClass, T.params.paginationTotalClass) : '<span class="' + T.params.paginationCurrentClass + '"></span> / <span class="' + T.params.paginationTotalClass + '"></span>', T.paginationContainer.html(e)), "progress" === T.params.paginationType && (e = T.params.paginationProgressRender ? T.params.paginationProgressRender(T, T.params.paginationProgressbarClass) : '<span class="' + T.params.paginationProgressbarClass + '"></span>', T.paginationContainer.html(e)), "custom" !== T.params.paginationType && T.emit("onPaginationRendered", T, T.paginationContainer[0])
                    }
                }, T.update = function(e) {
                    function a() {
                        T.rtl, T.translate;
                        t = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate()), T.setWrapperTranslate(t), T.updateActiveIndex(), T.updateClasses()
                    }
                    if (T) {
                        T.updateContainerSize(), T.updateSlidesSize(), T.updateProgress(), T.updatePagination(), T.updateClasses(), T.params.scrollbar && T.scrollbar && T.scrollbar.set();
                        var t;
                        if (e) {
                            T.controller && T.controller.spline && (T.controller.spline = void 0), T.params.freeMode ? (a(), T.params.autoHeight && T.updateAutoHeight()) : (("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0)) || a()
                        } else T.params.autoHeight && T.updateAutoHeight()
                    }
                }, T.onResize = function(e) {
                    T.params.onBeforeResize && T.params.onBeforeResize(T), T.params.breakpoints && T.setBreakpoint();
                    var a = T.params.allowSwipeToPrev,
                        t = T.params.allowSwipeToNext;
                    T.params.allowSwipeToPrev = T.params.allowSwipeToNext = !0, T.updateContainerSize(), T.updateSlidesSize(), ("auto" === T.params.slidesPerView || T.params.freeMode || e) && T.updatePagination(), T.params.scrollbar && T.scrollbar && T.scrollbar.set(), T.controller && T.controller.spline && (T.controller.spline = void 0);
                    var s = !1;
                    if (T.params.freeMode) {
                        var i = Math.min(Math.max(T.translate, T.maxTranslate()), T.minTranslate());
                        T.setWrapperTranslate(i), T.updateActiveIndex(), T.updateClasses(), T.params.autoHeight && T.updateAutoHeight()
                    } else T.updateClasses(), s = ("auto" === T.params.slidesPerView || T.params.slidesPerView > 1) && T.isEnd && !T.params.centeredSlides ? T.slideTo(T.slides.length - 1, 0, !1, !0) : T.slideTo(T.activeIndex, 0, !1, !0);
                    T.params.lazyLoading && !s && T.lazy && T.lazy.load(), T.params.allowSwipeToPrev = a, T.params.allowSwipeToNext = t, T.params.onAfterResize && T.params.onAfterResize(T)
                }, T.touchEventsDesktop = {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                }, window.navigator.pointerEnabled ? T.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (T.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), T.touchEvents = {
                    start: T.support.touch || !T.params.simulateTouch ? "touchstart" : T.touchEventsDesktop.start,
                    move: T.support.touch || !T.params.simulateTouch ? "touchmove" : T.touchEventsDesktop.move,
                    end: T.support.touch || !T.params.simulateTouch ? "touchend" : T.touchEventsDesktop.end
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === T.params.touchEventsTarget ? T.container : T.wrapper).addClass("rplgsw-wp8-" + T.params.direction), T.initEvents = function(e) {
                    var a = e ? "off" : "on",
                        t = e ? "removeEventListener" : "addEventListener",
                        s = "container" === T.params.touchEventsTarget ? T.container[0] : T.wrapper[0],
                        r = T.support.touch ? s : document,
                        n = !!T.params.nested;
                    if (T.browser.ie) s[t](T.touchEvents.start, T.onTouchStart, !1), r[t](T.touchEvents.move, T.onTouchMove, n), r[t](T.touchEvents.end, T.onTouchEnd, !1);
                    else {
                        if (T.support.touch) {
                            var o = !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s[t](T.touchEvents.start, T.onTouchStart, o), s[t](T.touchEvents.move, T.onTouchMove, n), s[t](T.touchEvents.end, T.onTouchEnd, o)
                        }(i.simulateTouch && !T.device.ios && !T.device.android || i.simulateTouch && !T.support.touch && T.device.ios) && (s[t]("mousedown", T.onTouchStart, !1), document[t]("mousemove", T.onTouchMove, n), document[t]("mouseup", T.onTouchEnd, !1))
                    }
                    window[t]("resize", T.onResize), T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.nextButton[a]("click", T.onClickNext), T.params.a11y && T.a11y && T.nextButton[a]("keydown", T.a11y.onEnterKey)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.prevButton[a]("click", T.onClickPrev), T.params.a11y && T.a11y && T.prevButton[a]("keydown", T.a11y.onEnterKey)), T.params.pagination && T.params.paginationClickable && (T.paginationContainer[a]("click", "." + T.params.bulletClass, T.onClickIndex), T.params.a11y && T.a11y && T.paginationContainer[a]("keydown", "." + T.params.bulletClass, T.a11y.onEnterKey)), (T.params.preventClicks || T.params.preventClicksPropagation) && s[t]("click", T.preventClicks, !0)
                }, T.attachEvents = function() {
                    T.initEvents()
                }, T.detachEvents = function() {
                    T.initEvents(!0)
                }, T.allowClick = !0, T.preventClicks = function(e) {
                    T.allowClick || (T.params.preventClicks && e.preventDefault(), T.params.preventClicksPropagation && T.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, T.onClickNext = function(e) {
                    e.preventDefault(), T.isEnd && !T.params.loop || T.slideNext()
                }, T.onClickPrev = function(e) {
                    e.preventDefault(), T.isBeginning && !T.params.loop || T.slidePrev()
                }, T.onClickIndex = function(a) {
                    a.preventDefault();
                    var t = e(this).index() * T.params.slidesPerGroup;
                    T.params.loop && (t += T.loopedSlides), T.slideTo(t)
                },
                T.updateClickedSlide = function(a) {
                    var t = o(a, "." + T.params.slideClass),
                        s = !1;
                    if (t)
                        for (var i = 0; i < T.slides.length; i++) T.slides[i] === t && (s = !0);
                    if (!t || !s) return T.clickedSlide = void 0, void(T.clickedIndex = void 0);
                    if (T.clickedSlide = t, T.clickedIndex = e(t).index(), T.params.slideToClickedSlide && void 0 !== T.clickedIndex && T.clickedIndex !== T.activeIndex) {
                        var r, n = T.clickedIndex,
                            l = "auto" === T.params.slidesPerView ? T.currentSlidesPerView() : T.params.slidesPerView;
                        if (T.params.loop) {
                            if (T.animating) return;
                            r = parseInt(e(T.clickedSlide).attr("data-rplgsw-slide-index"), 10), T.params.centeredSlides ? n < T.loopedSlides - l / 2 || n > T.slides.length - T.loopedSlides + l / 2 ? (T.fixLoop(), n = T.wrapper.children("." + T.params.slideClass + '[data-rplgsw-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                T.slideTo(n)
                            }, 0)) : T.slideTo(n) : n > T.slides.length - l ? (T.fixLoop(), n = T.wrapper.children("." + T.params.slideClass + '[data-rplgsw-slide-index="' + r + '"]:not(.' + T.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                T.slideTo(n)
                            }, 0)) : T.slideTo(n)
                        } else T.slideTo(n)
                    }
                };
            var S, C, z, M, E, P, I, k, L, D, B = "input, select, textarea, button, video",
                H = Date.now(),
                G = [];
            T.animating = !1, T.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var X, A;
            T.onTouchStart = function(a) {
                if (a.originalEvent && (a = a.originalEvent), (X = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                    if (T.params.noSwiping && o(a, "." + T.params.noSwipingClass)) return void(T.allowClick = !0);
                    if (!T.params.swipeHandler || o(a, T.params.swipeHandler)) {
                        var t = T.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                            s = T.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                        if (!(T.device.ios && T.params.iOSEdgeSwipeDetection && t <= T.params.iOSEdgeSwipeThreshold)) {
                            if (S = !0, C = !1, z = !0, E = void 0, A = void 0, T.touches.startX = t, T.touches.startY = s, M = Date.now(), T.allowClick = !0, T.updateContainerSize(), T.swipeDirection = void 0, T.params.threshold > 0 && (k = !1), "touchstart" !== a.type) {
                                var i = !0;
                                e(a.target).is(B) && (i = !1), document.activeElement && e(document.activeElement).is(B) && document.activeElement.blur(), i && a.preventDefault()
                            }
                            T.emit("onTouchStart", T, a)
                        }
                    }
                }
            }, T.onTouchMove = function(a) {
                if (a.originalEvent && (a = a.originalEvent), !X || "mousemove" !== a.type) {
                    if (a.preventedByNestedRplgsw) return T.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(T.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
                    if (T.params.onlyExternal) return T.allowClick = !1, void(S && (T.touches.startX = T.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, T.touches.startY = T.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, M = Date.now()));
                    if (X && T.params.touchReleaseOnEdges && !T.params.loop)
                        if (T.isHorizontal()) {
                            if (T.touches.currentX < T.touches.startX && T.translate <= T.maxTranslate() || T.touches.currentX > T.touches.startX && T.translate >= T.minTranslate()) return
                        } else if (T.touches.currentY < T.touches.startY && T.translate <= T.maxTranslate() || T.touches.currentY > T.touches.startY && T.translate >= T.minTranslate()) return;
                    if (X && document.activeElement && a.target === document.activeElement && e(a.target).is(B)) return C = !0, void(T.allowClick = !1);
                    if (z && T.emit("onTouchMove", T, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (T.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, T.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === E) {
                            var t;
                            T.isHorizontal() && T.touches.currentY === T.touches.startY || !T.isHorizontal() && T.touches.currentX === T.touches.startX ? E = !1 : (t = 180 * Math.atan2(Math.abs(T.touches.currentY - T.touches.startY), Math.abs(T.touches.currentX - T.touches.startX)) / Math.PI, E = T.isHorizontal() ? t > T.params.touchAngle : 90 - t > T.params.touchAngle)
                        }
                        if (E && T.emit("onTouchMoveOpposite", T, a), void 0 === A && (T.touches.currentX === T.touches.startX && T.touches.currentY === T.touches.startY || (A = !0)), S) {
                            if (E) return void(S = !1);
                            if (A) {
                                T.allowClick = !1, T.emit("onSliderMove", T, a), a.preventDefault(), T.params.touchMoveStopPropagation && !T.params.nested && a.stopPropagation(), C || (i.loop && T.fixLoop(), I = T.getWrapperTranslate(), T.setWrapperTransition(0), T.animating && T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), T.params.autoplay && T.autoplaying && (T.params.autoplayDisableOnInteraction ? T.stopAutoplay() : T.pauseAutoplay()), D = !1, !T.params.grabCursor || T.params.allowSwipeToNext !== !0 && T.params.allowSwipeToPrev !== !0 || T.setGrabCursor(!0)), C = !0;
                                var s = T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY;
                                s *= T.params.touchRatio, T.rtl && (s = -s), T.swipeDirection = s > 0 ? "prev" : "next", P = s + I;
                                var r = !0;
                                if (s > 0 && P > T.minTranslate() ? (r = !1, T.params.resistance && (P = T.minTranslate() - 1 + Math.pow(-T.minTranslate() + I + s, T.params.resistanceRatio))) : s < 0 && P < T.maxTranslate() && (r = !1, T.params.resistance && (P = T.maxTranslate() + 1 - Math.pow(T.maxTranslate() - I - s, T.params.resistanceRatio))), r && (a.preventedByNestedRplgsw = !0), !T.params.allowSwipeToNext && "next" === T.swipeDirection && P < I && (P = I), !T.params.allowSwipeToPrev && "prev" === T.swipeDirection && P > I && (P = I), T.params.threshold > 0) {
                                    if (!(Math.abs(s) > T.params.threshold || k)) return void(P = I);
                                    if (!k) return k = !0, T.touches.startX = T.touches.currentX, T.touches.startY = T.touches.currentY, P = I, void(T.touches.diff = T.isHorizontal() ? T.touches.currentX - T.touches.startX : T.touches.currentY - T.touches.startY)
                                }
                                T.params.followFinger && ((T.params.freeMode || T.params.watchSlidesProgress) && T.updateActiveIndex(), T.params.freeMode && (0 === G.length && G.push({
                                    position: T.touches[T.isHorizontal() ? "startX" : "startY"],
                                    time: M
                                }), G.push({
                                    position: T.touches[T.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })), T.updateProgress(P), T.setWrapperTranslate(P))
                            }
                        }
                    }
                }
            }, T.onTouchEnd = function(a) {
                if (a.originalEvent && (a = a.originalEvent), z && T.emit("onTouchEnd", T, a), z = !1, S) {
                    T.params.grabCursor && C && S && (T.params.allowSwipeToNext === !0 || T.params.allowSwipeToPrev === !0) && T.setGrabCursor(!1);
                    var t = Date.now(),
                        s = t - M;
                    if (T.allowClick && (T.updateClickedSlide(a), T.emit("onTap", T, a), s < 300 && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function() {
                            T && (T.params.paginationHide && T.paginationContainer.length > 0 && !e(a.target).hasClass(T.params.bulletClass) && T.paginationContainer.toggleClass(T.params.paginationHiddenClass), T.emit("onClick", T, a))
                        }, 300)), s < 300 && t - H < 300 && (L && clearTimeout(L), T.emit("onDoubleTap", T, a))), H = Date.now(), setTimeout(function() {
                            T && (T.allowClick = !0)
                        }, 0), !S || !C || !T.swipeDirection || 0 === T.touches.diff || P === I) return void(S = C = !1);
                    S = C = !1;
                    var i;
                    if (i = T.params.followFinger ? T.rtl ? T.translate : -T.translate : -P, T.params.freeMode) {
                        if (i < -T.minTranslate()) return void T.slideTo(T.activeIndex);
                        if (i > -T.maxTranslate()) return void(T.slides.length < T.snapGrid.length ? T.slideTo(T.snapGrid.length - 1) : T.slideTo(T.slides.length - 1));
                        if (T.params.freeModeMomentum) {
                            if (G.length > 1) {
                                var r = G.pop(),
                                    n = G.pop(),
                                    o = r.position - n.position,
                                    l = r.time - n.time;
                                T.velocity = o / l, T.velocity = T.velocity / 2, Math.abs(T.velocity) < T.params.freeModeMinimumVelocity && (T.velocity = 0), (l > 150 || (new window.Date).getTime() - r.time > 300) && (T.velocity = 0)
                            } else T.velocity = 0;
                            T.velocity = T.velocity * T.params.freeModeMomentumVelocityRatio, G.length = 0;
                            var p = 1e3 * T.params.freeModeMomentumRatio,
                                d = T.velocity * p,
                                u = T.translate + d;
                            T.rtl && (u = -u);
                            var c, m = !1,
                                h = 20 * Math.abs(T.velocity) * T.params.freeModeMomentumBounceRatio;
                            if (u < T.maxTranslate()) T.params.freeModeMomentumBounce ? (u + T.maxTranslate() < -h && (u = T.maxTranslate() - h), c = T.maxTranslate(), m = !0, D = !0) : u = T.maxTranslate();
                            else if (u > T.minTranslate()) T.params.freeModeMomentumBounce ? (u - T.minTranslate() > h && (u = T.minTranslate() + h), c = T.minTranslate(), m = !0, D = !0) : u = T.minTranslate();
                            else if (T.params.freeModeSticky) {
                                var g, f = 0;
                                for (f = 0; f < T.snapGrid.length; f += 1)
                                    if (T.snapGrid[f] > -u) {
                                        g = f;
                                        break
                                    } u = Math.abs(T.snapGrid[g] - u) < Math.abs(T.snapGrid[g - 1] - u) || "next" === T.swipeDirection ? T.snapGrid[g] : T.snapGrid[g - 1], T.rtl || (u = -u)
                            }
                            if (0 !== T.velocity) p = T.rtl ? Math.abs((-u - T.translate) / T.velocity) : Math.abs((u - T.translate) / T.velocity);
                            else if (T.params.freeModeSticky) return void T.slideReset();
                            T.params.freeModeMomentumBounce && m ? (T.updateProgress(c), T.setWrapperTransition(p), T.setWrapperTranslate(u), T.onTransitionStart(), T.animating = !0, T.wrapper.transitionEnd(function() {
                                T && D && (T.emit("onMomentumBounce", T), T.setWrapperTransition(T.params.speed), T.setWrapperTranslate(c), T.wrapper.transitionEnd(function() {
                                    T && T.onTransitionEnd()
                                }))
                            })) : T.velocity ? (T.updateProgress(u), T.setWrapperTransition(p), T.setWrapperTranslate(u), T.onTransitionStart(), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function() {
                                T && T.onTransitionEnd()
                            }))) : T.updateProgress(u), T.updateActiveIndex()
                        }
                        return void((!T.params.freeModeMomentum || s >= T.params.longSwipesMs) && (T.updateProgress(), T.updateActiveIndex()))
                    }
                    var v, w = 0,
                        y = T.slidesSizesGrid[0];
                    for (v = 0; v < T.slidesGrid.length; v += T.params.slidesPerGroup) void 0 !== T.slidesGrid[v + T.params.slidesPerGroup] ? i >= T.slidesGrid[v] && i < T.slidesGrid[v + T.params.slidesPerGroup] && (w = v, y = T.slidesGrid[v + T.params.slidesPerGroup] - T.slidesGrid[v]) : i >= T.slidesGrid[v] && (w = v, y = T.slidesGrid[T.slidesGrid.length - 1] - T.slidesGrid[T.slidesGrid.length - 2]);
                    var x = (i - T.slidesGrid[w]) / y;
                    if (s > T.params.longSwipesMs) {
                        if (!T.params.longSwipes) return void T.slideTo(T.activeIndex);
                        "next" === T.swipeDirection && (x >= T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w)), "prev" === T.swipeDirection && (x > 1 - T.params.longSwipesRatio ? T.slideTo(w + T.params.slidesPerGroup) : T.slideTo(w))
                    } else {
                        if (!T.params.shortSwipes) return void T.slideTo(T.activeIndex);
                        "next" === T.swipeDirection && T.slideTo(w + T.params.slidesPerGroup), "prev" === T.swipeDirection && T.slideTo(w)
                    }
                }
            }, T._slideTo = function(e, a) {
                return T.slideTo(e, a, !0, !0)
            }, T.slideTo = function(e, a, t, s) {
                void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), T.snapIndex = Math.floor(e / T.params.slidesPerGroup), T.snapIndex >= T.snapGrid.length && (T.snapIndex = T.snapGrid.length - 1);
                var i = -T.snapGrid[T.snapIndex];
                if (T.params.autoplay && T.autoplaying && (s || !T.params.autoplayDisableOnInteraction ? T.pauseAutoplay(a) : T.stopAutoplay()), T.updateProgress(i), T.params.normalizeSlideIndex)
                    for (var r = 0; r < T.slidesGrid.length; r++) - Math.floor(100 * i) >= Math.floor(100 * T.slidesGrid[r]) && (e = r);
                return !(!T.params.allowSwipeToNext && i < T.translate && i < T.minTranslate()) && (!(!T.params.allowSwipeToPrev && i > T.translate && i > T.maxTranslate() && (T.activeIndex || 0) !== e) && (void 0 === a && (a = T.params.speed), T.previousIndex = T.activeIndex || 0, T.activeIndex = e, T.updateRealIndex(), T.rtl && -i === T.translate || !T.rtl && i === T.translate ? (T.params.autoHeight && T.updateAutoHeight(), T.updateClasses(), "slide" !== T.params.effect && T.setWrapperTranslate(i), !1) : (T.updateClasses(), T.onTransitionStart(t), 0 === a || T.browser.lteIE9 ? (T.setWrapperTranslate(i), T.setWrapperTransition(0), T.onTransitionEnd(t)) : (T.setWrapperTranslate(i), T.setWrapperTransition(a), T.animating || (T.animating = !0, T.wrapper.transitionEnd(function() {
                    T && T.onTransitionEnd(t)
                }))), !0)))
            }, T.onTransitionStart = function(e) {
                void 0 === e && (e = !0), T.params.autoHeight && T.updateAutoHeight(), T.lazy && T.lazy.onTransitionStart(), e && (T.emit("onTransitionStart", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeStart", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextStart", T) : T.emit("onSlidePrevStart", T)))
            }, T.onTransitionEnd = function(e) {
                T.animating = !1, T.setWrapperTransition(0), void 0 === e && (e = !0), T.lazy && T.lazy.onTransitionEnd(), e && (T.emit("onTransitionEnd", T), T.activeIndex !== T.previousIndex && (T.emit("onSlideChangeEnd", T), T.activeIndex > T.previousIndex ? T.emit("onSlideNextEnd", T) : T.emit("onSlidePrevEnd", T))), T.params.history && T.history && T.history.setHistory(T.params.history, T.activeIndex), T.params.hashnav && T.hashnav && T.hashnav.setHash()
            }, T.slideNext = function(e, a, t) {
                if (T.params.loop) {
                    if (T.animating) return !1;
                    T.fixLoop();
                    T.container[0].clientLeft;
                    return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t)
                }
                return T.slideTo(T.activeIndex + T.params.slidesPerGroup, a, e, t)
            }, T._slideNext = function(e) {
                return T.slideNext(!0, e, !0)
            }, T.slidePrev = function(e, a, t) {
                if (T.params.loop) {
                    if (T.animating) return !1;
                    T.fixLoop();
                    T.container[0].clientLeft;
                    return T.slideTo(T.activeIndex - 1, a, e, t)
                }
                return T.slideTo(T.activeIndex - 1, a, e, t)
            }, T._slidePrev = function(e) {
                return T.slidePrev(!0, e, !0)
            }, T.slideReset = function(e, a, t) {
                return T.slideTo(T.activeIndex, a, e)
            }, T.disableTouchControl = function() {
                return T.params.onlyExternal = !0, !0
            }, T.enableTouchControl = function() {
                return T.params.onlyExternal = !1, !0
            }, T.setWrapperTransition = function(e, a) {
                T.wrapper.transition(e), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTransition(e), T.params.parallax && T.parallax && T.parallax.setTransition(e), T.params.scrollbar && T.scrollbar && T.scrollbar.setTransition(e), T.params.control && T.controller && T.controller.setTransition(e, a), T.emit("onSetTransition", T, e)
            }, T.setWrapperTranslate = function(e, a, t) {
                var s = 0,
                    i = 0;
                T.isHorizontal() ? s = T.rtl ? -e : e : i = e, T.params.roundLengths && (s = r(s), i = r(i)), T.params.virtualTranslate || (T.support.transforms3d ? T.wrapper.transform("translate3d(" + s + "px, " + i + "px, 0px)") : T.wrapper.transform("translate(" + s + "px, " + i + "px)")), T.translate = T.isHorizontal() ? s : i;
                var n, o = T.maxTranslate() - T.minTranslate();
                n = 0 === o ? 0 : (e - T.minTranslate()) / o, n !== T.progress && T.updateProgress(e), a && T.updateActiveIndex(), "slide" !== T.params.effect && T.effects[T.params.effect] && T.effects[T.params.effect].setTranslate(T.translate), T.params.parallax && T.parallax && T.parallax.setTranslate(T.translate), T.params.scrollbar && T.scrollbar && T.scrollbar.setTranslate(T.translate), T.params.control && T.controller && T.controller.setTranslate(T.translate, t), T.emit("onSetTranslate", T, T.translate)
            }, T.getTranslate = function(e, a) {
                var t, s, i, r;
                return void 0 === a && (a = "x"), T.params.virtualTranslate ? T.rtl ? -T.translate : T.translate : (i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (s = i.transform || i.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")), r = new window.WebKitCSSMatrix("none" === s ? "" : s)) : (r = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = r.toString().split(",")), "x" === a && (s = window.WebKitCSSMatrix ? r.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (s = window.WebKitCSSMatrix ? r.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), T.rtl && s && (s = -s), s || 0)
            }, T.getWrapperTranslate = function(e) {
                return void 0 === e && (e = T.isHorizontal() ? "x" : "y"), T.getTranslate(T.wrapper[0], e)
            }, T.observers = [], T.initObservers = function() {
                if (T.params.observeParents)
                    for (var e = T.container.parents(), a = 0; a < e.length; a++) l(e[a]);
                l(T.container[0], {
                    childList: !1
                }), l(T.wrapper[0], {
                    attributes: !1
                })
            }, T.disconnectObservers = function() {
                for (var e = 0; e < T.observers.length; e++) T.observers[e].disconnect();
                T.observers = []
            }, T.createLoop = function() {
                T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove();
                var a = T.wrapper.children("." + T.params.slideClass);
                "auto" !== T.params.slidesPerView || T.params.loopedSlides || (T.params.loopedSlides = a.length), T.loopedSlides = parseInt(T.params.loopedSlides || T.params.slidesPerView, 10), T.loopedSlides = T.loopedSlides + T.params.loopAdditionalSlides, T.loopedSlides > a.length && (T.loopedSlides = a.length);
                var t, s = [],
                    i = [];
                for (a.each(function(t, r) {
                        var n = e(this);
                        t < T.loopedSlides && i.push(r), t < a.length && t >= a.length - T.loopedSlides && s.push(r), n.attr("data-rplgsw-slide-index", t)
                    }), t = 0; t < i.length; t++) T.wrapper.append(e(i[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));
                for (t = s.length - 1; t >= 0; t--) T.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass))
            }, T.destroyLoop = function() {
                T.wrapper.children("." + T.params.slideClass + "." + T.params.slideDuplicateClass).remove(), T.slides.removeAttr("data-rplgsw-slide-index")
            }, T.reLoop = function(e) {
                var a = T.activeIndex - T.loopedSlides;
                T.destroyLoop(), T.createLoop(), T.updateSlidesSize(), e && T.slideTo(a + T.loopedSlides, 0, !1)
            }, T.fixLoop = function() {
                var e;
                T.activeIndex < T.loopedSlides ? (e = T.slides.length - 3 * T.loopedSlides + T.activeIndex, e += T.loopedSlides, T.slideTo(e, 0, !1, !0)) : ("auto" === T.params.slidesPerView && T.activeIndex >= 2 * T.loopedSlides || T.activeIndex > T.slides.length - 2 * T.params.slidesPerView) && (e = -T.slides.length + T.activeIndex + T.loopedSlides, e += T.loopedSlides, T.slideTo(e, 0, !1, !0))
            }, T.appendSlide = function(e) {
                if (T.params.loop && T.destroyLoop(), "object" == typeof e && e.length)
                    for (var a = 0; a < e.length; a++) e[a] && T.wrapper.append(e[a]);
                else T.wrapper.append(e);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0)
            }, T.prependSlide = function(e) {
                T.params.loop && T.destroyLoop();
                var a = T.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var t = 0; t < e.length; t++) e[t] && T.wrapper.prepend(e[t]);
                    a = T.activeIndex + e.length
                } else T.wrapper.prepend(e);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.slideTo(a, 0, !1)
            }, T.removeSlide = function(e) {
                T.params.loop && (T.destroyLoop(), T.slides = T.wrapper.children("." + T.params.slideClass));
                var a, t = T.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var s = 0; s < e.length; s++) a = e[s], T.slides[a] && T.slides.eq(a).remove(), a < t && t--;
                    t = Math.max(t, 0)
                } else a = e, T.slides[a] && T.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                T.params.loop && T.createLoop(), T.params.observer && T.support.observer || T.update(!0), T.params.loop ? T.slideTo(t + T.loopedSlides, 0, !1) : T.slideTo(t, 0, !1)
            }, T.removeAllSlides = function() {
                for (var e = [], a = 0; a < T.slides.length; a++) e.push(a);
                T.removeSlide(e)
            }, T.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < T.slides.length; e++) {
                            var a = T.slides.eq(e),
                                t = a[0].rplgswSlideOffset,
                                s = -t;
                            T.params.virtualTranslate || (s -= T.translate);
                            var i = 0;
                            T.isHorizontal() || (i = s, s = 0);
                            var r = T.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                            a.css({
                                opacity: r
                            }).transform("translate3d(" + s + "px, " + i + "px, 0px)")
                        }
                    },
                    setTransition: function(e) {
                        if (T.slides.transition(e), T.params.virtualTranslate && 0 !== e) {
                            var a = !1;
                            T.slides.transitionEnd(function() {
                                if (!a && T) {
                                    a = !0, T.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) T.wrapper.trigger(e[t])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var a = 0; a < T.slides.length; a++) {
                            var t = T.slides.eq(a),
                                s = t[0].progress;
                            T.params.flip.limitRotation && (s = Math.max(Math.min(t[0].progress, 1), -1));
                            var i = t[0].rplgswSlideOffset,
                                r = -180 * s,
                                n = r,
                                o = 0,
                                l = -i,
                                p = 0;
                            if (T.isHorizontal() ? T.rtl && (n = -n) : (p = l, l = 0, o = -n, n = 0), t[0].style.zIndex = -Math.abs(Math.round(s)) + T.slides.length, T.params.flip.slideShadows) {
                                var d = T.isHorizontal() ? t.find(".rplgsw-slide-shadow-left") : t.find(".rplgsw-slide-shadow-top"),
                                    u = T.isHorizontal() ? t.find(".rplgsw-slide-shadow-right") : t.find(".rplgsw-slide-shadow-bottom");
                                0 === d.length && (d = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), t.append(d)), 0 === u.length && (u = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(u)), d.length && (d[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
                            }
                            t.transform("translate3d(" + l + "px, " + p + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                        }
                    },
                    setTransition: function(a) {
                        if (T.slides.transition(a).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(a), T.params.virtualTranslate && 0 !== a) {
                            var t = !1;
                            T.slides.eq(T.activeIndex).transitionEnd(function() {
                                if (!t && T && e(this).hasClass(T.params.slideActiveClass)) {
                                    t = !0, T.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], s = 0; s < a.length; s++) T.wrapper.trigger(a[s])
                                }
                            })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var a, t = 0;
                        T.params.cube.shadow && (T.isHorizontal() ? (a = T.wrapper.find(".rplgsw-cube-shadow"), 0 === a.length && (a = e('<div class="rplgsw-cube-shadow"></div>'), T.wrapper.append(a)), a.css({
                            height: T.width + "px"
                        })) : (a = T.container.find(".rplgsw-cube-shadow"), 0 === a.length && (a = e('<div class="rplgsw-cube-shadow"></div>'), T.container.append(a))));
                        for (var s = 0; s < T.slides.length; s++) {
                            var i = T.slides.eq(s),
                                r = 90 * s,
                                n = Math.floor(r / 360);
                            T.rtl && (r = -r, n = Math.floor(-r / 360));
                            var o = Math.max(Math.min(i[0].progress, 1), -1),
                                l = 0,
                                p = 0,
                                d = 0;
                            s % 4 == 0 ? (l = 4 * -n * T.size, d = 0) : (s - 1) % 4 == 0 ? (l = 0, d = 4 * -n * T.size) : (s - 2) % 4 == 0 ? (l = T.size + 4 * n * T.size, d = T.size) : (s - 3) % 4 == 0 && (l = -T.size, d = 3 * T.size + 4 * T.size * n), T.rtl && (l = -l), T.isHorizontal() || (p = l, l = 0);
                            var u = "rotateX(" + (T.isHorizontal() ? 0 : -r) + "deg) rotateY(" + (T.isHorizontal() ? r : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                            if (o <= 1 && o > -1 && (t = 90 * s + 90 * o, T.rtl && (t = 90 * -s - 90 * o)), i.transform(u), T.params.cube.slideShadows) {
                                var c = T.isHorizontal() ? i.find(".rplgsw-slide-shadow-left") : i.find(".rplgsw-slide-shadow-top"),
                                    m = T.isHorizontal() ? i.find(".rplgsw-slide-shadow-right") : i.find(".rplgsw-slide-shadow-bottom");
                                0 === c.length && (c = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), i.append(c)), 0 === m.length && (m = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (T.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + T.size / 2 + "px",
                                "transform-origin": "50% 50% -" + T.size / 2 + "px"
                            }), T.params.cube.shadow)
                            if (T.isHorizontal()) a.transform("translate3d(0px, " + (T.width / 2 + T.params.cube.shadowOffset) + "px, " + -T.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + T.params.cube.shadowScale + ")");
                            else {
                                var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                    g = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                    f = T.params.cube.shadowScale,
                                    v = T.params.cube.shadowScale / g,
                                    w = T.params.cube.shadowOffset;
                                a.transform("scale3d(" + f + ", 1, " + v + ") translate3d(0px, " + (T.height / 2 + w) + "px, " + -T.height / 2 / v + "px) rotateX(-90deg)")
                            } var y = T.isSafari || T.isUiWebView ? -T.size / 2 : 0;
                        T.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (T.isHorizontal() ? 0 : t) + "deg) rotateY(" + (T.isHorizontal() ? -t : 0) + "deg)")
                    },
                    setTransition: function(e) {
                        T.slides.transition(e).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(e), T.params.cube.shadow && !T.isHorizontal() && T.container.find(".rplgsw-cube-shadow").transition(e)
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var a = T.translate, t = T.isHorizontal() ? -a + T.width / 2 : -a + T.height / 2, s = T.isHorizontal() ? T.params.coverflow.rotate : -T.params.coverflow.rotate, i = T.params.coverflow.depth, r = 0, n = T.slides.length; r < n; r++) {
                            var o = T.slides.eq(r),
                                l = T.slidesSizesGrid[r],
                                p = o[0].rplgswSlideOffset,
                                d = (t - p - l / 2) / l * T.params.coverflow.modifier,
                                u = T.isHorizontal() ? s * d : 0,
                                c = T.isHorizontal() ? 0 : s * d,
                                m = -i * Math.abs(d),
                                h = T.isHorizontal() ? 0 : T.params.coverflow.stretch * d,
                                g = T.isHorizontal() ? T.params.coverflow.stretch * d : 0;
                            Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(u) < .001 && (u = 0), Math.abs(c) < .001 && (c = 0);
                            var f = "translate3d(" + g + "px," + h + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + u + "deg)";
                            if (o.transform(f), o[0].style.zIndex = 1 - Math.abs(Math.round(d)), T.params.coverflow.slideShadows) {
                                var v = T.isHorizontal() ? o.find(".rplgsw-slide-shadow-left") : o.find(".rplgsw-slide-shadow-top"),
                                    w = T.isHorizontal() ? o.find(".rplgsw-slide-shadow-right") : o.find(".rplgsw-slide-shadow-bottom");
                                0 === v.length && (v = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "left" : "top") + '"></div>'), o.append(v)), 0 === w.length && (w = e('<div class="rplgsw-slide-shadow-' + (T.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(w)), v.length && (v[0].style.opacity = d > 0 ? d : 0), w.length && (w[0].style.opacity = -d > 0 ? -d : 0)
                            }
                        }
                        if (T.browser.ie) {
                            T.wrapper[0].style.perspectiveOrigin = t + "px 50%"
                        }
                    },
                    setTransition: function(e) {
                        T.slides.transition(e).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(e)
                    }
                }
            }, T.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(a, t) {
                    if (void 0 !== a && (void 0 === t && (t = !0), 0 !== T.slides.length)) {
                        var s = T.slides.eq(a),
                            i = s.find("." + T.params.lazyLoadingClass + ":not(." + T.params.lazyStatusLoadedClass + "):not(." + T.params.lazyStatusLoadingClass + ")");
                        !s.hasClass(T.params.lazyLoadingClass) || s.hasClass(T.params.lazyStatusLoadedClass) || s.hasClass(T.params.lazyStatusLoadingClass) || (i = i.add(s[0])), 0 !== i.length && i.each(function() {
                            var a = e(this);
                            a.addClass(T.params.lazyStatusLoadingClass);
                            var i = a.attr("data-background"),
                                r = a.attr("data-src"),
                                n = a.attr("data-srcset"),
                                o = a.attr("data-sizes");
                            T.loadImage(a[0], r || i, n, o, !1, function() {
                                if (void 0 !== T && null !== T && T) {
                                    if (i ? (a.css("background-image", 'url("' + i + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), o && (a.attr("sizes", o), a.removeAttr("data-sizes")), r && (a.attr("src", r), a.removeAttr("data-src"))), a.addClass(T.params.lazyStatusLoadedClass).removeClass(T.params.lazyStatusLoadingClass), s.find("." + T.params.lazyPreloaderClass + ", ." + T.params.preloaderClass).remove(), T.params.loop && t) {
                                        var e = s.attr("data-rplgsw-slide-index");
                                        if (s.hasClass(T.params.slideDuplicateClass)) {
                                            var l = T.wrapper.children('[data-rplgsw-slide-index="' + e + '"]:not(.' + T.params.slideDuplicateClass + ")");
                                            T.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var p = T.wrapper.children("." + T.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + e + '"]');
                                            T.lazy.loadImageInSlide(p.index(), !1)
                                        }
                                    }
                                    T.emit("onLazyImageReady", T, s[0], a[0])
                                }
                            }), T.emit("onLazyImageLoad", T, s[0], a[0])
                        })
                    }
                },
                load: function() {
                    var a, t = T.params.slidesPerView;
                    if ("auto" === t && (t = 0), T.lazy.initialImageLoaded || (T.lazy.initialImageLoaded = !0), T.params.watchSlidesVisibility) T.wrapper.children("." + T.params.slideVisibleClass).each(function() {
                        T.lazy.loadImageInSlide(e(this).index())
                    });
                    else if (t > 1)
                        for (a = T.activeIndex; a < T.activeIndex + t; a++) T.slides[a] && T.lazy.loadImageInSlide(a);
                    else T.lazy.loadImageInSlide(T.activeIndex);
                    if (T.params.lazyLoadingInPrevNext)
                        if (t > 1 || T.params.lazyLoadingInPrevNextAmount && T.params.lazyLoadingInPrevNextAmount > 1) {
                            var s = T.params.lazyLoadingInPrevNextAmount,
                                i = t,
                                r = Math.min(T.activeIndex + i + Math.max(s, i), T.slides.length),
                                n = Math.max(T.activeIndex - Math.max(i, s), 0);
                            for (a = T.activeIndex + t; a < r; a++) T.slides[a] && T.lazy.loadImageInSlide(a);
                            for (a = n; a < T.activeIndex; a++) T.slides[a] && T.lazy.loadImageInSlide(a)
                        } else {
                            var o = T.wrapper.children("." + T.params.slideNextClass);
                            o.length > 0 && T.lazy.loadImageInSlide(o.index());
                            var l = T.wrapper.children("." + T.params.slidePrevClass);
                            l.length > 0 && T.lazy.loadImageInSlide(l.index())
                        }
                },
                onTransitionStart: function() {
                    T.params.lazyLoading && (T.params.lazyLoadingOnTransitionStart || !T.params.lazyLoadingOnTransitionStart && !T.lazy.initialImageLoaded) && T.lazy.load()
                },
                onTransitionEnd: function() {
                    T.params.lazyLoading && !T.params.lazyLoadingOnTransitionStart && T.lazy.load()
                }
            }, T.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var a = T.scrollbar,
                        t = T.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                        s = t - a.track.offset()[T.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                        i = -T.minTranslate() * a.moveDivider,
                        r = -T.maxTranslate() * a.moveDivider;
                    s < i ? s = i : s > r && (s = r), s = -s / a.moveDivider, T.updateProgress(s), T.setWrapperTranslate(s, !0)
                },
                dragStart: function(e) {
                    var a = T.scrollbar;
                    a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), T.params.scrollbarHide && a.track.css("opacity", 1), T.wrapper.transition(100), a.drag.transition(100), T.emit("onScrollbarDragStart", T)
                },
                dragMove: function(e) {
                    var a = T.scrollbar;
                    a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), T.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), T.emit("onScrollbarDragMove", T))
                },
                dragEnd: function(e) {
                    var a = T.scrollbar;
                    a.isTouched && (a.isTouched = !1, T.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
                        a.track.css("opacity", 0), a.track.transition(400)
                    }, 1e3)), T.emit("onScrollbarDragEnd", T), T.params.scrollbarSnapOnRelease && T.slideReset())
                },
                draggableEvents: function() {
                    return T.params.simulateTouch !== !1 || T.support.touch ? T.touchEvents : T.touchEventsDesktop
                }(),
                enableDraggable: function() {
                    var a = T.scrollbar,
                        t = T.support.touch ? a.track : document;
                    e(a.track).on(a.draggableEvents.start, a.dragStart), e(t).on(a.draggableEvents.move, a.dragMove), e(t).on(a.draggableEvents.end, a.dragEnd)
                },
                disableDraggable: function() {
                    var a = T.scrollbar,
                        t = T.support.touch ? a.track : document;
                    e(a.track).off(a.draggableEvents.start, a.dragStart), e(t).off(a.draggableEvents.move, a.dragMove), e(t).off(a.draggableEvents.end, a.dragEnd)
                },
                set: function() {
                    if (T.params.scrollbar) {
                        var a = T.scrollbar;
                        a.track = e(T.params.scrollbar), T.params.uniqueNavElements && "string" == typeof T.params.scrollbar && a.track.length > 1 && 1 === T.container.find(T.params.scrollbar).length && (a.track = T.container.find(T.params.scrollbar)), a.drag = a.track.find(".rplgsw-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="rplgsw-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = T.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = T.size / T.virtualSize, a.moveDivider = a.divider * (a.trackSize / T.size), a.dragSize = a.trackSize * a.divider, T.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", T.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (T.params.scrollbar) {
                        var e, a = T.scrollbar,
                            t = (T.translate, a.dragSize);
                        e = (a.trackSize - a.dragSize) * T.progress, T.rtl && T.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), T.isHorizontal() ? (T.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (T.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), T.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                            a.track[0].style.opacity = 0, a.track.transition(400)
                        }, 1e3))
                    }
                },
                setTransition: function(e) {
                    T.params.scrollbar && T.scrollbar.drag.transition(e)
                }
            }, T.controller = {
                LinearSpline: function(e, a) {
                    var t = function() {
                        var e, a, t;
                        return function(s, i) {
                            for (a = -1, e = s.length; e - a > 1;) s[t = e + a >> 1] <= i ? a = t : e = t;
                            return e
                        }
                    }();
                    this.x = e, this.y = a, this.lastIndex = e.length - 1;
                    var s, i;
                    this.x.length;
                    this.interpolate = function(e) {
                        return e ? (i = t(this.x, e), s = i - 1, (e - this.x[s]) * (this.y[i] - this.y[s]) / (this.x[i] - this.x[s]) + this.y[s]) : 0
                    }
                },
                getInterpolateFunction: function(e) {
                    T.controller.spline || (T.controller.spline = T.params.loop ? new T.controller.LinearSpline(T.slidesGrid, e.slidesGrid) : new T.controller.LinearSpline(T.snapGrid, e.snapGrid))
                },
                setTranslate: function(e, t) {
                    function s(a) {
                        e = a.rtl && "horizontal" === a.params.direction ? -T.translate : T.translate, "slide" === T.params.controlBy && (T.controller.getInterpolateFunction(a), r = -T.controller.spline.interpolate(-e)), r && "container" !== T.params.controlBy || (i = (a.maxTranslate() - a.minTranslate()) / (T.maxTranslate() - T.minTranslate()), r = (e - T.minTranslate()) * i + a.minTranslate()), T.params.controlInverse && (r = a.maxTranslate() - r), a.updateProgress(r), a.setWrapperTranslate(r, !1, T), a.updateActiveIndex()
                    }
                    var i, r, n = T.params.control;
                    if (Array.isArray(n))
                        for (var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && s(n[o]);
                    else n instanceof a && t !== n && s(n)
                },
                setTransition: function(e, t) {
                    function s(a) {
                        a.setWrapperTransition(e, T), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                            r && (a.params.loop && "slide" === T.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                        }))
                    }
                    var i, r = T.params.control;
                    if (Array.isArray(r))
                        for (i = 0; i < r.length; i++) r[i] !== t && r[i] instanceof a && s(r[i]);
                    else r instanceof a && t !== r && s(r)
                }
            }, T.hashnav = {
                onHashCange: function(e, a) {
                    var t = document.location.hash.replace("#", "");
                    t !== T.slides.eq(T.activeIndex).attr("data-hash") && T.slideTo(T.wrapper.children("." + T.params.slideClass + '[data-hash="' + t + '"]').index())
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    e(window)[t]("hashchange", T.hashnav.onHashCange)
                },
                setHash: function() {
                    if (T.hashnav.initialized && T.params.hashnav)
                        if (T.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + T.slides.eq(T.activeIndex).attr("data-hash") || "");
                        else {
                            var e = T.slides.eq(T.activeIndex),
                                a = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = a || ""
                        }
                },
                init: function() {
                    if (T.params.hashnav && !T.params.history) {
                        T.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)
                            for (var a = 0, t = T.slides.length; a < t; a++) {
                                var s = T.slides.eq(a),
                                    i = s.attr("data-hash") || s.attr("data-history");
                                if (i === e && !s.hasClass(T.params.slideDuplicateClass)) {
                                    var r = s.index();
                                    T.slideTo(r, 0, T.params.runCallbacksOnInit, !0)
                                }
                            }
                        T.params.hashnavWatchState && T.hashnav.attachEvents()
                    }
                },
                destroy: function() {
                    T.params.hashnavWatchState && T.hashnav.attachEvents(!0)
                }
            }, T.history = {
                init: function() {
                    if (T.params.history) {
                        if (!window.history || !window.history.pushState) return T.params.history = !1, void(T.params.hashnav = !0);
                        T.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, T.params.runCallbacksOnInit), T.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                },
                setHistoryPopState: function() {
                    T.history.paths = T.history.getPathValues(), T.history.scrollToSlide(T.params.speed, T.history.paths.value, !1)
                },
                getPathValues: function() {
                    var e = window.location.pathname.slice(1).split("/"),
                        a = e.length;
                    return {
                        key: e[a - 2],
                        value: e[a - 1]
                    }
                },
                setHistory: function(e, a) {
                    if (T.history.initialized && T.params.history) {
                        var t = T.slides.eq(a),
                            s = this.slugify(t.attr("data-history"));
                        window.location.pathname.includes(e) || (s = e + "/" + s), T.params.replaceState ? window.history.replaceState(null, null, s) : window.history.pushState(null, null, s)
                    }
                },
                slugify: function(e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                },
                scrollToSlide: function(e, a, t) {
                    if (a)
                        for (var s = 0, i = T.slides.length; s < i; s++) {
                            var r = T.slides.eq(s),
                                n = this.slugify(r.attr("data-history"));
                            if (n === a && !r.hasClass(T.params.slideDuplicateClass)) {
                                var o = r.index();
                                T.slideTo(o, e, t)
                            }
                        } else T.slideTo(0, e, t)
                }
            }, T.disableKeyboardControl = function() {
                T.params.keyboardControl = !1, e(document).off("keydown", p)
            }, T.enableKeyboardControl = function() {
                T.params.keyboardControl = !0, e(document).on("keydown", p)
            }, T.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            }, T.params.mousewheelControl && (T.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = "onwheel" in document;
                if (!e) {
                    var a = document.createElement("div");
                    a.setAttribute("onwheel", "return;"), e = "function" == typeof a.onwheel
                }
                return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
            }() ? "wheel" : "mousewheel"), T.disableMousewheelControl = function() {
                if (!T.mousewheel.event) return !1;
                var a = T.container;
                return "container" !== T.params.mousewheelEventsTarged && (a = e(T.params.mousewheelEventsTarged)), a.off(T.mousewheel.event, u), T.params.mousewheelControl = !1, !0
            }, T.enableMousewheelControl = function() {
                if (!T.mousewheel.event) return !1;
                var a = T.container;
                return "container" !== T.params.mousewheelEventsTarged && (a = e(T.params.mousewheelEventsTarged)), a.on(T.mousewheel.event, u), T.params.mousewheelControl = !0, !0
            }, T.parallax = {
                setTranslate: function() {
                    T.container.children("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function() {
                        c(this, T.progress)
                    }), T.slides.each(function() {
                        var a = e(this);
                        a.find("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function() {
                            c(this, Math.min(Math.max(a[0].progress, -1), 1))
                        })
                    })
                },
                setTransition: function(a) {
                    void 0 === a && (a = T.params.speed), T.container.find("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function() {
                        var t = e(this),
                            s = parseInt(t.attr("data-rplgsw-parallax-duration"), 10) || a;
                        0 === a && (s = 0), t.transition(s)
                    })
                }
            }, T.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: T.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                },
                getDistanceBetweenTouches: function(e) {
                    if (e.targetTouches.length < 2) return 1;
                    var a = e.targetTouches[0].pageX,
                        t = e.targetTouches[0].pageY,
                        s = e.targetTouches[1].pageX,
                        i = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(s - a, 2) + Math.pow(i - t, 2))
                },
                onGestureStart: function(a) {
                    var t = T.zoom;
                    if (!T.support.gestures) {
                        if ("touchstart" !== a.type || "touchstart" === a.type && a.targetTouches.length < 2) return;
                        t.gesture.scaleStart = t.getDistanceBetweenTouches(a)
                    }
                    if (!(t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = e(this), 0 === t.gesture.slide.length && (t.gesture.slide = T.slides.eq(T.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + T.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-rplgsw-zoom") || T.params.zoomMax, 0 !== t.gesture.imageWrap.length))) return void(t.gesture.image = void 0);
                    t.gesture.image.transition(0), t.isScaling = !0
                },
                onGestureChange: function(e) {
                    var a = T.zoom;
                    if (!T.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                        a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
                    }
                    a.gesture.image && 0 !== a.gesture.image.length && (T.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < T.params.zoomMin && (a.scale = T.params.zoomMin + 1 - Math.pow(T.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                },
                onGestureEnd: function(e) {
                    var a = T.zoom;
                    !T.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), T.params.zoomMin), a.gesture.image.transition(T.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
                },
                onTouchStart: function(e, a) {
                    var t = e.zoom;
                    t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
                },
                onTouchMove: function(e) {
                    var a = T.zoom;
                    if (a.gesture.image && 0 !== a.gesture.image.length && (T.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                        a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = T.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = T.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), T.rtl && (a.image.startX = -a.image.startX), T.rtl && (a.image.startY = -a.image.startY));
                        var t = a.image.width * a.scale,
                            s = a.image.height * a.scale;
                        if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                            if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - s / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                                if (T.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1);
                                if (!T.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1)
                            }
                            e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function(e, a) {
                    var t = e.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length) {
                        if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
                        t.image.isTouched = !1, t.image.isMoved = !1;
                        var s = 300,
                            i = 300,
                            r = t.velocity.x * s,
                            n = t.image.currentX + r,
                            o = t.velocity.y * i,
                            l = t.image.currentY + o;
                        0 !== t.velocity.x && (s = Math.abs((n - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (i = Math.abs((l - t.image.currentY) / t.velocity.y));
                        var p = Math.max(s, i);
                        t.image.currentX = n, t.image.currentY = l;
                        var d = t.image.width * t.scale,
                            u = t.image.height * t.scale;
                        t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - u / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function(e) {
                    var a = e.zoom;
                    a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
                },
                toggleZoom: function(a, t) {
                    var s = a.zoom;
                    if (s.gesture.slide || (s.gesture.slide = a.clickedSlide ? e(a.clickedSlide) : a.slides.eq(a.activeIndex), s.gesture.image = s.gesture.slide.find("img, svg, canvas"), s.gesture.imageWrap = s.gesture.image.parent("." + a.params.zoomContainerClass)), s.gesture.image && 0 !== s.gesture.image.length) {
                        var i, r, n, o, l, p, d, u, c, m, h, g, f, v, w, y, x, T;
                        void 0 === s.image.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, r = "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = s.image.touchesStart.x, r = s.image.touchesStart.y), s.scale && 1 !== s.scale ? (s.scale = s.currentScale = 1, s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), s.gesture.slide = void 0) : (s.scale = s.currentScale = s.gesture.imageWrap.attr("data-rplgsw-zoom") || a.params.zoomMax, t ? (x = s.gesture.slide[0].offsetWidth, T = s.gesture.slide[0].offsetHeight, n = s.gesture.slide.offset().left, o = s.gesture.slide.offset().top, l = n + x / 2 - i, p = o + T / 2 - r, c = s.gesture.image[0].offsetWidth, m = s.gesture.image[0].offsetHeight, h = c * s.scale, g = m * s.scale, f = Math.min(x / 2 - h / 2, 0), v = Math.min(T / 2 - g / 2, 0), w = -f, y = -v, d = l * s.scale, u = p * s.scale, d < f && (d = f), d > w && (d = w), u < v && (u = v), u > y && (u = y)) : (d = 0, u = 0), s.gesture.imageWrap.transition(300).transform("translate3d(" + d + "px, " + u + "px,0)"), s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + s.scale + ")"))
                    }
                },
                attachEvents: function(a) {
                    var t = a ? "off" : "on";
                    if (T.params.zoom) {
                        var s = (T.slides, !("touchstart" !== T.touchEvents.start || !T.support.passiveListener || !T.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        });
                        T.support.gestures ? (T.slides[t]("gesturestart", T.zoom.onGestureStart, s), T.slides[t]("gesturechange", T.zoom.onGestureChange, s), T.slides[t]("gestureend", T.zoom.onGestureEnd, s)) : "touchstart" === T.touchEvents.start && (T.slides[t](T.touchEvents.start, T.zoom.onGestureStart, s), T.slides[t](T.touchEvents.move, T.zoom.onGestureChange, s), T.slides[t](T.touchEvents.end, T.zoom.onGestureEnd, s)), T[t]("touchStart", T.zoom.onTouchStart), T.slides.each(function(a, s) {
                            e(s).find("." + T.params.zoomContainerClass).length > 0 && e(s)[t](T.touchEvents.move, T.zoom.onTouchMove)
                        }), T[t]("touchEnd", T.zoom.onTouchEnd), T[t]("transitionEnd", T.zoom.onTransitionEnd), T.params.zoomToggle && T.on("doubleTap", T.zoom.toggleZoom)
                    }
                },
                init: function() {
                    T.zoom.attachEvents()
                },
                destroy: function() {
                    T.zoom.attachEvents(!0)
                }
            }, T._plugins = [];
            for (var Y in T.plugins) {
                var O = T.plugins[Y](T, T.params[Y]);
                O && T._plugins.push(O)
            }
            return T.callPlugins = function(e) {
                for (var a = 0; a < T._plugins.length; a++) e in T._plugins[a] && T._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, T.emitterEventListeners = {}, T.emit = function(e) {
                T.params[e] && T.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var a;
                if (T.emitterEventListeners[e])
                    for (a = 0; a < T.emitterEventListeners[e].length; a++) T.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                T.callPlugins && T.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, T.on = function(e, a) {
                return e = m(e), T.emitterEventListeners[e] || (T.emitterEventListeners[e] = []), T.emitterEventListeners[e].push(a), T
            }, T.off = function(e, a) {
                var t;
                if (e = m(e), void 0 === a) return T.emitterEventListeners[e] = [], T;
                if (T.emitterEventListeners[e] && 0 !== T.emitterEventListeners[e].length) {
                    for (t = 0; t < T.emitterEventListeners[e].length; t++) T.emitterEventListeners[e][t] === a && T.emitterEventListeners[e].splice(t, 1);
                    return T
                }
            }, T.once = function(e, a) {
                e = m(e);
                var t = function() {
                    a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), T.off(e, t)
                };
                return T.on(e, t), T
            }, T.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, a) {
                    return e.attr("role", a), e
                },
                addLabel: function(e, a) {
                    return e.attr("aria-label", a), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(a) {
                    13 === a.keyCode && (e(a.target).is(T.params.nextButton) ? (T.onClickNext(a), T.isEnd ? T.a11y.notify(T.params.lastSlideMessage) : T.a11y.notify(T.params.nextSlideMessage)) : e(a.target).is(T.params.prevButton) && (T.onClickPrev(a), T.isBeginning ? T.a11y.notify(T.params.firstSlideMessage) : T.a11y.notify(T.params.prevSlideMessage)), e(a.target).is("." + T.params.bulletClass) && e(a.target)[0].click())
                },
                liveRegion: e('<span class="' + T.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var a = T.a11y.liveRegion;
                    0 !== a.length && (a.html(""), a.html(e))
                },
                init: function() {
                    T.params.nextButton && T.nextButton && T.nextButton.length > 0 && (T.a11y.makeFocusable(T.nextButton), T.a11y.addRole(T.nextButton, "button"), T.a11y.addLabel(T.nextButton, T.params.nextSlideMessage)), T.params.prevButton && T.prevButton && T.prevButton.length > 0 && (T.a11y.makeFocusable(T.prevButton), T.a11y.addRole(T.prevButton, "button"), T.a11y.addLabel(T.prevButton, T.params.prevSlideMessage)), e(T.container).append(T.a11y.liveRegion)
                },
                initPagination: function() {
                    T.params.pagination && T.params.paginationClickable && T.bullets && T.bullets.length && T.bullets.each(function() {
                        var a = e(this);
                        T.a11y.makeFocusable(a), T.a11y.addRole(a, "button"), T.a11y.addLabel(a, T.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function() {
                    T.a11y.liveRegion && T.a11y.liveRegion.length > 0 && T.a11y.liveRegion.remove()
                }
            }, T.init = function() {
                T.params.loop && T.createLoop(), T.updateContainerSize(), T.updateSlidesSize(), T.updatePagination(), T.params.scrollbar && T.scrollbar && (T.scrollbar.set(), T.params.scrollbarDraggable && T.scrollbar.enableDraggable()), "slide" !== T.params.effect && T.effects[T.params.effect] && (T.params.loop || T.updateProgress(), T.effects[T.params.effect].setTranslate()), T.params.loop ? T.slideTo(T.params.initialSlide + T.loopedSlides, 0, T.params.runCallbacksOnInit) : (T.slideTo(T.params.initialSlide, 0, T.params.runCallbacksOnInit), 0 === T.params.initialSlide && (T.parallax && T.params.parallax && T.parallax.setTranslate(), T.lazy && T.params.lazyLoading && (T.lazy.load(), T.lazy.initialImageLoaded = !0))), T.attachEvents(), T.params.observer && T.support.observer && T.initObservers(), T.params.preloadImages && !T.params.lazyLoading && T.preloadImages(), T.params.zoom && T.zoom && T.zoom.init(), T.params.autoplay && T.startAutoplay(), T.params.keyboardControl && T.enableKeyboardControl && T.enableKeyboardControl(), T.params.mousewheelControl && T.enableMousewheelControl && T.enableMousewheelControl(), T.params.hashnavReplaceState && (T.params.replaceState = T.params.hashnavReplaceState), T.params.history && T.history && T.history.init(), T.params.hashnav && T.hashnav && T.hashnav.init(), T.params.a11y && T.a11y && T.a11y.init(), T.emit("onInit", T)
            }, T.cleanupStyles = function() {
                T.container.removeClass(T.classNames.join(" ")).removeAttr("style"), T.wrapper.removeAttr("style"), T.slides && T.slides.length && T.slides.removeClass([T.params.slideVisibleClass, T.params.slideActiveClass, T.params.slideNextClass, T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-rplgsw-column").removeAttr("data-rplgsw-row"), T.paginationContainer && T.paginationContainer.length && T.paginationContainer.removeClass(T.params.paginationHiddenClass), T.bullets && T.bullets.length && T.bullets.removeClass(T.params.bulletActiveClass), T.params.prevButton && e(T.params.prevButton).removeClass(T.params.buttonDisabledClass), T.params.nextButton && e(T.params.nextButton).removeClass(T.params.buttonDisabledClass), T.params.scrollbar && T.scrollbar && (T.scrollbar.track && T.scrollbar.track.length && T.scrollbar.track.removeAttr("style"), T.scrollbar.drag && T.scrollbar.drag.length && T.scrollbar.drag.removeAttr("style"))
            }, T.destroy = function(e, a) {
                T.detachEvents(), T.stopAutoplay(), T.params.scrollbar && T.scrollbar && T.params.scrollbarDraggable && T.scrollbar.disableDraggable(), T.params.loop && T.destroyLoop(), a && T.cleanupStyles(), T.disconnectObservers(), T.params.zoom && T.zoom && T.zoom.destroy(), T.params.keyboardControl && T.disableKeyboardControl && T.disableKeyboardControl(), T.params.mousewheelControl && T.disableMousewheelControl && T.disableMousewheelControl(), T.params.a11y && T.a11y && T.a11y.destroy(), T.params.history && !T.params.replaceState && window.removeEventListener("popstate", T.history.setHistoryPopState), T.params.hashnav && T.hashnav && T.hashnav.destroy(), T.emit("onDestroy"), e !== !1 && (T = null)
            }, T.init(), T
        }
    };
    a.prototype = {
        isSafari: function() {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function() {
                var e = document.createElement("div");
                return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
            }()
        },
        device: function() {
            var e = window.navigator.userAgent,
                a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                t = e.match(/(iPad).*OS\s([\d_]+)/),
                s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                i = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: t || i || s,
                android: a
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                    if (a[t] in e) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }(),
            passiveListener: function() {
                var e = !1;
                try {
                    var a = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, a)
                } catch (e) {}
                return e
            }(),
            gestures: function() {
                return "ongesturestart" in window
            }()
        },
        plugins: {}
    };
    for (var t = (function() {
            var e = function(e) {
                    var a = this,
                        t = 0;
                    for (t = 0; t < e.length; t++) a[t] = e[t];
                    return a.length = e.length, this
                },
                a = function(a, t) {
                    var s = [],
                        i = 0;
                    if (a && !t && a instanceof e) return a;
                    if (a)
                        if ("string" == typeof a) {
                            var r, n, o = a.trim();
                            if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                                var l = "div";
                                for (0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), 0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), n = document.createElement(l), n.innerHTML = a, i = 0; i < n.childNodes.length; i++) s.push(n.childNodes[i])
                            } else
                                for (r = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], i = 0; i < r.length; i++) r[i] && s.push(r[i])
                        } else if (a.nodeType || a === window || a === document) s.push(a);
                    else if (a.length > 0 && a[0].nodeType)
                        for (i = 0; i < a.length; i++) s.push(a[i]);
                    return new e(s)
                };
            return e.prototype = {
                addClass: function(e) {
                    if (void 0 === e) return this;
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var s = 0; s < this.length; s++) this[s].classList.add(a[t]);
                    return this
                },
                removeClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var s = 0; s < this.length; s++) this[s].classList.remove(a[t]);
                    return this
                },
                hasClass: function(e) {
                    return !!this[0] && this[0].classList.contains(e)
                },
                toggleClass: function(e) {
                    for (var a = e.split(" "), t = 0; t < a.length; t++)
                        for (var s = 0; s < this.length; s++) this[s].classList.toggle(a[t]);
                    return this
                },
                attr: function(e, a) {
                    if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                    for (var t = 0; t < this.length; t++)
                        if (2 === arguments.length) this[t].setAttribute(e, a);
                        else
                            for (var s in e) this[t][s] = e[s], this[t].setAttribute(s, e[s]);
                    return this
                },
                removeAttr: function(e) {
                    for (var a = 0; a < this.length; a++) this[a].removeAttribute(e);
                    return this
                },
                data: function(e, a) {
                    if (void 0 !== a) {
                        for (var t = 0; t < this.length; t++) {
                            var s = this[t];
                            s.dom7ElementDataStorage || (s.dom7ElementDataStorage = {}), s.dom7ElementDataStorage[e] = a
                        }
                        return this
                    }
                    if (this[0]) {
                        var i = this[0].getAttribute("data-" + e);
                        return i ? i : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                    }
                },
                transform: function(e) {
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
                    }
                    return this
                },
                transition: function(e) {
                    "string" != typeof e && (e += "ms");
                    for (var a = 0; a < this.length; a++) {
                        var t = this[a].style;
                        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
                    }
                    return this
                },
                on: function(e, t, s, i) {
                    function r(e) {
                        var i = e.target;
                        if (a(i).is(t)) s.call(i, e);
                        else
                            for (var r = a(i).parents(), n = 0; n < r.length; n++) a(r[n]).is(t) && s.call(r[n], e)
                    }
                    var n, o, l = e.split(" ");
                    for (n = 0; n < this.length; n++)
                        if ("function" == typeof t || t === !1)
                            for ("function" == typeof t && (s = arguments[1], i = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], s, i);
                        else
                            for (o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                                listener: s,
                                liveListener: r
                            }), this[n].addEventListener(l[o], r, i);
                    return this
                },
                off: function(e, a, t, s) {
                    for (var i = e.split(" "), r = 0; r < i.length; r++)
                        for (var n = 0; n < this.length; n++)
                            if ("function" == typeof a || a === !1) "function" == typeof a && (t = arguments[1], s = arguments[2] || !1), this[n].removeEventListener(i[r], t, s);
                            else if (this[n].dom7LiveListeners)
                        for (var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(i[r], this[n].dom7LiveListeners[o].liveListener, s);
                    return this
                },
                once: function(e, a, t, s) {
                    function i(n) {
                        t(n), r.off(e, a, i, s)
                    }
                    var r = this;
                    "function" == typeof a && (a = !1, t = arguments[1], s = arguments[2]), r.on(e, a, i, s)
                },
                trigger: function(e, a) {
                    for (var t = 0; t < this.length; t++) {
                        var s;
                        try {
                            s = new window.CustomEvent(e, {
                                detail: a,
                                bubbles: !0,
                                cancelable: !0
                            })
                        } catch (t) {
                            s = document.createEvent("Event"), s.initEvent(e, !0, !0), s.detail = a
                        }
                        this[t].dispatchEvent(s)
                    }
                    return this
                },
                transitionEnd: function(e) {
                    function a(r) {
                        if (r.target === this)
                            for (e.call(this, r), t = 0; t < s.length; t++) i.off(s[t], a)
                    }
                    var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                        i = this;
                    if (e)
                        for (t = 0; t < s.length; t++) i.on(s[t], a);
                    return this
                },
                width: function() {
                    return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                },
                outerWidth: function(e) {
                    return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                },
                height: function() {
                    return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                },
                outerHeight: function(e) {
                    return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                },
                offset: function() {
                    if (this.length > 0) {
                        var e = this[0],
                            a = e.getBoundingClientRect(),
                            t = document.body,
                            s = e.clientTop || t.clientTop || 0,
                            i = e.clientLeft || t.clientLeft || 0,
                            r = window.pageYOffset || e.scrollTop,
                            n = window.pageXOffset || e.scrollLeft;
                        return {
                            top: a.top + r - s,
                            left: a.left + n - i
                        }
                    }
                    return null
                },
                css: function(e, a) {
                    var t;
                    if (1 === arguments.length) {
                        if ("string" != typeof e) {
                            for (t = 0; t < this.length; t++)
                                for (var s in e) this[t].style[s] = e[s];
                            return this
                        }
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                    }
                    if (2 === arguments.length && "string" == typeof e) {
                        for (t = 0; t < this.length; t++) this[t].style[e] = a;
                        return this
                    }
                    return this
                },
                each: function(e) {
                    for (var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
                    return this
                },
                html: function(e) {
                    if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                    for (var a = 0; a < this.length; a++) this[a].innerHTML = e;
                    return this
                },
                text: function(e) {
                    if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                    for (var a = 0; a < this.length; a++) this[a].textContent = e;
                    return this
                },
                is: function(t) {
                    if (!this[0]) return !1;
                    var s, i;
                    if ("string" == typeof t) {
                        var r = this[0];
                        if (r === document) return t === document;
                        if (r === window) return t === window;
                        if (r.matches) return r.matches(t);
                        if (r.webkitMatchesSelector) return r.webkitMatchesSelector(t);
                        if (r.mozMatchesSelector) return r.mozMatchesSelector(t);
                        if (r.msMatchesSelector) return r.msMatchesSelector(t);
                        for (s = a(t), i = 0; i < s.length; i++)
                            if (s[i] === this[0]) return !0;
                        return !1
                    }
                    if (t === document) return this[0] === document;
                    if (t === window) return this[0] === window;
                    if (t.nodeType || t instanceof e) {
                        for (s = t.nodeType ? [t] : t, i = 0; i < s.length; i++)
                            if (s[i] === this[0]) return !0;
                        return !1
                    }
                    return !1
                },
                index: function() {
                    if (this[0]) {
                        for (var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
                        return a
                    }
                },
                eq: function(a) {
                    if (void 0 === a) return this;
                    var t, s = this.length;
                    return a > s - 1 ? new e([]) : a < 0 ? (t = s + a, new e(t < 0 ? [] : [this[t]])) : new e([this[a]])
                },
                append: function(a) {
                    var t, s;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a; i.firstChild;) this[t].appendChild(i.firstChild)
                        } else if (a instanceof e)
                        for (s = 0; s < a.length; s++) this[t].appendChild(a[s]);
                    else this[t].appendChild(a);
                    return this
                },
                prepend: function(a) {
                    var t, s;
                    for (t = 0; t < this.length; t++)
                        if ("string" == typeof a) {
                            var i = document.createElement("div");
                            for (i.innerHTML = a, s = i.childNodes.length - 1; s >= 0; s--) this[t].insertBefore(i.childNodes[s], this[t].childNodes[0])
                        } else if (a instanceof e)
                        for (s = 0; s < a.length; s++) this[t].insertBefore(a[s], this[t].childNodes[0]);
                    else this[t].insertBefore(a, this[t].childNodes[0]);
                    return this
                },
                insertBefore: function(e) {
                    for (var t = a(e), s = 0; s < this.length; s++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0]);
                        else if (t.length > 1)
                        for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i])
                },
                insertAfter: function(e) {
                    for (var t = a(e), s = 0; s < this.length; s++)
                        if (1 === t.length) t[0].parentNode.insertBefore(this[s], t[0].nextSibling);
                        else if (t.length > 1)
                        for (var i = 0; i < t.length; i++) t[i].parentNode.insertBefore(this[s].cloneNode(!0), t[i].nextSibling)
                },
                next: function(t) {
                    return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                },
                nextAll: function(t) {
                    var s = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.nextElementSibling;) {
                        var r = i.nextElementSibling;
                        t ? a(r).is(t) && s.push(r) : s.push(r), i = r
                    }
                    return new e(s)
                },
                prev: function(t) {
                    return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                },
                prevAll: function(t) {
                    var s = [],
                        i = this[0];
                    if (!i) return new e([]);
                    for (; i.previousElementSibling;) {
                        var r = i.previousElementSibling;
                        t ? a(r).is(t) && s.push(r) : s.push(r), i = r
                    }
                    return new e(s)
                },
                parent: function(e) {
                    for (var t = [], s = 0; s < this.length; s++) e ? a(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode);
                    return a(a.unique(t))
                },
                parents: function(e) {
                    for (var t = [], s = 0; s < this.length; s++)
                        for (var i = this[s].parentNode; i;) e ? a(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
                    return a(a.unique(t))
                },
                find: function(a) {
                    for (var t = [], s = 0; s < this.length; s++)
                        for (var i = this[s].querySelectorAll(a), r = 0; r < i.length; r++) t.push(i[r]);
                    return new e(t)
                },
                children: function(t) {
                    for (var s = [], i = 0; i < this.length; i++)
                        for (var r = this[i].childNodes, n = 0; n < r.length; n++) t ? 1 === r[n].nodeType && a(r[n]).is(t) && s.push(r[n]) : 1 === r[n].nodeType && s.push(r[n]);
                    return new e(a.unique(s))
                },
                remove: function() {
                    for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                    return this
                },
                add: function() {
                    var e, t, s = this;
                    for (e = 0; e < arguments.length; e++) {
                        var i = a(arguments[e]);
                        for (t = 0; t < i.length; t++) s[s.length] = i[t], s.length++
                    }
                    return s
                }
            }, a.fn = e.prototype, a.unique = function(e) {
                for (var a = [], t = 0; t < e.length; t++) a.indexOf(e[t]) === -1 && a.push(e[t]);
                return a
            }, a
        }()), s = ["jQuery", "Zepto", "Dom7"], i = 0; i < s.length; i++) window[s[i]] && function(e) {
        e.fn.rplgsw = function(t) {
            var s;
            return e(this).each(function() {
                var e = new a(this, t);
                s || (s = e)
            }), s
        }
    }(window[s[i]]);
    var r;
    r = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t, r && ("transitionEnd" in r.fn || (r.fn.transitionEnd = function(e) {
        function a(r) {
            if (r.target === this)
                for (e.call(this, r), t = 0; t < s.length; t++) i.off(s[t], a)
        }
        var t, s = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            i = this;
        if (e)
            for (t = 0; t < s.length; t++) i.on(s[t], a);
        return this
    }), "transform" in r.fn || (r.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
        }
        return this
    }), "transition" in r.fn || (r.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
            var t = this[a].style;
            t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
        }
        return this
    }), "outerWidth" in r.fn || (r.fn.outerWidth = function(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Rplgsw = a
}(), "undefined" != typeof module ? module.exports = window.Rplgsw : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Rplgsw
});function rplg_svg() {
    return '' +
        '<svg>' +
        '<defs>' +
        '<g id="star" width="17" height="17">' +
        '<path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>' +
        '</g>' +
        '<g id="star-half" width="17" height="17">' +
        '<path d="M1250 957l257-250-356-52-66-10-30-60-159-322v963l59 31 318 168-60-355-12-66zm452-262l-363 354 86 500q5 33-6 51.5t-34 18.5q-17 0-40-12l-449-236-449 236q-23 12-40 12-23 0-34-18.5t-6-51.5l86-500-364-354q-32-32-23-59.5t54-34.5l502-73 225-455q20-41 49-41 28 0 49 41l225 455 502 73q45 7 54 34.5t-24 59.5z"></path>' +
        '</g>' +
        '<g id="star-o" width="17" height="17">' +
        '<path d="M1201 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#ccc"></path>' +
        '</g>' +
        '<g id="logo-g" height="44" width="44" fill="none" fill-rule="evenodd">' +
        '<path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4"></path><path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853"></path><path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05"></path><path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335"></path><path d="M20 20h472v472H20V20z"></path>' +
        '</g>' +
        '<g id="logo-f" width="30" height="30" transform="translate(23,85) scale(0.05,-0.05)">' +
        '<path fill="#fff" d="M959 1524v-264h-157q-86 0 -116 -36t-30 -108v-189h293l-39 -296h-254v-759h-306v759h-255v296h255v218q0 186 104 288.5t277 102.5q147 0 228 -12z"></path>' +
        '</g>' +
        '<g id="logo-y" x="0px" y="0px" width="44" height="44" style="enable-background:new 0 0 533.33 533.33;" xml:space="preserve">' +
        '<path d="M317.119,340.347c-9.001,9.076-1.39,25.586-1.39,25.586l67.757,113.135c0,0,11.124,14.915,20.762,14.915   c9.683,0,19.246-7.952,19.246-7.952l53.567-76.567c0,0,5.395-9.658,5.52-18.12c0.193-12.034-17.947-15.33-17.947-15.33   l-126.816-40.726C337.815,335.292,325.39,331.994,317.119,340.347z M310.69,283.325c6.489,11.004,24.389,7.798,24.389,7.798   l126.532-36.982c0,0,17.242-7.014,19.704-16.363c2.415-9.352-2.845-20.637-2.845-20.637l-60.468-71.225   c0,0-5.24-9.006-16.113-9.912c-11.989-1.021-19.366,13.489-19.366,13.489l-71.494,112.505   C311.029,261.999,304.709,273.203,310.69,283.325z M250.91,239.461c14.9-3.668,17.265-25.314,17.265-25.314l-1.013-180.14   c0,0-2.247-22.222-12.232-28.246c-15.661-9.501-20.303-4.541-24.79-3.876l-105.05,39.033c0,0-10.288,3.404-15.646,11.988   c-7.651,12.163,7.775,29.972,7.775,29.972l109.189,148.831C226.407,231.708,237.184,242.852,250.91,239.461z M224.967,312.363   c0.376-13.894-16.682-22.239-16.682-22.239L95.37,233.079c0,0-16.732-6.899-24.855-2.091c-6.224,3.677-11.738,10.333-12.277,16.216   l-7.354,90.528c0,0-1.103,15.685,2.963,22.821c5.758,10.128,24.703,3.074,24.703,3.074L210.37,334.49   C215.491,331.048,224.471,330.739,224.967,312.363z M257.746,361.219c-11.315-5.811-24.856,6.224-24.856,6.224l-88.265,97.17   c0,0-11.012,14.858-8.212,23.982c2.639,8.552,7.007,12.802,13.187,15.797l88.642,27.982c0,0,10.747,2.231,18.884-0.127   c11.552-3.349,9.424-21.433,9.424-21.433l2.003-131.563C268.552,379.253,268.101,366.579,257.746,361.219z" fill="#D80027"/>' +
        '</g>' +
        '<g id="dots" fill="none" fill-rule="evenodd" width="12" height="12">' +
        '<circle cx="6" cy="3" r="1" fill="#000"/>' +
        '<circle cx="6" cy="6" r="1" fill="#000"/>' +
        '<circle cx="6" cy="9" r="1" fill="#000"/>' +
        '</g>' +
        '</defs>' +
        '</svg>';
}

function simple_stars(rating, color) {
    var str = '';
    for (var i = 1; i < 6; i++) {
        var score = rating - i;
        if (score >= 0) {
            str += '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star" fill="' + color + '"/></svg>';
        } else if (score > -1 && score < 0) {
            if (score < -0.75) {
                str += '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-o"/></svg>';
            } else if (score > -0.25) {
                str += '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star" fill="' + color + '"/></svg>';
            } else {
                str += '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-half" fill="' + color + '"/></svg>';
            }
        } else {
            str += '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-o"/></svg>';
        }
    }
    return str;
}

function yelp_stars(rating) {
    var rating = Math.round(rating * 2) / 2;
    return '<svg class="yrw-rating yrw-rating-' + rating * 10 + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 865 145" width="865" height="145"><path class="yrw-stars-1f" d="M110.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-0h" d="M33.3,0.3C14.7,0.3-0.4,15.4-0.4,34V111c0,18.6,15.1,33.7,33.7,33.7h38.3V0.3H33.3z"/><path class="yrw-stars-2f" d="M290.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-1h" d="M214,0.3c-18.6,0-33.7,15.1-33.7,33.7v77c0,18.6,15.1,33.7,33.7,33.7h38.3V0.3H214z"/><path class="yrw-stars-3f" d="M470.4 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c.1-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-2h" d="M393.9,0.6c-18.6,0-33.7,15.1-33.7,33.7v77c0,18.6,15.1,33.7,33.7,33.7h38.3V0.6H393.9z"/><path class="yrw-stars-4f" d="M650.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-3h" d="M573.9 0c-18.6 0-33.7 15.1-33.7 33.7v77c0 18.6 15.1 33.7 33.7 33.7h38.3v-144.4h-38.3z"/><path class="yrw-stars-5f" d="M830.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-4h" d="M753.8 0c-18.6 0-33.7 15.1-33.7 33.7v77c0 18.6 15.1 33.7 33.7 33.7h38.3v-144.4h-38.3z"/><path class="yrw-stars" fill="#FFF" stroke="#FFF" stroke-width="2" stroke-linejoin="round" d="M72 19.3l13.6 35.4 37.9 2-29.5 23.9 9.8 36.6-31.8-20.6-31.8 20.6 9.8-36.6-29.5-23.9 37.9-2zm180.2 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2zm179.8 0l13.6 35.4 37.9 2-29.5 23.9 9.8 36.6-31.8-20.6-31.8 20.6 9.8-36.6-29.5-23.9 37.9-2zm180.2 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2zm180 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2z"/></svg>';
}

function render_stars(rating, provider, color) {
    switch (provider) {
        case 'google':
            return simple_stars(rating, '#e7711b');
        case 'facebook':
            return simple_stars(rating, '#3c5b9b');
        case 'yelp':
            return yelp_stars(rating);
    }
    return simple_stars(rating, color);
}

function render_logo(provider) {
    switch (provider) {
        case 'google':
            return '<svg viewBox="0 0 512 512" width="44" height="44"><use xlink:href="#logo-g"/></svg>';
        case 'facebook':
            return '<svg viewBox="0 0 100 100" width="44" height="44"><use xlink:href="#logo-f"/></svg>';
        case 'yelp':
            return '<svg viewBox="0 0 533.33 533.33" width="44" height="44"><use xlink:href="#logo-y"/></svg>';
    }
}

function render_rplg_logo(provider) {
    if (provider == 'summary') return '';
    else return '<span class="rplg-social-logo rplg-' + provider + '-logo">' + render_logo(provider) + '</span>';
}

function _rplg_init_svg(el) {
    var span = document.createElement('span');
    span.style.display = 'none';
    span.innerHTML = rplg_svg();
    document.body.appendChild(span);

    var stars = el.querySelectorAll('.rplg-stars');
    for (var i = 0; i < stars.length; i++) {
        var info = stars[i].getAttribute('data-info'),
            infos = info.split(','),
            rating = infos[0],
            provider = infos[1],
            color = infos[2];

        stars[i].innerHTML = render_stars(rating, provider, color);
    }

    var badges = el.querySelectorAll('.rplg-review-badge');
    for (var i = 0; i < badges.length; i++) {
        badges[i].innerHTML = render_rplg_logo(badges[i].getAttribute('data-provider'));
    }
}

function _rplg_badge_init(el) {
    var badge_cnt = el.querySelector('.rplg-badge-cnt'),
        is_float = badge_cnt.className.indexOf('-fixed') > -1;
    if (is_float) {
        document.body.appendChild(el);
    }

    var badges = el.querySelectorAll('.rplg-badge2'),
        rplg = document.createElement('div');

    for (var i = 0; i < badges.length; i++) {
        var badge = badges[i],
            provider = badge.getAttribute('data-provider'),
            badge_key = 'badge_float_' + provider,
            session = sessionStorage.getItem(badge_key),
            logo = badge.querySelector('.rplg-badge-logo'),
            btn = badge.querySelector('.rplg-badge2-btn'),
            close = badge.querySelector('.rplg-badge2-close'),
            form = badge.querySelector('.rplg-form');
        (function(badge, badge_key, session, provider, logo, btn, close, form) {
            if (is_float) {
                badge.style.display = 'block';
            }
            if (close) {
                if (session) {
                    var data = JSON.parse(session);
                    if (data.hide) {
                        badge.style.display = 'none';
                    }
                }
                close.onclick = function() {
                    badge.style.display = 'none';
                    var value = JSON.parse(sessionStorage.getItem(badge_key) || '{}');
                    value.hide = true;
                    sessionStorage.setItem(badge_key, JSON.stringify(value));
                };
            }
            if (logo && provider != 'summary') {
                logo.innerHTML = render_logo(provider);
            }
            if (form) {
                btn.onclick = function() {
                    rplg_load_imgs(form);
                    form.style.display = 'block';
                };
                rplg.appendChild(form);
            }
        })(badge, badge_key, session, provider, logo, btn, close, form);
    }

    if (rplg.hasChildNodes()) {
        rplg.className = 'rplg';
        document.body.appendChild(rplg);
    }
}

function rplg_load_imgs(el) {
    var imgs = el.querySelectorAll('img.rplg-blazy[data-src]');
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('src', imgs[i].getAttribute('data-src'));
        imgs[i].removeAttribute('data-src');
    }
}

function rplg_next_reviews(pagin) {
    var parent = this.parentNode,
        selector = '.rplg .rplg-hide';
    reviews = parent.querySelectorAll(selector);
    for (var i = 0; i < pagin && i < reviews.length; i++) {
        if (reviews[i]) {
            reviews[i].className = reviews[i].className.replace('rplg-hide', '');
        }
    }
    reviews = parent.querySelectorAll(selector);
    if (reviews.length < 1) {
        parent.removeChild(this);
    }
    window.rplg_blazy && window.rplg_blazy.revalidate();
    return false;
}

function rplg_leave_review_window() {
    _rplg_popup(this.getAttribute('href'), 620, 500);
    return false;
}

function _rplg_lang() {
    var n = navigator;
    return (n.language || n.systemLanguage || n.userLanguage || 'en').substr(0, 2).toLowerCase();
}

function _rplg_popup(url, width, height) {
    var dual_left = window.screenLeft != undefined ? window.screenLeft : window.screenX,
        dual_top = window.screenTop != undefined ? window.screenTop : window.screenY,

        doc_elem = document.documentElement,
        screen_width = window.innerWidth ? window.innerWidth : doc_elem.clientWidth ? doc_elem.clientWidth : screen.width,
        screen_height = window.innerHeight ? window.innerHeight : doc_elem.clientHeight ? doc_elem.clientHeight : screen.height,

        left = ((screen_width / 2) - (width / 2)) + dual_left,
        top = ((screen_height / 2) - (height / 2)) + dual_top,
        win = window.open(url, '', 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

    if (window.focus) {
        win.focus();
    }

    return win;
}

function _rplg_init_timeago(el) {
    var els = el.querySelectorAll('.rplg-review-time');
    for (var i = 0; i < els.length; i++) {
        var clss = els[i].className,
            time;
        time = parseInt(els[i].getAttribute('data-time')) * 1000;
        els[i].innerHTML = WPacTime.getTime(time, _rplg_lang(), 'ago');
    }
}

function _rplg_init_blazy(attempts) {
    if (!window.Blazy) {
        if (attempts > 0) {
            setTimeout(function() {
                _rplg_init_blazy(attempts - 1);
            }, 200);
        }
        return;
    }
    window.rplg_blazy = new Blazy({
        selector: 'img.rplg-blazy'
    });
}

function _rplg_read_more(el) {
    var read_more = el.querySelectorAll('.rplg-more-toggle');
    for (var i = 0; i < read_more.length; i++) {
        (function(rm) {
            rm.onclick = function() {
                rm.parentNode.removeChild(rm.previousSibling.previousSibling);
                rm.previousSibling.className = '';
                rm.textContent = '';
            };
        })(read_more[i]);
    }
}

function _rplg_init_slider(el, data) {
    if (!window.Rplgsw) {
        return setTimeout(function() {
            _rplg_init_slider(el, data);
        }, 200);
    }
    var swiperEl = el.querySelector('.rplgsw-container'),
        swiperData = {
            loop: true,
            autoplay: parseInt(data.speed),
            effect: data.effect,
            slidesPerView: parseInt(data.count),
            spaceBetween: parseInt(data.space),
            autoHeight: true,
            fade: {
                crossFade: true
            },
            breakpoints: {},
            onInit: function(swiper) {
                setTimeout(function() {
                    window.dispatchEvent(new Event('resize'));
                }, 500);
            },
            onTransitionEnd: function(swiper) {
                window.rplg_blazy && window.rplg_blazy.revalidate();
            }
        };

    if (data.pagin) {
        swiperData.paginationClickable = true;
        swiperData.pagination = '.rplgsw-pagination';
    }
    if (data.nextprev) {
        swiperData.nextButton = el.querySelector('.rplg-slider-next');
        swiperData.prevButton = el.querySelector('.rplg-slider-prev');
    }
    swiperData.breakpoints[data.mobileBreakpoint] = {
        slidesPerView: parseInt(data.mobileCount),
        spaceBetween: 10
    };
    swiperData.breakpoints[data.tabletBreakpoint] = {
        slidesPerView: parseInt(data.tabletCount),
        spaceBetween: 20
    };
    swiperData.breakpoints[data.desktopBreakpoint] = {
        slidesPerView: parseInt(data.desktopCount),
        spaceBetween: 30
    };
    return new Rplgsw(swiperEl, swiperData);
}

function _rplg_init_flash(el, opts) {
    var i = 0,
        expanded = false,
        wait = false,
        reviews = [],
        cnt = el.querySelector('.rplg-flash-content'),
        x = cnt.querySelector('.rplg-flash-x'),
        card = cnt.querySelector('.rplg-flash-card'),
        story = cnt.querySelector('.rplg-flash-story'),
        start = (opts.flash_start || 3) * 1000,
        visible = (opts.flash_visible || 5) * 1000,
        invisible = (opts.flash_invisible || 5) * 1000,

        rplgIsHover = e => e.parentElement.querySelector(':hover') === e;

    document.body.appendChild(el);

    var revels = el.querySelectorAll('.rplg-form-review');
    for (var j = 0; j < revels.length; j++) {
        var revel = revels[j],
            infos = revel.querySelector('.rplg-stars').getAttribute('data-info').split(',');

        reviews.push({
            avatar: opts.hide_avatar ? '' : revel.querySelector('.rplg-review-avatar').getAttribute('data-src'),
            author_name: opts.hide_name ? '' : revel.querySelector('.rplg-review-name').getAttribute('title'),
            time: opts.disable_review_time ? '' : revel.querySelector('.rplg-review-time').getAttribute('data-time'),
            rating: infos[0],
            provider: infos[1]
        });
    }

    var show = function(nonext) {
        if (!expanded && !wait) {
            _rplg_flashnext(el, story, i, reviews, opts);
            cnt.className = 'rplg-flash-content rplg-flash-visible';
            i = i + 1 < reviews.length ? i + 1 : 0;
        }
        wait = false;
        setTimeout(function() {
            if (!expanded && !rplgIsHover(cnt) && !wait) {
                cnt.className = 'rplg-flash-content';
            }
            setTimeout(show, invisible);
        }, visible);
    };
    setTimeout(show, start);

    x.onclick = function() {
        cnt.className = 'rplg-flash-content';
    };

    story.onclick = function() {
        expanded = true;
        rplg_load_imgs(cnt);

        var idx = card.querySelector('.rplg-row').getAttribute('data-idx'),
            review = card.querySelector('.rplg-form-review[data-idx="' + idx + '"]');

        review.className = 'rplg-form-review rplg-highlight';
        setTimeout(function() {
            review.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300);

        card.className = 'rplg-flash-card rplg-flash-expanded';
        cnt.className = 'rplg-flash-content rplg-flash-visible';
        x.innerHTML = '<svg viewBox="0 0 86.001 86.001"><path style="fill:#030104" d="M5.907,21.004c-1.352-1.338-3.542-1.338-4.894,0c-1.35,1.336-1.352,3.506,0,4.844l39.54,39.15   c1.352,1.338,3.542,1.338,4.894,0l39.54-39.15c1.351-1.338,1.352-3.506,0-4.844c-1.352-1.338-3.542-1.338-4.894-0.002L43,56.707   L5.907,21.004z"></path></svg>';
        x.onclick = function() {
            review.className = 'rplg-form-review';
            card.className = 'rplg-flash-card';
            expanded = false;
            wait = true;
            x.innerHTML = '×';
            x.onclick = function() {
                cnt.className = 'rplg-flash-content';
            };
        };
    };
}

function _rplg_flashnext(el, story, i, reviews, opts) {
    if (story.firstChild) {
        var review = reviews[i];
        story.querySelector('.rplg-row').setAttribute('data-idx', i);
        if (opts.flash_user_photo) {
            story.querySelector('.rplg-flash-img').innerHTML = '<img src="' + review.avatar + '" class="rplg-review-avatar" ' +
                'alt="' + review.author_name + '" width="44" height="44">';
        } else if (!opts.hide_avatar) {
            story.querySelector('.rplg-flash-photo').innerHTML = '<img src="' + review.avatar + '" class="rplg-review-avatar" ' +
                'alt="' + review.author_name + '" width="16" height="16">';
        }
        if (!opts.hide_name) {
            story.querySelector('.rplg-flash-name').innerHTML = review.author_name;
        }
        story.querySelector('.rplg-flash-rating').innerHTML = parseInt(review.rating);
        story.querySelector('.rplg-flash-stars').innerHTML = _rplg_flashtext(review, opts);
        if (!opts.disable_review_time) {
            story.querySelector('.rplg-flash-time').innerHTML = WPacTime.getTimeAgo(review.time * 1000, _rplg_lang(), 'ago');
        }
    } else {
        story.innerHTML = _rplg_flashstory(i, reviews, opts);
    }
}

function _rplg_flashstory(i, reviews, opts) {
    var review = reviews[i];
    return '<div class="rplg-row" data-idx="' + i + '">' +

        (opts.flash_hide_logo && !opts.flash_user_photo ? '' :
            '<div class="rplg-row-left">' +
            '<div class="rplg-flash-img">' +

            (opts.flash_user_photo ?

                '<img src="' + review.avatar + '" class="rplg-review-avatar" alt="' + review.author_name + '" width="44" height="44">' :

                '<span style="position:relative;display:inline-block;margin:0 6px 0 0;vertical-align: middle;"><svg viewBox="0 0 1792 1792" width="44" height="44"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#FFAF02"></path></svg><span style="position:absolute;bottom: 0px;right: 0px;width: 28px;height: 28px;background:#fff;border-radius:50%;border:4px solid #212121;"></span><svg width="28" height="28" viewBox="0 0 1792 1792" style="position:absolute;bottom: 0px;right: 0px;border-radius:50%;"><path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" fill="#8cc976"></path></svg></span>') +

            '</div>' +
            '</div>') +

        '<div class="rplg-row-right">' +
        '<div class="rplg-flash-text">' +

        (opts.flash_user_photo || opts.hide_avatar ? '' :
            '<span class="rplg-flash-photo">' +
            '<img src="' + review.avatar + '" class="rplg-review-avatar" alt="' + review.author_name + '" width="16" height="16">' +
            '</span>') +

        (opts.hide_name ? '' :
            '<span class="rplg-flash-name">' + review.author_name + '</span> ') +

        '<span> ' + opts.text.m1.replace('%s', '<span class="rplg-flash-rating">' + review.rating + '</span>') + '</span>' +
        '</div>' +
        '<div class="rplg-flash-stars">' + _rplg_flashtext(review, opts) + '</div>' +
        '<div class="rplg-flash-footer">' +

        (opts.disable_review_time ? '' :
            '<span class="rplg-flash-time">' + WPacTime.getTimeAgo(review.time * 1000, _rplg_lang(), 'ago') + '</span>') +

        '<span class="rplg-flash-power"></span>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function _rplg_flashtext(review, opts) {
    return '<span class="rplg-flash-star" data-provider="' + review.provider + '">' +
        render_stars(review.rating, review.provider, 'ffa318') +
        '</span> ' + opts.text.m2 + ' <span class="rplg-flash-logo" data-provider="' + review.provider + '">' +
        render_logo(review.provider) +
        '</span>';
}

function _rplg_get_parent(el, cl) {
    cl = cl || 'rplg';
    if (el.className.split(' ').indexOf(cl) < 0) {
        // the last semicolon (;) without braces ({}) in empty loop makes error in WP Faster Cache
        //while ((el = el.parentElement) && el.className.split(' ').indexOf(cl) < 0);
        while ((el = el.parentElement) && el.className.split(' ').indexOf(cl) < 0) {}
    }
    return el;
}

function rplg_init(el, cb) {
    var el = _rplg_get_parent(el),
        img = el.querySelector('img[data-exec]');

    if (img.getAttribute('data-exec') == 'true') return el;

    _rplg_init_svg(el);
    _rplg_init_timeago(el);
    _rplg_read_more(el);
    if (cb) cb(el);
    _rplg_init_blazy(10);

    img.setAttribute('data-exec', 'true');
    return el;
}

function rplg_init_slider_theme(el, data) {
    rplg_init(el, function(el) {
        _rplg_init_slider(el, data);
    });
}

function rplg_init_grid_theme(el) {
    rplg_init(el);
}

function rplg_init_list_theme(el) {
    rplg_init(el);
}

function rplg_init_badge_theme(el) {
    rplg_init(el, function(el) {
        _rplg_badge_init(el);
    });
}

function rplg_init_temp_theme(el) {
    rplg_init(el);
}

function rplg_init_flash_theme(el, opts) {
    rplg_init(el, function(el) {
        _rplg_init_flash(el, opts);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var jsexec = function(js) {
            eval(js);
        },
        rplgimgs = document.querySelectorAll('.rplg > img[data-exec="false"]');
    for (var i = 0; i < rplgimgs.length; i++) {
        (function(rplgimg) {
            if (rplgimg.getAttribute('data-exec') == 'false') {
                var js = rplgimg.getAttribute('onload');
                jsexec.call(rplgimg, js);
                console.log('rplg exec');
            }
        })(rplgimgs[i]);
    }
});/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */ ! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(ie, e) {
    "use strict";
    var oe = [],
        r = Object.getPrototypeOf,
        ae = oe.slice,
        g = oe.flat ? function(e) {
            return oe.flat.call(e)
        } : function(e) {
            return oe.concat.apply([], e)
        },
        s = oe.push,
        se = oe.indexOf,
        n = {},
        i = n.toString,
        ue = n.hasOwnProperty,
        o = ue.toString,
        a = o.call(Object),
        le = {},
        v = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
        },
        y = function(e) {
            return null != e && e === e.window
        },
        C = ie.document,
        u = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function m(e, t, n) {
        var r, i, o = (n = n || C).createElement("script");
        if (o.text = e, t)
            for (r in u)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }

    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[i.call(e)] || "object" : typeof e
    }
    var t = "3.7.1",
        l = /HTML$/i,
        ce = function(e, t) {
            return new ce.fn.init(e, t)
        };

    function c(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);
        return !v(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }

    function fe(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    ce.fn = ce.prototype = {
        jquery: t,
        constructor: ce,
        length: 0,
        toArray: function() {
            return ae.call(this)
        },
        get: function(e) {
            return null == e ? ae.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = ce.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return ce.each(this, e)
        },
        map: function(n) {
            return this.pushStack(ce.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(ae.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        even: function() {
            return this.pushStack(ce.grep(this, function(e, t) {
                return (t + 1) % 2
            }))
        },
        odd: function() {
            return this.pushStack(ce.grep(this, function(e, t) {
                return t % 2
            }))
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: s,
        sort: oe.sort,
        splice: oe.splice
    }, ce.extend = ce.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || v(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (ce.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || ce.isPlainObject(n) ? n : {}, i = !1, a[t] = ce.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, ce.extend({
        expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== i.call(e)) && (!(t = r(e)) || "function" == typeof(n = ue.call(t, "constructor") && t.constructor) && o.call(n) === a)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e, t, n) {
            m(e, {
                nonce: t && t.nonce
            }, n)
        },
        each: function(e, t) {
            var n, r = 0;
            if (c(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r])) break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        text: function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (!i)
                while (t = e[r++]) n += ce.text(t);
            return 1 === i || 11 === i ? e.textContent : 9 === i ? e.documentElement.textContent : 3 === i || 4 === i ? e.nodeValue : n
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (c(Object(e)) ? ce.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : se.call(t, e, n)
        },
        isXMLDoc: function(e) {
            var t = e && e.namespaceURI,
                n = e && (e.ownerDocument || e).documentElement;
            return !l.test(t || n && n.nodeName || "HTML")
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0,
                a = [];
            if (c(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
            return g(a)
        },
        guid: 1,
        support: le
    }), "function" == typeof Symbol && (ce.fn[Symbol.iterator] = oe[Symbol.iterator]), ce.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var pe = oe.pop,
        de = oe.sort,
        he = oe.splice,
        ge = "[\\x20\\t\\r\\n\\f]",
        ve = new RegExp("^" + ge + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ge + "+$", "g");
    ce.contains = function(e, t) {
        var n = t && t.parentNode;
        return e === n || !(!n || 1 !== n.nodeType || !(e.contains ? e.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
    };
    var f = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

    function p(e, t) {
        return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
    }
    ce.escapeSelector = function(e) {
        return (e + "").replace(f, p)
    };
    var ye = C,
        me = s;
    ! function() {
        var e, b, w, o, a, T, r, C, d, i, k = me,
            S = ce.expando,
            E = 0,
            n = 0,
            s = W(),
            c = W(),
            u = W(),
            h = W(),
            l = function(e, t) {
                return e === t && (a = !0), 0
            },
            f = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            t = "(?:\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            p = "\\[" + ge + "*(" + t + ")(?:" + ge + "*([*^$|!~]?=)" + ge + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + t + "))|)" + ge + "*\\]",
            g = ":(" + t + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + p + ")*)|.*)\\)|)",
            v = new RegExp(ge + "+", "g"),
            y = new RegExp("^" + ge + "*," + ge + "*"),
            m = new RegExp("^" + ge + "*([>+~]|" + ge + ")" + ge + "*"),
            x = new RegExp(ge + "|>"),
            j = new RegExp(g),
            A = new RegExp("^" + t + "$"),
            D = {
                ID: new RegExp("^#(" + t + ")"),
                CLASS: new RegExp("^\\.(" + t + ")"),
                TAG: new RegExp("^(" + t + "|[*])"),
                ATTR: new RegExp("^" + p),
                PSEUDO: new RegExp("^" + g),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ge + "*(even|odd|(([+-]|)(\\d*)n|)" + ge + "*(?:([+-]|)" + ge + "*(\\d+)|))" + ge + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + f + ")$", "i"),
                needsContext: new RegExp("^" + ge + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ge + "*((?:-\\d)?\\d*)" + ge + "*\\)|)(?=[^-]|$)", "i")
            },
            N = /^(?:input|select|textarea|button)$/i,
            q = /^h\d$/i,
            L = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            H = /[+~]/,
            O = new RegExp("\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\([^\\r\\n\\f])", "g"),
            P = function(e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
            },
            M = function() {
                V()
            },
            R = J(function(e) {
                return !0 === e.disabled && fe(e, "fieldset")
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            k.apply(oe = ae.call(ye.childNodes), ye.childNodes), oe[ye.childNodes.length].nodeType
        } catch (e) {
            k = {
                apply: function(e, t) {
                    me.apply(e, ae.call(t))
                },
                call: function(e) {
                    me.apply(e, ae.call(arguments, 1))
                }
            }
        }

        function I(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument,
                p = e ? e.nodeType : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!r && (V(e), e = e || T, C)) {
                if (11 !== p && (u = L.exec(t)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = e.getElementById(i))) return n;
                            if (a.id === i) return k.call(n, a), n
                        } else if (f && (a = f.getElementById(i)) && I.contains(e, a) && a.id === i) return k.call(n, a), n
                    } else {
                        if (u[2]) return k.apply(n, e.getElementsByTagName(t)), n;
                        if ((i = u[3]) && e.getElementsByClassName) return k.apply(n, e.getElementsByClassName(i)), n
                    } if (!(h[t + " "] || d && d.test(t))) {
                    if (c = t, f = e, 1 === p && (x.test(t) || m.test(t))) {
                        (f = H.test(t) && U(e.parentNode) || e) == e && le.scope || ((s = e.getAttribute("id")) ? s = ce.escapeSelector(s) : e.setAttribute("id", s = S)), o = (l = Y(t)).length;
                        while (o--) l[o] = (s ? "#" + s : ":scope") + " " + Q(l[o]);
                        c = l.join(",")
                    }
                    try {
                        return k.apply(n, f.querySelectorAll(c)), n
                    } catch (e) {
                        h(t, !0)
                    } finally {
                        s === S && e.removeAttribute("id")
                    }
                }
            }
            return re(t.replace(ve, "$1"), e, n, r)
        }

        function W() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n
            }
        }

        function F(e) {
            return e[S] = !0, e
        }

        function $(e) {
            var t = T.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function B(t) {
            return function(e) {
                return fe(e, "input") && e.type === t
            }
        }

        function _(t) {
            return function(e) {
                return (fe(e, "input") || fe(e, "button")) && e.type === t
            }
        }

        function z(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && R(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function X(a) {
            return F(function(o) {
                return o = +o, F(function(e, t) {
                    var n, r = a([], e.length, o),
                        i = r.length;
                    while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function U(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function V(e) {
            var t, n = e ? e.ownerDocument || e : ye;
            return n != T && 9 === n.nodeType && n.documentElement && (r = (T = n).documentElement, C = !ce.isXMLDoc(T), i = r.matches || r.webkitMatchesSelector || r.msMatchesSelector, r.msMatchesSelector && ye != T && (t = T.defaultView) && t.top !== t && t.addEventListener("unload", M), le.getById = $(function(e) {
                return r.appendChild(e).id = ce.expando, !T.getElementsByName || !T.getElementsByName(ce.expando).length
            }), le.disconnectedMatch = $(function(e) {
                return i.call(e, "*")
            }), le.scope = $(function() {
                return T.querySelectorAll(":scope")
            }), le.cssHas = $(function() {
                try {
                    return T.querySelector(":has(*,:jqfake)"), !1
                } catch (e) {
                    return !0
                }
            }), le.getById ? (b.filter.ID = function(e) {
                var t = e.replace(O, P);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (b.filter.ID = function(e) {
                var n = e.replace(O, P);
                return function(e) {
                    var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }, b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && C) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        i = t.getElementsByName(e), r = 0;
                        while (o = i[r++])
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                    }
                    return []
                }
            }), b.find.TAG = function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : t.querySelectorAll(e)
            }, b.find.CLASS = function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && C) return t.getElementsByClassName(e)
            }, d = [], $(function(e) {
                var t;
                r.appendChild(e).innerHTML = "<a id='" + S + "' href='' disabled='disabled'></a><select id='" + S + "-\r\\' disabled='disabled'><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + ge + "*(?:value|" + f + ")"), e.querySelectorAll("[id~=" + S + "-]").length || d.push("~="), e.querySelectorAll("a#" + S + "+*").length || d.push(".#.+[+~]"), e.querySelectorAll(":checked").length || d.push(":checked"), (t = T.createElement("input")).setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), r.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && d.push(":enabled", ":disabled"), (t = T.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || d.push("\\[" + ge + "*name" + ge + "*=" + ge + "*(?:''|\"\")")
            }), le.cssHas || d.push(":has"), d = d.length && new RegExp(d.join("|")), l = function(e, t) {
                if (e === t) return a = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !le.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument == ye && I.contains(ye, e) ? -1 : t === T || t.ownerDocument == ye && I.contains(ye, t) ? 1 : o ? se.call(o, e) - se.call(o, t) : 0 : 4 & n ? -1 : 1)
            }), T
        }
        for (e in I.matches = function(e, t) {
                return I(e, null, null, t)
            }, I.matchesSelector = function(e, t) {
                if (V(e), C && !h[t + " "] && (!d || !d.test(t))) try {
                    var n = i.call(e, t);
                    if (n || le.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (e) {
                    h(t, !0)
                }
                return 0 < I(t, T, null, [e]).length
            }, I.contains = function(e, t) {
                return (e.ownerDocument || e) != T && V(e), ce.contains(e, t)
            }, I.attr = function(e, t) {
                (e.ownerDocument || e) != T && V(e);
                var n = b.attrHandle[t.toLowerCase()],
                    r = n && ue.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !C) : void 0;
                return void 0 !== r ? r : e.getAttribute(t)
            }, I.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, ce.uniqueSort = function(e) {
                var t, n = [],
                    r = 0,
                    i = 0;
                if (a = !le.sortStable, o = !le.sortStable && ae.call(e, 0), de.call(e, l), a) {
                    while (t = e[i++]) t === e[i] && (r = n.push(i));
                    while (r--) he.call(e, n[r], 1)
                }
                return o = null, e
            }, ce.fn.uniqueSort = function() {
                return this.pushStack(ce.uniqueSort(ae.apply(this)))
            }, (b = ce.expr = {
                cacheLength: 50,
                createPseudo: F,
                match: D,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(O, P), e[3] = (e[3] || e[4] || e[5] || "").replace(O, P), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || I.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && I.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return D.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && j.test(n) && (t = Y(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(O, P).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return fe(e, t)
                        }
                    },
                    CLASS: function(e) {
                        var t = s[e + " "];
                        return t || (t = new RegExp("(^|" + ge + ")" + e + "(" + ge + "|$)")) && s(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, r, i) {
                        return function(e) {
                            var t = I.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(v, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(d, e, t, h, g) {
                        var v = "nth" !== d.slice(0, 3),
                            y = "last" !== d.slice(-4),
                            m = "of-type" === e;
                        return 1 === h && 0 === g ? function(e) {
                            return !!e.parentNode
                        } : function(e, t, n) {
                            var r, i, o, a, s, u = v !== y ? "nextSibling" : "previousSibling",
                                l = e.parentNode,
                                c = m && e.nodeName.toLowerCase(),
                                f = !n && !m,
                                p = !1;
                            if (l) {
                                if (v) {
                                    while (u) {
                                        o = e;
                                        while (o = o[u])
                                            if (m ? fe(o, c) : 1 === o.nodeType) return !1;
                                        s = u = "only" === d && !s && "nextSibling"
                                    }
                                    return !0
                                }
                                if (s = [y ? l.firstChild : l.lastChild], y && f) {
                                    p = (a = (r = (i = l[S] || (l[S] = {}))[d] || [])[0] === E && r[1]) && r[2], o = a && l.childNodes[a];
                                    while (o = ++a && o && o[u] || (p = a = 0) || s.pop())
                                        if (1 === o.nodeType && ++p && o === e) {
                                            i[d] = [E, a, p];
                                            break
                                        }
                                } else if (f && (p = a = (r = (i = e[S] || (e[S] = {}))[d] || [])[0] === E && r[1]), !1 === p)
                                    while (o = ++a && o && o[u] || (p = a = 0) || s.pop())
                                        if ((m ? fe(o, c) : 1 === o.nodeType) && ++p && (f && ((i = o[S] || (o[S] = {}))[d] = [E, p]), o === e)) break;
                                return (p -= g) === h || p % h == 0 && 0 <= p / h
                            }
                        }
                    },
                    PSEUDO: function(e, o) {
                        var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || I.error("unsupported pseudo: " + e);
                        return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? F(function(e, t) {
                            var n, r = a(e, o),
                                i = r.length;
                            while (i--) e[n = se.call(e, r[i])] = !(t[n] = r[i])
                        }) : function(e) {
                            return a(e, 0, t)
                        }) : a
                    }
                },
                pseudos: {
                    not: F(function(e) {
                        var r = [],
                            i = [],
                            s = ne(e.replace(ve, "$1"));
                        return s[S] ? F(function(e, t, n, r) {
                            var i, o = s(e, null, r, []),
                                a = e.length;
                            while (a--)(i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function(e, t, n) {
                            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                        }
                    }),
                    has: F(function(t) {
                        return function(e) {
                            return 0 < I(t, e).length
                        }
                    }),
                    contains: F(function(t) {
                        return t = t.replace(O, P),
                            function(e) {
                                return -1 < (e.textContent || ce.text(e)).indexOf(t)
                            }
                    }),
                    lang: F(function(n) {
                        return A.test(n || "") || I.error("unsupported lang: " + n), n = n.replace(O, P).toLowerCase(),
                            function(e) {
                                var t;
                                do {
                                    if (t = C ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var t = ie.location && ie.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === r
                    },
                    focus: function(e) {
                        return e === function() {
                            try {
                                return T.activeElement
                            } catch (e) {}
                        }() && T.hasFocus() && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: z(!1),
                    disabled: z(!0),
                    checked: function(e) {
                        return fe(e, "input") && !!e.checked || fe(e, "option") && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return q.test(e.nodeName)
                    },
                    input: function(e) {
                        return N.test(e.nodeName)
                    },
                    button: function(e) {
                        return fe(e, "input") && "button" === e.type || fe(e, "button")
                    },
                    text: function(e) {
                        var t;
                        return fe(e, "input") && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: X(function() {
                        return [0]
                    }),
                    last: X(function(e, t) {
                        return [t - 1]
                    }),
                    eq: X(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: X(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: X(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: X(function(e, t, n) {
                        var r;
                        for (r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: X(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) b.pseudos[e] = B(e);
        for (e in {
                submit: !0,
                reset: !0
            }) b.pseudos[e] = _(e);

        function G() {}

        function Y(e, t) {
            var n, r, i, o, a, s, u, l = c[e + " "];
            if (l) return t ? 0 : l.slice(0);
            a = e, s = [], u = b.preFilter;
            while (a) {
                for (o in n && !(r = y.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = m.exec(a)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace(ve, " ")
                    }), a = a.slice(n.length)), b.filter) !(r = D[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? I.error(e) : c(e, s).slice(0)
        }

        function Q(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function J(a, e, t) {
            var s = e.dir,
                u = e.next,
                l = u || s,
                c = t && "parentNode" === l,
                f = n++;
            return e.first ? function(e, t, n) {
                while (e = e[s])
                    if (1 === e.nodeType || c) return a(e, t, n);
                return !1
            } : function(e, t, n) {
                var r, i, o = [E, f];
                if (n) {
                    while (e = e[s])
                        if ((1 === e.nodeType || c) && a(e, t, n)) return !0
                } else
                    while (e = e[s])
                        if (1 === e.nodeType || c)
                            if (i = e[S] || (e[S] = {}), u && fe(e, u)) e = e[s] || e;
                            else {
                                if ((r = i[l]) && r[0] === E && r[1] === f) return o[2] = r[2];
                                if ((i[l] = o)[2] = a(e, t, n)) return !0
                            } return !1
            }
        }

        function K(i) {
            return 1 < i.length ? function(e, t, n) {
                var r = i.length;
                while (r--)
                    if (!i[r](e, t, n)) return !1;
                return !0
            } : i[0]
        }

        function Z(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function ee(d, h, g, v, y, e) {
            return v && !v[S] && (v = ee(v)), y && !y[S] && (y = ee(y, e)), F(function(e, t, n, r) {
                var i, o, a, s, u = [],
                    l = [],
                    c = t.length,
                    f = e || function(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) I(e, t[r], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []),
                    p = !d || !e && h ? f : Z(f, u, d, n, r);
                if (g ? g(p, s = y || (e ? d : c || v) ? [] : t, n, r) : s = p, v) {
                    i = Z(s, l), v(i, [], n, r), o = i.length;
                    while (o--)(a = i[o]) && (s[l[o]] = !(p[l[o]] = a))
                }
                if (e) {
                    if (y || d) {
                        if (y) {
                            i = [], o = s.length;
                            while (o--)(a = s[o]) && i.push(p[o] = a);
                            y(null, s = [], i, r)
                        }
                        o = s.length;
                        while (o--)(a = s[o]) && -1 < (i = y ? se.call(e, a) : u[o]) && (e[i] = !(t[i] = a))
                    }
                } else s = Z(s === t ? s.splice(c, s.length) : s), y ? y(null, t, s, r) : k.apply(t, s)
            })
        }

        function te(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = J(function(e) {
                    return e === i
                }, a, !0), l = J(function(e) {
                    return -1 < se.call(i, e)
                }, a, !0), c = [function(e, t, n) {
                    var r = !o && (n || t != w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null, r
                }]; s < r; s++)
                if (t = b.relative[e[s].type]) c = [J(K(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                        for (n = ++s; n < r; n++)
                            if (b.relative[e[n].type]) break;
                        return ee(1 < s && K(c), 1 < s && Q(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ve, "$1"), t, s < n && te(e.slice(s, n)), n < r && te(e = e.slice(n)), n < r && Q(e))
                    }
                    c.push(t)
                } return K(c)
        }

        function ne(e, t) {
            var n, v, y, m, x, r, i = [],
                o = [],
                a = u[e + " "];
            if (!a) {
                t || (t = Y(e)), n = t.length;
                while (n--)(a = te(t[n]))[S] ? i.push(a) : o.push(a);
                (a = u(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function(e, t, n, r, i) {
                    var o, a, s, u = 0,
                        l = "0",
                        c = e && [],
                        f = [],
                        p = w,
                        d = e || x && b.find.TAG("*", i),
                        h = E += null == p ? 1 : Math.random() || .1,
                        g = d.length;
                    for (i && (w = t == T || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            a = 0, t || o.ownerDocument == T || (V(o), n = !C);
                            while (s = v[a++])
                                if (s(o, t || T, n)) {
                                    k.call(r, o);
                                    break
                                } i && (E = h)
                        }
                        m && ((o = !s && o) && u--, e && c.push(o))
                    }
                    if (u += l, m && l !== u) {
                        a = 0;
                        while (s = y[a++]) s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                while (l--) c[l] || f[l] || (f[l] = pe.call(r));
                            f = Z(f)
                        }
                        k.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && ce.uniqueSort(r)
                    }
                    return i && (E = h, w = p), c
                }, m ? F(r) : r))).selector = e
            }
            return a
        }

        function re(e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e,
                c = !r && Y(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && C && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(O, P), t) || [])[0])) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                i = D.needsContext.test(e) ? 0 : o.length;
                while (i--) {
                    if (a = o[i], b.relative[s = a.type]) break;
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(O, P), H.test(o[0].type) && U(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && Q(o))) return k.apply(n, r), n;
                        break
                    }
                }
            }
            return (l || ne(e, c))(r, t, !C, n, !t || H.test(e) && U(t.parentNode) || t), n
        }
        G.prototype = b.filters = b.pseudos, b.setFilters = new G, le.sortStable = S.split("").sort(l).join("") === S, V(), le.sortDetached = $(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"))
        }), ce.find = I, ce.expr[":"] = ce.expr.pseudos, ce.unique = ce.uniqueSort, I.compile = ne, I.select = re, I.setDocument = V, I.tokenize = Y, I.escape = ce.escapeSelector, I.getText = ce.text, I.isXML = ce.isXMLDoc, I.selectors = ce.expr, I.support = ce.support, I.uniqueSort = ce.uniqueSort
    }();
    var d = function(e, t, n) {
            var r = [],
                i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && ce(e).is(n)) break;
                    r.push(e)
                } return r
        },
        h = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        b = ce.expr.match.needsContext,
        w = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function T(e, n, r) {
        return v(n) ? ce.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? ce.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? ce.grep(e, function(e) {
            return -1 < se.call(n, e) !== r
        }) : ce.filter(n, e, r)
    }
    ce.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ce.find.matchesSelector(r, e) ? [r] : [] : ce.find.matches(e, ce.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, ce.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(ce(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (ce.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) ce.find(e, i[t], n);
            return 1 < r ? ce.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(T(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(T(this, e || [], !0))
        },
        is: function(e) {
            return !!T(this, "string" == typeof e && b.test(e) ? ce(e) : e || [], !1).length
        }
    });
    var k, S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (ce.fn.init = function(e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || k, "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : S.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof ce ? t[0] : t, ce.merge(this, ce.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : C, !0)), w.test(r[1]) && ce.isPlainObject(t))
                    for (r in t) v(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = C.getElementById(r[2])) && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : v(e) ? void 0 !== n.ready ? n.ready(e) : e(ce) : ce.makeArray(e, this)
    }).prototype = ce.fn, k = ce(C);
    var E = /^(?:parents|prev(?:Until|All))/,
        j = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function A(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    ce.fn.extend({
        has: function(e) {
            var t = ce(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (ce.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && ce(e);
            if (!b.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && ce.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? ce.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? se.call(ce(e), this[0]) : se.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ce.uniqueSort(ce.merge(this.get(), ce(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ce.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return d(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return d(e, "parentNode", n)
        },
        next: function(e) {
            return A(e, "nextSibling")
        },
        prev: function(e) {
            return A(e, "previousSibling")
        },
        nextAll: function(e) {
            return d(e, "nextSibling")
        },
        prevAll: function(e) {
            return d(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return d(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return d(e, "previousSibling", n)
        },
        siblings: function(e) {
            return h((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return h(e.firstChild)
        },
        contents: function(e) {
            return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (fe(e, "template") && (e = e.content || e), ce.merge([], e.childNodes))
        }
    }, function(r, i) {
        ce.fn[r] = function(e, t) {
            var n = ce.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = ce.filter(t, n)), 1 < this.length && (j[r] || ce.uniqueSort(n), E.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var D = /[^\x20\t\r\n\f]+/g;

    function N(e) {
        return e
    }

    function q(e) {
        throw e
    }

    function L(e, t, n, r) {
        var i;
        try {
            e && v(i = e.promise) ? i.call(e).done(t).fail(n) : e && v(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    ce.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r, n = {}, ce.each(e.match(D) || [], function(e, t) {
            n[t] = !0
        }), n) : ce.extend({}, r);
        var i, t, o, a, s = [],
            u = [],
            l = -1,
            c = function() {
                for (a = a || r.once, o = i = !0; u.length; l = -1) {
                    t = u.shift();
                    while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1)
                }
                r.memory || (t = !1), i = !1, a && (s = t ? [] : "")
            },
            f = {
                add: function() {
                    return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
                        ce.each(e, function(e, t) {
                            v(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== x(t) && n(t)
                        })
                    }(arguments), t && !i && c()), this
                },
                remove: function() {
                    return ce.each(arguments, function(e, t) {
                        var n;
                        while (-1 < (n = ce.inArray(t, s, n))) s.splice(n, 1), n <= l && l--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < ce.inArray(e, s) : 0 < s.length
                },
                empty: function() {
                    return s && (s = []), this
                },
                disable: function() {
                    return a = u = [], s = t = "", this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return a = u = [], t || i || (s = t = ""), this
                },
                locked: function() {
                    return !!a
                },
                fireWith: function(e, t) {
                    return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return f
    }, ce.extend({
        Deferred: function(e) {
            var o = [
                    ["notify", "progress", ce.Callbacks("memory"), ce.Callbacks("memory"), 2],
                    ["resolve", "done", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", ce.Callbacks("once memory"), ce.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var i = arguments;
                        return ce.Deferred(function(r) {
                            ce.each(o, function(e, t) {
                                var n = v(i[t[4]]) && i[t[4]];
                                s[t[1]](function() {
                                    var e = n && n.apply(this, arguments);
                                    e && v(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var u = 0;

                        function l(i, o, a, s) {
                            return function() {
                                var n = this,
                                    r = arguments,
                                    e = function() {
                                        var e, t;
                                        if (!(i < u)) {
                                            if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, v(t) ? s ? t.call(e, l(u, o, N, s), l(u, o, q, s)) : (u++, t.call(e, l(u, o, N, s), l(u, o, q, s), l(u, o, N, o.notifyWith))) : (a !== N && (n = void 0, r = [e]), (s || o.resolveWith)(n, r))
                                        }
                                    },
                                    t = s ? e : function() {
                                        try {
                                            e()
                                        } catch (e) {
                                            ce.Deferred.exceptionHook && ce.Deferred.exceptionHook(e, t.error), u <= i + 1 && (a !== q && (n = void 0, r = [e]), o.rejectWith(n, r))
                                        }
                                    };
                                i ? t() : (ce.Deferred.getErrorHook ? t.error = ce.Deferred.getErrorHook() : ce.Deferred.getStackHook && (t.error = ce.Deferred.getStackHook()), ie.setTimeout(t))
                            }
                        }
                        return ce.Deferred(function(e) {
                            o[0][3].add(l(0, e, v(r) ? r : N, e.notifyWith)), o[1][3].add(l(0, e, v(t) ? t : N)), o[2][3].add(l(0, e, v(n) ? n : q))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ce.extend(e, a) : a
                    }
                },
                s = {};
            return ce.each(o, function(e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function(e) {
            var n = arguments.length,
                t = n,
                r = Array(t),
                i = ae.call(arguments),
                o = ce.Deferred(),
                a = function(t) {
                    return function(e) {
                        r[t] = this, i[t] = 1 < arguments.length ? ae.call(arguments) : e, --n || o.resolveWith(r, i)
                    }
                };
            if (n <= 1 && (L(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || v(i[t] && i[t].then))) return o.then();
            while (t--) L(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    ce.Deferred.exceptionHook = function(e, t) {
        ie.console && ie.console.warn && e && H.test(e.name) && ie.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, ce.readyException = function(e) {
        ie.setTimeout(function() {
            throw e
        })
    };
    var O = ce.Deferred();

    function P() {
        C.removeEventListener("DOMContentLoaded", P), ie.removeEventListener("load", P), ce.ready()
    }
    ce.fn.ready = function(e) {
        return O.then(e)["catch"](function(e) {
            ce.readyException(e)
        }), this
    }, ce.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --ce.readyWait : ce.isReady) || (ce.isReady = !0) !== e && 0 < --ce.readyWait || O.resolveWith(C, [ce])
        }
    }), ce.ready.then = O.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? ie.setTimeout(ce.ready) : (C.addEventListener("DOMContentLoaded", P), ie.addEventListener("load", P));
    var M = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === x(n))
                for (s in i = !0, n) M(e, t, s, n[s], !0, o, a);
            else if (void 0 !== r && (i = !0, v(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(ce(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        R = /^-ms-/,
        I = /-([a-z])/g;

    function W(e, t) {
        return t.toUpperCase()
    }

    function F(e) {
        return e.replace(R, "ms-").replace(I, W)
    }
    var $ = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function B() {
        this.expando = ce.expando + B.uid++
    }
    B.uid = 1, B.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, $(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[F(t)] = n;
            else
                for (r in t) i[F(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][F(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(F) : (t = F(t)) in r ? [t] : t.match(D) || []).length;
                    while (n--) delete r[t[n]]
                }(void 0 === t || ce.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !ce.isEmptyObject(t)
        }
    };
    var _ = new B,
        z = new B,
        X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        U = /[A-Z]/g;

    function V(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(U, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : X.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                z.set(e, t, n)
            } else n = void 0;
        return n
    }
    ce.extend({
        hasData: function(e) {
            return z.hasData(e) || _.hasData(e)
        },
        data: function(e, t, n) {
            return z.access(e, t, n)
        },
        removeData: function(e, t) {
            z.remove(e, t)
        },
        _data: function(e, t, n) {
            return _.access(e, t, n)
        },
        _removeData: function(e, t) {
            _.remove(e, t)
        }
    }), ce.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === n) {
                if (this.length && (i = z.get(o), 1 === o.nodeType && !_.get(o, "hasDataAttrs"))) {
                    t = a.length;
                    while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = F(r.slice(5)), V(o, r, i[r]));
                    _.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function() {
                z.set(this, n)
            }) : M(this, function(e) {
                var t;
                if (o && void 0 === e) return void 0 !== (t = z.get(o, n)) ? t : void 0 !== (t = V(o, n)) ? t : void 0;
                this.each(function() {
                    z.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                z.remove(this, e)
            })
        }
    }), ce.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = _.get(e, t), n && (!r || Array.isArray(n) ? r = _.access(e, t, ce.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ce.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = ce._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                ce.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return _.get(e, n) || _.access(e, n, {
                empty: ce.Callbacks("once memory").add(function() {
                    _.remove(e, [t + "queue", n])
                })
            })
        }
    }), ce.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? ce.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = ce.queue(this, t, n);
                ce._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ce.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ce.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = ce.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (a--)(n = _.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Y = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$", "i"),
        Q = ["Top", "Right", "Bottom", "Left"],
        J = C.documentElement,
        K = function(e) {
            return ce.contains(e.ownerDocument, e)
        },
        Z = {
            composed: !0
        };
    J.getRootNode && (K = function(e) {
        return ce.contains(e.ownerDocument, e) || e.getRootNode(Z) === e.ownerDocument
    });
    var ee = function(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && K(e) && "none" === ce.css(e, "display")
    };

    function te(e, t, n, r) {
        var i, o, a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return ce.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (ce.cssNumber[t] ? "" : "px"),
            c = e.nodeType && (ce.cssNumber[t] || "px" !== l && +u) && Y.exec(ce.css(e, t));
        if (c && c[3] !== l) {
            u /= 2, l = l || c[3], c = +u || 1;
            while (a--) ce.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            c *= 2, ce.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var ne = {};

    function re(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = _.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ee(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ne[s]) || (o = a.body.appendChild(a.createElement(s)), u = ce.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ne[s] = u)))) : "none" !== n && (l[c] = "none", _.set(r, "display", n)));
        for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    ce.fn.extend({
        show: function() {
            return re(this, !0)
        },
        hide: function() {
            return re(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ee(this) ? ce(this).show() : ce(this).hide()
            })
        }
    });
    var xe, be, we = /^(?:checkbox|radio)$/i,
        Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        Ce = /^$|^module$|\/(?:java|ecma)script/i;
    xe = C.createDocumentFragment().appendChild(C.createElement("div")), (be = C.createElement("input")).setAttribute("type", "radio"), be.setAttribute("checked", "checked"), be.setAttribute("name", "t"), xe.appendChild(be), le.checkClone = xe.cloneNode(!0).cloneNode(!0).lastChild.checked, xe.innerHTML = "<textarea>x</textarea>", le.noCloneChecked = !!xe.cloneNode(!0).lastChild.defaultValue, xe.innerHTML = "<option></option>", le.option = !!xe.lastChild;
    var ke = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };

    function Se(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && fe(e, t) ? ce.merge([e], n) : n
    }

    function Ee(e, t) {
        for (var n = 0, r = e.length; n < r; n++) _.set(e[n], "globalEval", !t || _.get(t[n], "globalEval"))
    }
    ke.tbody = ke.tfoot = ke.colgroup = ke.caption = ke.thead, ke.th = ke.td, le.option || (ke.optgroup = ke.option = [1, "<select multiple='multiple'>", "</select>"]);
    var je = /<|&#?\w+;/;

    function Ae(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === x(o)) ce.merge(p, o.nodeType ? [o] : o);
                else if (je.test(o)) {
            a = a || f.appendChild(t.createElement("div")), s = (Te.exec(o) || ["", ""])[1].toLowerCase(), u = ke[s] || ke._default, a.innerHTML = u[1] + ce.htmlPrefilter(o) + u[2], c = u[0];
            while (c--) a = a.lastChild;
            ce.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        f.textContent = "", d = 0;
        while (o = p[d++])
            if (r && -1 < ce.inArray(o, r)) i && i.push(o);
            else if (l = K(o), a = Se(f.appendChild(o), "script"), l && Ee(a), n) {
            c = 0;
            while (o = a[c++]) Ce.test(o.type || "") && n.push(o)
        }
        return f
    }
    var De = /^([^.]*)(?:\.(.+)|)/;

    function Ne() {
        return !0
    }

    function qe() {
        return !1
    }

    function Le(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) Le(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = qe;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return ce().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = ce.guid++)), e.each(function() {
            ce.event.add(this, t, i, r, n)
        })
    }

    function He(e, r, t) {
        t ? (_.set(e, r, !1), ce.event.add(e, r, {
            namespace: !1,
            handler: function(e) {
                var t, n = _.get(this, r);
                if (1 & e.isTrigger && this[r]) {
                    if (n)(ce.event.special[r] || {}).delegateType && e.stopPropagation();
                    else if (n = ae.call(arguments), _.set(this, r, n), this[r](), t = _.get(this, r), _.set(this, r, !1), n !== t) return e.stopImmediatePropagation(), e.preventDefault(), t
                } else n && (_.set(this, r, ce.event.trigger(n[0], n.slice(1), this)), e.stopPropagation(), e.isImmediatePropagationStopped = Ne)
            }
        })) : void 0 === _.get(e, r) && ce.event.add(e, r, Ne)
    }
    ce.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = _.get(t);
            if ($(t)) {
                n.handler && (n = (o = n).handler, i = o.selector), i && ce.find.matchesSelector(J, i), n.guid || (n.guid = ce.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function(e) {
                    return "undefined" != typeof ce && ce.event.triggered !== e.type ? ce.event.dispatch.apply(t, arguments) : void 0
                }), l = (e = (e || "").match(D) || [""]).length;
                while (l--) d = g = (s = De.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = ce.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = ce.event.special[d] || {}, c = ce.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && ce.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), ce.event.global[d] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = _.hasData(e) && _.get(e);
            if (v && (u = v.events)) {
                l = (t = (t || "").match(D) || [""]).length;
                while (l--)
                    if (d = g = (s = De.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                        f = ce.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
                        while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || ce.removeEvent(e, d, v.handle), delete u[d])
                    } else
                        for (d in u) ce.event.remove(e, d + t[l], n, r, !0);
                ce.isEmptyObject(u) && _.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = new Array(arguments.length),
                u = ce.event.fix(e),
                l = (_.get(this, "events") || Object.create(null))[u.type] || [],
                c = ce.event.special[u.type] || {};
            for (s[0] = u, t = 1; t < arguments.length; t++) s[t] = arguments[t];
            if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                a = ce.event.handlers.call(this, u, l), t = 0;
                while ((i = a[t++]) && !u.isPropagationStopped()) {
                    u.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((ce.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, u), u.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < ce(i, this).index(l) : ce.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(t, e) {
            Object.defineProperty(ce.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: v(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[ce.expando] ? e : new ce.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return we.test(t.type) && t.click && fe(t, "input") && He(t, "click", !0), !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return we.test(t.type) && t.click && fe(t, "input") && He(t, "click"), !0
                },
                _default: function(e) {
                    var t = e.target;
                    return we.test(t.type) && t.click && fe(t, "input") && _.get(t, "click") || fe(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, ce.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, ce.Event = function(e, t) {
        if (!(this instanceof ce.Event)) return new ce.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ne : qe, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && ce.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[ce.expando] = !0
    }, ce.Event.prototype = {
        constructor: ce.Event,
        isDefaultPrevented: qe,
        isPropagationStopped: qe,
        isImmediatePropagationStopped: qe,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ne, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ne, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ne, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ce.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
    }, ce.event.addProp), ce.each({
        focus: "focusin",
        blur: "focusout"
    }, function(r, i) {
        function o(e) {
            if (C.documentMode) {
                var t = _.get(this, "handle"),
                    n = ce.event.fix(e);
                n.type = "focusin" === e.type ? "focus" : "blur", n.isSimulated = !0, t(e), n.target === n.currentTarget && t(n)
            } else ce.event.simulate(i, e.target, ce.event.fix(e))
        }
        ce.event.special[r] = {
            setup: function() {
                var e;
                if (He(this, r, !0), !C.documentMode) return !1;
                (e = _.get(this, i)) || this.addEventListener(i, o), _.set(this, i, (e || 0) + 1)
            },
            trigger: function() {
                return He(this, r), !0
            },
            teardown: function() {
                var e;
                if (!C.documentMode) return !1;
                (e = _.get(this, i) - 1) ? _.set(this, i, e): (this.removeEventListener(i, o), _.remove(this, i))
            },
            _default: function(e) {
                return _.get(e.target, r)
            },
            delegateType: i
        }, ce.event.special[i] = {
            setup: function() {
                var e = this.ownerDocument || this.document || this,
                    t = C.documentMode ? this : e,
                    n = _.get(t, i);
                n || (C.documentMode ? this.addEventListener(i, o) : e.addEventListener(r, o, !0)), _.set(t, i, (n || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this.document || this,
                    t = C.documentMode ? this : e,
                    n = _.get(t, i) - 1;
                n ? _.set(t, i, n) : (C.documentMode ? this.removeEventListener(i, o) : e.removeEventListener(r, o, !0), _.remove(t, i))
            }
        }
    }), ce.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        ce.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || ce.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
            }
        }
    }), ce.fn.extend({
        on: function(e, t, n, r) {
            return Le(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Le(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ce(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = qe), this.each(function() {
                ce.event.remove(this, e, n, t)
            })
        }
    });
    var Oe = /<script|<style|<link/i,
        Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

    function Re(e, t) {
        return fe(e, "table") && fe(11 !== t.nodeType ? t : t.firstChild, "tr") && ce(e).children("tbody")[0] || e
    }

    function Ie(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function We(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Fe(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (_.hasData(e) && (s = _.get(e).events))
                for (i in _.remove(t, "handle events"), s)
                    for (n = 0, r = s[i].length; n < r; n++) ce.event.add(t, i, s[i][n]);
            z.hasData(e) && (o = z.access(e), a = ce.extend({}, o), z.set(t, a))
        }
    }

    function $e(n, r, i, o) {
        r = g(r);
        var e, t, a, s, u, l, c = 0,
            f = n.length,
            p = f - 1,
            d = r[0],
            h = v(d);
        if (h || 1 < f && "string" == typeof d && !le.checkClone && Pe.test(d)) return n.each(function(e) {
            var t = n.eq(e);
            h && (r[0] = d.call(this, e, t.html())), $e(t, r, i, o)
        });
        if (f && (t = (e = Ae(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = ce.map(Se(e, "script"), Ie)).length; c < f; c++) u = e, c !== p && (u = ce.clone(u, !0, !0), s && ce.merge(a, Se(u, "script"))), i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, ce.map(a, We), c = 0; c < s; c++) u = a[c], Ce.test(u.type || "") && !_.access(u, "globalEval") && ce.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? ce._evalUrl && !u.noModule && ce._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce")
                }, l) : m(u.textContent.replace(Me, ""), u, l))
        }
        return n
    }

    function Be(e, t, n) {
        for (var r, i = t ? ce.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || ce.cleanData(Se(r)), r.parentNode && (n && K(r) && Ee(Se(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    ce.extend({
        htmlPrefilter: function(e) {
            return e
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0),
                f = K(e);
            if (!(le.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e)))
                for (a = Se(c), r = 0, i = (o = Se(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && we.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || Se(e), a = a || Se(c), r = 0, i = o.length; r < i; r++) Fe(o[r], a[r]);
                else Fe(e, c);
            return 0 < (a = Se(c, "script")).length && Ee(a, !f && Se(e, "script")), c
        },
        cleanData: function(e) {
            for (var t, n, r, i = ce.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if ($(n)) {
                    if (t = n[_.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? ce.event.remove(n, r) : ce.removeEvent(n, r, t.handle);
                        n[_.expando] = void 0
                    }
                    n[z.expando] && (n[z.expando] = void 0)
                }
        }
    }), ce.fn.extend({
        detach: function(e) {
            return Be(this, e, !0)
        },
        remove: function(e) {
            return Be(this, e)
        },
        text: function(e) {
            return M(this, function(e) {
                return void 0 === e ? ce.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return $e(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Re(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return $e(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Re(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return $e(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return $e(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (ce.cleanData(Se(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return ce.clone(this, e, t)
            })
        },
        html: function(e) {
            return M(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Oe.test(e) && !ke[(Te.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = ce.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (ce.cleanData(Se(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return $e(this, arguments, function(e) {
                var t = this.parentNode;
                ce.inArray(this, n) < 0 && (ce.cleanData(Se(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), ce.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        ce.fn[e] = function(e) {
            for (var t, n = [], r = ce(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), ce(r[o])[a](t), s.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var _e = new RegExp("^(" + G + ")(?!px)[a-z%]+$", "i"),
        ze = /^--/,
        Xe = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = ie), t.getComputedStyle(e)
        },
        Ue = function(e, t, n) {
            var r, i, o = {};
            for (i in t) o[i] = e.style[i], e.style[i] = t[i];
            for (i in r = n.call(e), t) e.style[i] = o[i];
            return r
        },
        Ve = new RegExp(Q.join("|"), "i");

    function Ge(e, t, n) {
        var r, i, o, a, s = ze.test(t),
            u = e.style;
        return (n = n || Xe(e)) && (a = n.getPropertyValue(t) || n[t], s && a && (a = a.replace(ve, "$1") || void 0), "" !== a || K(e) || (a = ce.style(e, t)), !le.pixelBoxStyles() && _e.test(a) && Ve.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = n.width, u.width = r, u.minWidth = i, u.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function Ye(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }! function() {
        function e() {
            if (l) {
                u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", J.appendChild(u).appendChild(l);
                var e = ie.getComputedStyle(l);
                n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), J.removeChild(u), l = null
            }
        }

        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s, u = C.createElement("div"),
            l = C.createElement("div");
        l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", le.clearCloneStyle = "content-box" === l.style.backgroundClip, ce.extend(le, {
            boxSizingReliable: function() {
                return e(), r
            },
            pixelBoxStyles: function() {
                return e(), o
            },
            pixelPosition: function() {
                return e(), n
            },
            reliableMarginLeft: function() {
                return e(), s
            },
            scrollboxSize: function() {
                return e(), i
            },
            reliableTrDimensions: function() {
                var e, t, n, r;
                return null == a && (e = C.createElement("table"), t = C.createElement("tr"), n = C.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "box-sizing:content-box;border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", J.appendChild(e).appendChild(t).appendChild(n), r = ie.getComputedStyle(t), a = parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === t.offsetHeight, J.removeChild(e)), a
            }
        }))
    }();
    var Qe = ["Webkit", "Moz", "ms"],
        Je = C.createElement("div").style,
        Ke = {};

    function Ze(e) {
        var t = ce.cssProps[e] || Ke[e];
        return t || (e in Je ? e : Ke[e] = function(e) {
            var t = e[0].toUpperCase() + e.slice(1),
                n = Qe.length;
            while (n--)
                if ((e = Qe[n] + t) in Je) return e
        }(e) || e)
    }
    var et = /^(none|table(?!-c[ea]).+)/,
        tt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        nt = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function rt(e, t, n) {
        var r = Y.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function it(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0,
            l = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (l += ce.css(e, n + Q[a], !0, i)), r ? ("content" === n && (u -= ce.css(e, "padding" + Q[a], !0, i)), "margin" !== n && (u -= ce.css(e, "border" + Q[a] + "Width", !0, i))) : (u += ce.css(e, "padding" + Q[a], !0, i), "padding" !== n ? u += ce.css(e, "border" + Q[a] + "Width", !0, i) : s += ce.css(e, "border" + Q[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u + l
    }

    function ot(e, t, n) {
        var r = Xe(e),
            i = (!le.boxSizingReliable() || n) && "border-box" === ce.css(e, "boxSizing", !1, r),
            o = i,
            a = Ge(e, t, r),
            s = "offset" + t[0].toUpperCase() + t.slice(1);
        if (_e.test(a)) {
            if (!n) return a;
            a = "auto"
        }
        return (!le.boxSizingReliable() && i || !le.reliableTrDimensions() && fe(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === ce.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === ce.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + it(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }

    function at(e, t, n, r, i) {
        return new at.prototype.init(e, t, n, r, i)
    }
    ce.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Ge(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageSlice: !0,
            columnCount: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            scale: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = F(t),
                    u = ze.test(t),
                    l = e.style;
                if (u || (t = Ze(s)), a = ce.cssHooks[t] || ce.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = Y.exec(n)) && i[1] && (n = te(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (ce.cssNumber[s] ? "" : "px")), le.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = F(t);
            return ze.test(t) || (t = Ze(s)), (a = ce.cssHooks[t] || ce.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Ge(e, t, r)), "normal" === i && t in nt && (i = nt[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), ce.each(["height", "width"], function(e, u) {
        ce.cssHooks[u] = {
            get: function(e, t, n) {
                if (t) return !et.test(ce.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ot(e, u, n) : Ue(e, tt, function() {
                    return ot(e, u, n)
                })
            },
            set: function(e, t, n) {
                var r, i = Xe(e),
                    o = !le.scrollboxSize() && "absolute" === i.position,
                    a = (o || n) && "border-box" === ce.css(e, "boxSizing", !1, i),
                    s = n ? it(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - it(e, u, "border", !1, i) - .5)), s && (r = Y.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = ce.css(e, u)), rt(0, t, s)
            }
        }
    }), ce.cssHooks.marginLeft = Ye(le.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Ge(e, "marginLeft")) || e.getBoundingClientRect().left - Ue(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), ce.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        ce.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Q[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, "margin" !== i && (ce.cssHooks[i + o].set = rt)
    }), ce.fn.extend({
        css: function(e, t) {
            return M(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Xe(e), i = t.length; a < i; a++) o[t[a]] = ce.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? ce.style(e, t, n) : ce.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((ce.Tween = at).prototype = {
        constructor: at,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || ce.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ce.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = at.propHooks[this.prop];
            return e && e.get ? e.get(this) : at.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = at.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : at.propHooks._default.set(this), this
        }
    }).init.prototype = at.prototype, (at.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = ce.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !ce.cssHooks[e.prop] && null == e.elem.style[Ze(e.prop)] ? e.elem[e.prop] = e.now : ce.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = at.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ce.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, ce.fx = at.prototype.init, ce.fx.step = {};
    var st, ut, lt, ct, ft = /^(?:toggle|show|hide)$/,
        pt = /queueHooks$/;

    function dt() {
        ut && (!1 === C.hidden && ie.requestAnimationFrame ? ie.requestAnimationFrame(dt) : ie.setTimeout(dt, ce.fx.interval), ce.fx.tick())
    }

    function ht() {
        return ie.setTimeout(function() {
            st = void 0
        }), st = Date.now()
    }

    function gt(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Q[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function vt(e, t, n) {
        for (var r, i = (yt.tweeners[t] || []).concat(yt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function yt(o, e, t) {
        var n, a, r = 0,
            i = yt.prefilters.length,
            s = ce.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (a) return !1;
                for (var e = st || ht(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
            },
            l = s.promise({
                elem: o,
                props: ce.extend({}, e),
                opts: ce.extend(!0, {
                    specialEasing: {},
                    easing: ce.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: st || ht(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    var n = ce.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function(e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; t < n; t++) l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
                }
            }),
            c = l.props;
        for (! function(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (i = t[r = F(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = ce.cssHooks[r]) && "expand" in a)
                        for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                    else t[r] = i
            }(c, l.opts.specialEasing); r < i; r++)
            if (n = yt.prefilters[r].call(l, o, c, l.opts)) return v(n.stop) && (ce._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
        return ce.map(c, vt, l), v(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), ce.fx.timer(ce.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    ce.Animation = ce.extend(yt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return te(n.elem, e, Y.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            v(e) ? (t = e, e = ["*"]) : e = e.match(D);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], yt.tweeners[n] = yt.tweeners[n] || [], yt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                p = this,
                d = {},
                h = e.style,
                g = e.nodeType && ee(e),
                v = _.get(e, "fxshow");
            for (r in n.queue || (null == (a = ce._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function() {
                    p.always(function() {
                        a.unqueued--, ce.queue(e, "fx").length || a.empty.fire()
                    })
                })), t)
                if (i = t[r], ft.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r]) continue;
                        g = !0
                    }
                    d[r] = v && v[r] || ce.style(e, r)
                } if ((u = !ce.isEmptyObject(t)) || !ce.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = _.get(e, "display")), "none" === (c = ce.css(e, "display")) && (l ? c = l : (re([e], !0), l = e.style.display || l, c = ce.css(e, "display"), re([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === ce.css(e, "float") && (u || (p.done(function() {
                        h.display = l
                    }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = _.access(e, "fxshow", {
                    display: l
                }), o && (v.hidden = !g), g && re([e], !0), p.done(function() {
                    for (r in g || re([e]), _.remove(e, "fxshow"), d) ce.style(e, r, d[r])
                })), u = vt(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
        }],
        prefilter: function(e, t) {
            t ? yt.prefilters.unshift(e) : yt.prefilters.push(e)
        }
    }), ce.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? ce.extend({}, e) : {
            complete: n || !n && t || v(e) && e,
            duration: e,
            easing: n && t || t && !v(t) && t
        };
        return ce.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in ce.fx.speeds ? r.duration = ce.fx.speeds[r.duration] : r.duration = ce.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            v(r.old) && r.old.call(this), r.queue && ce.dequeue(this, r.queue)
        }, r
    }, ce.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ee).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = ce.isEmptyObject(t),
                o = ce.speed(e, n, r),
                a = function() {
                    var e = yt(this, ce.extend({}, t), o);
                    (i || _.get(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function() {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = ce.timers,
                    r = _.get(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && pt.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || ce.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var e, t = _.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = ce.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, ce.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), ce.each(["toggle", "show", "hide"], function(e, r) {
        var i = ce.fn[r];
        ce.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(gt(r, !0), e, t, n)
        }
    }), ce.each({
        slideDown: gt("show"),
        slideUp: gt("hide"),
        slideToggle: gt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        ce.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), ce.timers = [], ce.fx.tick = function() {
        var e, t = 0,
            n = ce.timers;
        for (st = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || ce.fx.stop(), st = void 0
    }, ce.fx.timer = function(e) {
        ce.timers.push(e), ce.fx.start()
    }, ce.fx.interval = 13, ce.fx.start = function() {
        ut || (ut = !0, dt())
    }, ce.fx.stop = function() {
        ut = null
    }, ce.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ce.fn.delay = function(r, e) {
        return r = ce.fx && ce.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
            var n = ie.setTimeout(e, r);
            t.stop = function() {
                ie.clearTimeout(n)
            }
        })
    }, lt = C.createElement("input"), ct = C.createElement("select").appendChild(C.createElement("option")), lt.type = "checkbox", le.checkOn = "" !== lt.value, le.optSelected = ct.selected, (lt = C.createElement("input")).value = "t", lt.type = "radio", le.radioValue = "t" === lt.value;
    var mt, xt = ce.expr.attrHandle;
    ce.fn.extend({
        attr: function(e, t) {
            return M(this, ce.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ce.removeAttr(this, e)
            })
        }
    }), ce.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? ce.prop(e, t, n) : (1 === o && ce.isXMLDoc(e) || (i = ce.attrHooks[t.toLowerCase()] || (ce.expr.match.bool.test(t) ? mt : void 0)), void 0 !== n ? null === n ? void ce.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = ce.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!le.radioValue && "radio" === t && fe(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(D);
            if (i && 1 === e.nodeType)
                while (n = i[r++]) e.removeAttribute(n)
        }
    }), mt = {
        set: function(e, t, n) {
            return !1 === t ? ce.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, ce.each(ce.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = xt[t] || ce.find.attr;
        xt[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = xt[o], xt[o] = r, r = null != a(e, t, n) ? o : null, xt[o] = i), r
        }
    });
    var bt = /^(?:input|select|textarea|button)$/i,
        wt = /^(?:a|area)$/i;

    function Tt(e) {
        return (e.match(D) || []).join(" ")
    }

    function Ct(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function kt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(D) || []
    }
    ce.fn.extend({
        prop: function(e, t) {
            return M(this, ce.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[ce.propFix[e] || e]
            })
        }
    }), ce.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ce.isXMLDoc(e) || (t = ce.propFix[t] || t, i = ce.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ce.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : bt.test(e.nodeName) || wt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), le.optSelected || (ce.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), ce.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ce.propFix[this.toLowerCase()] = this
    }), ce.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a;
            return v(t) ? this.each(function(e) {
                ce(this).addClass(t.call(this, e, Ct(this)))
            }) : (e = kt(t)).length ? this.each(function() {
                if (r = Ct(this), n = 1 === this.nodeType && " " + Tt(r) + " ") {
                    for (o = 0; o < e.length; o++) i = e[o], n.indexOf(" " + i + " ") < 0 && (n += i + " ");
                    a = Tt(n), r !== a && this.setAttribute("class", a)
                }
            }) : this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a;
            return v(t) ? this.each(function(e) {
                ce(this).removeClass(t.call(this, e, Ct(this)))
            }) : arguments.length ? (e = kt(t)).length ? this.each(function() {
                if (r = Ct(this), n = 1 === this.nodeType && " " + Tt(r) + " ") {
                    for (o = 0; o < e.length; o++) {
                        i = e[o];
                        while (-1 < n.indexOf(" " + i + " ")) n = n.replace(" " + i + " ", " ")
                    }
                    a = Tt(n), r !== a && this.setAttribute("class", a)
                }
            }) : this : this.attr("class", "")
        },
        toggleClass: function(t, n) {
            var e, r, i, o, a = typeof t,
                s = "string" === a || Array.isArray(t);
            return v(t) ? this.each(function(e) {
                ce(this).toggleClass(t.call(this, e, Ct(this), n), n)
            }) : "boolean" == typeof n && s ? n ? this.addClass(t) : this.removeClass(t) : (e = kt(t), this.each(function() {
                if (s)
                    for (o = ce(this), i = 0; i < e.length; i++) r = e[i], o.hasClass(r) ? o.removeClass(r) : o.addClass(r);
                else void 0 !== t && "boolean" !== a || ((r = Ct(this)) && _.set(this, "__className__", r), this.setAttribute && this.setAttribute("class", r || !1 === t ? "" : _.get(this, "__className__") || ""))
            }))
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && -1 < (" " + Tt(Ct(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var St = /\r/g;
    ce.fn.extend({
        val: function(n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = v(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, ce(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = ce.map(t, function(e) {
                    return null == e ? "" : e + ""
                })), (r = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = ce.valHooks[t.type] || ce.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof(e = t.value) ? e.replace(St, "") : null == e ? "" : e : void 0
        }
    }), ce.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ce.find.attr(e, "value");
                    return null != t ? t : Tt(ce.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !fe(n.parentNode, "optgroup"))) {
                            if (t = ce(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = ce.makeArray(t),
                        a = i.length;
                    while (a--)((r = i[a]).selected = -1 < ce.inArray(ce.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), ce.each(["radio", "checkbox"], function() {
        ce.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < ce.inArray(ce(e).val(), t)
            }
        }, le.checkOn || (ce.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Et = ie.location,
        jt = {
            guid: Date.now()
        },
        At = /\?/;
    ce.parseXML = function(e) {
        var t, n;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new ie.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {}
        return n = t && t.getElementsByTagName("parsererror")[0], t && !n || ce.error("Invalid XML: " + (n ? ce.map(n.childNodes, function(e) {
            return e.textContent
        }).join("\n") : e)), t
    };
    var Dt = /^(?:focusinfocus|focusoutblur)$/,
        Nt = function(e) {
            e.stopPropagation()
        };
    ce.extend(ce.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || C],
                d = ue.call(e, "type") ? e.type : e,
                h = ue.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || C, 3 !== n.nodeType && 8 !== n.nodeType && !Dt.test(d + ce.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[ce.expando] ? e : new ce.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : ce.makeArray(t, [e]), c = ce.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !y(n)) {
                    for (s = c.delegateType || d, Dt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), a = o;
                    a === (n.ownerDocument || C) && p.push(a.defaultView || a.parentWindow || ie)
                }
                i = 0;
                while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (_.get(o, "events") || Object.create(null))[e.type] && _.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && $(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !$(n) || u && v(n[d]) && !y(n) && ((a = n[u]) && (n[u] = null), ce.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, Nt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, Nt), ce.event.triggered = void 0, a && (n[u] = a)), e.result
            }
        },
        simulate: function(e, t, n) {
            var r = ce.extend(new ce.Event, n, {
                type: e,
                isSimulated: !0
            });
            ce.event.trigger(r, null, t)
        }
    }), ce.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                ce.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return ce.event.trigger(e, t, n, !0)
        }
    });
    var qt = /\[\]$/,
        Lt = /\r?\n/g,
        Ht = /^(?:submit|button|image|reset|file)$/i,
        Ot = /^(?:input|select|textarea|keygen)/i;

    function Pt(n, e, r, i) {
        var t;
        if (Array.isArray(e)) ce.each(e, function(e, t) {
            r || qt.test(n) ? i(n, t) : Pt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
        });
        else if (r || "object" !== x(e)) i(n, e);
        else
            for (t in e) Pt(n + "[" + t + "]", e[t], r, i)
    }
    ce.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = v(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !ce.isPlainObject(e)) ce.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) Pt(n, e[n], t, i);
        return r.join("&")
    }, ce.fn.extend({
        serialize: function() {
            return ce.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ce.prop(this, "elements");
                return e ? ce.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ce(this).is(":disabled") && Ot.test(this.nodeName) && !Ht.test(e) && (this.checked || !we.test(e))
            }).map(function(e, t) {
                var n = ce(this).val();
                return null == n ? null : Array.isArray(n) ? ce.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Lt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Lt, "\r\n")
                }
            }).get()
        }
    });
    var Mt = /%20/g,
        Rt = /#.*$/,
        It = /([?&])_=[^&]*/,
        Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ft = /^(?:GET|HEAD)$/,
        $t = /^\/\//,
        Bt = {},
        _t = {},
        zt = "*/".concat("*"),
        Xt = C.createElement("a");

    function Ut(o) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(D) || [];
            if (v(t))
                while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function Vt(t, i, o, a) {
        var s = {},
            u = t === _t;

        function l(e) {
            var r;
            return s[e] = !0, ce.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1)
            }), r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }

    function Gt(e, t) {
        var n, r, i = ce.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && ce.extend(!0, e, r), e
    }
    Xt.href = Et.href, ce.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Et.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": zt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": ce.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Gt(Gt(e, ce.ajaxSettings), t) : Gt(ce.ajaxSettings, e)
        },
        ajaxPrefilter: Ut(Bt),
        ajaxTransport: Ut(_t),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = ce.ajaxSetup({}, t),
                y = v.context || v,
                m = v.context && (y.nodeType || y.jquery) ? ce(y) : ce.event,
                x = ce.Deferred(),
                b = ce.Callbacks("once memory"),
                w = v.statusCode || {},
                a = {},
                s = {},
                u = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (h) {
                            if (!n) {
                                n = {};
                                while (t = Wt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                            }
                            t = n[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return h ? p : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == h && (v.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (h) T.always(e[T.status]);
                            else
                                for (t in e) w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || u;
                        return c && c.abort(t), l(0, t), this
                    }
                };
            if (x.promise(T), v.url = ((e || v.url || Et.href) + "").replace($t, Et.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(D) || [""], null == v.crossDomain) {
                r = C.createElement("a");
                try {
                    r.href = v.url, r.href = r.href, v.crossDomain = Xt.protocol + "//" + Xt.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = ce.param(v.data, v.traditional)), Vt(Bt, v, t, T), h) return T;
            for (i in (g = ce.event && v.global) && 0 == ce.active++ && ce.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Ft.test(v.type), f = v.url.replace(Rt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Mt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (At.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(It, "$1"), o = (At.test(f) ? "&" : "?") + "_=" + jt.guid++ + o), v.url = f + o), v.ifModified && (ce.lastModified[f] && T.setRequestHeader("If-Modified-Since", ce.lastModified[f]), ce.etag[f] && T.setRequestHeader("If-None-Match", ce.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
            if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Vt(_t, v, t, T)) {
                if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
                v.async && 0 < v.timeout && (d = ie.setTimeout(function() {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1, c.send(a, l)
                } catch (e) {
                    if (h) throw e;
                    l(-1, e)
                }
            } else l(-1, "No Transport");

            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0, d && ie.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function(e, t, n) {
                    var r, i, o, a, s = e.contents,
                        u = e.dataTypes;
                    while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            } if (u[0] in n) o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o) return o !== u[0] && u.unshift(o), n[o]
                }(v, T, n)), !i && -1 < ce.inArray("script", v.dataTypes) && ce.inArray("json", v.dataTypes) < 0 && (v.converters["text script"] = function() {}), s = function(e, t, n, r) {
                    var i, o, a, s, u, l = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                    o = c.shift();
                    while (o)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                            if ("*" === o) o = u;
                            else if ("*" !== u && u !== o) {
                        if (!(a = l[u + " " + o] || l["* " + o]))
                            for (i in l)
                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                    break
                                } if (!0 !== a)
                            if (a && e["throws"]) t = a(t);
                            else try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (ce.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (ce.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --ce.active || ce.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return ce.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ce.get(e, void 0, t, "script")
        }
    }), ce.each(["get", "post"], function(e, i) {
        ce[i] = function(e, t, n, r) {
            return v(t) && (r = r || n, n = t, t = void 0), ce.ajax(ce.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, ce.isPlainObject(e) && e))
        }
    }), ce.ajaxPrefilter(function(e) {
        var t;
        for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
    }), ce._evalUrl = function(e, t, n) {
        return ce.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                ce.globalEval(e, t, n)
            }
        })
    }, ce.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (v(e) && (e = e.call(this[0])), t = ce(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(n) {
            return v(n) ? this.each(function(e) {
                ce(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = ce(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = v(t);
            return this.each(function(e) {
                ce(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                ce(this).replaceWith(this.childNodes)
            }), this
        }
    }), ce.expr.pseudos.hidden = function(e) {
        return !ce.expr.pseudos.visible(e)
    }, ce.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, ce.ajaxSettings.xhr = function() {
        try {
            return new ie.XMLHttpRequest
        } catch (e) {}
    };
    var Yt = {
            0: 200,
            1223: 204
        },
        Qt = ce.ajaxSettings.xhr();
    le.cors = !!Qt && "withCredentials" in Qt, le.ajax = Qt = !!Qt, ce.ajaxTransport(function(i) {
        var o, a;
        if (le.cors || Qt && !i.crossDomain) return {
            send: function(e, t) {
                var n, r = i.xhr();
                if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
                    for (n in i.xhrFields) r[n] = i.xhrFields[n];
                for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                o = function(e) {
                    return function() {
                        o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Yt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()))
                    }
                }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                    4 === r.readyState && ie.setTimeout(function() {
                        o && a()
                    })
                }, o = o("abort");
                try {
                    r.send(i.hasContent && i.data || null)
                } catch (e) {
                    if (o) throw e
                }
            },
            abort: function() {
                o && o()
            }
        }
    }), ce.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), ce.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return ce.globalEval(e), e
            }
        }
    }), ce.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), ce.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs) return {
            send: function(e, t) {
                r = ce("<script>").attr(n.scriptAttrs || {}).prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function(e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), C.head.appendChild(r[0])
            },
            abort: function() {
                i && i()
            }
        }
    });
    var Jt, Kt = [],
        Zt = /(=)\?(?=&|$)|\?\?/;
    ce.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Kt.pop() || ce.expando + "_" + jt.guid++;
            return this[e] = !0, e
        }
    }), ce.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = v(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Zt, "$1" + r) : !1 !== e.jsonp && (e.url += (At.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return o || ce.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = ie[r], ie[r] = function() {
            o = arguments
        }, n.always(function() {
            void 0 === i ? ce(ie).removeProp(r) : ie[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Kt.push(r)), o && v(i) && i(o[0]), o = i = void 0
        }), "script"
    }), le.createHTMLDocument = ((Jt = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Jt.childNodes.length), ce.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (le.createHTMLDocument ? ((r = (t = C.implementation.createHTMLDocument("")).createElement("base")).href = C.location.href, t.head.appendChild(r)) : t = C), o = !n && [], (i = w.exec(e)) ? [t.createElement(i[1])] : (i = Ae([e], t, o), o && o.length && ce(o).remove(), ce.merge([], i.childNodes)));
        var r, i, o
    }, ce.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = Tt(e.slice(s)), e = e.slice(0, s)), v(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && ce.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? ce("<div>").append(ce.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, ce.expr.pseudos.animated = function(t) {
        return ce.grep(ce.timers, function(e) {
            return t === e.elem
        }).length
    }, ce.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l = ce.css(e, "position"),
                c = ce(e),
                f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = ce.css(e, "top"), u = ce.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), v(t) && (t = t.call(e, n, ce.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
        }
    }, ce.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                ce.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === ce.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === ce.css(e, "position")) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = ce(e).offset()).top += ce.css(e, "borderTopWidth", !0), i.left += ce.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - ce.css(r, "marginTop", !0),
                    left: t.left - i.left - ce.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === ce.css(e, "position")) e = e.offsetParent;
                return e || J
            })
        }
    }), ce.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        ce.fn[t] = function(e) {
            return M(this, function(e, t, n) {
                var r;
                if (y(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }), ce.each(["top", "left"], function(e, n) {
        ce.cssHooks[n] = Ye(le.pixelPosition, function(e, t) {
            if (t) return t = Ge(e, n), _e.test(t) ? ce(e).position()[n] + "px" : t
        })
    }), ce.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        ce.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            ce.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return M(this, function(e, t, n) {
                    var r;
                    return y(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? ce.css(e, t, i) : ce.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }), ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ce.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ce.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        hover: function(e, t) {
            return this.on("mouseenter", e).on("mouseleave", t || e)
        }
    }), ce.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        ce.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    });
    var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    ce.proxy = function(e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t], t = e, e = n), v(e)) return r = ae.call(arguments, 2), (i = function() {
            return e.apply(t || this, r.concat(ae.call(arguments)))
        }).guid = e.guid = e.guid || ce.guid++, i
    }, ce.holdReady = function(e) {
        e ? ce.readyWait++ : ce.ready(!0)
    }, ce.isArray = Array.isArray, ce.parseJSON = JSON.parse, ce.nodeName = fe, ce.isFunction = v, ce.isWindow = y, ce.camelCase = F, ce.type = x, ce.now = Date.now, ce.isNumeric = function(e) {
        var t = ce.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, ce.trim = function(e) {
        return null == e ? "" : (e + "").replace(en, "$1")
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ce
    });
    var tn = ie.jQuery,
        nn = ie.$;
    return ce.noConflict = function(e) {
        return ie.$ === ce && (ie.$ = nn), e && ie.jQuery === ce && (ie.jQuery = tn), ce
    }, "undefined" == typeof e && (ie.jQuery = ie.$ = ce), ce
});
jQuery.noConflict();/*! jQuery Migrate v3.4.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e, window)
        }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window)
    }(function(s, n) {
        "use strict";

        function e(e) {
            return 0 <= function(e, t) {
                for (var r = /^(\d+)\.(\d+)\.(\d+)/, n = r.exec(e) || [], o = r.exec(t) || [], a = 1; a <= 3; a++) {
                    if (+o[a] < +n[a]) return 1;
                    if (+n[a] < +o[a]) return -1
                }
                return 0
            }(s.fn.jquery, e)
        }
        s.migrateVersion = "3.4.1";
        var t = Object.create(null);
        s.migrateDisablePatches = function() {
            for (var e = 0; e < arguments.length; e++) t[arguments[e]] = !0
        }, s.migrateEnablePatches = function() {
            for (var e = 0; e < arguments.length; e++) delete t[arguments[e]]
        }, s.migrateIsPatchEnabled = function(e) {
            return !t[e]
        }, n.console && n.console.log && (s && e("3.0.0") && !e("5.0.0") || n.console.log("JQMIGRATE: jQuery 3.x-4.x REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
        var o = {};

        function u(e, t) {
            var r = n.console;
            !s.migrateIsPatchEnabled(e) || s.migrateDeduplicateWarnings && o[t] || (o[t] = !0, s.migrateWarnings.push(t + " [" + e + "]"), r && r.warn && !s.migrateMute && (r.warn("JQMIGRATE: " + t), s.migrateTrace && r.trace && r.trace()))
        }

        function r(e, t, r, n, o) {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return u(n, o), r
                },
                set: function(e) {
                    u(n, o), r = e
                }
            })
        }

        function a(e, t, r, n, o) {
            var a = e[t];
            e[t] = function() {
                return o && u(n, o), (s.migrateIsPatchEnabled(n) ? r : a || s.noop).apply(this, arguments)
            }
        }

        function c(e, t, r, n, o) {
            if (!o) throw new Error("No warning message provided");
            return a(e, t, r, n, o), 0
        }

        function i(e, t, r, n) {
            return a(e, t, r, n), 0
        }
        s.migrateDeduplicateWarnings = !0, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = !0), s.migrateReset = function() {
            o = {}, s.migrateWarnings.length = 0
        }, "BackCompat" === n.document.compatMode && u("quirks", "jQuery is not compatible with Quirks Mode");
        var d, l, p, f = {},
            m = s.fn.init,
            y = s.find,
            h = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            g = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            v = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        for (d in i(s.fn, "init", function(e) {
                var t = Array.prototype.slice.call(arguments);
                return s.migrateIsPatchEnabled("selector-empty-id") && "string" == typeof e && "#" === e && (u("selector-empty-id", "jQuery( '#' ) is not a valid selector"), t[0] = []), m.apply(this, t)
            }, "selector-empty-id"), s.fn.init.prototype = s.fn, i(s, "find", function(t) {
                var r = Array.prototype.slice.call(arguments);
                if ("string" == typeof t && h.test(t)) try {
                    n.document.querySelector(t)
                } catch (e) {
                    t = t.replace(g, function(e, t, r, n) {
                        return "[" + t + r + '"' + n + '"]'
                    });
                    try {
                        n.document.querySelector(t), u("selector-hash", "Attribute selector with '#' must be quoted: " + r[0]), r[0] = t
                    } catch (e) {
                        u("selector-hash", "Attribute selector with '#' was not fixed: " + r[0])
                    }
                }
                return y.apply(this, r)
            }, "selector-hash"), y) Object.prototype.hasOwnProperty.call(y, d) && (s.find[d] = y[d]);
        c(s.fn, "size", function() {
            return this.length
        }, "size", "jQuery.fn.size() is deprecated and removed; use the .length property"), c(s, "parseJSON", function() {
            return JSON.parse.apply(null, arguments)
        }, "parseJSON", "jQuery.parseJSON is deprecated; use JSON.parse"), c(s, "holdReady", s.holdReady, "holdReady", "jQuery.holdReady is deprecated"), c(s, "unique", s.uniqueSort, "unique", "jQuery.unique is deprecated; use jQuery.uniqueSort"), r(s.expr, "filters", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), r(s.expr, ":", s.expr.pseudos, "expr-pre-pseudos", "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && c(s, "trim", function(e) {
            return null == e ? "" : (e + "").replace(v, "$1")
        }, "trim", "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (c(s, "nodeName", function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, "nodeName", "jQuery.nodeName is deprecated"), c(s, "isArray", Array.isArray, "isArray", "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (c(s, "isNumeric", function(e) {
            var t = typeof e;
            return ("number" == t || "string" == t) && !isNaN(e - parseFloat(e))
        }, "isNumeric", "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            f["[object " + t + "]"] = t.toLowerCase()
        }), c(s, "type", function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[Object.prototype.toString.call(e)] || "object" : typeof e
        }, "type", "jQuery.type is deprecated"), c(s, "isFunction", function(e) {
            return "function" == typeof e
        }, "isFunction", "jQuery.isFunction() is deprecated"), c(s, "isWindow", function(e) {
            return null != e && e === e.window
        }, "isWindow", "jQuery.isWindow() is deprecated")), s.ajax && (l = s.ajax, p = /(=)\?(?=&|$)|\?\?/, i(s, "ajax", function() {
            var e = l.apply(this, arguments);
            return e.promise && (c(e, "success", e.done, "jqXHR-methods", "jQXHR.success is deprecated and removed"), c(e, "error", e.fail, "jqXHR-methods", "jQXHR.error is deprecated and removed"), c(e, "complete", e.always, "jqXHR-methods", "jQXHR.complete is deprecated and removed")), e
        }, "jqXHR-methods"), e("4.0.0") || s.ajaxPrefilter("+json", function(e) {
            !1 !== e.jsonp && (p.test(e.url) || "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && p.test(e.data)) && u("jsonp-promotion", "JSON-to-JSONP auto-promotion is deprecated")
        }));
        var j = s.fn.removeAttr,
            b = s.fn.toggleClass,
            w = /\S+/g;

        function x(e) {
            return e.replace(/-([a-z])/g, function(e, t) {
                return t.toUpperCase()
            })
        }
        i(s.fn, "removeAttr", function(e) {
            var r = this,
                n = !1;
            return s.each(e.match(w), function(e, t) {
                s.expr.match.bool.test(t) && r.each(function() {
                    if (!1 !== s(this).prop(t)) return !(n = !0)
                }), n && (u("removeAttr-bool", "jQuery.fn.removeAttr no longer sets boolean properties: " + t), r.prop(t, !1))
            }), j.apply(this, arguments)
        }, "removeAttr-bool"), i(s.fn, "toggleClass", function(t) {
            return void 0 !== t && "boolean" != typeof t ? b.apply(this, arguments) : (u("toggleClass-bool", "jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
                var e = this.getAttribute && this.getAttribute("class") || "";
                e && s.data(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== t && s.data(this, "__className__") || "")
            }))
        }, "toggleClass-bool");
        var Q, A, R = !1,
            C = /^[a-z]/,
            N = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
        s.swap && s.each(["height", "width", "reliableMarginRight"], function(e, t) {
            var r = s.cssHooks[t] && s.cssHooks[t].get;
            r && (s.cssHooks[t].get = function() {
                var e;
                return R = !0, e = r.apply(this, arguments), R = !1, e
            })
        }), i(s, "swap", function(e, t, r, n) {
            var o, a, i = {};
            for (a in R || u("swap", "jQuery.swap() is undocumented and deprecated"), t) i[a] = e.style[a], e.style[a] = t[a];
            for (a in o = r.apply(e, n || []), t) e.style[a] = i[a];
            return o
        }, "swap"), e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, {
            set: function() {
                return u("cssProps", "jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments)
            }
        })), e("4.0.0") ? (A = {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        }, "undefined" != typeof Proxy ? s.cssNumber = new Proxy(A, {
            get: function() {
                return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.get.apply(this, arguments)
            },
            set: function() {
                return u("css-number", "jQuery.cssNumber is deprecated"), Reflect.set.apply(this, arguments)
            }
        }) : s.cssNumber = A) : A = s.cssNumber, Q = s.fn.css, i(s.fn, "css", function(e, t) {
            var r, n, o = this;
            return e && "object" == typeof e && !Array.isArray(e) ? (s.each(e, function(e, t) {
                s.fn.css.call(o, e, t)
            }), this) : ("number" == typeof t && (r = x(e), n = r, C.test(n) && N.test(n[0].toUpperCase() + n.slice(1)) || A[r] || u("css-number", 'Number-typed values are deprecated for jQuery.fn.css( "' + e + '", value )')), Q.apply(this, arguments))
        }, "css-number");
        var S, P, k, H, E = s.data;
        i(s, "data", function(e, t, r) {
            var n, o, a;
            if (t && "object" == typeof t && 2 === arguments.length) {
                for (a in n = s.hasData(e) && E.call(this, e), o = {}, t) a !== x(a) ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + a), n[a] = t[a]) : o[a] = t[a];
                return E.call(this, e, o), t
            }
            return t && "string" == typeof t && t !== x(t) && (n = s.hasData(e) && E.call(this, e)) && t in n ? (u("data-camelCase", "jQuery.data() always sets/gets camelCased names: " + t), 2 < arguments.length && (n[t] = r), n[t]) : E.apply(this, arguments)
        }, "data-camelCase"), s.fx && (k = s.Tween.prototype.run, H = function(e) {
            return e
        }, i(s.Tween.prototype, "run", function() {
            1 < s.easing[this.easing].length && (u("easing-one-arg", "'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = H), k.apply(this, arguments)
        }, "easing-one-arg"), S = s.fx.interval, P = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return n.document.hidden || u("fx-interval", P), s.migrateIsPatchEnabled("fx-interval") && void 0 === S ? 13 : S
            },
            set: function(e) {
                u("fx-interval", P), S = e
            }
        }));
        var M = s.fn.load,
            q = s.event.add,
            O = s.event.fix;
        s.event.props = [], s.event.fixHooks = {}, r(s.event.props, "concat", s.event.props.concat, "event-old-patch", "jQuery.event.props.concat() is deprecated and removed"), i(s.event, "fix", function(e) {
            var t, r = e.type,
                n = this.fixHooks[r],
                o = s.event.props;
            if (o.length) {
                u("event-old-patch", "jQuery.event.props are deprecated and removed: " + o.join());
                while (o.length) s.event.addProp(o.pop())
            }
            if (n && !n._migrated_ && (n._migrated_ = !0, u("event-old-patch", "jQuery.event.fixHooks are deprecated and removed: " + r), (o = n.props) && o.length))
                while (o.length) s.event.addProp(o.pop());
            return t = O.call(this, e), n && n.filter ? n.filter(t, e) : t
        }, "event-old-patch"), i(s.event, "add", function(e, t) {
            return e === n && "load" === t && "complete" === n.document.readyState && u("load-after-event", "jQuery(window).on('load'...) called after load event occurred"), q.apply(this, arguments)
        }, "load-after-event"), s.each(["load", "unload", "error"], function(e, t) {
            i(s.fn, t, function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return "load" === t && "string" == typeof e[0] ? M.apply(this, e) : (u("shorthand-removed-v3", "jQuery.fn." + t + "() is deprecated"), e.splice(0, 0, t), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this))
            }, "shorthand-removed-v3")
        }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, r) {
            c(s.fn, r, function(e, t) {
                return 0 < arguments.length ? this.on(r, null, e, t) : this.trigger(r)
            }, "shorthand-deprecated-v3", "jQuery.fn." + r + "() event shorthand is deprecated")
        }), s(function() {
            s(n.document).triggerHandler("ready")
        }), s.event.special.ready = {
            setup: function() {
                this === n.document && u("ready-event", "'ready' event is deprecated")
            }
        }, c(s.fn, "bind", function(e, t, r) {
            return this.on(e, null, t, r)
        }, "pre-on-methods", "jQuery.fn.bind() is deprecated"), c(s.fn, "unbind", function(e, t) {
            return this.off(e, null, t)
        }, "pre-on-methods", "jQuery.fn.unbind() is deprecated"), c(s.fn, "delegate", function(e, t, r, n) {
            return this.on(t, e, r, n)
        }, "pre-on-methods", "jQuery.fn.delegate() is deprecated"), c(s.fn, "undelegate", function(e, t, r) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r)
        }, "pre-on-methods", "jQuery.fn.undelegate() is deprecated"), c(s.fn, "hover", function(e, t) {
            return this.on("mouseenter", e).on("mouseleave", t || e)
        }, "pre-on-methods", "jQuery.fn.hover() is deprecated");

        function T(e) {
            var t = n.document.implementation.createHTMLDocument("");
            return t.body.innerHTML = e, t.body && t.body.innerHTML
        }
        var F = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
        s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
            s.migrateEnablePatches("self-closed-tags")
        }, i(s, "htmlPrefilter", function(e) {
            var t, r;
            return (r = (t = e).replace(F, "<$1></$2>")) !== t && T(t) !== T(r) && u("self-closed-tags", "HTML tags must be properly nested and closed: " + t), e.replace(F, "<$1></$2>")
        }, "self-closed-tags"), s.migrateDisablePatches("self-closed-tags");
        var D, W, _, I = s.fn.offset;
        return i(s.fn, "offset", function() {
            var e = this[0];
            return !e || e.nodeType && e.getBoundingClientRect ? I.apply(this, arguments) : (u("offset-valid-elem", "jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0)
        }, "offset-valid-elem"), s.ajax && (D = s.param, i(s, "param", function(e, t) {
            var r = s.ajaxSettings && s.ajaxSettings.traditional;
            return void 0 === t && r && (u("param-ajax-traditional", "jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t = r), D.call(this, e, t)
        }, "param-ajax-traditional")), c(s.fn, "andSelf", s.fn.addBack, "andSelf", "jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), s.Deferred && (W = s.Deferred, _ = [
            ["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"],
            ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"],
            ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]
        ], i(s, "Deferred", function(e) {
            var a = W(),
                i = a.promise();

            function t() {
                var o = arguments;
                return s.Deferred(function(n) {
                    s.each(_, function(e, t) {
                        var r = "function" == typeof o[e] && o[e];
                        a[t[1]](function() {
                            var e = r && r.apply(this, arguments);
                            e && "function" == typeof e.promise ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === i ? n.promise() : this, r ? [e] : arguments)
                        })
                    }), o = null
                }).promise()
            }
            return c(a, "pipe", t, "deferred-pipe", "deferred.pipe() is deprecated"), c(i, "pipe", t, "deferred-pipe", "deferred.pipe() is deprecated"), e && e.call(a, a), a
        }, "deferred-pipe"), s.Deferred.exceptionHook = W.exceptionHook), s
    });(function($) {

    /*
     *  new_map
     *
     *  This function will render a Google Map onto the selected jQuery element
     *
     *  @type  function
     *  @date  8/11/2013
     *  @since 4.3.0
     *
     *  @param $el (jQuery element)
     *  @return  n/a
     */

    function new_map($el) {

        // var
        var $markers = $el.find('.marker');


        // vars
        var args = {
            zoom: 4,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        // create map           
        var map = new google.maps.Map($el[0], args);


        // add a markers reference
        map.markers = [];


        // add markers
        $markers.each(function() {

            add_marker($(this), map);

        });


        // center map
        center_map(map);


        // return
        return map;

    }

    /*
     *  add_marker
     *
     *  This function will add a marker to the selected Google Map
     *
     *  @type  function
     *  @date  8/11/2013
     *  @since 4.3.0
     *
     *  @param $marker (jQuery element)
     *  @param map (Google Map object)
     *  @return  n/a
     */

    function add_marker($marker, map) {

        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: gvar.template_url + '/assets/img/transparent.png'
        });

        // add to array

        map.markers.push(marker);

        // if marker contains HTML, add it to an infoWindow 
        if ($marker.html()) {
            // create info window
            var infowindow = new google.maps.InfoWindow({
                content: $marker.html()
            });

            infowindow.open(map, marker);
            // show info window when marker is clicked
            /*google.maps.event.addListener(marker, 'click', function() {

              infowindow.open( map, marker );

            });*/
        }

    }

    /*
     *  center_map
     *
     *  This function will center the map, showing all markers attached to this map
     *
     *  @type  function
     *  @date  8/11/2013
     *  @since 4.3.0
     *
     *  @param map (Google Map object)
     *  @return  n/a
     */

    function center_map(map) {

        // vars
        var bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        $.each(map.markers, function(i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });

        // only 1 marker?
        if (map.markers.length == 1) {

            var customZoom = parseInt(gvar.zoom);
            var lngOffset = customZoom * 0.1;
            // set center of map
            console.log(window.innerWidth);
            theCenter = bounds.getCenter();
            if (window.innerWidth <= 992) {
                console.log('lat ' + theCenter.lat());
                console.log('lang + ' + theCenter.lng());
                map.setCenter({
                    lat: theCenter.lat() - lngOffset,
                    lng: theCenter.lng()
                });
                map.setZoom(customZoom - 1);
            } else {
                console.log('lat' + theCenter.lat());
                console.log('lng' + theCenter.lng());
                map.setCenter({
                    lat: theCenter.lat(),
                    lng: theCenter.lng() - lngOffset
                });
                map.setZoom(customZoom);
            }

        } else {
            // fit to bounds
            map.fitBounds(bounds);
        }

    }

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    /*
     *  document ready
     *
     *  This function will render each map when the document is ready (page has loaded)
     *
     *  @type  function
     *  @date  8/11/2013
     *  @since 5.0.0
     *
     *  @param n/a
     *  @return  n/a
     */
    // global var
    var map = null;

    /*$(document).ready(function(){
      if (!$('.acf-map').length) {
      if ($('.service-areas-map').isInViewport()) { 
          $('.acf-map').each(function(){
            map = new_map( $(this) );
          });
      }
      }

    });*/
    var flag = true;

    $(window).on('scroll', function() {

        if (flag) {
            if ($('.acf-map').length) {
                if ($('.service-areas-map').isInViewport()) {
                    $('.acf-map').each(function() {
                        map = new_map($(this));
                        flag = false;
                    });
                }
            }
        }
    });

})(jQuery);/*
 * jQuery FlexSlider v2.7.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function($) {
    var e = !0;
    $.flexslider = function(t, a) {
        var n = $(t);
        void 0 === a.rtl && "rtl" == $("html").attr("dir") && (a.rtl = !0), n.vars = $.extend({}, $.flexslider.defaults, a);
        var i = n.vars.namespace,
            r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            s = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            o = "click touchend MSPointerUp keyup",
            l = "",
            c, d = "vertical" === n.vars.direction,
            u = n.vars.reverse,
            v = n.vars.itemWidth > 0,
            p = "fade" === n.vars.animation,
            m = "" !== n.vars.asNavFor,
            f = {};
        $.data(t, "flexslider", n), f = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : n.vars.rtl ? "marginRight" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var a in t)
                        if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1, n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!n.animating && (39 === t || 37 === t)) {
                        var a = n.vars.rtl ? 37 === t ? n.getTarget("next") : 39 === t && n.getTarget("prev") : 39 === t ? n.getTarget("next") : 37 === t && n.getTarget("prev");
                        n.flexAnimate(a, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(e, t, a, i) {
                    e.preventDefault();
                    var r = t < 0 ? n.getTarget("next") : n.getTarget("prev");
                    n.flexAnimate(r, n.vars.pauseOnAction)
                }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), s && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), r ? (t._slider = n, n.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var t = $(this),
                                a = t.index();
                            $(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(o, function(e) {
                        e.preventDefault();
                        var t = $(this),
                            a = t.index(),
                            r;
                        r = n.vars.rtl ? -1 * (t.offset().right - $(n).scrollLeft()) : t.offset().left - $(n).scrollLeft(), r <= 0 && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        t = 1,
                        a, r;
                    if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1)
                        for (var s = 0; s < n.pagingCount; s++) {
                            if (r = n.slides.eq(s), void 0 === r.attr("data-thumb-alt") && r.attr("data-thumb-alt", ""), a = $("<a></a>").attr("href", "#").text(t), "thumbnails" === n.vars.controlNav && (a = $("<img/>").attr("src", r.attr("data-thumb"))), "" !== r.attr("data-thumb-alt") && a.attr("alt", r.attr("data-thumb-alt")), "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var c = r.attr("data-thumbcaption");
                                if ("" !== c && void 0 !== c) {
                                    var d = $("<span></span>").addClass(i + "caption").text(c);
                                    a.append(d)
                                }
                            }
                            var u = $("<li>");
                            a.appendTo(u), u.append("</li>"), n.controlNavScaffold.append(u), t++
                        }
                    n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function(e) {
                        if (e.preventDefault(), "" === l || l === e.type) {
                            var t = $(this),
                                a = n.controlNav.index(t);
                            t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction))
                        }
                        "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active")
                },
                update: function(e, t) {
                    n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function(e) {
                        e.preventDefault();
                        var t;
                        "" !== l && l !== e.type || (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = i + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function(e) {
                        e.preventDefault(), "" !== l && l !== e.type || ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), w = 0, c = d ? n.h : n.w, f = Number(new Date), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c)
                }

                function a(e) {
                    e.stopPropagation();
                    var a = e.target._slider;
                    if (a) {
                        var n = -e.translationX,
                            i = -e.translationY;
                        if (w += d ? i : n, m = (a.vars.rtl ? -1 : 1) * w, x = d ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA) return void setImmediate(function() {
                            t._gesture.stop()
                        });
                        (!x || Number(new Date) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = w / (0 === a.currentSlide && w < 0 || a.currentSlide === a.last && w > 0 ? Math.abs(w) / c + 2 : 1)), a.setProps(l + m, "setTouch")))
                    }
                }

                function i(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !x && null !== m) {
                            var a = u ? -m : m,
                                n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
                            t.canAdvance(n) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        s = null, o = null, m = null, l = null, w = 0
                    }
                }
                var s, o, l, c, m, f, g, h, S, x = !1,
                    y = 0,
                    b = 0,
                    w = 0;
                r ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function(e) {
                    n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date), y = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, s = d ? b : y, o = d ? y : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", S, !1))
                }, h = function(e) {
                    y = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? s - b : (n.vars.rtl ? -1 : 1) * (s - y), x = d ? Math.abs(m) < Math.abs(y - o) : Math.abs(m) < Math.abs(b - o);
                    var t = 500;
                    (!x || Number(new Date) - f > 500) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch")))
                }, S = function(e) {
                    if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !x && null !== m) {
                        var a = u ? -m : m,
                            i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                        n.canAdvance(i) && (Number(new Date) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", S, !1), s = null, o = null, m = null, l = null
                }, t.addEventListener("touchstart", g, !1))
            },
            resize: function() {
                !n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!d || p) {
                    var t = p ? n : n.viewport;
                    e ? t.animate({
                        height: n.slides.eq(n.animatingTo).innerHeight()
                    }, e) : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight())
                }
            },
            sync: function(e) {
                var t = $(n.vars.sync).data("flexslider"),
                    a = n.animatingTo;
                switch (e) {
                    case "animate":
                        t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        t.playing || t.asNav || t.play();
                        break;
                    case "pause":
                        t.pause();
                        break
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = $(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() {
                            f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    return !!e && document[e]
                },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(c), c = setTimeout(function() {
                    l = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(e, t, a, r, o) {
            if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) {
                if (m && r) {
                    var l = $(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible)
                }
                if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) s ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var c = d ? n.slides.filter(":first").height() : n.computedW,
                        g, h, S;
                    v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(c)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(c)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(c)
                    })
                }
                n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(e) {
            p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && e && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(e, t) {
            var a = m ? n.pagingCount - 1 : n.last;
            return !!t || (!(!m || n.currentItem !== n.count - 1 || 0 !== e || "prev" !== n.direction) || (!m || 0 !== n.currentItem || e !== n.pagingCount - 1 || "next" === n.direction) && (!(e === n.currentSlide && !m) && (!!n.vars.animationLoop || (!n.atEnd || 0 !== n.currentSlide || e !== a || "next" === n.direction) && (!n.atEnd || n.currentSlide !== a || 0 !== e || "next" !== n.direction))))
        }, n.getTarget = function(e) {
            return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(e, t, a) {
            var i = function() {
                var a = e || (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo;
                return function() {
                    if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;
                    switch (t) {
                        case "setTotal":
                            return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
                        case "setTouch":
                            return e;
                        case "jumpEnd":
                            return u ? e : n.count * e;
                        case "jumpStart":
                            return u ? n.count * e : e;
                        default:
                            return e
                    }
                }() * (n.vars.rtl ? 1 : -1) + "px"
            }();
            n.transitions && (i = n.isFirefox ? d ? "translate3d(0," + i + ",0)" : "translate3d(" + parseInt(i) + "px,0,0)" : d ? "translate3d(0," + i + ",0)" : "translate3d(" + (n.vars.rtl ? -1 : 1) * parseInt(i) + "px,0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i)
        }, n.setup = function(e) {
            if (p) n.vars.rtl ? n.slides.css({
                width: "100%",
                float: "right",
                marginLeft: "-100%",
                position: "relative"
            }) : n.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (s ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();
            else {
                var t, a;
                "init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    n.newSlides.css({
                        display: "block"
                    }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init")
                }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function() {
                    n.doMath(), n.vars.rtl && n.isFirefox ? n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        float: "right",
                        display: "block"
                    }) : n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        float: "left",
                        display: "block"
                    }), n.vars.smoothHeight && f.smoothHeight()
                }, "init" === e ? 100 : 0))
            }
            v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var e = n.slides.first(),
                t = n.vars.itemMargin,
                a = n.vars.minItems,
                i = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.isFirefox && (n.w = n.width()), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM
        }, n.update = function(e, t) {
            n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update()
        }, n.addSlide = function(e, t) {
            var a = $(e);
            n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(e) {
            var t = isNaN(e) ? n.slides.index($(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, f.init()
    }, $(window).blur(function(t) {
        e = !1
    }).focus(function(t) {
        e = !0
    }), $.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        customDirectionNav: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        isFirefox: !1,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {},
        rtl: !1
    }, $.fn.flexslider = function(e) {
        if (void 0 === e && (e = {}), "object" == typeof e) return this.each(function() {
            var t = $(this),
                a = e.selector ? e.selector : ".slides > li",
                n = t.find(a);
            1 === n.length && !1 === e.allowOneSlide || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e)
        });
        var t = $(this).data("flexslider");
        switch (e) {
            case "play":
                t.play();
                break;
            case "pause":
                t.pause();
                break;
            case "stop":
                t.stop();
                break;
            case "next":
                t.flexAnimate(t.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                t.flexAnimate(t.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && t.flexAnimate(e, !0)
        }
    }
}(jQuery);/*! rangeslider.js - v2.3.2 | (c) 2018 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */ ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    "use strict";

    function b() {
        var a = document.createElement("input");
        return a.setAttribute("type", "range"), "text" !== a.type
    }

    function c(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c)
        }, b)
    }

    function d(a, b) {
        return b = b || 100,
            function() {
                if (!a.debouncing) {
                    var c = Array.prototype.slice.apply(arguments);
                    a.lastReturnVal = a.apply(window, c), a.debouncing = !0
                }
                return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function() {
                    a.debouncing = !1
                }, b), a.lastReturnVal
            }
    }

    function e(a) {
        return a && (0 === a.offsetWidth || 0 === a.offsetHeight || !1 === a.open)
    }

    function f(a) {
        for (var b = [], c = a.parentNode; e(c);) b.push(c), c = c.parentNode;
        return b
    }

    function g(a, b) {
        function c(a) {
            void 0 !== a.open && (a.open = !a.open)
        }
        var d = f(a),
            e = d.length,
            g = [],
            h = a[b];
        if (e) {
            for (var i = 0; i < e; i++) g[i] = d[i].style.cssText, d[i].style.setProperty ? d[i].style.setProperty("display", "block", "important") : d[i].style.cssText += ";display: block !important", d[i].style.height = "0", d[i].style.overflow = "hidden", d[i].style.visibility = "hidden", c(d[i]);
            h = a[b];
            for (var j = 0; j < e; j++) d[j].style.cssText = g[j], c(d[j])
        }
        return h
    }

    function h(a, b) {
        var c = parseFloat(a);
        return Number.isNaN(c) ? b : c
    }

    function i(a) {
        return a.charAt(0).toUpperCase() + a.substr(1)
    }

    function j(b, e) {
        if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, n, e), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = o.orientation[this.orientation].dimension, this.DIRECTION = o.orientation[this.orientation].direction, this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle, this.COORDINATE = o.orientation[this.orientation].coordinate, this.polyfill && m) return !1;
        this.identifier = "js-" + k + "-" + l++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: "0"
        }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init();
        var f = this;
        this.$window.on("resize." + this.identifier, d(function() {
            c(function() {
                f.update(!1, !1)
            }, 300)
        }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(a, b) {
            if (!b || b.origin !== f.identifier) {
                var c = a.target.value,
                    d = f.getPositionFromValue(c);
                f.setPosition(d)
            }
        })
    }
    Number.isNaN = Number.isNaN || function(a) {
        return "number" == typeof a && a !== a
    };
    var k = "rangeslider",
        l = 0,
        m = b(),
        n = {
            polyfill: !0,
            orientation: "horizontal",
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            activeClass: "rangeslider--active",
            horizontalClass: "rangeslider--horizontal",
            verticalClass: "rangeslider--vertical",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        },
        o = {
            orientation: {
                horizontal: {
                    dimension: "width",
                    direction: "left",
                    directionStyle: "left",
                    coordinate: "x"
                },
                vertical: {
                    dimension: "height",
                    direction: "top",
                    directionStyle: "bottom",
                    coordinate: "y"
                }
            }
        };
    return j.prototype.init = function() {
        this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit()
    }, j.prototype.update = function(a, b) {
        a = a || !1, a && (this.min = h(this.$element[0].getAttribute("min"), 0), this.max = h(this.$element[0].getAttribute("max"), 100), this.value = h(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = h(this.$element[0].getAttribute("step"), 1)), this.handleDimension = g(this.$handle[0], "offset" + i(this.DIMENSION)), this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, b)
    }, j.prototype.handleDown = function(a) {
        if (a.preventDefault(), !(a.button && 0 !== a.button || (this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), this.$range.addClass(this.options.activeClass), (" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1))) {
            var b = this.getRelativePosition(a),
                c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                d = this.getPositionFromNode(this.$handle[0]) - c,
                e = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
            this.setPosition(e), b >= d && b < d + this.handleDimension && (this.grabPos = b - d)
        }
    }, j.prototype.handleMove = function(a) {
        a.preventDefault();
        var b = this.getRelativePosition(a),
            c = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
        this.setPosition(c)
    }, j.prototype.handleEnd = function(a) {
        a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$range.removeClass(this.options.activeClass), this.$element.trigger("change", {
            origin: this.identifier
        }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
    }, j.prototype.cap = function(a, b, c) {
        return a < b ? b : a > c ? c : a
    }, j.prototype.setPosition = function(a, b) {
        var c, d;
        void 0 === b && (b = !0), c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos)), d = this.getPositionFromValue(c), this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = d + "px", this.setValue(c), this.position = d, this.value = c, b && this.onSlide && "function" == typeof this.onSlide && this.onSlide(d, c)
    }, j.prototype.getPositionFromNode = function(a) {
        for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
        return b
    }, j.prototype.getRelativePosition = function(a) {
        var b = i(this.COORDINATE),
            c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            d = 0;
        return void 0 !== a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && void 0 !== a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && void 0 !== a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]), d - c
    }, j.prototype.getPositionFromValue = function(a) {
        var b;
        return b = (a - this.min) / (this.max - this.min), Number.isNaN(b) ? 0 : b * this.maxHandlePos
    }, j.prototype.getValueFromPosition = function(a) {
        var b, c;
        return b = a / (this.maxHandlePos || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed))
    }, j.prototype.setValue = function(a) {
        a === this.value && "" !== this.$element[0].value || this.$element.val(a).trigger("input", {
            origin: this.identifier
        })
    }, j.prototype.destroy = function() {
        this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + k), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0])
    }, a.fn[k] = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                e = d.data("plugin_" + k);
            e || d.data("plugin_" + k, e = new j(this, b)), "string" == typeof b && e[b].apply(e, c)
        })
    }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"
});/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e()
}(this, (function() {
    "use strict";
    const t = new Map,
        e = {
            set(e, i, n) {
                t.has(e) || t.set(e, new Map);
                const s = t.get(e);
                s.has(i) || 0 === s.size ? s.set(i, n) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)
            },
            get: (e, i) => t.has(e) && t.get(e).get(i) || null,
            remove(e, i) {
                if (!t.has(e)) return;
                const n = t.get(e);
                n.delete(i), 0 === n.size && t.delete(e)
            }
        },
        i = "transitionend",
        n = t => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, ((t, e) => `#${CSS.escape(e)}`))), t),
        s = t => {
            t.dispatchEvent(new Event(i))
        },
        o = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        r = t => o(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(n(t)) : null,
        a = t => {
            if (!o(t) || 0 === t.getClientRects().length) return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
                i = t.closest("details:not([open])");
            if (!i) return e;
            if (i !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== i) return !1;
                if (null === e) return !1
            }
            return e
        },
        l = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        c = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? c(t.parentNode) : null
        },
        h = () => {},
        d = t => {
            t.offsetHeight
        },
        u = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        f = [],
        p = () => "rtl" === document.documentElement.dir,
        m = t => {
            var e;
            e = () => {
                const e = u();
                if (e) {
                    const i = t.NAME,
                        n = e.fn[i];
                    e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = n, t.jQueryInterface)
                }
            }, "loading" === document.readyState ? (f.length || document.addEventListener("DOMContentLoaded", (() => {
                for (const t of f) t()
            })), f.push(e)) : e()
        },
        g = (t, e = [], i = t) => "function" == typeof t ? t(...e) : i,
        _ = (t, e, n = !0) => {
            if (!n) return void g(t);
            const o = (t => {
                if (!t) return 0;
                let {
                    transitionDuration: e,
                    transitionDelay: i
                } = window.getComputedStyle(t);
                const n = Number.parseFloat(e),
                    s = Number.parseFloat(i);
                return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
            })(e) + 5;
            let r = !1;
            const a = ({
                target: n
            }) => {
                n === e && (r = !0, e.removeEventListener(i, a), g(t))
            };
            e.addEventListener(i, a), setTimeout((() => {
                r || s(e)
            }), o)
        },
        b = (t, e, i, n) => {
            const s = t.length;
            let o = t.indexOf(e);
            return -1 === o ? !i && n ? t[s - 1] : t[0] : (o += i ? 1 : -1, n && (o = (o + s) % s), t[Math.max(0, Math.min(o, s - 1))])
        },
        v = /[^.]*(?=\..*)\.|.*/,
        y = /\..*/,
        w = /::\d+$/,
        A = {};
    let E = 1;
    const T = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        C = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function O(t, e) {
        return e && `${e}::${E++}` || t.uidEvent || E++
    }

    function x(t) {
        const e = O(t);
        return t.uidEvent = e, A[e] = A[e] || {}, A[e]
    }

    function k(t, e, i = null) {
        return Object.values(t).find((t => t.callable === e && t.delegationSelector === i))
    }

    function L(t, e, i) {
        const n = "string" == typeof e,
            s = n ? i : e || i;
        let o = I(t);
        return C.has(o) || (o = t), [n, s, o]
    }

    function S(t, e, i, n, s) {
        if ("string" != typeof e || !t) return;
        let [o, r, a] = L(e, i, n);
        if (e in T) {
            const t = t => function(e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            r = t(r)
        }
        const l = x(t),
            c = l[a] || (l[a] = {}),
            h = k(c, r, o ? i : null);
        if (h) return void(h.oneOff = h.oneOff && s);
        const d = O(r, e.replace(v, "")),
            u = o ? function(t, e, i) {
                return function n(s) {
                    const o = t.querySelectorAll(e);
                    for (let {
                            target: r
                        } = s; r && r !== this; r = r.parentNode)
                        for (const a of o)
                            if (a === r) return P(s, {
                                delegateTarget: r
                            }), n.oneOff && N.off(t, s.type, e, i), i.apply(r, [s])
                }
            }(t, i, r) : function(t, e) {
                return function i(n) {
                    return P(n, {
                        delegateTarget: t
                    }), i.oneOff && N.off(t, n.type, e), e.apply(t, [n])
                }
            }(t, r);
        u.delegationSelector = o ? i : null, u.callable = r, u.oneOff = s, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o)
    }

    function D(t, e, i, n, s) {
        const o = k(e[i], n, s);
        o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent])
    }

    function $(t, e, i, n) {
        const s = e[i] || {};
        for (const [o, r] of Object.entries(s)) o.includes(n) && D(t, e, i, r.callable, r.delegationSelector)
    }

    function I(t) {
        return t = t.replace(y, ""), T[t] || t
    }
    const N = {
        on(t, e, i, n) {
            S(t, e, i, n, !1)
        },
        one(t, e, i, n) {
            S(t, e, i, n, !0)
        },
        off(t, e, i, n) {
            if ("string" != typeof e || !t) return;
            const [s, o, r] = L(e, i, n), a = r !== e, l = x(t), c = l[r] || {}, h = e.startsWith(".");
            if (void 0 === o) {
                if (h)
                    for (const i of Object.keys(l)) $(t, l, i, e.slice(1));
                for (const [i, n] of Object.entries(c)) {
                    const s = i.replace(w, "");
                    a && !e.includes(s) || D(t, l, r, n.callable, n.delegationSelector)
                }
            } else {
                if (!Object.keys(c).length) return;
                D(t, l, r, o, s ? i : null)
            }
        },
        trigger(t, e, i) {
            if ("string" != typeof e || !t) return null;
            const n = u();
            let s = null,
                o = !0,
                r = !0,
                a = !1;
            e !== I(e) && n && (s = n.Event(e, i), n(t).trigger(s), o = !s.isPropagationStopped(), r = !s.isImmediatePropagationStopped(), a = s.isDefaultPrevented());
            const l = P(new Event(e, {
                bubbles: o,
                cancelable: !0
            }), i);
            return a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && s && s.preventDefault(), l
        }
    };

    function P(t, e = {}) {
        for (const [i, n] of Object.entries(e)) try {
            t[i] = n
        } catch (e) {
            Object.defineProperty(t, i, {
                configurable: !0,
                get: () => n
            })
        }
        return t
    }

    function j(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ("" === t || "null" === t) return null;
        if ("string" != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t))
        } catch (e) {
            return t
        }
    }

    function M(t) {
        return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`))
    }
    const F = {
        setDataAttribute(t, e, i) {
            t.setAttribute(`data-bs-${M(e)}`, i)
        },
        removeDataAttribute(t, e) {
            t.removeAttribute(`data-bs-${M(e)}`)
        },
        getDataAttributes(t) {
            if (!t) return {};
            const e = {},
                i = Object.keys(t.dataset).filter((t => t.startsWith("bs") && !t.startsWith("bsConfig")));
            for (const n of i) {
                let i = n.replace(/^bs/, "");
                i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = j(t.dataset[n])
            }
            return e
        },
        getDataAttribute: (t, e) => j(t.getAttribute(`data-bs-${M(e)}`))
    };
    class H {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t
        }
        _mergeConfigObj(t, e) {
            const i = o(e) ? F.getDataAttribute(e, "config") : {};
            return {
                ...this.constructor.Default,
                ..."object" == typeof i ? i : {},
                ...o(e) ? F.getDataAttributes(e) : {},
                ..."object" == typeof t ? t : {}
            }
        }
        _typeCheckConfig(t, e = this.constructor.DefaultType) {
            for (const [n, s] of Object.entries(e)) {
                const e = t[n],
                    r = o(e) ? "element" : null == (i = e) ? `${i}` : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(s).test(r)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${r}" but expected type "${s}".`)
            }
            var i
        }
    }
    class W extends H {
        constructor(t, i) {
            super(), (t = r(t)) && (this._element = t, this._config = this._getConfig(i), e.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            e.remove(this._element, this.constructor.DATA_KEY), N.off(this._element, this.constructor.EVENT_KEY);
            for (const t of Object.getOwnPropertyNames(this)) this[t] = null
        }
        _queueCallback(t, e, i = !0) {
            _(t, e, i)
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        static getInstance(t) {
            return e.get(r(t), this.DATA_KEY)
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
        }
        static get VERSION() {
            return "5.3.3"
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`
        }
        static eventName(t) {
            return `${t}${this.EVENT_KEY}`
        }
    }
    const B = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), e = i && "#" !== i ? i.trim() : null
            }
            return e ? e.split(",").map((t => n(t))).join(",") : null
        },
        z = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
            parents(t, e) {
                const i = [];
                let n = t.parentNode.closest(e);
                for (; n;) i.push(n), n = n.parentNode.closest(e);
                return i
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling
                }
                return []
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t => `${t}:not([tabindex^="-"])`)).join(",");
                return this.find(e, t).filter((t => !l(t) && a(t)))
            },
            getSelectorFromElement(t) {
                const e = B(t);
                return e && z.findOne(e) ? e : null
            },
            getElementFromSelector(t) {
                const e = B(t);
                return e ? z.findOne(e) : null
            },
            getMultipleElementsFromSelector(t) {
                const e = B(t);
                return e ? z.find(e) : []
            }
        },
        R = (t, e = "hide") => {
            const i = `click.dismiss${t.EVENT_KEY}`,
                n = t.NAME;
            N.on(document, i, `[data-bs-dismiss="${n}"]`, (function(i) {
                if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), l(this)) return;
                const s = z.getElementFromSelector(this) || this.closest(`.${n}`);
                t.getOrCreateInstance(s)[e]()
            }))
        },
        q = ".bs.alert",
        V = `close${q}`,
        K = `closed${q}`;
    class Q extends W {
        static get NAME() {
            return "alert"
        }
        close() {
            if (N.trigger(this._element, V).defaultPrevented) return;
            this._element.classList.remove("show");
            const t = this._element.classList.contains("fade");
            this._queueCallback((() => this._destroyElement()), this._element, t)
        }
        _destroyElement() {
            this._element.remove(), N.trigger(this._element, K), this.dispose()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Q.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    R(Q, "close"), m(Q);
    const X = '[data-bs-toggle="button"]';
    class Y extends W {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Y.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            }))
        }
    }
    N.on(document, "click.bs.button.data-api", X, (t => {
        t.preventDefault();
        const e = t.target.closest(X);
        Y.getOrCreateInstance(e).toggle()
    })), m(Y);
    const U = ".bs.swipe",
        G = `touchstart${U}`,
        J = `touchmove${U}`,
        Z = `touchend${U}`,
        tt = `pointerdown${U}`,
        et = `pointerup${U}`,
        it = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        },
        nt = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
    class st extends H {
        constructor(t, e) {
            super(), this._element = t, t && st.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
        }
        static get Default() {
            return it
        }
        static get DefaultType() {
            return nt
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            N.off(this._element, U)
        }
        _start(t) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX
        }
        _end(t) {
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), g(this._config.endCallback)
        }
        _move(t) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const t = Math.abs(this._deltaX);
            if (t <= 40) return;
            const e = t / this._deltaX;
            this._deltaX = 0, e && g(e > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? (N.on(this._element, tt, (t => this._start(t))), N.on(this._element, et, (t => this._end(t))), this._element.classList.add("pointer-event")) : (N.on(this._element, G, (t => this._start(t))), N.on(this._element, J, (t => this._move(t))), N.on(this._element, Z, (t => this._end(t))))
        }
        _eventIsPointerPenTouch(t) {
            return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType)
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const ot = ".bs.carousel",
        rt = ".data-api",
        at = "next",
        lt = "prev",
        ct = "left",
        ht = "right",
        dt = `slide${ot}`,
        ut = `slid${ot}`,
        ft = `keydown${ot}`,
        pt = `mouseenter${ot}`,
        mt = `mouseleave${ot}`,
        gt = `dragstart${ot}`,
        _t = `load${ot}${rt}`,
        bt = `click${ot}${rt}`,
        vt = "carousel",
        yt = "active",
        wt = ".active",
        At = ".carousel-item",
        Et = wt + At,
        Tt = {
            ArrowLeft: ht,
            ArrowRight: ct
        },
        Ct = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        },
        Ot = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
    class xt extends W {
        constructor(t, e) {
            super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = z.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === vt && this.cycle()
        }
        static get Default() {
            return Ct
        }
        static get DefaultType() {
            return Ot
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(at)
        }
        nextWhenVisible() {
            !document.hidden && a(this._element) && this.next()
        }
        prev() {
            this._slide(lt)
        }
        pause() {
            this._isSliding && s(this._element), this._clearInterval()
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? N.one(this._element, ut, (() => this.cycle())) : this.cycle())
        }
        to(t) {
            const e = this._getItems();
            if (t > e.length - 1 || t < 0) return;
            if (this._isSliding) return void N.one(this._element, ut, (() => this.to(t)));
            const i = this._getItemIndex(this._getActive());
            if (i === t) return;
            const n = t > i ? at : lt;
            this._slide(n, e[t])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.defaultInterval = t.interval, t
        }
        _addEventListeners() {
            this._config.keyboard && N.on(this._element, ft, (t => this._keydown(t))), "hover" === this._config.pause && (N.on(this._element, pt, (() => this.pause())), N.on(this._element, mt, (() => this._maybeEnableCycle()))), this._config.touch && st.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const t of z.find(".carousel-item img", this._element)) N.on(t, gt, (t => t.preventDefault()));
            const t = {
                leftCallback: () => this._slide(this._directionToOrder(ct)),
                rightCallback: () => this._slide(this._directionToOrder(ht)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new st(this._element, t)
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = Tt[t.key];
            e && (t.preventDefault(), this._slide(this._directionToOrder(e)))
        }
        _getItemIndex(t) {
            return this._getItems().indexOf(t)
        }
        _setActiveIndicatorElement(t) {
            if (!this._indicatorsElement) return;
            const e = z.findOne(wt, this._indicatorsElement);
            e.classList.remove(yt), e.removeAttribute("aria-current");
            const i = z.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
            i && (i.classList.add(yt), i.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const t = this._activeElement || this._getActive();
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            this._config.interval = e || this._config.defaultInterval
        }
        _slide(t, e = null) {
            if (this._isSliding) return;
            const i = this._getActive(),
                n = t === at,
                s = e || b(this._getItems(), i, n, this._config.wrap);
            if (s === i) return;
            const o = this._getItemIndex(s),
                r = e => N.trigger(this._element, e, {
                    relatedTarget: s,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(i),
                    to: o
                });
            if (r(dt).defaultPrevented) return;
            if (!i || !s) return;
            const a = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = s;
            const l = n ? "carousel-item-start" : "carousel-item-end",
                c = n ? "carousel-item-next" : "carousel-item-prev";
            s.classList.add(c), d(s), i.classList.add(l), s.classList.add(l), this._queueCallback((() => {
                s.classList.remove(l, c), s.classList.add(yt), i.classList.remove(yt, c, l), this._isSliding = !1, r(ut)
            }), i, this._isAnimated()), a && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return z.findOne(Et, this._element)
        }
        _getItems() {
            return z.find(At, this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), this._interval = null)
        }
        _directionToOrder(t) {
            return p() ? t === ct ? lt : at : t === ct ? at : lt
        }
        _orderToDirection(t) {
            return p() ? t === lt ? ct : ht : t === lt ? ht : ct
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = xt.getOrCreateInstance(this, t);
                if ("number" != typeof t) {
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                } else e.to(t)
            }))
        }
    }
    N.on(document, bt, "[data-bs-slide], [data-bs-slide-to]", (function(t) {
        const e = z.getElementFromSelector(this);
        if (!e || !e.classList.contains(vt)) return;
        t.preventDefault();
        const i = xt.getOrCreateInstance(e),
            n = this.getAttribute("data-bs-slide-to");
        return n ? (i.to(n), void i._maybeEnableCycle()) : "next" === F.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle())
    })), N.on(window, _t, (() => {
        const t = z.find('[data-bs-ride="carousel"]');
        for (const e of t) xt.getOrCreateInstance(e)
    })), m(xt);
    const kt = ".bs.collapse",
        Lt = `show${kt}`,
        St = `shown${kt}`,
        Dt = `hide${kt}`,
        $t = `hidden${kt}`,
        It = `click${kt}.data-api`,
        Nt = "show",
        Pt = "collapse",
        jt = "collapsing",
        Mt = `:scope .${Pt} .${Pt}`,
        Ft = '[data-bs-toggle="collapse"]',
        Ht = {
            parent: null,
            toggle: !0
        },
        Wt = {
            parent: "(null|element)",
            toggle: "boolean"
        };
    class Bt extends W {
        constructor(t, e) {
            super(t, e), this._isTransitioning = !1, this._triggerArray = [];
            const i = z.find(Ft);
            for (const t of i) {
                const e = z.getSelectorFromElement(t),
                    i = z.find(e).filter((t => t === this._element));
                null !== e && i.length && this._triggerArray.push(t)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() {
            return Ht
        }
        static get DefaultType() {
            return Wt
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t = [];
            if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t => t !== this._element)).map((t => Bt.getOrCreateInstance(t, {
                    toggle: !1
                })))), t.length && t[0]._isTransitioning) return;
            if (N.trigger(this._element, Lt).defaultPrevented) return;
            for (const e of t) e.hide();
            const e = this._getDimension();
            this._element.classList.remove(Pt), this._element.classList.add(jt), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const i = `scroll${e[0].toUpperCase()+e.slice(1)}`;
            this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Pt, Nt), this._element.style[e] = "", N.trigger(this._element, St)
            }), this._element, !0), this._element.style[e] = `${this._element[i]}px`
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (N.trigger(this._element, Dt).defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, d(this._element), this._element.classList.add(jt), this._element.classList.remove(Pt, Nt);
            for (const t of this._triggerArray) {
                const e = z.getElementFromSelector(t);
                e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
            }
            this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Pt), N.trigger(this._element, $t)
            }), this._element, !0)
        }
        _isShown(t = this._element) {
            return t.classList.contains(Nt)
        }
        _configAfterMerge(t) {
            return t.toggle = Boolean(t.toggle), t.parent = r(t.parent), t
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const t = this._getFirstLevelChildren(Ft);
            for (const e of t) {
                const t = z.getElementFromSelector(e);
                t && this._addAriaAndCollapsedClass([e], this._isShown(t))
            }
        }
        _getFirstLevelChildren(t) {
            const e = z.find(Mt, this._config.parent);
            return z.find(t, this._config.parent).filter((t => !e.includes(t)))
        }
        _addAriaAndCollapsedClass(t, e) {
            if (t.length)
                for (const i of t) i.classList.toggle("collapsed", !e), i.setAttribute("aria-expanded", e)
        }
        static jQueryInterface(t) {
            const e = {};
            return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each((function() {
                const i = Bt.getOrCreateInstance(this, e);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t]()
                }
            }))
        }
    }
    N.on(document, It, Ft, (function(t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        for (const t of z.getMultipleElementsFromSelector(this)) Bt.getOrCreateInstance(t, {
            toggle: !1
        }).toggle()
    })), m(Bt);
    var zt = "top",
        Rt = "bottom",
        qt = "right",
        Vt = "left",
        Kt = "auto",
        Qt = [zt, Rt, qt, Vt],
        Xt = "start",
        Yt = "end",
        Ut = "clippingParents",
        Gt = "viewport",
        Jt = "popper",
        Zt = "reference",
        te = Qt.reduce((function(t, e) {
            return t.concat([e + "-" + Xt, e + "-" + Yt])
        }), []),
        ee = [].concat(Qt, [Kt]).reduce((function(t, e) {
            return t.concat([e, e + "-" + Xt, e + "-" + Yt])
        }), []),
        ie = "beforeRead",
        ne = "read",
        se = "afterRead",
        oe = "beforeMain",
        re = "main",
        ae = "afterMain",
        le = "beforeWrite",
        ce = "write",
        he = "afterWrite",
        de = [ie, ne, se, oe, re, ae, le, ce, he];

    function ue(t) {
        return t ? (t.nodeName || "").toLowerCase() : null
    }

    function fe(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function pe(t) {
        return t instanceof fe(t).Element || t instanceof Element
    }

    function me(t) {
        return t instanceof fe(t).HTMLElement || t instanceof HTMLElement
    }

    function ge(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof fe(t).ShadowRoot || t instanceof ShadowRoot)
    }
    const _e = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(t) {
            var e = t.state;
            Object.keys(e.elements).forEach((function(t) {
                var i = e.styles[t] || {},
                    n = e.attributes[t] || {},
                    s = e.elements[t];
                me(s) && ue(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function(t) {
                    var e = n[t];
                    !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e)
                })))
            }))
        },
        effect: function(t) {
            var e = t.state,
                i = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
            return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
                function() {
                    Object.keys(e.elements).forEach((function(t) {
                        var n = e.elements[t],
                            s = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((function(t, e) {
                                return t[e] = "", t
                            }), {});
                        me(n) && ue(n) && (Object.assign(n.style, o), Object.keys(s).forEach((function(t) {
                            n.removeAttribute(t)
                        })))
                    }))
                }
        },
        requires: ["computeStyles"]
    };

    function be(t) {
        return t.split("-")[0]
    }
    var ve = Math.max,
        ye = Math.min,
        we = Math.round;

    function Ae() {
        var t = navigator.userAgentData;
        return null != t && t.brands && Array.isArray(t.brands) ? t.brands.map((function(t) {
            return t.brand + "/" + t.version
        })).join(" ") : navigator.userAgent
    }

    function Ee() {
        return !/^((?!chrome|android).)*safari/i.test(Ae())
    }

    function Te(t, e, i) {
        void 0 === e && (e = !1), void 0 === i && (i = !1);
        var n = t.getBoundingClientRect(),
            s = 1,
            o = 1;
        e && me(t) && (s = t.offsetWidth > 0 && we(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && we(n.height) / t.offsetHeight || 1);
        var r = (pe(t) ? fe(t) : window).visualViewport,
            a = !Ee() && i,
            l = (n.left + (a && r ? r.offsetLeft : 0)) / s,
            c = (n.top + (a && r ? r.offsetTop : 0)) / o,
            h = n.width / s,
            d = n.height / o;
        return {
            width: h,
            height: d,
            top: c,
            right: l + h,
            bottom: c + d,
            left: l,
            x: l,
            y: c
        }
    }

    function Ce(t) {
        var e = Te(t),
            i = t.offsetWidth,
            n = t.offsetHeight;
        return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: i,
            height: n
        }
    }

    function Oe(t, e) {
        var i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (i && ge(i)) {
            var n = e;
            do {
                if (n && t.isSameNode(n)) return !0;
                n = n.parentNode || n.host
            } while (n)
        }
        return !1
    }

    function xe(t) {
        return fe(t).getComputedStyle(t)
    }

    function ke(t) {
        return ["table", "td", "th"].indexOf(ue(t)) >= 0
    }

    function Le(t) {
        return ((pe(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function Se(t) {
        return "html" === ue(t) ? t : t.assignedSlot || t.parentNode || (ge(t) ? t.host : null) || Le(t)
    }

    function De(t) {
        return me(t) && "fixed" !== xe(t).position ? t.offsetParent : null
    }

    function $e(t) {
        for (var e = fe(t), i = De(t); i && ke(i) && "static" === xe(i).position;) i = De(i);
        return i && ("html" === ue(i) || "body" === ue(i) && "static" === xe(i).position) ? e : i || function(t) {
            var e = /firefox/i.test(Ae());
            if (/Trident/i.test(Ae()) && me(t) && "fixed" === xe(t).position) return null;
            var i = Se(t);
            for (ge(i) && (i = i.host); me(i) && ["html", "body"].indexOf(ue(i)) < 0;) {
                var n = xe(i);
                if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;
                i = i.parentNode
            }
            return null
        }(t) || e
    }

    function Ie(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
    }

    function Ne(t, e, i) {
        return ve(t, ye(e, i))
    }

    function Pe(t) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, t)
    }

    function je(t, e) {
        return e.reduce((function(e, i) {
            return e[i] = t, e
        }), {})
    }
    const Me = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(t) {
            var e, i = t.state,
                n = t.name,
                s = t.options,
                o = i.elements.arrow,
                r = i.modifiersData.popperOffsets,
                a = be(i.placement),
                l = Ie(a),
                c = [Vt, qt].indexOf(a) >= 0 ? "height" : "width";
            if (o && r) {
                var h = function(t, e) {
                        return Pe("number" != typeof(t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                            placement: e.placement
                        })) : t) ? t : je(t, Qt))
                    }(s.padding, i),
                    d = Ce(o),
                    u = "y" === l ? zt : Vt,
                    f = "y" === l ? Rt : qt,
                    p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c],
                    m = r[l] - i.rects.reference[l],
                    g = $e(o),
                    _ = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                    b = p / 2 - m / 2,
                    v = h[u],
                    y = _ - d[c] - h[f],
                    w = _ / 2 - d[c] / 2 + b,
                    A = Ne(v, w, y),
                    E = l;
                i.modifiersData[n] = ((e = {})[E] = A, e.centerOffset = A - w, e)
            }
        },
        effect: function(t) {
            var e = t.state,
                i = t.options.element,
                n = void 0 === i ? "[data-popper-arrow]" : i;
            null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && Oe(e.elements.popper, n) && (e.elements.arrow = n)
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
    };

    function Fe(t) {
        return t.split("-")[1]
    }
    var He = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };

    function We(t) {
        var e, i = t.popper,
            n = t.popperRect,
            s = t.placement,
            o = t.variation,
            r = t.offsets,
            a = t.position,
            l = t.gpuAcceleration,
            c = t.adaptive,
            h = t.roundOffsets,
            d = t.isFixed,
            u = r.x,
            f = void 0 === u ? 0 : u,
            p = r.y,
            m = void 0 === p ? 0 : p,
            g = "function" == typeof h ? h({
                x: f,
                y: m
            }) : {
                x: f,
                y: m
            };
        f = g.x, m = g.y;
        var _ = r.hasOwnProperty("x"),
            b = r.hasOwnProperty("y"),
            v = Vt,
            y = zt,
            w = window;
        if (c) {
            var A = $e(i),
                E = "clientHeight",
                T = "clientWidth";
            A === fe(i) && "static" !== xe(A = Le(i)).position && "absolute" === a && (E = "scrollHeight", T = "scrollWidth"), (s === zt || (s === Vt || s === qt) && o === Yt) && (y = Rt, m -= (d && A === w && w.visualViewport ? w.visualViewport.height : A[E]) - n.height, m *= l ? 1 : -1), s !== Vt && (s !== zt && s !== Rt || o !== Yt) || (v = qt, f -= (d && A === w && w.visualViewport ? w.visualViewport.width : A[T]) - n.width, f *= l ? 1 : -1)
        }
        var C, O = Object.assign({
                position: a
            }, c && He),
            x = !0 === h ? function(t, e) {
                var i = t.x,
                    n = t.y,
                    s = e.devicePixelRatio || 1;
                return {
                    x: we(i * s) / s || 0,
                    y: we(n * s) / s || 0
                }
            }({
                x: f,
                y: m
            }, fe(i)) : {
                x: f,
                y: m
            };
        return f = x.x, m = x.y, l ? Object.assign({}, O, ((C = {})[y] = b ? "0" : "", C[v] = _ ? "0" : "", C.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", C)) : Object.assign({}, O, ((e = {})[y] = b ? m + "px" : "", e[v] = _ ? f + "px" : "", e.transform = "", e))
    }
    const Be = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(t) {
            var e = t.state,
                i = t.options,
                n = i.gpuAcceleration,
                s = void 0 === n || n,
                o = i.adaptive,
                r = void 0 === o || o,
                a = i.roundOffsets,
                l = void 0 === a || a,
                c = {
                    placement: be(e.placement),
                    variation: Fe(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: s,
                    isFixed: "fixed" === e.options.strategy
                };
            null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, We(Object.assign({}, c, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: r,
                roundOffsets: l
            })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, We(Object.assign({}, c, {
                offsets: e.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
                "data-popper-placement": e.placement
            })
        },
        data: {}
    };
    var ze = {
        passive: !0
    };
    const Re = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(t) {
            var e = t.state,
                i = t.instance,
                n = t.options,
                s = n.scroll,
                o = void 0 === s || s,
                r = n.resize,
                a = void 0 === r || r,
                l = fe(e.elements.popper),
                c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
            return o && c.forEach((function(t) {
                    t.addEventListener("scroll", i.update, ze)
                })), a && l.addEventListener("resize", i.update, ze),
                function() {
                    o && c.forEach((function(t) {
                        t.removeEventListener("scroll", i.update, ze)
                    })), a && l.removeEventListener("resize", i.update, ze)
                }
        },
        data: {}
    };
    var qe = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

    function Ve(t) {
        return t.replace(/left|right|bottom|top/g, (function(t) {
            return qe[t]
        }))
    }
    var Ke = {
        start: "end",
        end: "start"
    };

    function Qe(t) {
        return t.replace(/start|end/g, (function(t) {
            return Ke[t]
        }))
    }

    function Xe(t) {
        var e = fe(t);
        return {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function Ye(t) {
        return Te(Le(t)).left + Xe(t).scrollLeft
    }

    function Ue(t) {
        var e = xe(t),
            i = e.overflow,
            n = e.overflowX,
            s = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + s + n)
    }

    function Ge(t) {
        return ["html", "body", "#document"].indexOf(ue(t)) >= 0 ? t.ownerDocument.body : me(t) && Ue(t) ? t : Ge(Se(t))
    }

    function Je(t, e) {
        var i;
        void 0 === e && (e = []);
        var n = Ge(t),
            s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
            o = fe(n),
            r = s ? [o].concat(o.visualViewport || [], Ue(n) ? n : []) : n,
            a = e.concat(r);
        return s ? a : a.concat(Je(Se(r)))
    }

    function Ze(t) {
        return Object.assign({}, t, {
            left: t.x,
            top: t.y,
            right: t.x + t.width,
            bottom: t.y + t.height
        })
    }

    function ti(t, e, i) {
        return e === Gt ? Ze(function(t, e) {
            var i = fe(t),
                n = Le(t),
                s = i.visualViewport,
                o = n.clientWidth,
                r = n.clientHeight,
                a = 0,
                l = 0;
            if (s) {
                o = s.width, r = s.height;
                var c = Ee();
                (c || !c && "fixed" === e) && (a = s.offsetLeft, l = s.offsetTop)
            }
            return {
                width: o,
                height: r,
                x: a + Ye(t),
                y: l
            }
        }(t, i)) : pe(e) ? function(t, e) {
            var i = Te(t, !1, "fixed" === e);
            return i.top = i.top + t.clientTop, i.left = i.left + t.clientLeft, i.bottom = i.top + t.clientHeight, i.right = i.left + t.clientWidth, i.width = t.clientWidth, i.height = t.clientHeight, i.x = i.left, i.y = i.top, i
        }(e, i) : Ze(function(t) {
            var e, i = Le(t),
                n = Xe(t),
                s = null == (e = t.ownerDocument) ? void 0 : e.body,
                o = ve(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
                r = ve(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
                a = -n.scrollLeft + Ye(t),
                l = -n.scrollTop;
            return "rtl" === xe(s || i).direction && (a += ve(i.clientWidth, s ? s.clientWidth : 0) - o), {
                width: o,
                height: r,
                x: a,
                y: l
            }
        }(Le(t)))
    }

    function ei(t) {
        var e, i = t.reference,
            n = t.element,
            s = t.placement,
            o = s ? be(s) : null,
            r = s ? Fe(s) : null,
            a = i.x + i.width / 2 - n.width / 2,
            l = i.y + i.height / 2 - n.height / 2;
        switch (o) {
            case zt:
                e = {
                    x: a,
                    y: i.y - n.height
                };
                break;
            case Rt:
                e = {
                    x: a,
                    y: i.y + i.height
                };
                break;
            case qt:
                e = {
                    x: i.x + i.width,
                    y: l
                };
                break;
            case Vt:
                e = {
                    x: i.x - n.width,
                    y: l
                };
                break;
            default:
                e = {
                    x: i.x,
                    y: i.y
                }
        }
        var c = o ? Ie(o) : null;
        if (null != c) {
            var h = "y" === c ? "height" : "width";
            switch (r) {
                case Xt:
                    e[c] = e[c] - (i[h] / 2 - n[h] / 2);
                    break;
                case Yt:
                    e[c] = e[c] + (i[h] / 2 - n[h] / 2)
            }
        }
        return e
    }

    function ii(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = void 0 === n ? t.placement : n,
            o = i.strategy,
            r = void 0 === o ? t.strategy : o,
            a = i.boundary,
            l = void 0 === a ? Ut : a,
            c = i.rootBoundary,
            h = void 0 === c ? Gt : c,
            d = i.elementContext,
            u = void 0 === d ? Jt : d,
            f = i.altBoundary,
            p = void 0 !== f && f,
            m = i.padding,
            g = void 0 === m ? 0 : m,
            _ = Pe("number" != typeof g ? g : je(g, Qt)),
            b = u === Jt ? Zt : Jt,
            v = t.rects.popper,
            y = t.elements[p ? b : u],
            w = function(t, e, i, n) {
                var s = "clippingParents" === e ? function(t) {
                        var e = Je(Se(t)),
                            i = ["absolute", "fixed"].indexOf(xe(t).position) >= 0 && me(t) ? $e(t) : t;
                        return pe(i) ? e.filter((function(t) {
                            return pe(t) && Oe(t, i) && "body" !== ue(t)
                        })) : []
                    }(t) : [].concat(e),
                    o = [].concat(s, [i]),
                    r = o[0],
                    a = o.reduce((function(e, i) {
                        var s = ti(t, i, n);
                        return e.top = ve(s.top, e.top), e.right = ye(s.right, e.right), e.bottom = ye(s.bottom, e.bottom), e.left = ve(s.left, e.left), e
                    }), ti(t, r, n));
                return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
            }(pe(y) ? y : y.contextElement || Le(t.elements.popper), l, h, r),
            A = Te(t.elements.reference),
            E = ei({
                reference: A,
                element: v,
                strategy: "absolute",
                placement: s
            }),
            T = Ze(Object.assign({}, v, E)),
            C = u === Jt ? T : A,
            O = {
                top: w.top - C.top + _.top,
                bottom: C.bottom - w.bottom + _.bottom,
                left: w.left - C.left + _.left,
                right: C.right - w.right + _.right
            },
            x = t.modifiersData.offset;
        if (u === Jt && x) {
            var k = x[s];
            Object.keys(O).forEach((function(t) {
                var e = [qt, Rt].indexOf(t) >= 0 ? 1 : -1,
                    i = [zt, Rt].indexOf(t) >= 0 ? "y" : "x";
                O[t] += k[i] * e
            }))
        }
        return O
    }

    function ni(t, e) {
        void 0 === e && (e = {});
        var i = e,
            n = i.placement,
            s = i.boundary,
            o = i.rootBoundary,
            r = i.padding,
            a = i.flipVariations,
            l = i.allowedAutoPlacements,
            c = void 0 === l ? ee : l,
            h = Fe(n),
            d = h ? a ? te : te.filter((function(t) {
                return Fe(t) === h
            })) : Qt,
            u = d.filter((function(t) {
                return c.indexOf(t) >= 0
            }));
        0 === u.length && (u = d);
        var f = u.reduce((function(e, i) {
            return e[i] = ii(t, {
                placement: i,
                boundary: s,
                rootBoundary: o,
                padding: r
            })[be(i)], e
        }), {});
        return Object.keys(f).sort((function(t, e) {
            return f[t] - f[e]
        }))
    }
    const si = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(t) {
            var e = t.state,
                i = t.options,
                n = t.name;
            if (!e.modifiersData[n]._skip) {
                for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, d = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, m = i.allowedAutoPlacements, g = e.options.placement, _ = be(g), b = l || (_ !== g && p ? function(t) {
                        if (be(t) === Kt) return [];
                        var e = Ve(t);
                        return [Qe(t), e, Qe(e)]
                    }(g) : [Ve(g)]), v = [g].concat(b).reduce((function(t, i) {
                        return t.concat(be(i) === Kt ? ni(e, {
                            placement: i,
                            boundary: h,
                            rootBoundary: d,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: m
                        }) : i)
                    }), []), y = e.rects.reference, w = e.rects.popper, A = new Map, E = !0, T = v[0], C = 0; C < v.length; C++) {
                    var O = v[C],
                        x = be(O),
                        k = Fe(O) === Xt,
                        L = [zt, Rt].indexOf(x) >= 0,
                        S = L ? "width" : "height",
                        D = ii(e, {
                            placement: O,
                            boundary: h,
                            rootBoundary: d,
                            altBoundary: u,
                            padding: c
                        }),
                        $ = L ? k ? qt : Vt : k ? Rt : zt;
                    y[S] > w[S] && ($ = Ve($));
                    var I = Ve($),
                        N = [];
                    if (o && N.push(D[x] <= 0), a && N.push(D[$] <= 0, D[I] <= 0), N.every((function(t) {
                            return t
                        }))) {
                        T = O, E = !1;
                        break
                    }
                    A.set(O, N)
                }
                if (E)
                    for (var P = function(t) {
                            var e = v.find((function(e) {
                                var i = A.get(e);
                                if (i) return i.slice(0, t).every((function(t) {
                                    return t
                                }))
                            }));
                            if (e) return T = e, "break"
                        }, j = p ? 3 : 1; j > 0 && "break" !== P(j); j--);
                e.placement !== T && (e.modifiersData[n]._skip = !0, e.placement = T, e.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };

    function oi(t, e, i) {
        return void 0 === i && (i = {
            x: 0,
            y: 0
        }), {
            top: t.top - e.height - i.y,
            right: t.right - e.width + i.x,
            bottom: t.bottom - e.height + i.y,
            left: t.left - e.width - i.x
        }
    }

    function ri(t) {
        return [zt, qt, Rt, Vt].some((function(e) {
            return t[e] >= 0
        }))
    }
    const ai = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(t) {
                var e = t.state,
                    i = t.name,
                    n = e.rects.reference,
                    s = e.rects.popper,
                    o = e.modifiersData.preventOverflow,
                    r = ii(e, {
                        elementContext: "reference"
                    }),
                    a = ii(e, {
                        altBoundary: !0
                    }),
                    l = oi(r, n),
                    c = oi(a, s, o),
                    h = ri(l),
                    d = ri(c);
                e.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: h,
                    hasPopperEscaped: d
                }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": h,
                    "data-popper-escaped": d
                })
            }
        },
        li = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.offset,
                    o = void 0 === s ? [0, 0] : s,
                    r = ee.reduce((function(t, i) {
                        return t[i] = function(t, e, i) {
                            var n = be(t),
                                s = [Vt, zt].indexOf(n) >= 0 ? -1 : 1,
                                o = "function" == typeof i ? i(Object.assign({}, e, {
                                    placement: t
                                })) : i,
                                r = o[0],
                                a = o[1];
                            return r = r || 0, a = (a || 0) * s, [Vt, qt].indexOf(n) >= 0 ? {
                                x: a,
                                y: r
                            } : {
                                x: r,
                                y: a
                            }
                        }(i, e.rects, o), t
                    }), {}),
                    a = r[e.placement],
                    l = a.x,
                    c = a.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r
            }
        },
        ci = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(t) {
                var e = t.state,
                    i = t.name;
                e.modifiersData[i] = ei({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                })
            },
            data: {}
        },
        hi = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state,
                    i = t.options,
                    n = t.name,
                    s = i.mainAxis,
                    o = void 0 === s || s,
                    r = i.altAxis,
                    a = void 0 !== r && r,
                    l = i.boundary,
                    c = i.rootBoundary,
                    h = i.altBoundary,
                    d = i.padding,
                    u = i.tether,
                    f = void 0 === u || u,
                    p = i.tetherOffset,
                    m = void 0 === p ? 0 : p,
                    g = ii(e, {
                        boundary: l,
                        rootBoundary: c,
                        padding: d,
                        altBoundary: h
                    }),
                    _ = be(e.placement),
                    b = Fe(e.placement),
                    v = !b,
                    y = Ie(_),
                    w = "x" === y ? "y" : "x",
                    A = e.modifiersData.popperOffsets,
                    E = e.rects.reference,
                    T = e.rects.popper,
                    C = "function" == typeof m ? m(Object.assign({}, e.rects, {
                        placement: e.placement
                    })) : m,
                    O = "number" == typeof C ? {
                        mainAxis: C,
                        altAxis: C
                    } : Object.assign({
                        mainAxis: 0,
                        altAxis: 0
                    }, C),
                    x = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
                    k = {
                        x: 0,
                        y: 0
                    };
                if (A) {
                    if (o) {
                        var L, S = "y" === y ? zt : Vt,
                            D = "y" === y ? Rt : qt,
                            $ = "y" === y ? "height" : "width",
                            I = A[y],
                            N = I + g[S],
                            P = I - g[D],
                            j = f ? -T[$] / 2 : 0,
                            M = b === Xt ? E[$] : T[$],
                            F = b === Xt ? -T[$] : -E[$],
                            H = e.elements.arrow,
                            W = f && H ? Ce(H) : {
                                width: 0,
                                height: 0
                            },
                            B = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            },
                            z = B[S],
                            R = B[D],
                            q = Ne(0, E[$], W[$]),
                            V = v ? E[$] / 2 - j - q - z - O.mainAxis : M - q - z - O.mainAxis,
                            K = v ? -E[$] / 2 + j + q + R + O.mainAxis : F + q + R + O.mainAxis,
                            Q = e.elements.arrow && $e(e.elements.arrow),
                            X = Q ? "y" === y ? Q.clientTop || 0 : Q.clientLeft || 0 : 0,
                            Y = null != (L = null == x ? void 0 : x[y]) ? L : 0,
                            U = I + K - Y,
                            G = Ne(f ? ye(N, I + V - Y - X) : N, I, f ? ve(P, U) : P);
                        A[y] = G, k[y] = G - I
                    }
                    if (a) {
                        var J, Z = "x" === y ? zt : Vt,
                            tt = "x" === y ? Rt : qt,
                            et = A[w],
                            it = "y" === w ? "height" : "width",
                            nt = et + g[Z],
                            st = et - g[tt],
                            ot = -1 !== [zt, Vt].indexOf(_),
                            rt = null != (J = null == x ? void 0 : x[w]) ? J : 0,
                            at = ot ? nt : et - E[it] - T[it] - rt + O.altAxis,
                            lt = ot ? et + E[it] + T[it] - rt - O.altAxis : st,
                            ct = f && ot ? function(t, e, i) {
                                var n = Ne(t, e, i);
                                return n > i ? i : n
                            }(at, et, lt) : Ne(f ? at : nt, et, f ? lt : st);
                        A[w] = ct, k[w] = ct - et
                    }
                    e.modifiersData[n] = k
                }
            },
            requiresIfExists: ["offset"]
        };

    function di(t, e, i) {
        void 0 === i && (i = !1);
        var n, s, o = me(e),
            r = me(e) && function(t) {
                var e = t.getBoundingClientRect(),
                    i = we(e.width) / t.offsetWidth || 1,
                    n = we(e.height) / t.offsetHeight || 1;
                return 1 !== i || 1 !== n
            }(e),
            a = Le(e),
            l = Te(t, r, i),
            c = {
                scrollLeft: 0,
                scrollTop: 0
            },
            h = {
                x: 0,
                y: 0
            };
        return (o || !o && !i) && (("body" !== ue(e) || Ue(a)) && (c = (n = e) !== fe(n) && me(n) ? {
            scrollLeft: (s = n).scrollLeft,
            scrollTop: s.scrollTop
        } : Xe(n)), me(e) ? ((h = Te(e, !0)).x += e.clientLeft, h.y += e.clientTop) : a && (h.x = Ye(a))), {
            x: l.left + c.scrollLeft - h.x,
            y: l.top + c.scrollTop - h.y,
            width: l.width,
            height: l.height
        }
    }

    function ui(t) {
        var e = new Map,
            i = new Set,
            n = [];

        function s(t) {
            i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function(t) {
                if (!i.has(t)) {
                    var n = e.get(t);
                    n && s(n)
                }
            })), n.push(t)
        }
        return t.forEach((function(t) {
            e.set(t.name, t)
        })), t.forEach((function(t) {
            i.has(t.name) || s(t)
        })), n
    }
    var fi = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };

    function pi() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        return !e.some((function(t) {
            return !(t && "function" == typeof t.getBoundingClientRect)
        }))
    }

    function mi(t) {
        void 0 === t && (t = {});
        var e = t,
            i = e.defaultModifiers,
            n = void 0 === i ? [] : i,
            s = e.defaultOptions,
            o = void 0 === s ? fi : s;
        return function(t, e, i) {
            void 0 === i && (i = o);
            var s, r, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, fi, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: e
                    },
                    attributes: {},
                    styles: {}
                },
                l = [],
                c = !1,
                h = {
                    state: a,
                    setOptions: function(i) {
                        var s = "function" == typeof i ? i(a.options) : i;
                        d(), a.options = Object.assign({}, o, a.options, s), a.scrollParents = {
                            reference: pe(t) ? Je(t) : t.contextElement ? Je(t.contextElement) : [],
                            popper: Je(e)
                        };
                        var r, c, u = function(t) {
                            var e = ui(t);
                            return de.reduce((function(t, i) {
                                return t.concat(e.filter((function(t) {
                                    return t.phase === i
                                })))
                            }), [])
                        }((r = [].concat(n, a.options.modifiers), c = r.reduce((function(t, e) {
                            var i = t[e.name];
                            return t[e.name] = i ? Object.assign({}, i, e, {
                                options: Object.assign({}, i.options, e.options),
                                data: Object.assign({}, i.data, e.data)
                            }) : e, t
                        }), {}), Object.keys(c).map((function(t) {
                            return c[t]
                        }))));
                        return a.orderedModifiers = u.filter((function(t) {
                            return t.enabled
                        })), a.orderedModifiers.forEach((function(t) {
                            var e = t.name,
                                i = t.options,
                                n = void 0 === i ? {} : i,
                                s = t.effect;
                            if ("function" == typeof s) {
                                var o = s({
                                    state: a,
                                    name: e,
                                    instance: h,
                                    options: n
                                });
                                l.push(o || function() {})
                            }
                        })), h.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var t = a.elements,
                                e = t.reference,
                                i = t.popper;
                            if (pi(e, i)) {
                                a.rects = {
                                    reference: di(e, $e(i), "fixed" === a.options.strategy),
                                    popper: Ce(i)
                                }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function(t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data)
                                }));
                                for (var n = 0; n < a.orderedModifiers.length; n++)
                                    if (!0 !== a.reset) {
                                        var s = a.orderedModifiers[n],
                                            o = s.fn,
                                            r = s.options,
                                            l = void 0 === r ? {} : r,
                                            d = s.name;
                                        "function" == typeof o && (a = o({
                                            state: a,
                                            options: l,
                                            name: d,
                                            instance: h
                                        }) || a)
                                    } else a.reset = !1, n = -1
                            }
                        }
                    },
                    update: (s = function() {
                        return new Promise((function(t) {
                            h.forceUpdate(), t(a)
                        }))
                    }, function() {
                        return r || (r = new Promise((function(t) {
                            Promise.resolve().then((function() {
                                r = void 0, t(s())
                            }))
                        }))), r
                    }),
                    destroy: function() {
                        d(), c = !0
                    }
                };
            if (!pi(t, e)) return h;

            function d() {
                l.forEach((function(t) {
                    return t()
                })), l = []
            }
            return h.setOptions(i).then((function(t) {
                !c && i.onFirstUpdate && i.onFirstUpdate(t)
            })), h
        }
    }
    var gi = mi(),
        _i = mi({
            defaultModifiers: [Re, ci, Be, _e]
        }),
        bi = mi({
            defaultModifiers: [Re, ci, Be, _e, li, si, hi, Me, ai]
        });
    const vi = Object.freeze(Object.defineProperty({
            __proto__: null,
            afterMain: ae,
            afterRead: se,
            afterWrite: he,
            applyStyles: _e,
            arrow: Me,
            auto: Kt,
            basePlacements: Qt,
            beforeMain: oe,
            beforeRead: ie,
            beforeWrite: le,
            bottom: Rt,
            clippingParents: Ut,
            computeStyles: Be,
            createPopper: bi,
            createPopperBase: gi,
            createPopperLite: _i,
            detectOverflow: ii,
            end: Yt,
            eventListeners: Re,
            flip: si,
            hide: ai,
            left: Vt,
            main: re,
            modifierPhases: de,
            offset: li,
            placements: ee,
            popper: Jt,
            popperGenerator: mi,
            popperOffsets: ci,
            preventOverflow: hi,
            read: ne,
            reference: Zt,
            right: qt,
            start: Xt,
            top: zt,
            variationPlacements: te,
            viewport: Gt,
            write: ce
        }, Symbol.toStringTag, {
            value: "Module"
        })),
        yi = "dropdown",
        wi = ".bs.dropdown",
        Ai = ".data-api",
        Ei = "ArrowUp",
        Ti = "ArrowDown",
        Ci = `hide${wi}`,
        Oi = `hidden${wi}`,
        xi = `show${wi}`,
        ki = `shown${wi}`,
        Li = `click${wi}${Ai}`,
        Si = `keydown${wi}${Ai}`,
        Di = `keyup${wi}${Ai}`,
        $i = "show",
        Ii = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        Ni = `${Ii}.${$i}`,
        Pi = ".dropdown-menu",
        ji = p() ? "top-end" : "top-start",
        Mi = p() ? "top-start" : "top-end",
        Fi = p() ? "bottom-end" : "bottom-start",
        Hi = p() ? "bottom-start" : "bottom-end",
        Wi = p() ? "left-start" : "right-start",
        Bi = p() ? "right-start" : "left-start",
        zi = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        },
        Ri = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
    class qi extends W {
        constructor(t, e) {
            super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = z.next(this._element, Pi)[0] || z.prev(this._element, Pi)[0] || z.findOne(Pi, this._parent), this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return zi
        }
        static get DefaultType() {
            return Ri
        }
        static get NAME() {
            return yi
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (l(this._element) || this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            if (!N.trigger(this._element, xi, t).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const t of [].concat(...document.body.children)) N.on(t, "mouseover", h);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add($i), this._element.classList.add($i), N.trigger(this._element, ki, t)
            }
        }
        hide() {
            if (l(this._element) || !this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            this._completeHide(t)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _completeHide(t) {
            if (!N.trigger(this._element, Ci, t).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const t of [].concat(...document.body.children)) N.off(t, "mouseover", h);
                this._popper && this._popper.destroy(), this._menu.classList.remove($i), this._element.classList.remove($i), this._element.setAttribute("aria-expanded", "false"), F.removeDataAttribute(this._menu, "popper"), N.trigger(this._element, Oi, t)
            }
        }
        _getConfig(t) {
            if ("object" == typeof(t = super._getConfig(t)).reference && !o(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${yi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t
        }
        _createPopper() {
            if (void 0 === vi) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let t = this._element;
            "parent" === this._config.reference ? t = this._parent : o(this._config.reference) ? t = r(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
            const e = this._getPopperConfig();
            this._popper = bi(t, this._menu, e)
        }
        _isShown() {
            return this._menu.classList.contains($i)
        }
        _getPlacement() {
            const t = this._parent;
            if (t.classList.contains("dropend")) return Wi;
            if (t.classList.contains("dropstart")) return Bi;
            if (t.classList.contains("dropup-center")) return "top";
            if (t.classList.contains("dropdown-center")) return "bottom";
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? Mi : ji : e ? Hi : Fi
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (F.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {
                ...t,
                ...g(this._config.popperConfig, [t])
            }
        }
        _selectMenuItem({
            key: t,
            target: e
        }) {
            const i = z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t => a(t)));
            i.length && b(i, e, t === Ti, !i.includes(e)).focus()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = qi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
        static clearMenus(t) {
            if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
            const e = z.find(Ni);
            for (const i of e) {
                const e = qi.getInstance(i);
                if (!e || !1 === e._config.autoClose) continue;
                const n = t.composedPath(),
                    s = n.includes(e._menu);
                if (n.includes(e._element) || "inside" === e._config.autoClose && !s || "outside" === e._config.autoClose && s) continue;
                if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                const o = {
                    relatedTarget: e._element
                };
                "click" === t.type && (o.clickEvent = t), e._completeHide(o)
            }
        }
        static dataApiKeydownHandler(t) {
            const e = /input|textarea/i.test(t.target.tagName),
                i = "Escape" === t.key,
                n = [Ei, Ti].includes(t.key);
            if (!n && !i) return;
            if (e && !i) return;
            t.preventDefault();
            const s = this.matches(Ii) ? this : z.prev(this, Ii)[0] || z.next(this, Ii)[0] || z.findOne(Ii, t.delegateTarget.parentNode),
                o = qi.getOrCreateInstance(s);
            if (n) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
            o._isShown() && (t.stopPropagation(), o.hide(), s.focus())
        }
    }
    N.on(document, Si, Ii, qi.dataApiKeydownHandler), N.on(document, Si, Pi, qi.dataApiKeydownHandler), N.on(document, Li, qi.clearMenus), N.on(document, Di, qi.clearMenus), N.on(document, Li, Ii, (function(t) {
        t.preventDefault(), qi.getOrCreateInstance(this).toggle()
    })), m(qi);
    const Vi = "backdrop",
        Ki = "show",
        Qi = `mousedown.bs.${Vi}`,
        Xi = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        },
        Yi = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
    class Ui extends H {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }
        static get Default() {
            return Xi
        }
        static get DefaultType() {
            return Yi
        }
        static get NAME() {
            return Vi
        }
        show(t) {
            if (!this._config.isVisible) return void g(t);
            this._append();
            const e = this._getElement();
            this._config.isAnimated && d(e), e.classList.add(Ki), this._emulateAnimation((() => {
                g(t)
            }))
        }
        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove(Ki), this._emulateAnimation((() => {
                this.dispose(), g(t)
            }))) : g(t)
        }
        dispose() {
            this._isAppended && (N.off(this._element, Qi), this._element.remove(), this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }
        _configAfterMerge(t) {
            return t.rootElement = r(t.rootElement), t
        }
        _append() {
            if (this._isAppended) return;
            const t = this._getElement();
            this._config.rootElement.append(t), N.on(t, Qi, (() => {
                g(this._config.clickCallback)
            })), this._isAppended = !0
        }
        _emulateAnimation(t) {
            _(t, this._getElement(), this._config.isAnimated)
        }
    }
    const Gi = ".bs.focustrap",
        Ji = `focusin${Gi}`,
        Zi = `keydown.tab${Gi}`,
        tn = "backward",
        en = {
            autofocus: !0,
            trapElement: null
        },
        nn = {
            autofocus: "boolean",
            trapElement: "element"
        };
    class sn extends H {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
        }
        static get Default() {
            return en
        }
        static get DefaultType() {
            return nn
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), N.off(document, Gi), N.on(document, Ji, (t => this._handleFocusin(t))), N.on(document, Zi, (t => this._handleKeydown(t))), this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1, N.off(document, Gi))
        }
        _handleFocusin(t) {
            const {
                trapElement: e
            } = this._config;
            if (t.target === document || t.target === e || e.contains(t.target)) return;
            const i = z.focusableChildren(e);
            0 === i.length ? e.focus() : this._lastTabNavDirection === tn ? i[i.length - 1].focus() : i[0].focus()
        }
        _handleKeydown(t) {
            "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? tn : "forward")
        }
    }
    const on = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        rn = ".sticky-top",
        an = "padding-right",
        ln = "margin-right";
    class cn {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, an, (e => e + t)), this._setElementAttributes(on, an, (e => e + t)), this._setElementAttributes(rn, ln, (e => e - t))
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, an), this._resetElementAttributes(on, an), this._resetElementAttributes(rn, ln)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(t, e, i) {
            const n = this.getWidth();
            this._applyManipulationCallback(t, (t => {
                if (t !== this._element && window.innerWidth > t.clientWidth + n) return;
                this._saveInitialAttribute(t, e);
                const s = window.getComputedStyle(t).getPropertyValue(e);
                t.style.setProperty(e, `${i(Number.parseFloat(s))}px`)
            }))
        }
        _saveInitialAttribute(t, e) {
            const i = t.style.getPropertyValue(e);
            i && F.setDataAttribute(t, e, i)
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t => {
                const i = F.getDataAttribute(t, e);
                null !== i ? (F.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e)
            }))
        }
        _applyManipulationCallback(t, e) {
            if (o(t)) e(t);
            else
                for (const i of z.find(t, this._element)) e(i)
        }
    }
    const hn = ".bs.modal",
        dn = `hide${hn}`,
        un = `hidePrevented${hn}`,
        fn = `hidden${hn}`,
        pn = `show${hn}`,
        mn = `shown${hn}`,
        gn = `resize${hn}`,
        _n = `click.dismiss${hn}`,
        bn = `mousedown.dismiss${hn}`,
        vn = `keydown.dismiss${hn}`,
        yn = `click${hn}.data-api`,
        wn = "modal-open",
        An = "show",
        En = "modal-static",
        Tn = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        },
        Cn = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
    class On extends W {
        constructor(t, e) {
            super(t, e), this._dialog = z.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new cn, this._addEventListeners()
        }
        static get Default() {
            return Tn
        }
        static get DefaultType() {
            return Cn
        }
        static get NAME() {
            return "modal"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || this._isTransitioning || N.trigger(this._element, pn, {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(wn), this._adjustDialog(), this._backdrop.show((() => this._showElement(t))))
        }
        hide() {
            this._isShown && !this._isTransitioning && (N.trigger(this._element, dn).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(An), this._queueCallback((() => this._hideModal()), this._element, this._isAnimated())))
        }
        dispose() {
            N.off(window, hn), N.off(this._dialog, hn), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new Ui({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new sn({
                trapElement: this._element
            })
        }
        _showElement(t) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const e = z.findOne(".modal-body", this._dialog);
            e && (e.scrollTop = 0), d(this._element), this._element.classList.add(An), this._queueCallback((() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, N.trigger(this._element, mn, {
                    relatedTarget: t
                })
            }), this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            N.on(this._element, vn, (t => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
            })), N.on(window, gn, (() => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            })), N.on(this._element, bn, (t => {
                N.one(this._element, _n, (e => {
                    this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                }))
            }))
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
                document.body.classList.remove(wn), this._resetAdjustments(), this._scrollBar.reset(), N.trigger(this._element, fn)
            }))
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (N.trigger(this._element, un).defaultPrevented) return;
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._element.style.overflowY;
            "hidden" === e || this._element.classList.contains(En) || (t || (this._element.style.overflowY = "hidden"), this._element.classList.add(En), this._queueCallback((() => {
                this._element.classList.remove(En), this._queueCallback((() => {
                    this._element.style.overflowY = e
                }), this._dialog)
            }), this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            if (i && !t) {
                const t = p() ? "paddingLeft" : "paddingRight";
                this._element.style[t] = `${e}px`
            }
            if (!i && t) {
                const t = p() ? "paddingRight" : "paddingLeft";
                this._element.style[t] = `${e}px`
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, e) {
            return this.each((function() {
                const i = On.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e)
                }
            }))
        }
    }
    N.on(document, yn, '[data-bs-toggle="modal"]', (function(t) {
        const e = z.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), N.one(e, pn, (t => {
            t.defaultPrevented || N.one(e, fn, (() => {
                a(this) && this.focus()
            }))
        }));
        const i = z.findOne(".modal.show");
        i && On.getInstance(i).hide(), On.getOrCreateInstance(e).toggle(this)
    })), R(On), m(On);
    const xn = ".bs.offcanvas",
        kn = ".data-api",
        Ln = `load${xn}${kn}`,
        Sn = "show",
        Dn = "showing",
        $n = "hiding",
        In = ".offcanvas.show",
        Nn = `show${xn}`,
        Pn = `shown${xn}`,
        jn = `hide${xn}`,
        Mn = `hidePrevented${xn}`,
        Fn = `hidden${xn}`,
        Hn = `resize${xn}`,
        Wn = `click${xn}${kn}`,
        Bn = `keydown.dismiss${xn}`,
        zn = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        Rn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class qn extends W {
        constructor(t, e) {
            super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }
        static get Default() {
            return zn
        }
        static get DefaultType() {
            return Rn
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || N.trigger(this._element, Nn, {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new cn).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Dn), this._queueCallback((() => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(Sn), this._element.classList.remove(Dn), N.trigger(this._element, Pn, {
                    relatedTarget: t
                })
            }), this._element, !0))
        }
        hide() {
            this._isShown && (N.trigger(this._element, jn).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add($n), this._backdrop.hide(), this._queueCallback((() => {
                this._element.classList.remove(Sn, $n), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new cn).reset(), N.trigger(this._element, Fn)
            }), this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        _initializeBackDrop() {
            const t = Boolean(this._config.backdrop);
            return new Ui({
                className: "offcanvas-backdrop",
                isVisible: t,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: t ? () => {
                    "static" !== this._config.backdrop ? this.hide() : N.trigger(this._element, Mn)
                } : null
            })
        }
        _initializeFocusTrap() {
            return new sn({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            N.on(this._element, Bn, (t => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : N.trigger(this._element, Mn))
            }))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = qn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    N.on(document, Wn, '[data-bs-toggle="offcanvas"]', (function(t) {
        const e = z.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this)) return;
        N.one(e, Fn, (() => {
            a(this) && this.focus()
        }));
        const i = z.findOne(In);
        i && i !== e && qn.getInstance(i).hide(), qn.getOrCreateInstance(e).toggle(this)
    })), N.on(window, Ln, (() => {
        for (const t of z.find(In)) qn.getOrCreateInstance(t).show()
    })), N.on(window, Hn, (() => {
        for (const t of z.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && qn.getOrCreateInstance(t).hide()
    })), R(qn), m(qn);
    const Vn = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            dd: [],
            div: [],
            dl: [],
            dt: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        Kn = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        Qn = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        Xn = (t, e) => {
            const i = t.nodeName.toLowerCase();
            return e.includes(i) ? !Kn.has(i) || Boolean(Qn.test(t.nodeValue)) : e.filter((t => t instanceof RegExp)).some((t => t.test(i)))
        },
        Yn = {
            allowList: Vn,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        },
        Un = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        },
        Gn = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
    class Jn extends H {
        constructor(t) {
            super(), this._config = this._getConfig(t)
        }
        static get Default() {
            return Yn
        }
        static get DefaultType() {
            return Un
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map((t => this._resolvePossibleFunction(t))).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(t) {
            return this._checkContent(t), this._config.content = {
                ...this._config.content,
                ...t
            }, this
        }
        toHtml() {
            const t = document.createElement("div");
            t.innerHTML = this._maybeSanitize(this._config.template);
            for (const [e, i] of Object.entries(this._config.content)) this._setContent(t, i, e);
            const e = t.children[0],
                i = this._resolvePossibleFunction(this._config.extraClass);
            return i && e.classList.add(...i.split(" ")), e
        }
        _typeCheckConfig(t) {
            super._typeCheckConfig(t), this._checkContent(t.content)
        }
        _checkContent(t) {
            for (const [e, i] of Object.entries(t)) super._typeCheckConfig({
                selector: e,
                entry: i
            }, Gn)
        }
        _setContent(t, e, i) {
            const n = z.findOne(i, t);
            n && ((e = this._resolvePossibleFunction(e)) ? o(e) ? this._putElementInTemplate(r(e), n) : this._config.html ? n.innerHTML = this._maybeSanitize(e) : n.textContent = e : n.remove())
        }
        _maybeSanitize(t) {
            return this._config.sanitize ? function(t, e, i) {
                if (!t.length) return t;
                if (i && "function" == typeof i) return i(t);
                const n = (new window.DOMParser).parseFromString(t, "text/html"),
                    s = [].concat(...n.body.querySelectorAll("*"));
                for (const t of s) {
                    const i = t.nodeName.toLowerCase();
                    if (!Object.keys(e).includes(i)) {
                        t.remove();
                        continue
                    }
                    const n = [].concat(...t.attributes),
                        s = [].concat(e["*"] || [], e[i] || []);
                    for (const e of n) Xn(e, s) || t.removeAttribute(e.nodeName)
                }
                return n.body.innerHTML
            }(t, this._config.allowList, this._config.sanitizeFn) : t
        }
        _resolvePossibleFunction(t) {
            return g(t, [this])
        }
        _putElementInTemplate(t, e) {
            if (this._config.html) return e.innerHTML = "", void e.append(t);
            e.textContent = t.textContent
        }
    }
    const Zn = new Set(["sanitize", "allowList", "sanitizeFn"]),
        ts = "fade",
        es = "show",
        is = ".modal",
        ns = "hide.bs.modal",
        ss = "hover",
        os = "focus",
        rs = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left"
        },
        as = {
            allowList: Vn,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        },
        ls = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
    class cs extends W {
        constructor(t, e) {
            if (void 0 === vi) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() {
            return as
        }
        static get DefaultType() {
            return ls
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout), N.off(this._element.closest(is), ns, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const t = N.trigger(this._element, this.constructor.eventName("show")),
                e = (c(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (t.defaultPrevented || !e) return;
            this._disposePopper();
            const i = this._getTipElement();
            this._element.setAttribute("aria-describedby", i.getAttribute("id"));
            const {
                container: n
            } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i), N.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i), i.classList.add(es), "ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) N.on(t, "mouseover", h);
            this._queueCallback((() => {
                N.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
            }), this.tip, this._isAnimated())
        }
        hide() {
            if (this._isShown() && !N.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                if (this._getTipElement().classList.remove(es), "ontouchstart" in document.documentElement)
                    for (const t of [].concat(...document.body.children)) N.off(t, "mouseover", h);
                this._activeTrigger.click = !1, this._activeTrigger[os] = !1, this._activeTrigger[ss] = !1, this._isHovered = null, this._queueCallback((() => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), N.trigger(this._element, this.constructor.eventName("hidden")))
                }), this.tip, this._isAnimated())
            }
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        }
        _createTipElement(t) {
            const e = this._getTemplateFactory(t).toHtml();
            if (!e) return null;
            e.classList.remove(ts, es), e.classList.add(`bs-${this.constructor.NAME}-auto`);
            const i = (t => {
                do {
                    t += Math.floor(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            })(this.constructor.NAME).toString();
            return e.setAttribute("id", i), this._isAnimated() && e.classList.add(ts), e
        }
        setContent(t) {
            this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
        }
        _getTemplateFactory(t) {
            return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Jn({
                ...this._config,
                content: t,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }), this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(t) {
            return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(ts)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(es)
        }
        _createPopper(t) {
            const e = g(this._config.placement, [this, t, this._element]),
                i = rs[e.toUpperCase()];
            return bi(this._element, t, this._getPopperConfig(i))
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _resolvePossibleFunction(t) {
            return g(t, [this._element])
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: t => {
                        this._getTipElement().setAttribute("data-popper-placement", t.state.placement)
                    }
                }]
            };
            return {
                ...e,
                ...g(this._config.popperConfig, [e])
            }
        }
        _setListeners() {
            const t = this._config.trigger.split(" ");
            for (const e of t)
                if ("click" === e) N.on(this._element, this.constructor.eventName("click"), this._config.selector, (t => {
                    this._initializeOnDelegatedTarget(t).toggle()
                }));
                else if ("manual" !== e) {
                const t = e === ss ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    i = e === ss ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                N.on(this._element, t, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusin" === t.type ? os : ss] = !0, e._enter()
                })), N.on(this._element, i, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusout" === t.type ? os : ss] = e._element.contains(t.relatedTarget), e._leave()
                }))
            }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }, N.on(this._element.closest(is), ns, this._hideModalHandler)
        }
        _fixTitle() {
            const t = this._element.getAttribute("title");
            t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout((() => {
                this._isHovered && this.show()
            }), this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout((() => {
                this._isHovered || this.hide()
            }), this._config.delay.hide))
        }
        _setTimeout(t, e) {
            clearTimeout(this._timeout), this._timeout = setTimeout(t, e)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(t) {
            const e = F.getDataAttributes(this._element);
            for (const t of Object.keys(e)) Zn.has(t) && delete e[t];
            return t = {
                ...e,
                ..."object" == typeof t && t ? t : {}
            }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t.container = !1 === t.container ? document.body : r(t.container), "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), t
        }
        _getDelegateConfig() {
            const t = {};
            for (const [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i);
            return t.selector = !1, t.trigger = "manual", t
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = cs.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    m(cs);
    const hs = {
            ...cs.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        },
        ds = {
            ...cs.DefaultType,
            content: "(null|string|element|function)"
        };
    class us extends cs {
        static get Default() {
            return hs
        }
        static get DefaultType() {
            return ds
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = us.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    m(us);
    const fs = ".bs.scrollspy",
        ps = `activate${fs}`,
        ms = `click${fs}`,
        gs = `load${fs}.data-api`,
        _s = "active",
        bs = "[href]",
        vs = ".nav-link",
        ys = `${vs}, .nav-item > ${vs}, .list-group-item`,
        ws = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        },
        As = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
    class Es extends W {
        constructor(t, e) {
            super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            }, this.refresh()
        }
        static get Default() {
            return ws
        }
        static get DefaultType() {
            return As
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const t of this._observableSections.values()) this._observer.observe(t)
        }
        dispose() {
            this._observer.disconnect(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.target = r(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t => Number.parseFloat(t)))), t
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (N.off(this._config.target, ms), N.on(this._config.target, ms, bs, (t => {
                const e = this._observableSections.get(t.target.hash);
                if (e) {
                    t.preventDefault();
                    const i = this._rootElement || window,
                        n = e.offsetTop - this._element.offsetTop;
                    if (i.scrollTo) return void i.scrollTo({
                        top: n,
                        behavior: "smooth"
                    });
                    i.scrollTop = n
                }
            })))
        }
        _getNewObserver() {
            const t = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver((t => this._observerCallback(t)), t)
        }
        _observerCallback(t) {
            const e = t => this._targetLinks.get(`#${t.target.id}`),
                i = t => {
                    this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t))
                },
                n = (this._rootElement || document.documentElement).scrollTop,
                s = n >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = n;
            for (const o of t) {
                if (!o.isIntersecting) {
                    this._activeTarget = null, this._clearActiveClass(e(o));
                    continue
                }
                const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (s && t) {
                    if (i(o), !n) return
                } else s || t || i(o)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const t = z.find(bs, this._config.target);
            for (const e of t) {
                if (!e.hash || l(e)) continue;
                const t = z.findOne(decodeURI(e.hash), this._element);
                a(t) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, t))
            }
        }
        _process(t) {
            this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(_s), this._activateParents(t), N.trigger(this._element, ps, {
                relatedTarget: t
            }))
        }
        _activateParents(t) {
            if (t.classList.contains("dropdown-item")) z.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(_s);
            else
                for (const e of z.parents(t, ".nav, .list-group"))
                    for (const t of z.prev(e, ys)) t.classList.add(_s)
        }
        _clearActiveClass(t) {
            t.classList.remove(_s);
            const e = z.find(`${bs}.${_s}`, t);
            for (const t of e) t.classList.remove(_s)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Es.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    N.on(window, gs, (() => {
        for (const t of z.find('[data-bs-spy="scroll"]')) Es.getOrCreateInstance(t)
    })), m(Es);
    const Ts = ".bs.tab",
        Cs = `hide${Ts}`,
        Os = `hidden${Ts}`,
        xs = `show${Ts}`,
        ks = `shown${Ts}`,
        Ls = `click${Ts}`,
        Ss = `keydown${Ts}`,
        Ds = `load${Ts}`,
        $s = "ArrowLeft",
        Is = "ArrowRight",
        Ns = "ArrowUp",
        Ps = "ArrowDown",
        js = "Home",
        Ms = "End",
        Fs = "active",
        Hs = "fade",
        Ws = "show",
        Bs = ".dropdown-toggle",
        zs = `:not(${Bs})`,
        Rs = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        qs = `.nav-link${zs}, .list-group-item${zs}, [role="tab"]${zs}, ${Rs}`,
        Vs = `.${Fs}[data-bs-toggle="tab"], .${Fs}[data-bs-toggle="pill"], .${Fs}[data-bs-toggle="list"]`;
    class Ks extends W {
        constructor(t) {
            super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), N.on(this._element, Ss, (t => this._keydown(t))))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const t = this._element;
            if (this._elemIsActive(t)) return;
            const e = this._getActiveElem(),
                i = e ? N.trigger(e, Cs, {
                    relatedTarget: t
                }) : null;
            N.trigger(t, xs, {
                relatedTarget: e
            }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e))
        }
        _activate(t, e) {
            t && (t.classList.add(Fs), this._activate(z.getElementFromSelector(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), N.trigger(t, ks, {
                    relatedTarget: e
                })) : t.classList.add(Ws)
            }), t, t.classList.contains(Hs)))
        }
        _deactivate(t, e) {
            t && (t.classList.remove(Fs), t.blur(), this._deactivate(z.getElementFromSelector(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), N.trigger(t, Os, {
                    relatedTarget: e
                })) : t.classList.remove(Ws)
            }), t, t.classList.contains(Hs)))
        }
        _keydown(t) {
            if (![$s, Is, Ns, Ps, js, Ms].includes(t.key)) return;
            t.stopPropagation(), t.preventDefault();
            const e = this._getChildren().filter((t => !l(t)));
            let i;
            if ([js, Ms].includes(t.key)) i = e[t.key === js ? 0 : e.length - 1];
            else {
                const n = [Is, Ps].includes(t.key);
                i = b(e, t.target, n, !0)
            }
            i && (i.focus({
                preventScroll: !0
            }), Ks.getOrCreateInstance(i).show())
        }
        _getChildren() {
            return z.find(qs, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find((t => this._elemIsActive(t))) || null
        }
        _setInitialAttributes(t, e) {
            this._setAttributeIfNotExists(t, "role", "tablist");
            for (const t of e) this._setInitialAttributesOnChild(t)
        }
        _setInitialAttributesOnChild(t) {
            t = this._getInnerElement(t);
            const e = this._elemIsActive(t),
                i = this._getOuterElement(t);
            t.setAttribute("aria-selected", e), i !== t && this._setAttributeIfNotExists(i, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
        }
        _setInitialAttributesOnTargetPanel(t) {
            const e = z.getElementFromSelector(t);
            e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`))
        }
        _toggleDropDown(t, e) {
            const i = this._getOuterElement(t);
            if (!i.classList.contains("dropdown")) return;
            const n = (t, n) => {
                const s = z.findOne(t, i);
                s && s.classList.toggle(n, e)
            };
            n(Bs, Fs), n(".dropdown-menu", Ws), i.setAttribute("aria-expanded", e)
        }
        _setAttributeIfNotExists(t, e, i) {
            t.hasAttribute(e) || t.setAttribute(e, i)
        }
        _elemIsActive(t) {
            return t.classList.contains(Fs)
        }
        _getInnerElement(t) {
            return t.matches(qs) ? t : z.findOne(qs, t)
        }
        _getOuterElement(t) {
            return t.closest(".nav-item, .list-group-item") || t
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Ks.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    N.on(document, Ls, Rs, (function(t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), l(this) || Ks.getOrCreateInstance(this).show()
    })), N.on(window, Ds, (() => {
        for (const t of z.find(Vs)) Ks.getOrCreateInstance(t)
    })), m(Ks);
    const Qs = ".bs.toast",
        Xs = `mouseover${Qs}`,
        Ys = `mouseout${Qs}`,
        Us = `focusin${Qs}`,
        Gs = `focusout${Qs}`,
        Js = `hide${Qs}`,
        Zs = `hidden${Qs}`,
        to = `show${Qs}`,
        eo = `shown${Qs}`,
        io = "hide",
        no = "show",
        so = "showing",
        oo = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        ro = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class ao extends W {
        constructor(t, e) {
            super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get Default() {
            return ro
        }
        static get DefaultType() {
            return oo
        }
        static get NAME() {
            return "toast"
        }
        show() {
            N.trigger(this._element, to).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(io), d(this._element), this._element.classList.add(no, so), this._queueCallback((() => {
                this._element.classList.remove(so), N.trigger(this._element, eo), this._maybeScheduleHide()
            }), this._element, this._config.animation))
        }
        hide() {
            this.isShown() && (N.trigger(this._element, Js).defaultPrevented || (this._element.classList.add(so), this._queueCallback((() => {
                this._element.classList.add(io), this._element.classList.remove(so, no), N.trigger(this._element, Zs)
            }), this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(no), super.dispose()
        }
        isShown() {
            return this._element.classList.contains(no)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
                this.hide()
            }), this._config.delay)))
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide()
        }
        _setListeners() {
            N.on(this._element, Xs, (t => this._onInteraction(t, !0))), N.on(this._element, Ys, (t => this._onInteraction(t, !1))), N.on(this._element, Us, (t => this._onInteraction(t, !0))), N.on(this._element, Gs, (t => this._onInteraction(t, !1)))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = ao.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    return R(ao), m(ao), {
        Alert: Q,
        Button: Y,
        Carousel: xt,
        Collapse: Bt,
        Dropdown: qi,
        Modal: On,
        Offcanvas: qn,
        Popover: us,
        ScrollSpy: Es,
        Tab: Ks,
        Toast: ao,
        Tooltip: cs
    }
}));
//# sourceMappingURL=bootstrap.bundle.min.js.mapjQuery(function($) {
    // =================================================
    //  :: Anchor Link Smooth scroll ::
    // -------------------------------------------------
    var headerheight = jQuery('#masthead').height();
    headerheight = headerheight + 30;
    if (jQuery(window).width() > 992) {
        //var headerheight = headerheight - 23;
    }

    jQuery('a[href*="#"]:not([href="#"])').click(function() {
        var target = jQuery(this.hash);
        jQuery('html,body').stop().animate({
            scrollTop: target.offset().top - headerheight
        }, 'linear');

        if (jQuery(window).width() < 993) {

            if (jQuery('#site-navigation').hasClass('toggled')) {
                jQuery('.menu-toggle').click();
            }

        }
    });
    if (location.hash) {
        var id = jQuery(location.hash);
    }
    jQuery(window).load(function() {
        if (location.hash) {
            jQuery('html,body').animate({
                scrollTop: id.offset().top - headerheight
            }, 'linear')
        };
    });





    // =================================================
    //  :: footerPopup Toggle ::
    // -------------------------------------------------
    function footerPopup() {

        $('.footer-popup').click(function() {
            $('.footer-popup-content-outer').toggleClass('active');
        });

        $('.footer-popup-content-outer svg').click(function() {
            $('.footer-popup-content-outer').toggleClass('active');
        });


    }



    // =================================================
    //  :: Sticky Footer ::
    // -------------------------------------------------
    function stickyFooter() {
        if ($(window).width() < 992) {
            if ($('.footer-popup').length) {
                var scrollTop = jQuery(window).scrollTop();
                var foldsection = $('#main > .container')
                    .children(':not(style):not(script):not(noscript)')
                    .filter(':visible')
                    .first();
                var foldsection = foldsection.offset().top + foldsection.height();

                if (foldsection < window.innerHeight) {
                    foldsection = window.innerHeight;
                }

                var foldsection = foldsection / 2;


                if (scrollTop > foldsection) {
                    $('.footer-popup').addClass('display');
                    if ($('.masthead-top').length) {
                        $('.masthead-top').slideUp(400);
                    }
                } else {
                    $('.footer-popup').removeClass('display');
                    if ($('.masthead-top').length) {
                        $('.masthead-top').slideDown(400);
                    }

                }

            }
        }

    }


    // =================================================
    //  :: responsiveYoutube ::
    // -------------------------------------------------


    function responsiveYouTube() {

        $('iframe.custom-yt-embed').each(function() {
            var url = jQuery(this).attr("src");
            var iod = url.substring(0, url.indexOf('?'));


            if (iod) {
                $(this).attr("src", iod + '?autohide=1&modestbranding=1&rel=0&showinfo=0&cc_load_policy=1&theme=light');
            } else {
                $(this).attr("src", url + '?autohide=1&modestbranding=1&rel=0&showinfo=0&cc_load_policy=1&theme=light');
            }
            $(this).wrapAll('<div class="embed-container"></div>');


        });
    }

    function stickyButton() {
        if ($('.sticky-anchor').length) {
            if ($(window).width() < 992) {
                var scrollTop = jQuery(window).scrollTop();
                var anchor = $('.sticky-anchor');
                var button = anchor.next();
                var buttonOffset = button.outerHeight() + (anchor.offset().top - $(window).height());
                buttonOffset = buttonOffset + 15;


                if (scrollTop > buttonOffset) {
                    button.addClass('sticky');
                    if ($('.masthead-top').length) {
                        $('.masthead-top').slideUp(300);
                    }
                } else {
                    button.removeClass('sticky');
                    $('.masthead-top').slideDown(300);
                }
            }
        }
    }





    jQuery(window).scroll(function() {
        stickyFooter();
        stickyButton();


    });

    jQuery(window).resize(function() {

    });


    jQuery(document).ready(function() {
        footerPopup();
        responsiveYouTube();

    });



    jQuery("#primary-menu").scroll(function() {

        /* jQuery('#site-navigation').toggleClass('scroll-active');*/
        var scrollMenu = jQuery("#primary-menu").scrollTop();

        if (scrollMenu > 10) {
            jQuery('#site-navigation').addClass('scroll-active');
        } else {
            jQuery('#site-navigation').removeClass('scroll-active');
        }

    });



});
/*"use strict";
document.addEventListener("DOMContentLoaded", function () {

   
    if (window.hideYTActivated) return;
    let onYouTubeIframeAPIReadyCallbacks = [];
    for (let playerWrap of document.querySelectorAll(".embed-container")) {
        let playerFrame = playerWrap.querySelector("iframe");
        let tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        let onPlayerStateChange = function (event) {
            if (event.data == YT.PlayerState.ENDED) {
                playerWrap.classList.add("ended");
            } else if (event.data == YT.PlayerState.PAUSED) {
                playerWrap.classList.add("paused");
            } else if (event.data == YT.PlayerState.PLAYING) {
                playerWrap.classList.remove("ended");
                playerWrap.classList.remove("paused");
                playerWrap.classList.remove("start");
            }
        };
        let player;
        onYouTubeIframeAPIReadyCallbacks.push(function () {
            player = new YT.Player(playerFrame, { events: { onStateChange: onPlayerStateChange } });
        });
        playerWrap.addEventListener("click", function () {
            let playerState = player.getPlayerState();
            if (playerState == YT.PlayerState.ENDED) {
                player.seekTo(0);
            } else if (playerState == YT.PlayerState.PAUSED) {
                player.playVideo();
            }
        });
    }
    window.onYouTubeIframeAPIReady = function () {
        for (let callback of onYouTubeIframeAPIReadyCallbacks) {
            callback();
        }
    };
    window.hideYTActivated = true;
});*/

// Testimonial Carousel
jQuery(document).ready(function() {
    jQuery('.flexslider').flexslider({
        animation: "slide",
        animationLoop: true,
        itemWidth: 350,
        itemMargin: 5,
        minItems: 1,
        maxItems: 3,
        controlNav: false
    });
});