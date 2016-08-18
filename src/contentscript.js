var vk_markup_crash = {

	injectStyleAsync: function () {

		var onModifiedDOM = function () {
			document.removeEventListener('DOMSubtreeModified', onModifiedDOM, false);

			var style = document.createElement("link");
			style.rel = "stylesheet";
			style.type = "text/css";
			style.href = chrome.extension.getURL("replacement.css");
			(document.head || document.documentElement).appendChild(style);
		};

		document.addEventListener('DOMSubtreeModified', onModifiedDOM, false);
	},

	run: function () {
		this.injectStyleAsync();
	}
};


vk_markup_crash.run();