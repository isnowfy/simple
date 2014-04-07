var global = {};
function checkpass(user, pass, cbsuccess, cberror) {
    var github = new Github({
        username: user,
        password: pass,
        auth: "basic"
    });
    u = github.getUser();
    u.show(user, function(err, ret){
        console.log(err);
        if (typeof err == "undefined" || err == null) {
            global.github = github;
            global.user = user;
            cbsuccess();
        }
        else
            cberror();
    });
}
$(document).ready(function() {
    var Logins = Spine.Controller.sub({
        el: $("#login"),
        elements: {
            "form": "form",
            "#loginuser": "user",
            "#loginpass": "pass",
            "#loginerror": "err",
        },
        events: {
            "submit form": "check",
        },
        check: function(e) {
            $("#loading").show();
            e.preventDefault();
            var tmp = this;
            checkpass(this.user.val(), this.pass.val(),
                      function(){$("#loading").hide();tmp.navigate("/main");},
                      function(){$("#loading").hide();tmp.err.show()});
        },
        init: function() {
        }
    });
    var Mains = Spine.Controller.sub({
        el: $("#main"),
        init: function() {
        }
    });
    var SimpleApp = Spine.Controller.sub({
        el: $("body"),
        init: function() {
            this.logins = new Logins();
            this.mains = new Mains();
            this.routes({
                "": function(){this.logins.active();},
                "/main": function(){this.mains.active();}
            });
            this.manager = new Spine.Manager(this.logins, this.mains);
            Spine.Route.setup();
        }
    });
    new SimpleApp();
});
