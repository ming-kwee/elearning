export const PAGES_MENU2 = [
  {
    path: 'pages2',
    children: [
      {
        path: 'course-goals',
        param: 12,
        data: {
          menu: {
            title: 'Course Goals',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'test-video',
        data: {
          menu: {
            title: 'Test Video',
            icon: 'ion-ios-pricetags',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      },      
      {
        path: 'curriculum',
        data: {
          menu: {
            title: 'Curriculum',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        }
      },
      {
        path: 'course-landing-page',
        data: {
          menu: {
            title: 'Course Landing Page',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        }
      },
      {
        path: 'price-coupons',
        data: {
          menu: {
            title: 'Price & Coupons',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        }
      },
      {
        path: 'auto-messages',
        data: {
          menu: {
            title: 'Automatic Messages',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
          }
        }
      }
    ]
  }
];
