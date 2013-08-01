'use strict';
(function() {
  var app = angular.module('kent');

  app.value('projects', [
    {
      title: 'SpendMyCents.com',
      img: null,
      description: 'Spend My Cents rocks!',
      contributors: [
        {
          name: 'Kent Dodds',
          role: 'Backend (and currently sole maintainer)',
          link: 'http://kent.doddsfamily.us'
        },
        {
          name: 'Mack Cope',
          role: 'Initial frontend',
          link: 'http://www.mackcope.com'
        }
      ]
    },
    {
      title: 'FriendStories',
      img: null,
      description: 'Friend Stories is going to be big!',
      contributors: [
        {
          name: 'Kent Dodds',
          role: 'Everyting',
          link: 'http://kent.doddsfamily.us'
        }
      ]
    }
  ]);
})();