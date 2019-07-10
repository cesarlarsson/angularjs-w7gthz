
	// add the module with global defaults for froala
	var myApp = angular.module('myApp', ['froala']).
	value('froalaConfig', {
		toolbarInline: false,
		placeholderText: 'Edit Your Content Here!'
	});

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope,$timeout) {
		let mainEditor, mainEditor2;
		let vm = this;
	

		let baseConfiguration = {
			key: '',
			toolbarButtons: {
				'moreText': {
					'buttons': ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
				},
				'moreParagraph': {
					'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
				},
				'moreRich': {
					'buttons': ['insertLink', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
				},
				'moreMisc': {
					'buttons': ['undo', 'redo', 'fullscreen', 'selectAll', 'modalEdit'],
					'align': 'right'
				}
			},
			pluginsEnabled: ['align', 'colors', 'embedly', 'emoticons', 'fontAwesome', 'fontFamily', 'fontSize', 'inlineStyle', 'inlineClass', 'lineBreaker', 'lineHeight', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'table', 'wordPaste', 'specialCharacters'],
			pasteDeniedAttrs: [],
			inlineClasses: {
				'fr-class-highlighted': 'Highlighted'
			},
			emoticonsUseImage: false,
			events: {},
			attribution: false
		};
		let baseEvents = {
			'blur': function () {
				//we have to do this because froala is not updating right the model
				vm.value = this.html.get(false);

			},
			'keyup': function(){
				this.selection.save();
			},
			'mouseup': function(){
				this.selection.save();
				mainEditor.undo.saveStep();
			},
			'mousedown': function(){
				this.selection.save();

			},
			'contentChanged': function(e, editor, cmd, param1, param2){
				this.selection.save();
				mainEditor.undo.saveStep();
			}
		};

        vm.froalaOptions = angular.copy(baseConfiguration);

		vm.froalaOptions.events = angular.extend(vm.froalaOptions.events,baseEvents);
		
		vm.$onInit = function() {
			FroalaEditor.DefineIcon('modalEdit', {NAME: 'expand'});
			FroalaEditor.RegisterCommand('modalEdit', {
				title: 'Fullscreen',
				icon: 'fullscreen',
				focus: true,
				undo: true,
				refreshAfterCallback: true,
				callback: function () {
					this.openFullScreen();
				}
			});

			$timeout(function(){
				mainEditor = new FroalaEditor('#editor1', vm.froalaOptions, function(){
					//mainEditor.html.set(newVal);
				});

				mainEditor2 = new FroalaEditor('#editor2', {}, function(){
					//mainEditor.html.set(newVal);
				});
			});

		}





	});
