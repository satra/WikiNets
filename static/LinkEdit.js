// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var LinkEdit;
    return LinkEdit = (function(_super) {
      __extends(LinkEdit, _super);

      function LinkEdit(options) {
        this.options = options;
        this.findHeader = __bind(this.findHeader, this);
        LinkEdit.__super__.constructor.call(this);
      }

      LinkEdit.prototype.init = function(instances) {
        var _this = this;
        this.dataController = instances['local/Neo4jDataController'];
        this.graphModel = instances['GraphModel'];
        this.graphModel.on("change", this.update.bind(this));
        this.graphView = instances['GraphView'];
        this.selection = instances["LinkSelection"];
        this.selection.on("change", this.update.bind(this));
        this.listenTo(instances["KeyListener"], "down:16:80", function() {
          return _this.$el.toggle();
        });
        instances["Layout"].addPlugin(this.el, this.options.pluginOrder, 'Link Edit', true);
        return this.Create = instances['local/Create'];
      };

      LinkEdit.prototype.update = function() {
        var $container, blacklist, selectedLinks,
          _this = this;
        this.$el.empty();
        selectedLinks = this.selection.getSelectedLinks();
        $container = $("<div class=\"node-profile-helper\"/>").appendTo(this.$el);
        blacklist = ["selected", "source", "target", "strength"];
        return _.each(selectedLinks, function(link) {
          var $linkDiv, header;
          console.log(link);
          $linkDiv = $("<div class=\"node-profile\"/>").appendTo($container);
          header = _this.findHeader(link);
          $("<div class=\"node-profile-title\">" + header + "</div>").appendTo($linkDiv);
          return _.each(link, function(value, property) {
            var makeLinks;
            value += "";
            if (blacklist.indexOf(property) < 0) {
              if (property === "start" && _this.graphView.findText(link.source)) {
                makeLinks = value + " \"" + _this.graphView.findText(link.source) + "\"";
              } else if (property === "end" && _this.graphView.findText(link.target)) {
                makeLinks = value + " \"" + _this.graphView.findText(link.target) + "\"";
              } else if (value != null) {
                makeLinks = value.replace(/((https?|ftp|dict):[^'">\s]+)/gi, "<a href=\"$1\" target=\"_blank\" style=\"target-new: tab;\">$1</a>");
              } else {
                makeLinks = value;
              }
              return $("<div class=\"node-profile-property\">" + property + ": " + makeLinks + "</div>").appendTo($linkDiv);
            }
          });
        });
      };

      LinkEdit.prototype.findHeader = function(link) {
        if (link.type != null) {
          return link.type;
        } else if (link.name != null) {
          return link.name;
        } else {
          return '';
        }
      };

      return LinkEdit;

    })(Backbone.View);
  });

}).call(this);
