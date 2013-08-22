'use strict';
(function() {
  var app = angular.module('resume');

  app.value('resumeValues', (function() {
    return {
      contact: {
        email: 'kent@doddsfamily.us',
        phone: '801-810-5373',
        phoneUrl: '/#/contact?phone'
      },
      education: {
        degree: 'Master of Information Systems Management',
        graduationDate: 'April 2014',
        school: 'Brigham Young University, Provo, UT',
        schoolUrl: 'http://www.byu.edu',
        college: 'Marriott School of Management',
        collegeUrl: 'http://marriottschool.byu.edu',
        imgSrc: '../resume/images/byu.png',
        items: [
          'Major GPA 3.76; Cumulative GPA 3.44',
          'J. Owen Cherrington Scholarship for outstanding service to classmates and excellent academic performance in IT related courses',
          'Leadership: AIS Co-President and former BYU Men’s Chorus Vice President'
        ]
      },
      experience: [
        {
          company: 'Domo Technologies Inc.',
          companyUrl: 'http://www.domo.com',
          imgSrc: './images/domo.png',
          jobTitle: 'Software Engineer',
          timeRange: 'December 2012 - May 2013 & August 2013 - Present',
          achievements: [
            'Implemented new feature to improve end user experience for over 75% of users',
            'Initiated conversations to lead to new features which will enhance the usability of the product and improve user experience',
            'Automated the writing of endpoint tests to save developers time in the future and improved process by automating the creation of new endpoint proposals'
          ]
        },
        {
          company: 'United Services Automobile Association (USAA)',
          companyUrl: 'http://www.usaa.com',
          imgSrc: './images/USAA.png',
          jobTitle: 'Software Engineer (IT Intern)',
          timeRange: 'May 2013 - August 2013',
          achievements: [
            'Built a wrapper page for a portion of all wicket based mobile app views',
            'Utilized <a href="http://jmpressjs.github.io/jmpress.js">jmpress.js</a> to create and present results of internship experience to executives and received praise as “the best intern presentation ever” from the IT Intern director'
          ]
        },
        {
          company: 'The Church of Jesus Christ of Latter-Day Saints',
          companyUrl: 'http://www.lds.org',
          imgSrc: './images/lds.png',
          jobTitle: 'Business Intelligence Database Engineer',
          timeRange: 'April 2012 - December 2012',
          achievements: [
            'Took initiative to automate emailing of recurring reports to over 20,000 people worldwide',
            'Improved communication and relationships between engineers and customers by coordinating the training of over 50 Database Engineers on a BI specific implementation of Jira',
            'Improved engineer responsiveness to ETL job failures from hours to minutes by writing custom Data Services functions and the Java application mentioned above'
          ]
        }
      ],
      skillsAndAchievements: [
        {
          title: 'Primary Technologies',
          content: 'JavaScript, HTML5, CSS3, AngularJS, NodeJS, jQuery, MongoDB, Git, Java'
        },
        {
          title: 'Open Source Contributions',
          content: 'Angular Bridge (NodeJS & AngularJS), Play Framework 2.0 (Java)'
        },
        {
          title: 'Personal Projects',
          content: 'JS-Point, SpendMyCents.com, HackItFast.com, kent.doddsfamily.us'
        },
        {
          title: 'Other Skills',
          content: 'Presentation, communication, documentation, search engine optimization'
        },
        {
          title: 'Volunteer',
          content: 'Two year church mission, Eagle Scout, and currently 11 year old scout leader'
        },
        {
          title: 'Hobbies',
          content: 'Family, faith, friends, making music, ASL, mud running, swimming, biking'
        }
      ]
    };
  })());
})();