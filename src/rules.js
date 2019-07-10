const VK_MARKUP_CRASH_RULES = {
    ADDS: `
._ads_block_data_w, .ads_left, .ads_ads_box {
    display: none !important;
}
#feed_recommends {
  display: none !important;
}
`,
    ROUND_ICONS: `
.top_profile_img,
.chat_tab_img,
.module_body .people_cell_img, 
.post_img, 
.wall_module .copy_post_img, 
.page_list_module .thumb, 
.page_list_module .cell_img,
.wall_module .reply_img, 
.post_field_user_image,
.module_body .people_cell_img,
.page_list_module .thumb,
.ow_ava.ow_ava_comm,
.friends_photo_img,
.right_list_img,
.ow_ava.ow_ava_small,
.mv_author_photo,
.group_row_photo, .group_row_img,
.feedback_img,
.nim-peer .nim-peer--photo-w,
.feed_friend_image,
.feed_friend_photo_wrap .ui_zoom_inner, 
.nim-peer.nim-peer_small .im_grid>img,
.nim-peer .nim-peer--photo .im_grid>img, 
.nim-peer .nim-peer--photo>img,
.nim-dialog.nim-dialog_classic .nim-dialog--photo .nim-peer .nim-peer--photo .im_grid>img,
.like_tt_image, .poll_tt_image,
.like_share_ava.wdd_imgs,
.wddi_img,
.submit_post_box .thumb_off, .submit_post_box .thumb_on
{
    border-radius: 0 !important;
}
`,
  WIDE_LAYOUT: `
#page_layout {
  width: 1160px !important;
}
#page_body {
  width: 995px !important;
}
`,
  MARGINS_AND_PADDINGS: `
.wall_module .feed_row {
  margin-top: -7px !important;
}
.wall_module .post_header {
  padding: 10px 10px 5px !important;
}
.wall_module .wall_text {
  padding: 0 8px 5px !important;
}
.page_post_sized_thumbs {
  padding: 3px 0 0 !important;
}
.wall_module .copy_quote {
  margin: 0 !important;
}
.copy_quote .wall_post_text {
  padding-top: 5px !important;
  padding-bottom: 3px !important;
}
.wall_post_text {
  padding-top: 0px !important;
  line-height: 1.3 !important;
}
.wr_header {
  margin: 7px 7px 7px !important;
}
.wall_module .replies_list {
  border: 0 !important;
  margin-top: -8px !important;
}
.replies_open, .wr_header {
  line-height: 27px !important;
}
.wall_module .reply .reply_wrap {
  padding: 8px 0px 8px !important;
}
.post_field_user_link {
  display: inline !important;
}
.post_field_group, .post_field_user {
  float: none !important;
}
.wd_lnk {
  color: #a7a5a5; font-size: 12px;
}
.wall_module .reply_box_open .submit_post_field, .wall_module .reply_box_open .submit_post_field~.placeholder .ph_input {
  min-height: 0 !important;
}
.wall_module .wall_text .page_media_poll_wrap:last-child {
  margin-bottom: 0px !important;
  margin-top: 5px !important;
}
.wall_module .wall_text .page_media_thumbed_link:last-child {
  margin-bottom: 0px !important;
  margin-top: 5px !important;
}
#narrow_column {
  position: inherit !important;
}
`,
  NEW_COMMENT_ICON: `
.reply_form_user_image img.post_field_user_image, 
.reply_form_user_image img.post_field_choose_image,
.post_field_user_link img.post_field_user_image {
  opacity: 0 !important;
}
.addpost_opt {
  opacity: 0.3 !important;
}
.addpost_opt:hover {
  opacity: 1 !important;
}
`
};
