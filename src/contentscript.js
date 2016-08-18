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

	isHeader: true,

	processHeader: function (header) {
		var self = this;
		window.onscroll = function() {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if(self.isHeader && scrolled > 0) {
				self.isHeader = false;
				header.style.display = 'none';
			}
			else if (!self.isHeader && scrolled === 0) {
				self.isHeader = true;
				header.style.display = 'block';	
			}
		}
	},

	processDOM: function () {
		var self = this;
		self.timerId = setInterval(function () {
			var header = document.getElementById('page_header_cont');
			if (header) {
				clearInterval(self.timerId);
				self.processHeader(header);
			}
		}, 75);
	},

	run: function () {
		this.injectStyleAsync();
		this.processDOM();
	}
};


vk_markup_crash.run();