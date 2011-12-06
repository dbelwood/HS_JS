class Language extends Backbone.Model
	defaults:
		"selected": false

	toggle: =>
		@set({"selected" : !@get("selected")})

class LanguagesCollection extends Backbone.Collection
	model: Language

class LanguageSelectorRow extends Backbone.View
	tagName: "ul"
	events:
		"click input[type='checkbox']": "selectLanguage"
	
	render: =>
		@el = $(@el)
		@el.append "<input type='checkbox'></input><span>"+@model.get("name")+"<span>"
		@delegateEvents
		@el

	selectLanguage: =>
		@model.toggle()

class LanguageSelector extends Backbone.View
	initialize: ->
		@collection.bind("reset", @render)

	render: =>
		@collection.each((language) ->
			@el.append(new LanguageSelectorRow(model: language).render)
		, this)

class SelectedLanguageView extends Backbone.View
	events: 
		"click #view_selected_languages": "viewSelected"

	viewSelected: =>
		selected = @collection.filter((language) ->
			language.get("selected")
		,this)
		selected = _.map(selected, (language) ->
			language.get("name")
		)
		console.log selected
		@.$("span").empty()
		@.$("span").append(selected.join(", "))


class @App
	constructor: () ->
		@languages = new LanguagesCollection()
		@language_selector = new LanguageSelector({el: $("#languages"), collection: @languages})
		@selected_language_view = new SelectedLanguageView({el: $("#selected_languages"), collection: @languages})
