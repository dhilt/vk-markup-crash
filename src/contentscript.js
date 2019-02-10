
const LSToken = 'vk_markup_crash_options';

const RULES = {
	ADDS: `
._ads_block_data_w, .ads_left, .ads_ads_box {
	display: none !important;
}`,
};

const vk_markup_crash = {

    getStorageDataAsync: function (callback) {
    	return new Promise(resolve => 
            chrome.storage.local.get(LSToken, (items) => {
	            const storageOptions = items[LSToken];
	            if (!storageOptions) {
	                return;
	            }
	            resolve(storageOptions);
	        })
    	);
    },

    processStorageOptions: function(options) {
      if (options) {
      	if (this.getOption(options, "ads")) {
			this.addCss(RULES.ADDS);
      	}
      }
    },

	getOption: function (options, token) {
      	const option = options.find(option => option.id === token);
      	return option && option.value;
	},

	addCss: function (rule) {
	  const css = document.createElement('style');
	  css.type = 'text/css';
	  css.appendChild(document.createTextNode(rule));
	  (document.head || document.documentElement).appendChild(css);
	},

	injectStyle: function () {
		var style = document.createElement("link");
		style.rel = "stylesheet";
		style.type = "text/css";
		style.href = chrome.extension.getURL("replacement.css");
		(document.head || document.documentElement).appendChild(style);

		this.getStorageDataAsync().then(options => 
			this.processStorageOptions(options)
		);
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
		this.injectStyle();
		this.processDOM();
	}
};


vk_markup_crash.run();