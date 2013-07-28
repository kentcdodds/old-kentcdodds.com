'use strict';
(function() {
  var app = angular.module('kent');

  app.value('ie', (function() {
    var undef = undefined;
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) {
        rv = parseFloat( RegExp.$1 );
      }
    }
    return ((rv > -1) ? rv : undef);
  }()));
  
  app.value('sections', [
    {
      sectionId: 'about-section',
      title: 'About',
      icon: 'icon-smile',
      path: '/about',
      active: false,
      viewLocation: './views/about.html'
    },
    {
      sectionId: 'projects-section',
      title: 'Projects',
      icon: 'icon-laptop',
      path: '/projects',
      active: false,
      viewLocation: './views/projects.html'
    },
    {
      sectionId: 'blog-section',
      title: 'Blog',
      icon: 'icon-pencil',
      path: '/blog',
      active: false,
      viewLocation: './views/blog.html'
    },
    {
      sectionId: 'contact-section',
      title: 'Contact',
      icon: 'icon-envelope',
      path: '/contact',
      active: false,
      viewLocation: './views/contact.html'
    }
  ]);

  app.value('networks', [
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
        console.log('call phone clicked');
        $('#modal-16').addClass('md-show');
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
  ]);

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