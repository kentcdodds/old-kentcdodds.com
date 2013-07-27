'use strict';
(function() {
  var app = angular.module('kent');

  app.factory('Sections', function() {
    var sections = [
      {
        sectionId: 'about-section',
        title: 'About',
        icon: 'icon-smile',
        path: '/about',
        active: false
      },
      {
        sectionId: 'projects-section',
        title: 'Projects',
        icon: 'icon-laptop',
        path: '/projects',
        active: false
      },
      {
        sectionId: 'blog-section',
        title: 'Blog',
        icon: 'icon-pencil',
        path: '/blog',
        active: false
      },
      {
        sectionId: 'contact-section',
        title: 'Contact',
        icon: 'icon-envelope',
        path: '/contact',
        active: false
      }
    ];
    return {
      getSections: function() {
        return sections;
      }
    }
  });

  app.factory('Networks', function() {
    var networks = [
      {
        name: 'email',
        summary: 'Email me',
        url: 'mailto:kent@doddsfamily.us'
      },
      {
        name: 'google',
        summary: 'Circle me',
        url: 'https://plus.google.com/114245123507194646768'
      },
      {
        name: 'github',
        summary: 'Fork me',
        url: 'http://www.github.com/kentcdodds'
      },
      {
        name: 'twitter',
        summary: 'Follow me @kentcdodds',
        url: 'http://www.twitter.com/kentcdodds'
      },
      {
        name: 'linkedin',
        summary: 'Connect with me',
        url: 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/'
      },
      {
        name: 'phone',
        summary: 'Call me (maybe? ;D)',
        onClick: function(scope) {
          console.log('call clicked');
        }
      },
      {
        name: 'facebook',
        summary: 'Friend me',
        url: 'http://www.facebook.com/kentcdodds'
      },
      {
        name: 'careers',
        summary: 'Hire me',
        url: 'http://careers.stackoverflow.com/kentcdodds'
      },
      {
        name: 'stack-overflow',
        summary: 'Ask me',
        url: 'http://stackoverflow.com/users/971592/kentcdodds'
      },
      {
        name: 'mormon',
        summary: 'I\'m a Mormon',
        url: 'http://mormon.org/me/1J5N'
      }
    ];
    
    return {
      getNetworks: function() {
        return networks;
      }
    };
  });
  
  app.factory('Projects', function() {
    var projects = [
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
    ];
    
    return {
      getProjects: function() {
        return projects;
      }
    }
  });
})();