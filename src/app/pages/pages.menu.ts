// let companyMenu = (localStorage.getItem("companyMenu") == 'true');
// let invitationMenu = (localStorage.getItem("invitationMenu") == 'true');
// let occasionMenu = (localStorage.getItem("occasionMenu") == 'true');
// let reportMenu = (localStorage.getItem("reportMenu") == 'true');

let companyMenu = false;
let invitationMenu = false;
let occasionMenu = false;
let reportMenu = false;


export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },     
      {
        path: 'company',
        data: {
          menu: {
            title: 'Company',
            icon: 'ion-ios-pricetags',
            selected: false,
            expanded: false,
            order: 100,
            hidden: companyMenu,
          }
        },
        children: [
          {
            path: 'profile',
            data: {
              menu: {
                title: 'Profile',
              }
            }
          },          
          {
            path: 'eventseminar-list',
            data: {
              menu: {
                title: 'Event-Seminar',
              }
            }
          },
          {
            path: 'sponsorship-list',
            data: {
              menu: {
                title: 'Sponsorship',
              }
            }
          },
          {
            path: 'templateeditor',
            data: {
              menu: {
                title: 'Template Design',
              }
            }
          }          
        ]
      },
      {
        path: 'events',
        data: {
          menu: {
            title: 'Invitation',
            icon: 'ion-compose',
            selected: false,
            expanded: false,
            order: 400,
            hidden: invitationMenu,
          }
        },
        children: [
          {
            path: 'customers',
            data: {
              menu: {
                title: 'Customer List',
              }
            }
          },
        {
            path: 'uploadexcel',
            data: {
              menu: {
                title: 'Upload Excel',
              }
            }
          }
        ]
      },
      {
        path: 'occasion',
        data: {
          menu: {
            title: 'Occasions',
            icon: 'ion-calendar',
            selected: false,
            expanded: false,
            order: 400,
            hidden: occasionMenu,
          }
        },
        children: [
          {
            path: 'generatebarcode',
            data: {
              menu: {
                title: 'Check-in',
              }
            }
          }
        ]
      },
      {
        path: 'reports',
        data: {
          menu: {
            title: 'Report',
            icon: 'ion-clipboard',
            selected: false,
            expanded: false,
            order: 100,
            hidden: true,
          }
        },
        children: [
          {
            path: 'customerAttend',
            data: {
              menu: {
                title: 'Customer Attend',
              }
            }
          },
          {
            path: 'sponsorAttend',
            data: {
              menu: {
                title: 'Sponsor Attend',
              }
            }
          },          
        ]
      },
      {
        path: 'create',
        data: {
          menu: {
            title: 'Create Company',
            icon: 'ion-clipboard',
            selected: false,
            expanded: false,
            order: 100,
            hidden: true,
          }
        }
      },           
    ]
  }
];

