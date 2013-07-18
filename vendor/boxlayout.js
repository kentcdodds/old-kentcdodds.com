/**
 * boxlayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var Boxlayout = (function() {

	var $el = $( '#bl-main' ),
		$sections = $el.children( 'section' ),
		// works section
		$sectionWork = $( '#bl-work-section' ),
		// work items
		$workItems = $( '#bl-work-items > li' ),
		// work panels
		$workPanelsContainer = $( '#bl-panel-work-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextWorkItem = $workPanelsContainer.find( 'nav > span.bl-next-work' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeWorkItem = $workPanelsContainer.find( 'nav > span.bl-icon-close' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {
		
		$sections.each( function() {
			
			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
					$el.addClass( 'bl-expand-item' );	
				}

			} ).find( 'span.bl-icon-close' ).on( 'click', function() {
				
				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'bl-expand-top' );
				}

				$el.removeClass( 'bl-expand-item' );
				
				return false;

			} );

		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$workItems.on( 'click', function( event ) {

			// scale down main section
			$sectionWork.addClass( 'bl-scale-down' );

			// show panel for this work item
			$workPanelsContainer.addClass( 'bl-panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'bl-show-work' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextWorkItem.on( 'click', function( event ) {
			
			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'bl-show-work' ).addClass( 'bl-hide-current-work' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'bl-hide-current-work' );
				isAnimating = false;
			}
			
			$nextPanel.addClass( 'bl-show-work' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeWorkItem.on( 'click', function( event ) {

			// scale up main section
			$sectionWork.removeClass( 'bl-scale-down' );
			$workPanelsContainer.removeClass( 'bl-panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'bl-show-work' );
			
			return false;

		} );

	}

	return { init : init };

})();