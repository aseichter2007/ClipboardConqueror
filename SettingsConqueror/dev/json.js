
;                (function() {
                    window.require(["ace/snippets/json"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            //I got this from the ace repo, I can't decide how to use it.