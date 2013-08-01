'use strict';
(function() {
  var app = angular.module('kent');

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
})();