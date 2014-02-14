// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var Selection;
    return Selection = (function(_super) {
      __extends(Selection, _super);

      function Selection(options) {
        this.options = options;
        Selection.__super__.constructor.call(this);
      }

      Selection.prototype.init = function(instances) {
        var _this = this;
        _.extend(this, Backbone.Events);
        this.keyListener = instances['KeyListener'];
        this.graphView = instances['GraphView'];
        this.linkFilter = this.graphView.getLinkFilter();
        this.graphModel = instances['GraphModel'];
        this.listenTo(this.keyListener, "down:16:17:65", this.selectAll);
        this.listenTo(this.keyListener, "down:16:27", this.deselectAll);
        this.listenTo(this.keyListener, "down:16:46", this.removeSelection);
        this.listenTo(this.keyListener, "down:16:13", this.removeSelectionCompliment);
        return this.graphView.on("enter:link:click", function(datum) {
          var link, _i, _len, _ref;
          _ref = _this.getSelectedLinks();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            link = _ref[_i];
            _this.toggleSelection(link);
          }
          return _this.toggleSelection(datum);
        });
      };

      Selection.prototype.renderSelection = function() {
        var linkSelection;
        linkSelection = this.graphView.getLinkSelection();
        if (linkSelection) {
          return linkSelection.call(function(selection) {
            return selection.classed("selected", function(d) {
              return d.selected;
            });
          });
        }
      };

      Selection.prototype.filterSelection = function(filter) {
        _.each(this.graphModel.getLinks(), function(link) {
          return link.selected = filter(link);
        });
        return this.renderSelection();
      };

      Selection.prototype.selectAll = function() {
        this.filterSelection(function(n) {
          return true;
        });
        return this.trigger("change");
      };

      Selection.prototype.deselectAll = function() {
        this.filterSelection(function(n) {
          return false;
        });
        return this.trigger("change");
      };

      Selection.prototype.toggleSelection = function(link) {
        link.selected = !link.selected;
        this.trigger("change");
        return this.renderSelection();
      };

      Selection.prototype.removeSelection = function() {
        return this.graphModel.filterLinks(function(link) {
          return !link.selected;
        });
      };

      Selection.prototype.removeSelectionCompliment = function() {
        return this.graphModel.filterLinks(function(link) {
          return link.selected;
        });
      };

      Selection.prototype.getSelectedLinks = function() {
        return _.filter(this.graphModel.getLinks(), function(link) {
          return link.selected;
        });
      };

      return Selection;

    })(Backbone.View);
  });

}).call(this);
