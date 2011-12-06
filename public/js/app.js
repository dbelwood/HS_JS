(function() {
  var Language, LanguageSelector, LanguageSelectorRow, LanguagesCollection, SelectedLanguageView;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Language = (function() {
    __extends(Language, Backbone.Model);
    function Language() {
      this.toggle = __bind(this.toggle, this);
      Language.__super__.constructor.apply(this, arguments);
    }
    Language.prototype.defaults = {
      "selected": false
    };
    Language.prototype.toggle = function() {
      return this.set({
        "selected": !this.get("selected")
      });
    };
    return Language;
  })();
  LanguagesCollection = (function() {
    __extends(LanguagesCollection, Backbone.Collection);
    function LanguagesCollection() {
      LanguagesCollection.__super__.constructor.apply(this, arguments);
    }
    LanguagesCollection.prototype.model = Language;
    return LanguagesCollection;
  })();
  LanguageSelectorRow = (function() {
    __extends(LanguageSelectorRow, Backbone.View);
    function LanguageSelectorRow() {
      this.selectLanguage = __bind(this.selectLanguage, this);
      this.render = __bind(this.render, this);
      LanguageSelectorRow.__super__.constructor.apply(this, arguments);
    }
    LanguageSelectorRow.prototype.tagName = "ul";
    LanguageSelectorRow.prototype.events = {
      "click input[type='checkbox']": "selectLanguage"
    };
    LanguageSelectorRow.prototype.render = function() {
      this.el = $(this.el);
      this.el.append("<input type='checkbox'></input><span>" + this.model.get("name") + "<span>");
      this.delegateEvents;
      return this.el;
    };
    LanguageSelectorRow.prototype.selectLanguage = function() {
      return this.model.toggle();
    };
    return LanguageSelectorRow;
  })();
  LanguageSelector = (function() {
    __extends(LanguageSelector, Backbone.View);
    function LanguageSelector() {
      this.render = __bind(this.render, this);
      LanguageSelector.__super__.constructor.apply(this, arguments);
    }
    LanguageSelector.prototype.initialize = function() {
      return this.collection.bind("reset", this.render);
    };
    LanguageSelector.prototype.render = function() {
      return this.collection.each(function(language) {
        return this.el.append(new LanguageSelectorRow({
          model: language
        }).render);
      }, this);
    };
    return LanguageSelector;
  })();
  SelectedLanguageView = (function() {
    __extends(SelectedLanguageView, Backbone.View);
    function SelectedLanguageView() {
      this.viewSelected = __bind(this.viewSelected, this);
      SelectedLanguageView.__super__.constructor.apply(this, arguments);
    }
    SelectedLanguageView.prototype.events = {
      "click #view_selected_languages": "viewSelected"
    };
    SelectedLanguageView.prototype.viewSelected = function() {
      var selected;
      selected = this.collection.filter(function(language) {
        return language.get("selected");
      }, this);
      selected = _.map(selected, function(language) {
        return language.get("name");
      });
      console.log(selected);
      this.$("span").empty();
      return this.$("span").append(selected.join(", "));
    };
    return SelectedLanguageView;
  })();
  this.App = (function() {
    function App() {
      this.languages = new LanguagesCollection();
      this.language_selector = new LanguageSelector({
        el: $("#languages"),
        collection: this.languages
      });
      this.selected_language_view = new SelectedLanguageView({
        el: $("#selected_languages"),
        collection: this.languages
      });
    }
    return App;
  })();
}).call(this);
