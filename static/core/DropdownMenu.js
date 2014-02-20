// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define([], function() {
    var DropdownMenu;
    return DropdownMenu = (function(_super) {
      __extends(DropdownMenu, _super);

      function DropdownMenu(options) {
        this.options = options;
        this.loadAllNodes = __bind(this.loadAllNodes, this);
        this.parent = "";
        if (this.parent == null) {
          this.parent = this.options.parent;
        }
        DropdownMenu.__super__.constructor.call(this);
      }

      DropdownMenu.prototype.init = function(instances) {
        var _this = this;
        this.graphModel = instances["GraphModel"];
        this.dataProvider = instances["local/WikiNetsDataProvider"];
        this.parent = $("#menuButton");
        this.render();
        this.$el.appendTo(this.parent);
        this.parent.click(function() {
          return _this.$el.toggle();
        });
        return this.$el.toggle();
      };

      DropdownMenu.prototype.render = function() {
        var $about, $bbar, $clearAllButton, $container, $showAllButton,
          _this = this;
        $bbar = $("<div id=\"bbar\"></div>").css("background-color", "#979985").css("width", "10px").appendTo(this.$el);
        $container = $("<div id=\"dropdownMenu\"></div>");
        $container.appendTo(this.$el);
        $about = $("<div class=\"dropdownMenuItem\"> <a href=\"http://wikinets.co.uk\" target='_blank'> About </a></div>").css("margin", "5px").css("font-size", "16px");
        $about.appendTo($container);
        $clearAllButton = $("<div><input type=\"button\" id=\"clearAllButtonDropdown\" value=\"Clear All\"></input></div>").appendTo($container);
        $clearAllButton.click(function() {
          return _this.graphModel.filterNodes(function(node) {
            return false;
          });
        });
        $showAllButton = $("<input type=\"button\" id=\"showAllButtonDropdown\" value=\"Show All\"></input>").appendTo($container);
        return $showAllButton.click(function() {
          return _this.dataProvider.getEverything(_this.loadAllNodes);
        });
      };

      DropdownMenu.prototype.loadAllNodes = function(nodes) {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          node = nodes[_i];
          _results.push(this.graphModel.putNode(node));
        }
        return _results;
      };

      return DropdownMenu;

    })(Backbone.View);
  });

}).call(this);