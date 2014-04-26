var global = {};
var repo = null;
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}
function asyncFinish(total, success) {
    var cnt = 0;
    $("#loading").show();
    return function() {
        cnt++;
        if (cnt == total) {
            $("#loading").hide();
            if (typeof success == "function")
                success();
        }
    }
}
function asyncSeq(success) {
    var args = Array.prototype.slice.call(arguments, 1);
    var finish = asyncFinish(args.length, success);
    for (var i = 0; i < args.length; ++i) {
        args[i](finish);
    }
}
function syncSeq(success) {
    var args = Array.prototype.slice.call(arguments, 1);
    var finish = asyncFinish(1, success);
    var l = args.length;
    var tmp = curry(args[l-1], finish);
    for (var i = l-2; i >= 0; --i)
        tmp = curry(args[i], tmp);
    tmp();
}
function errShow(item, err) {
    if (typeof err != "undefined" && err != null) {
        console.log(err);
        $("#loading").hide();
        item.show();
        return true;
    }
    return false;
}
function asyncWrite(data, target, err, finish) {
    if (!repo)
        Spine.Route.navigate("");
    repo.write("master", target, data, "simple",
               function(e) {finish();err(e);});
}
function asyncWriteFile(source, target, err, finish) {
    if (!repo)
        Spine.Route.navigate("");
    $.ajax({
        url: source, 
        type: "GET",
        success: function(data) {asyncWrite(data, target, err, finish)},
        error: function(e) {err(e);}
    });
}
function checkpass(user, pass, cbsuccess, cberror) {
    var github = new Github({
        username: user,
        password: pass,
        auth: "basic"
    });
    var u = github.getUser();
    u.show(user, function(err, ret){
        $("#loading").hide()
        if (!cberror(err)) {
            global.github = github;
            global.user = user;
            repo = github.getRepo(user, user+".github.io");
            cbsuccess();
        }
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
            checkpass(this.user.val(), this.pass.val(),
                      function(){Spine.Route.navigate("/main");},
                      curry(errShow, this.err));
        },
        init: function() {
            this.user.val("");
            this.pass.val("");
            $("#loading").hide();
            this.err.hide();
        }
    });
    var Mains = Spine.Controller.sub({
        el: $("#main"),
        elements: {
            "#initerror": "err",
            "#initok": "ok",
        },
        events: {
            "click #init": "initRepo",
            "click #go": "go",
        },
        initRepo: function(e) {
            e.preventDefault();
            var error = curry(errShow, this.err);
            var a1 = curry(asyncWriteFile, "template/index.html", "index.html", error);
            var a2 = curry(asyncWriteFile, "template/main.css", "main.css", error);
            var a3 = curry(asyncWriteFile, "template/main.js", "main.js", error);
            var config = {"name": global.user, "number_of_posts_per_page": 5, "posts": [], "pages": []};
            var a4 = curry(asyncWrite, JSON.stringify(config), "main.json", error);
            syncSeq(function() {$("#initok").show()}, a1, a2, a3, a4);
        },
        go: function(e) {
            this.navigate("/posts");
        },
        init: function() {
            $("#loading").hide();
            this.err.hide();
        }
    });
    var Posts = Spine.Controller.sub({
        el: $("#posts"),
        init: function() {
            $("#loading").hide();
            if (repo != null) {
                repo.read("master", "main.json", function(err, data) {
                    var config = JSON.parse(data);
                    var itemTemplate = Hogan.compile($("postsItem").html());
                    var itemHtml = itemTemplate.render();
                });
            }
        }
    });
    var SimpleApp = Spine.Controller.sub({
        el: $("body"),
        init: function() {
            this.logins = new Logins();
            this.mains = new Mains();
            this.posts = new Posts();
            this.routes({
                "": function() {this.logins.init();this.logins.active();},
                "/main": function() {this.mains.init();this.mains.active();},
                "/posts": function() {this.posts.init();this.posts.active();}
            });
            this.manager = new Spine.Manager(this.logins, this.mains, this.posts);
            Spine.Route.setup();
        }
    });
    new SimpleApp();
});
