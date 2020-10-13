const VK_MARKUP_CRASH_SETTINGS = [{
  id: 'HEADER',
  type: 'checkbox',
  value: true,
  text: 'unfix header'
}, {
  id: 'ADS',
  type: 'checkbox',
  value: true,
  text: 'remove ads'
}, {
  id: 'ROUND_ICONS',
  type: 'checkbox',
  value: true,
  text: 'abandon round icons'
}, {
  id: 'WIDER_LAYOUT',
  type: 'group',
  value: [{
    id: 'ENABLED',
    type: 'checkbox',
    value: true,
    text: 'make layout wider'
  }, {
    id: 'WIDTH',
    type: 'select',
    values: ['xl', 'xxl', 'xxxl'],
    value: 'xl'
  }]
}, {
  id: 'MARGINS_AND_PADDINGS',
  type: 'checkbox',
  value: true,
  text: 'reduce margins and paddings'
}, {
  id: 'NEW_COMMENT_ICON',
  type: 'checkbox',
  value: true,
  text: 'hide my icon in new comment suggestion',
  // hidden: true
}, {
  id: 'STORIES_CLIPS_RECOMMENDATIONS',
  type: 'checkbox',
  value: true,
  text: 'hide stories, clips, recommendations'
}];
