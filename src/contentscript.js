var vk_markup_crash = {

	timerId: null,

	injectStyleAsync: function () {
		var onModifiedDOM = function () {
			document.removeEventListener('DOMSubtreeModified', onModifiedDOM, false);

			var style = document.createElement("style");
			style.innerHTML = "body {display: none;}";
			style.innerHTML = ".feed_notif_block.page_block._block  {display: none !important;}";
			style.innerHTML = ".ui_toggler_wrap.hot {display: none;}";
			//style.innerHTML += ".wide_column_left .wide_column_wrap {margin-right: 235px;}";
			style.innerHTML += ".wall_module .feed_row {margin-top: -7px;}";
			style.innerHTML += ".wall_module .post_header {padding: 5px 5px 0;}";
			style.innerHTML += ".wall_module .wall_text  {padding: 0 8px 5px;}";
			style.innerHTML += ".page_post_sized_thumbs  {padding: 3px 0 0;}";
			style.innerHTML += ".post_full_like_wrap  {padding: 0; margin: 0 3px; border: 0;}";
			style.innerHTML += ".post_full_like_wrap .post_full_like {float: right;}";
			style.innerHTML += ".post_full_like_wrap .reply_link_wrap {float: left; padding: 5px 2px;}";
			style.innerHTML += ".post_full_like_wrap .post_like, .post_full_like_wrap .post_share {padding: 0;}";
			style.innerHTML += ".copy_quote .wall_post_text {padding-top: 0;}";
			style.innerHTML += ".wall_module .replies_list {border: 0;}";
			style.innerHTML += ".wr_header {margin: 0 7px;}";
			style.innerHTML += ".replies_open, .wr_header {line-height: 27px;}";
			style.innerHTML += ".wall_module .reply .reply_wrap {padding: 8px 0;}";
			style.innerHTML += ".wd_lnk {color: #a7a5a5; font-size: 12px;}";

			style.innerHTML += ".wall_module .reply_box_open .submit_post_field, .wall_module .reply_box_open .submit_post_field~.placeholder .ph_input {min-height: 0;}";
			(document.head || document.documentElement).appendChild(style);
		};

		document.addEventListener('DOMSubtreeModified', onModifiedDOM, false);
	},

	processDOMAsync: function() {
		var self = this;

		self.timerId = setInterval(function () {
			var testElement = document.getElementById('submit_post_box');
			if (testElement) {
				clearInterval(self.timerId);
				document.body.style.display = 'block';
			}
		}, 75);
	},

	run: function () {
		this.injectStyleAsync();
		this.processDOMAsync();
	}
};


vk_markup_crash.run();