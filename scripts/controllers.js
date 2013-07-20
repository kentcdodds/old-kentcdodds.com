(function() {
  var app = angular.module('kent');
  
  app.controller('MainCtrl', function($scope, $location) {
    
    var $el = $('#bl-sections');
    
    // works section
    var $sectionWork = $('#bl-work-section');
    // work items
    var $workItems = $('#bl-work-items > li');
    // work panels
    var $workPanelsContainer = $('#bl-panel-work-items');
    var $workPanels = $workPanelsContainer.children('div');
    var totalWorkPanels = $workPanels.length;
    // navigating the work panels
    var $nextWorkItem = $workPanelsContainer.find('nav > span.bl-next-work');
    // if currently navigating the work items
    var isAnimating = false;
    // close work panel trigger
    var $closeWorkItem = $workPanelsContainer.find('nav > i.icon-remove-circle');
    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition' : 'transitionend',
      'OTransition' : 'oTransitionEnd',
      'msTransition' : 'MSTransitionEnd',
      'transition' : 'transitionend'
    };
    // transition end event name
    var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
    // support css transitions
    var supportTransitions = Modernizr.csstransitions;

    $scope.underConstruction = true;
    $scope.sections = [
      {
        sectionId: 'about-section',
        title: 'About',
        icon: 'icon-smile',
        path: '/about'
      },
      {
        sectionId: 'projects-section',
        title: 'Projects',
        icon: 'icon-laptop',
        path: '/projects'
      },
      {
        sectionId: 'blog-section',
        title: 'Blog',
        icon: 'icon-pencil',
        path: '/blog'
      },
      {
        sectionId: 'contact-section',
        title: 'Contact',
        icon: 'icon-envelope',
        path: '/contact'
      },
    ];


    var getSection = function(index) {
      var selector = '#' + $scope.sections[index].sectionId;
      return $(selector);
    };

    $scope.onBoxClick = function(index) {
      var $section = getSection(index);
      if (!$section.data('open')) {
        $section.data('open', true).addClass('bl-expand bl-expand-top');
        $el.addClass('bl-expand-item'); 
        var sectionView = $scope.sections[index].path;
        $location.path(sectionView);
      }
    };

    $scope.closeSection = function(index) {
      var $section = getSection(index);
      $section.data('open', false).removeClass('bl-expand').on(transEndEventName, function(event) {
        if (!$(event.target).is('section')) {
          return false;
        }
        $(this).off(transEndEventName).removeClass('bl-expand-top');
      });

      if (!supportTransitions) {
        $section.removeClass('bl-expand-top');
      }
      $el.removeClass('bl-expand-item');
    };

  });

app.controller('AboutCtrl', function($scope) {

});
  
})();