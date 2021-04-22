/*
 ! -----------------------------------------------------------------
 ?  student_app.js - patched
 ?  by: @marwuint & @maticbabnik
 ?  find patches by searching for "//!patch"
 ! -----------------------------------------------------------------
*/
//TODO: modify state instead of hardcoding values
//TODO: auto patch? (so updates don't fuck up)


console.log('%cstudent_app.js - patched\n%cby: @marwuint & @maticbabnik','color:red;font-size:16px','color:magenta');


parcelRequire = function (e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }
    f.isParcelRequire = !0, f.Module = function (e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
        e[r] = [function (e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "6JHB": [function (require, module, exports) {
        var e = require("moment");
        module.exports = {
            notifications: {
                unread_messages: 0
            },
            success_msg: {
                msg: "",
                show: !1
            },
            menu: {
                items: [],
                loaded: !1,
                opened: !1
            },
            user: {
                type: "",
                children: [],
                activeChild: null
            },
            dates: {
                food: e().format("YYYY-MM-DD"),
                evaluations_basic: e().format("YYYY-MM-DD")
            },
            childData: {},
            videokonferenca: void 0
        };
    }, {
        "moment": "iROh"
    }],
    "7Dq7": [function (require, module, exports) {
        var n = require("moment");
        module.exports = {
            menu: function (n) {
                return n.menu
            },
            user: function (n) {
                return n.user
            },
            x360: function (n) {
                return n.x360
            },
            child: function (n) {
                return n.user.activeChild
            },
            showBanner: function (n) {
                return !1
            },
            showTrialStartBanner: function (n) {
                return n.user && n.user.activeChild && true
            },
            showActivation: function (n) {
                return !1
            },
            showAppDownload: function (n) {
                return n.user && n.user.activeChild && !true
            },
            activeChildData: function (n) {
                return [n.user.activeChild].map(function (n) {
                    return n ? n.id : null
                }).map(function (e) {
                    return n.childData[e]
                }).map(function (n) {
                    return n || null
                })[0]
            },
            trialRunning: function (n) {
                var e = n.user.activeChild;
                return !!e && e.notifications.filter(function (n) {
                    return "request_plus" === n.type
                }).length > 0
            }
        };
    }, {
        "moment": "iROh"
    }],
    "bHdm": [function (require, module, exports) {
        module.exports = {
            beforeSend: function (e) {
                var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).childID;
                e.setRequestHeader("X-Client-Version", "13"), e.setRequestHeader("X-Client-Platform", "web"), e.setRequestHeader("X-Child-Id", t || $('meta[name="x-child-id"]').attr("content")), e.setRequestHeader("Authorization", $('meta[name="access-token"]').attr("content"))
            }
        };
    }, {}],
    "Ijak": [function (require, module, exports) {
        function e(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a, e
        }
        var t = require("moment"),
            a = require("./getters"),
            n = require("./auth"),
            o = n.beforeSend,
            i = function (e, t) {
                return o(e, {
                    childID: t
                })
            };
        module.exports = {
            setDate: function (e, t) {
                (0, e.commit)("SET_DATE", {
                    date: t.date,
                    type: t.type
                })
            },
            addChildRepository: function (e, t) {
                (0, e.commit)("ADD_CHILD_REPO", {
                    childID: t
                })
            },
            toggleAppMenu: function (e) {
                var t = e.commit,
                    a = e.state,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                t("SET_MENU_DATA", {
                    opened: null !== n ? n : !a.menu.opened
                })
            },
            loadAppMenu: function (e) {
                var t = e.commit;
                //*-----------------------------------------------------------------------
                window.state = e;
                console.log('%cvuex state now available @ window.state','color:#41B883; background-color: #34495E; border-radius:3px; font-weight:bold;') //!patch
                //*-----------------------------------------------------------------------
                e.state;
                t("SET_MENU_DATA", {
                    loaded: "in progress"
                }), $.ajax({
                    url: "/m/client/settings",
                    type: "GET",
                    dataType: "JSON"
                }).done(function (e) {
                    t("SET_MENU_DATA", {
                        items: e.main_menu_items,
                        loaded: !0
                    })
                })
            },
            setUserData: function (e, t) {
                (0, e.commit)("SET_USER_DATA", t)
            },
            loadUserChildren: function (e, t) {
                var a = e.commit;
                $.ajax({
                    url: "/m/children",
                    type: "GET",
                    dataType: "JSON"
                }).done(function (e) {
                    a("SET_USER_DATA", {
                        children: e.items
                    }), t && t()
                })
            },
            loadMeChild: function (e, t) {
                (0, e.commit)("SET_USER_DATA", {
                    children: []
                }), $.ajax({
                    url: "/m/me/child",
                    type: "GET",
                    dataType: "JSON"
                }).done(function (e) {
                    //*-----------------------------------------------------------------------
                    e.plus_enabled = true //!patch
                    //*-----------------------------------------------------------------------                
                    t && t(e)
                })
            },
            setActiveChild: function (e, t) {
                var a = e.commit;
                $.ajaxSetup({
                    beforeSend: function (e) {
                        return i(e, t.id)
                    }
                }), a("SET_USER_DATA", {
                    activeChild: t
                })
            },
            loadNextNewsFeed: function (e, t) {
                var a = e.commit,
                    n = e.state,
                    o = t.childID,
                    d = t.done,
                    _ = n.childData[o].newsfeed,
                    c = _.page;
                if (_.pages.length > 0) {
                    var E = _.pages[_.pages.length - 1];
                    if (E.loaded && E.items.length < 1) return
                }
                a("SET_CHILD_REPO_NEWSFEED_LOADING", {
                    childID: o,
                    page: c,
                    loaded: !1
                }), $.ajax({
                    url: "/m/newsfeed",
                    data: {
                        page: c + 1,
                        limit: 15
                    },
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, o)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_NEWSFEED_LOADING", {
                        childID: o,
                        page: c,
                        loaded: !0
                    })
                }).done(function (e) {
                    var t = e.items;
                    a("ADD_CHILD_REPO_NEWSFEED_PAGE", {
                        childID: o,
                        page: c,
                        items: t
                    }), d && d()
                })
            },
            loadAbsences: function (e, t) {
                var a = e.commit;
                a("SET_CHILD_REPO_ABSENCES_LOADING", {
                    childID: t,
                    loaded: !1
                }), $.ajax({
                    url: "/m/absences",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, t)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_ABSENCES_LOADING", {
                        childID: t,
                        loaded: !0
                    })
                }).done(function (e) {
                    var n = e.items,
                        o = e.summary;
                    a("SET_CHILD_REPO_ABSENCES_ITEMS", {
                        childID: t,
                        items: n,
                        summary: o
                    })
                })
            },
            loadHomework: function (e, t) {
                var a = e.commit;
                a("SET_CHILD_REPO_HOMEWORK_LOADING", {
                    childID: t,
                    loaded: !1
                }), $.ajax({
                    url: "/m/homework",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, t)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_HOMEWORK_LOADING", {
                        childID: t,
                        loaded: !0
                    })
                }).done(function (e) {
                    var n = e.items;
                    a("SET_CHILD_REPO_HOMEWORK_ITEMS", {
                        childID: t,
                        items: n
                    })
                })
            },
            loadNotifications: function (e) {
                var t = e.commit;
                $.ajax({
                    url: "/notifications/ajax_notifications_komunikacija_stevilo_neprebranih",
                    type: "GET",
                    dataType: "JSON"
                }).done(function (e) {
                    t("SET_UNREAD_NOTIFICATIONS_COUNT", e.data)
                })
            },
            loadSubjectHomework: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.subjectID;
                a("SET_CHILD_REPO_SUBJECT_HOMEWORK_LOADING", {
                    childID: n,
                    subjectID: o,
                    loaded: !1
                }), $.ajax({
                    url: "/m/homework/classes/" + o,
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_SUBJECT_HOMEWORK_LOADING", {
                        childID: n,
                        subjectID: o,
                        loaded: !0
                    })
                }).done(function (e) {
                    var t = e.items;
                    a("SET_CHILD_REPO_SUBJECT_HOMEWORK_ITEMS", {
                        childID: n,
                        subjectID: o,
                        items: t
                    })
                })
            },
            toggleSubjectHomeworkDetails: function (t, a) {
                var n, o = t.commit,
                    d = a.childID,
                    _ = a.item;
                void 0 === _.details ? (o("SET_CHILD_REPO_HOMEWORK_DETAILS", {
                    item: _,
                    details: null,
                    open: !0
                }), $.ajax((n = {
                    url: "/m/homework/" + _.id,
                    type: "GET"
                }, e(n, "type", "GET"), e(n, "dataType", "JSON"), e(n, "beforeSend", function (e) {
                    return i(e, d)
                }), n)).done(function (e) {
                    o("SET_CHILD_REPO_HOMEWORK_DETAILS", {
                        item: _,
                        details: e,
                        open: !0
                    })
                })) : o("SET_CHILD_REPO_HOMEWORK_DETAILS", {
                    item: _,
                    open: !_.details.open
                })
            },
            loadGrades: function (e, t) {
                var a = e.commit;
                a("SET_CHILD_REPO_GRADES_LOADING", {
                    childID: t,
                    loaded: !1
                }), $.ajax({
                    url: "/m/grades",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, t)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_GRADES_LOADING", {
                        childID: t,
                        loaded: !0
                    })
                }).done(function (e) {
                    var n = e.items;
                    a("SET_CHILD_REPO_GRADES_ITEMS", {
                        childID: t,
                        items: n
                    })
                })
            },
            loadSubjectGrades: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.subjectID;
                a("SET_CHILD_REPO_SUBJECT_GRADES_LOADING", {
                    childID: n,
                    subjectID: o,
                    loaded: !1
                }), $.ajax({
                    url: "/m/grades/classes/" + o,
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_SUBJECT_GRADES_LOADING", {
                        childID: n,
                        subjectID: o,
                        loaded: !0
                    })
                }).done(function (e) {
                    a("SET_CHILD_REPO_SUBJECT_GRADES_ITEMS", {
                        childID: n,
                        subjectID: o,
                        items: e
                    })
                })
            },
            loadConsent: function (e, t) {
                var a = e.commit,
                    n = t.childID;
                a("SET_CHILD_REPO_CONSENT_LOADING", {
                    childID: n,
                    loaded: !1
                }), $.ajax({
                    url: "/m/consent",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_CONSENT_LOADING", {
                        childID: n,
                        loaded: !0
                    })
                }).done(function (e) {
                    a("SET_CHILD_REPO_CONSENT_ITEMS", {
                        childID: n,
                        items: e
                    })
                })
            },
            postConsent: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.type,
                    d = t.status;
                return $.ajax({
                    url: "/m/consent/" + o,
                    type: "POST",
                    data: {
                        status: d
                    },
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).promise().then(function (e) {
                    a("SET_CHILD_REPO_CONSENT_ITEM_STATUS", {
                        childID: n,
                        type: o,
                        status: e.status
                    })
                })
            },
            openEvaluationsTab: function (e, t) {
                (0, e.commit)("SET_CHILD_REPO_EVALUATIONS_TAB", {
                    childID: t.childID,
                    type: t.type
                })
            },
            loadEvaluations: function (e, t) {
                var a = e.commit,
                    n = (e.state, t.childID),
                    o = t.types;
                (void 0 === o ? ["past", "future"] : o).forEach(function (e) {
                    a("SET_CHILD_REPO_EVALUATIONS_LOADING", {
                        childID: n,
                        loaded: !1,
                        type: e
                    }), $.ajax({
                        url: "/m/evaluations",
                        type: "GET",
                        data: {
                            filter: e
                        },
                        dataType: "JSON",
                        beforeSend: function (e) {
                            return i(e, n)
                        }
                    }).always(function () {
                        a("SET_CHILD_REPO_EVALUATIONS_LOADING", {
                            childID: n,
                            loaded: !0,
                            type: e
                        })
                    }).done(function (t) {
                        var o = t.items;
                        a("SET_CHILD_REPO_EVALUATIONS_ITEMS", {
                            childID: n,
                            items: o,
                            type: e
                        })
                    })
                })
            },
            loadTimeTable: function (e, a) {
                var n = e.commit,
                    o = a.childID,
                    d = a.from,
                    _ = a.to;
                n("SET_CHILD_REPO_TIMETABLE_LOADING", {
                    childID: o,
                    loaded: !1
                }), d = d || t().startOf("isoweek").format("YYYY-MM-DD"), _ = _ || t().startOf("isoweek").add(4, "days").format("YYYY-MM-DD"), $.ajax({
                    url: "/m/timetable/weekly",
                    data: {
                        from: d,
                        to: _
                    },
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, o)
                    }
                }).always(function () {
                    n("SET_CHILD_REPO_TIMETABLE_LOADING", {
                        childID: o,
                        loaded: !0
                    })
                }).done(function (e) {
                    n("SET_CHILD_REPO_TIMETABLE_ITEMS", {
                        childID: o,
                        items: e
                    })
                })
            },
            hideTrialStartBanner: function (e) {
                e.commit;
                $.ajax({
                    url: "/webapp/ajax_close_trial_start_banner",
                    type: "POST"
                })
            },
            loadNewsFeed: function (e, t) {
                fetchChildApiResource(e, {
                    child: t,
                    type: "SET_NEWSFEED_DATA",
                    url: "/m/newsfeed"
                })
            },
            loadX360: function (e, t) {
                var a = e.commit;
                a("SET_CHILD_REPO_X360_LOADING", {
                    childID: t,
                    loaded: !1
                }), $.ajax({
                    url: "/m/praises_and_improvements",
                    type: "GET",
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, t)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_X360_LOADING", {
                        childID: t,
                        loaded: !0
                    })
                }).done(function (e) {
                    var n = e.items;
                    a("SET_CHILD_REPO_X360_ITEMS", {
                        childID: t,
                        items: n
                    })
                })
            },
            loadMealStatus: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.from,
                    d = t.to,
                    _ = t.done,
                    c = void 0 === _ ? null : _;
                a("SET_CHILD_REPO_MEAL_STATUS_LOADING", {
                    childID: n,
                    loaded: !1
                }), $.ajax({
                    url: "/m/meals/status",
                    type: "GET",
                    data: {
                        from: o,
                        to: d
                    },
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_MEAL_STATUS_LOADING", {
                        childID: n,
                        loaded: !0
                    })
                }).done(function (e) {
                    a("SET_CHILD_REPO_MEAL_STATUS_ITEMS", {
                        childID: n,
                        items: e
                    }), c && c()
                })
            },
            loadMeals: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.date,
                    d = t.done,
                    _ = void 0 === d ? null : d,
                    c = o,
                    E = o;
                a("SET_CHILD_REPO_MEALS_LOADING", {
                    childID: n,
                    date: o,
                    loaded: !1
                }), $.ajax({
                    url: "/m/meals",
                    type: "GET",
                    data: {
                        from: c,
                        to: E
                    },
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_MEALS_LOADING", {
                        childID: n,
                        date: o,
                        loaded: !0
                    })
                }).done(function (e) {
                    var t = e.items;
                    a("SET_CHILD_REPO_MEALS_ITEMS", {
                        childID: n,
                        items: t
                    }), _ && _()
                })
            },
            loadMealMenus: function (e, t) {
                var a = e.commit,
                    n = t.childID,
                    o = t.date,
                    d = o,
                    _ = o;
                a("SET_CHILD_REPO_MEAL_MENU_LOADING", {
                    childID: n,
                    date: o,
                    loaded: !1
                }), $.ajax({
                    url: "/m/meals/menus",
                    type: "GET",
                    data: {
                        from: d,
                        to: _
                    },
                    dataType: "JSON",
                    beforeSend: function (e) {
                        return i(e, n)
                    }
                }).always(function () {
                    a("SET_CHILD_REPO_MEAL_MENU_LOADING", {
                        childID: n,
                        date: o,
                        loaded: !0
                    })
                }).done(function (e) {
                    var t = e.items;
                    a("SET_CHILD_REPO_MEAL_MENU_ITEMS", {
                        childID: n,
                        items: t
                    })
                })
            },
            orderMenu: function (e, t) {
                e.commit;
                var a = t.childID,
                    n = t.date,
                    o = t.type,
                    d = t.menu,
                    _ = t.done,
                    c = t.fail;
                $.ajax({
                    url: "/m/meals/meal",
                    type: "POST",
                    data: JSON.stringify({
                        date: n,
                        type: o,
                        menu: d
                    }),
                    dataType: "JSON",
                    contentType: "application/json",
                    beforeSend: function (e) {
                        return i(e, a)
                    }
                }).done(_).fail(c)
            },
            cancleMeal: function (e, t) {
                e.commit;
                var a = t.childID,
                    n = t.mealID,
                    o = t.done,
                    d = t.fail;
                $.ajax({
                    url: "/m/meals/meal/" + n,
                    type: "DELETE",
                    dataType: "JSON",
                    contentType: "application/json",
                    beforeSend: function (e) {
                        return i(e, a)
                    }
                }).done(o).fail(d)
            },
            showSuccessMsg: function (e, t) {
                var a = t.msg,
                    n = t.timeout;
                e.commit("SET_SUCCESS_MSG", {
                    msg: a,
                    show: !0
                }), void 0 !== n && setTimeout(function () {
                    e.commit("SET_SUCCESS_MSG", {
                        show: !1
                    })
                }, n)
            },
            openVideokonferencaPopup: function (e, t) {
                var a = t.videokonferenca;
                e.state.videokonferenca = a
            },
            hideVideokonferenca: function (e) {
                e.state.videokonferenca = void 0
            }
        };
    }, {
        "moment": "iROh",
        "./getters": "7Dq7",
        "./auth": "bHdm"
    }],
    "9k9P": [function (require, module, exports) {
        module.exports = {
            SET_DATE: function (e, a) {
                var t = a.date,
                    d = a.type;
                e.dates[d] = t
            },
            SET_MENU_DATA: function (e, a) {
                Object.assign(e.menu, a)
            },
            SET_USER_DATA: function (e, a) {
                Object.assign(e.user, a)
            },
            ADD_CHILD_REPO: function (e, a) {
                var t = a.childID;
                Vue.set(e.childData, t, {
                    newsfeed: {
                        page: 0,
                        pages: []
                    },
                    homework: {
                        loaded: !1,
                        items: [],
                        subjects: {}
                    },
                    grades: {
                        loaded: !1,
                        items: [],
                        subjects: {}
                    },
                    evaluations: {
                        open: "future",
                        past: {
                            loaded: !1,
                            items: []
                        },
                        future: {
                            loaded: !1,
                            items: []
                        }
                    },
                    absences: {
                        summary: null,
                        loaded: !1,
                        items: []
                    },
                    timetable: {
                        loaded: !1,
                        items: null
                    },
                    x360: {
                        loaded: !1,
                        items: []
                    },
                    meals: {},
                    mealMenus: {},
                    mealStatus: {
                        loaded: !1,
                        items: {}
                    },
                    consent: {
                        loaded: !1,
                        items: {}
                    }
                })
            },
            SET_CHILD_REPO_NEWSFEED_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.page,
                    s = a.loaded,
                    i = e.childData[t];
                i.newsfeed.pages[d] ? i.newsfeed.pages[d].loaded = s : i.newsfeed.pages.push({
                    items: [],
                    loaded: s
                })
            },
            ADD_CHILD_REPO_NEWSFEED_PAGE: function (e, a) {
                var t = a.childID,
                    d = a.page,
                    s = a.items,
                    i = e.childData[t];
                i.newsfeed.pages[d].items = s, i.newsfeed.pages[d].loaded = !0, i.newsfeed.page = d + 1
            },
            SET_CHILD_REPO_HOMEWORK_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].homework.loaded = d
            },
            SET_CHILD_REPO_HOMEWORK_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].homework.items = d
            },
            SET_CHILD_REPO_HOMEWORK_DETAILS: function (e, a) {
                var t = a.item,
                    d = a.details,
                    s = a.open,
                    i = void 0 !== s && s;
                t.details || Vue.set(t, "details", {
                    open: i,
                    items: null
                }), void 0 !== d && (t.details.items = d), void 0 !== i && (t.details.open = i)
            },
            SET_CHILD_REPO_SUBJECT_HOMEWORK_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.subjectID,
                    s = a.loaded,
                    i = e.childData[t];
                i.homework.subjects[d] ? i.homework.subjects[d].loaded = s : Vue.set(i.homework.subjects, d, {
                    items: [],
                    loaded: s
                })
            },
            SET_CHILD_REPO_SUBJECT_HOMEWORK_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.subjectID,
                    s = a.items;
                e.childData[t].homework.subjects[d].items = s
            },
            SET_CHILD_REPO_GRADES_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].grades.loaded = d
            },
            SET_CHILD_REPO_GRADES_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].grades.items = d
            },
            SET_CHILD_REPO_SUBJECT_GRADES_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.subjectID,
                    s = a.loaded,
                    i = e.childData[t];
                i.grades.subjects[d] ? i.grades.subjects[d].loaded = s : Vue.set(i.grades.subjects, d, {
                    items: [],
                    loaded: s
                })
            },
            SET_CHILD_REPO_SUBJECT_GRADES_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.subjectID,
                    s = a.items;
                e.childData[t].grades.subjects[d].items = s
            },
            SET_CHILD_REPO_EVALUATIONS_TAB: function (e, a) {
                var t = a.childID,
                    d = a.type;
                e.childData[t].evaluations.open = d
            },
            SET_CHILD_REPO_EVALUATIONS_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded,
                    s = a.type;
                e.childData[t].evaluations[s].loaded = d
            },
            SET_CHILD_REPO_EVALUATIONS_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items,
                    s = a.type;
                e.childData[t].evaluations[s].items = d
            },
            SET_CHILD_REPO_ABSENCES_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].absences.loaded = d
            },
            SET_CHILD_REPO_ABSENCES_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items,
                    s = a.summary,
                    i = e.childData[t];
                i.absences.summary = s, i.absences.items = d
            },
            SET_CHILD_REPO_TIMETABLE_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].timetable.loaded = d
            },
            SET_CHILD_REPO_TIMETABLE_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].timetable.items = d
            },
            SET_CHILD_REPO_X360_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].x360.loaded = d
            },
            SET_CHILD_REPO_X360_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].x360.items = d
            },
            SET_CHILD_REPO_MEAL_STATUS_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].mealStatus.loaded = d
            },
            SET_CHILD_REPO_MEAL_STATUS_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].mealStatus.items = d
            },
            SET_CHILD_REPO_MEALS_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.date,
                    s = a.loaded,
                    i = e.childData[t];
                i.meals[d] && s ? (i.meals[d].loaded = s, i.meals[d].items = []) : Vue.set(i.meals, d, {
                    items: [],
                    loaded: s
                })
            },
            SET_CHILD_REPO_MEALS_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items,
                    s = e.childData[t];
                d.forEach(function (e) {
                    s.meals[e.date].items.push(e)
                })
            },
            SET_CHILD_REPO_MEAL_MENU_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.date,
                    s = a.loaded,
                    i = e.childData[t];
                i.mealMenus[d] ? i.mealMenus[d].loaded = s : Vue.set(i.mealMenus, d, {
                    items: {},
                    loaded: s
                })
            },
            SET_CHILD_REPO_MEAL_MENU_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items,
                    s = e.childData[t];
                d.forEach(function (e) {
                    var a = e.date,
                        t = e.menus;
                    s.mealMenus[a].items = t
                })
            },
            SET_CHILD_REPO_CONSENT_LOADING: function (e, a) {
                var t = a.childID,
                    d = a.loaded;
                e.childData[t].consent.loaded = d
            },
            SET_CHILD_REPO_CONSENT_ITEMS: function (e, a) {
                var t = a.childID,
                    d = a.items;
                e.childData[t].consent.items = d
            },
            SET_CHILD_REPO_CONSENT_ITEM_STATUS: function (e, a) {
                var t = a.childID,
                    d = a.status,
                    s = a.type;
                e.childData[t].consent.items.forEach(function (e) {
                    e.type === s && (e.status = d)
                })
            },
            SET_UNREAD_NOTIFICATIONS_COUNT: function (e, a) {
                e.notifications.unread_messages = a
            },
            SET_SUCCESS_MSG: function (e, a) {
                var t = a.msg,
                    d = void 0 === t ? "" : t,
                    s = a.show;
                e.success_msg.msg = d, e.success_msg.show = s
            }
        };
    }, {}],
    "dW/X": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.soglasja = void 0;
        var a = {
            namespaced: !0,
            state: {
                loading: !1,
                soglasja: []
            },
            mutations: {
                SET_LOADING: function (a, o) {
                    a.loading = o
                },
                SET_SOGLASJA: function (a, o) {
                    a.soglasja = o
                }
            },
            actions: {
                nalozi: function (a) {
                    return new Promise(function (o) {
                        a.commit("SET_LOADING", !0), $.ajax({
                            url: "/webapp/get_moja_soglasja",
                            type: "GET",
                            dataType: "JSON"
                        }).always(function () {
                            a.commit("SET_LOADING", !1)
                        }).done(function (e) {
                            a.commit("SET_SOGLASJA", e.data), o()
                        })
                    })
                },
                oddaj_soglasje: function (a, o) {
                    var e = o.soglasje_id,
                        t = o.sklopi;
                    return new Promise(function (a, o) {
                        $.ajax({
                            url: "/webapp/oddaj_soglasje/" + e,
                            data: {
                                sklopi: JSON.stringify(t)
                            },
                            type: "POST",
                            dataType: "JSON"
                        }).done(function (e) {
                            "ok" === e.status ? a(e) : o(e.errfields || ["Prišlo je do napake."])
                        }).fail(function (a) {
                            o(["Prišlo je do napake."])
                        })
                    })
                }
            }
        };
        exports.soglasja = a;
    }, {}],
    "Yl/s": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.store = void 0;
        var e = o(require("vuex")),
            t = o(require("./app/vuex/state")),
            u = o(require("./app/vuex/getters")),
            r = o(require("./app/vuex/actions")),
            a = o(require("./app/vuex/mutations")),
            s = require("./app/vuex/modules/soglasja");

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var i = new e.default.Store({
            state: t.default,
            getters: u.default,
            actions: r.default,
            mutations: a.default,
            modules: {
                soglasja: s.soglasja
            }
        });
        exports.store = i;
    }, {
        "vuex": "AwB4",
        "./app/vuex/state": "6JHB",
        "./app/vuex/getters": "7Dq7",
        "./app/vuex/actions": "Ijak",
        "./app/vuex/mutations": "9k9P",
        "./app/vuex/modules/soglasja": "dW/X"
    }],
    "ByJG": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.router = void 0;
        var e = r(require("vue-router"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var n = new e.default({
            routes: [{
                path: "/feed",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/feed"))
                }
            }, {
                path: "/grades",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/grades"))
                }
            }, {
                path: "/grades/subject/:id/:grade_id?",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/subject_grades"))
                }
            }, {
                path: "/absences",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/absences"))
                }
            }, {
                path: "/absences_basic",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/absences_basic"))
                }
            }, {
                path: "/examinations",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/examinations"))
                }
            }, {
                path: "/examinations_basic",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/examinations_basic"))
                }
            }, {
                path: "/calendar",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/calendar"))
                }
            }, {
                path: "/videokonferenca/:id",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/videokonferenca"))
                }
            }, {
                path: "/homework",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/homework"))
                }
            }, {
                path: "/homework/subject/:id/:homework_id?",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/subject_homework"))
                }
            }, {
                path: "/x360",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/x360"))
                }
            }, {
                path: "/food",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/food"))
                }
            }, {
                path: "/food/order/:type",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/food_order"))
                }
            }, {
                path: "/consent",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/consent"))
                }
            }, {
                path: "/consent/list",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/consent_list"))
                }
            }, {
                path: "/consent/list/:id",
                name: "consent_list_item",
                component: function () {
                    return require("_bundle_loader")(require.resolve("./app/containers/consent_item"))
                }
            }, {
                path: "*",
                redirect: "/feed"
            }]
        });
        exports.router = n;
    }, {
        "vue-router": "1iTB",
        "_bundle_loader": "TVvX",
        "./app/containers/feed": [
            ["feed.1dfa0435.js", "quwm"], "quwm"
        ],
        "./app/containers/grades": [
            ["grades.7a91f020.js", "u5Y7"], "u5Y7"
        ],
        "./app/containers/subject_grades": [
            ["subject_grades.20429f79.js", "G1m5"], "G1m5"
        ],
        "./app/containers/absences": [
            ["absences.e1c61937.js", "VIf4"], "VIf4"
        ],
        "./app/containers/absences_basic": [
            ["absences_basic.6958bcb1.js", "Fggs"], "Fggs"
        ],
        "./app/containers/examinations": [
            ["examinations.253258c4.js", "Vxj6"], "Vxj6"
        ],
        "./app/containers/examinations_basic": [
            ["examinations_basic.a7a91db1.js", "LZHZ"], "LZHZ"
        ],
        "./app/containers/calendar": [
            ["calendar.968b09b6.js", "IWpB"], "IWpB"
        ],
        "./app/containers/videokonferenca": [
            ["videokonferenca.30a2ea83.js", "Q1Ni"], "Q1Ni"
        ],
        "./app/containers/homework": [
            ["homework.73287e87.js", "x8os"], "x8os"
        ],
        "./app/containers/subject_homework": [
            ["subject_homework.0ab0129c.js", "O8a/"], "O8a/"
        ],
        "./app/containers/x360": [
            ["x360.138363e7.js", "xOB2"], "xOB2"
        ],
        "./app/containers/food": [
            ["food.b692017a.js", "uGro"], "uGro"
        ],
        "./app/containers/food_order": [
            ["food_order.7f6a7b70.js", "WcxO"], "WcxO"
        ],
        "./app/containers/consent": [
            ["consent.7e7484a0.js", "4frC"], "4frC"
        ],
        "./app/containers/consent_list": [
            ["consent_list.6c509090.js", "+WDy"], "+WDy"
        ],
        "./app/containers/consent_item": [
            ["consent_item.e4e66434.js", "Y1OV"], "Y1OV"
        ]
    }],
    "t9SC": [function (require, module, exports) {
        var e = function (e) {
            return e < 10 ? "0" + e : e
        };
        module.exports = {
            template: "#parent-app-trial-version-temp",
            data: function () {
                return {
                    end_time: null,
                    now: null,
                    distance: null
                }
            },
            props: ["mobile"],
            computed: {
                child: function (e) {
                    return e.$store.getters.user.activeChild
                },
                days: function (e) {
                    var n = e.distance;
                    return Math.floor(n / 864e5)
                },
                hours: function (n) {
                    var t = n.distance;
                    return e(Math.floor(t % 864e5 / 36e5))
                },
                minutes: function (n) {
                    var t = n.distance;
                    return e(Math.floor(t % 36e5 / 6e4))
                },
                seconds: function (n) {
                    var t = n.distance;
                    return e(Math.floor(t % 6e4 / 1e3))
                }
            },
            mounted: function () {
                this.getTrialVersionEndTime()
            },
            methods: {
                getTrialVersionEndTime: function () {
                    var e = this;
                    e.child.notifications.forEach(function (n) {
                        "request_plus" === n.type && (e.end_time = new Date(n.end_time).getTime(), e.countdownTimer())
                    })
                },
                countdownTimer: function () {
                    var e = this,
                        n = setInterval(function () {
                            e.now = (new Date).getTime(), e.distance = e.end_time - e.now, e.distance < 0 && (clearInterval(n), window.location.reload())
                        }, 1e3)
                }
            }
        };
    }, {}],
    "uQyI": [function (require, module, exports) {
        module.exports = {
            template: "#parent-app-poll-subheader-temp",
            data: function () {
                return {
                    active: !1
                }
            },
            props: ["text", "url"],
            computed: {
                child: function (e) {
                    return e.$store.getters.user.activeChild
                },
                visible: function (e) {
                    var t = e.active,
                        r = e.child;
                    return t && r && true
                }
            },
            mounted: function () { },
            methods: {}
        };
    }, {}],
    "Y73j": [function (require, module, exports) {
        module.exports = {
            template: "#app-header-temp",
            computed: {
                user: function () {
                    return this.$store.getters.user
                },
                showActivation: function () {
                    return this.$store.getters.showActivation
                },
                unreadCount: function () {
                    return this.$store.state.notifications.unread_messages
                }
            },
            components: {
                "trial-version": require("./containers/trial_version"),
                "poll-subheader": require("./containers/poll_subheader")
            }
        };
    }, {
        "./containers/trial_version": "t9SC",
        "./containers/poll_subheader": "uQyI"
    }],
    "+oa3": [function (require, module, exports) {
        module.exports = {
            template: "#app-menu-temp",
            components: {
                "child-select-option": {
                    template: "#child-select-option-temp",
                    props: ["child", "active"],
                    computed: {
                        time: function (e) {
                            var t = e.child.timetable.hours.filter(function (e) {
                                return "school_hour" === e.type
                            });
                            return t.length > 0 ? {
                                from: t.reduce(function (e, t) {
                                    var n = t.from;
                                    return (n < e ? n : e) || n
                                }, !1).substr(11, 5),
                                to: t.reduce(function (e, t) {
                                    var n = t.to;
                                    return (n > e ? n : e) || n
                                }, !1).substr(11, 5)
                            } : null
                        }
                    }
                }
            },
            computed: {
                user: function (e) {
                    return e.$store.getters.user
                },
                menu: function (e) {
                    return e.$store.getters.menu
                },
                child: function (e) {
                    return e.$store.getters.child
                },
                absenceRoute: function (e) {
                    var t = e.child;
                    return "/absences"
                },
                menuItems: function () {
                    //*-----------------------------------------------------------------------
                    if (document.body.parentElement.classList.contains('extend'))
                        return {
                            "x360": true,
                            "grades": true,
                            "calendar": true,                                           //!patch
                            "homework": true,
                            "consents": true,
                            "messages": true,
                            "absences": true,
                            "graduation": true,
                            "examinations": true,
                            "communication": true,
                        }
                    //*-----------------------------------------------------------------------
                    return this.menu.items.reduce(function (e, t) {
                        return e[t] = !0, e
                    }, {})
                },
                unreadCount: function () {
                    return this.$store.state.notifications.unread_messages
                }
            }
        };
    }, {}],
    "chE5": [function (require, module, exports) {
        var i = require("../../libs/ea_utils"),
            n = i.getOS;
        module.exports = {
            template: '\n        <div class="app-download-btn-group">\n            <a v-if="isAndroid" href="/android" class="android"><img src="/images/buttons/android.png"></a><a v-if="isIOS" href="/iphone" class="ios"><img src="/images/buttons/ios.png"></a>\n        </div>\n    ',
            computed: {
                isAndroid: function () {
                    return "android" === n() || null === n()
                },
                isIOS: function () {
                    return "ios" === n() || null === n()
                }
            }
        };
    }, {
        "../../libs/ea_utils": "s7Qj"
    }],
    "yuEt": [function (require, module, exports) {
        var e = "/images/dijaki_stars_app/";
        module.exports = {
            template: "#parent-app-banner-temp",
            computed: {
                url: function (e) {
                    return e.$route.fullPath
                },
                text: function (e) {
                    return e.getContent("text")
                },
                image: function (e) {
                    return e.getContent("image")
                }
            },
            components: {
                "app-download-btn": require("./app_download_btn")
            },
            mounted: function () {
                $(this.$el).find(".bubble-text").outerHeight() > 180 ? $(this.$el).find(".bubble-text").css("width", "330px") : $(this.$el).find(".bubble-text").css("width", "310px")
            },
            updated: function () {
                $(this.$el).find(".bubble-text").outerHeight() > 180 ? $(this.$el).find(".bubble-text").css("width", "330px") : $(this.$el).find(".bubble-text").css("width", "310px")
            },
            methods: {
                getContent: function (n) {
                    var t = !1,
                        o = this.url;
                    return o.indexOf("/") > -1 && (o = "/" + o.split("/")[1]), "/x360" === o ? t = "text" === n ? "Vse <strong>pohvale</strong>, potrebne izboljšave in komentarje si lahko pogledaš v <strong>aplikaciji</strong>." : e + "phone-x360-ea.png" : "/absences" === o || "/absences_basic" === o ? t = "text" === n ? "Ali veš koliko izostankov imaš? <strong>Poglej si v aplikaciji</strong>." : e + "phone-izostanki-ea.png" : "/examinations" === o || "/examinations_basic" === o ? t = "text" === n ? "Aplikacija ti ponuja pregled nad <strong>prihodnjimi</strong> in preteklimi ocenjevanji znanja." : e + "phone-ocenjevanje-znanja-ea.png" : "/grades" === o ? t = "text" === n ? "Želiš <strong>enostaven</strong> pregled nad vsemi ocenami na enem mestu?" : e + "phone-ocene-ea.png" : "/homework" === o ? t = "text" === n ? "Ali veš, da so <strong>v aplikaciji</strong> podrobnosti vpisanih domačih nalog?" : e + "phone-naloge-ea.png" : "/food" === o ? t = "text" === n ? "V aplikaciji lahko <strong>enostavno</strong> in <strong>hitro</strong> urediš svojo prijavo na obrok." : e + "phone-prehrana-ea.gif" : "/calendar" === o && (t = "text" === n ? "Z <strong>mobilno aplikacijo</strong> ti je urnik vedno pri roki. <strong>Hitro</strong> lahko pogledaš vsa nadomeščanja in ostale dogodke." : e + "phone-urnik.png"), t
                },
                getOS: function () {
                    var e = navigator.userAgent || navigator.vendor || window.opera;
                    return /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) && !window.MSStream ? "ios" : null
                }
            }
        };
    }, {
        "./app_download_btn": "chE5"
    }],
    "IjgZ": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.init = o;
        var e = require("./store.js"),
            t = require("./router.js"),
            r = s(require("moment")),
            n = s(require("./app/vuex/auth"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function o() {
            r.default.locale("sl"), $.ajaxSetup({
                beforeSend: n.default.beforeSend
            }), Vue.component("app-header", require("./app/header")), Vue.component("app-menu", require("./app/menu")), Vue.component("app-banner", require("../global/vue-runtime-components/ads/banner")), new Vue({
                el: "#xa-app",
                store: e.store,
                router: t.router,
                computed: {
                    user: function (e) {
                        return e.$store.getters.user
                    },
                    menu: function (e) {
                        return e.$store.getters.menu
                    },
                    child: function (e) {
                        return e.$store.getters.user.activeChild
                    },
                    showBanner: function (e) {
                        return e.$store.getters.showBanner
                    },
                    showTrialStartBanner: function (e) {
                        return e.$store.getters.showTrialStartBanner
                    },
                    trialRunning: function (e) {
                        return e.$store.getters.trialRunning
                    },
                    showAppDownload: function () {
                        return this.$store.getters.showAppDownload && "consent_list_item" !== this.$route.name
                    },
                    videokonferenca: function () {
                        return this.$store.state.videokonferenca
                    },
                    success_msg: function () {
                        return this.$store.state.success_msg
                    }
                },
                methods: {
                    hideTrialStartBanner: function () {
                        this.$store.dispatch("hideTrialStartBanner")
                    },
                    hideVideokonferenca: function () {
                        this.$store.dispatch("hideVideokonferenca")
                    }
                },
                mounted: function () {
                    var e = this;
                    $(this.$el).removeClass("hidden"), this.menu.loaded || (this.$store.dispatch("loadAppMenu"), this.$store.dispatch("loadNotifications")), this.$store.dispatch("setUserData", {
                        type: "student"
                    }), this.$store.dispatch("loadMeChild", function (t) {
                        e.$store.dispatch("setUserData", {
                            activeChild: t
                        }), e.$store.dispatch("addChildRepository", t.id)
                    })
                }
            })
        }
    }, {
        "./store.js": "Yl/s",
        "./router.js": "ByJG",
        "moment": "iROh",
        "./app/vuex/auth": "bHdm",
        "./app/header": "Y73j",
        "./app/menu": "+oa3",
        "../global/vue-runtime-components/ads/banner": "yuEt"
    }],
    "9R0v": [function (require, module, exports) {
        var t = require("moment");
        module.exports = {
            template: "#date-icon-temp",
            props: ["date", "warning"],
            computed: {
                momentDate: function (e) {
                    return t(e.date)
                },
                day: function (t) {
                    return t.momentDate.format("D")
                },
                month: function (t) {
                    return t.momentDate.format("MMM").toUpperCase().replace(".", "")
                },
                countdown: function (e) {
                    var n = Math.ceil(e.momentDate.diff(t(), "days", !0));
                    return n > -1 && n < 14 && n
                }
            }
        };
    }, {
        "moment": "iROh"
    }],
    "FCqt": [function (require, module, exports) {
        var e = require("moment");
        module.exports = {
            template: "#evaluation-panel-temp",
            props: ["evaluation"],
            components: {
                "date-icon": require("../dateicon")
            },
            computed: {
                evaluationDate: function (t) {
                    var a = e(t.evaluation.date, "YYYY-MM-DD");
                    return a.format("dddd") + ", " + a.format("D. M. YYYY")
                },
                testText: function (e) {
                    return e.evaluation.test ? "Preverjanje" : "Ocenjevanje"
                }
            },
            methods: {}
        };
    }, {
        "moment": "iROh",
        "../dateicon": "9R0v"
    }],
    "DNQk": [function (require, module, exports) {
        var e = require("moment");
        module.exports = {
            template: "#evaluation-group-temp",
            props: ["evaluations", "week"],
            components: {
                "evaluation-panel": require("./evaluation_panel")
            },
            computed: {
                isThisWeek: function (t) {
                    return e().week() === t.week
                },
                isNextWeek: function (t) {
                    return e().week() + 1 === t.week
                },
                isArbitraryWeek: function (e) {
                    return !e.isThisWeek && !e.isNextWeek
                },
                weekDates: function (t) {
                    return {
                        start: e().week(t.week).startOf("isoweek").format("D. M."),
                        end: e().week(t.week).endOf("isoweek").format("D. M.")
                    }
                }
            },
            methods: {}
        };
    }, {
        "moment": "iROh",
        "./evaluation_panel": "FCqt"
    }],
    "5ghE": [function (require, module, exports) {
        var t = null;

        function e() {
            return t || (t = n()), t
        }

        function n() {
            try {
                throw new Error
            } catch (e) {
                var t = ("" + e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
                if (t) return r(t[0])
            }
            return "/"
        }

        function r(t) {
            return ("" + t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^\/]+$/, "$1") + "/"
        }
        exports.getBundleURL = e, exports.getBaseURL = r;
    }, {}],
    "TVvX": [function (require, module, exports) {
        var r = require("./bundle-url").getBundleURL;

        function e(r) {
            Array.isArray(r) || (r = [r]);
            var e = r[r.length - 1];
            try {
                return Promise.resolve(require(e))
            } catch (n) {
                if ("MODULE_NOT_FOUND" === n.code) return new s(function (n, i) {
                    t(r.slice(0, -1)).then(function () {
                        return require(e)
                    }).then(n, i)
                });
                throw n
            }
        }

        function t(r) {
            return Promise.all(r.map(u))
        }
        var n = {};

        function i(r, e) {
            n[r] = e
        }
        module.exports = exports = e, exports.load = t, exports.register = i;
        var o = {};

        function u(e) {
            var t;
            if (Array.isArray(e) && (t = e[1], e = e[0]), o[e]) return o[e];
            var i = (e.substring(e.lastIndexOf(".") + 1, e.length) || e).toLowerCase(),
                u = n[i];
            return u ? o[e] = u(r() + e).then(function (r) {
                return r && module.bundle.register(t, r), r
            }).catch(function (r) {
                throw delete o[e], r
            }) : void 0
        }

        function s(r) {
            this.executor = r, this.promise = null
        }
        s.prototype.then = function (r, e) {
            return null === this.promise && (this.promise = new Promise(this.executor)), this.promise.then(r, e)
        }, s.prototype.catch = function (r) {
            return null === this.promise && (this.promise = new Promise(this.executor)), this.promise.catch(r)
        };
    }, {
        "./bundle-url": "5ghE"
    }],
    "+D+R": [function (require, module, exports) {
        module.exports = function (n) {
            return new Promise(function (e, o) {
                var r = document.createElement("script");
                r.async = !0, r.type = "text/javascript", r.charset = "utf-8", r.src = n, r.onerror = function (n) {
                    r.onerror = r.onload = null, o(n)
                }, r.onload = function () {
                    r.onerror = r.onload = null, e()
                }, document.getElementsByTagName("head")[0].appendChild(r)
            })
        };
    }, {}],
    0: [function (require, module, exports) {
        var b = require("TVvX");
        b.register("js", require("+D+R"));
        b.load([]).then(function () {
            require("IjgZ");
        });
    }, {}]
}, {}, [0], null)