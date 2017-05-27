<ba-sidebar> //baSideBar.ts selector
    <aside class="al-sidebar" sidebarresize=""> //baSideBar.html
        <ba-menu ng-reflect-menu-routes="[object Object]"> //baMenu.ts selector + baSideBar.html
            <aside class="al-sidebar" sidebarresize=""> //baMenu.html
                <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 127px;">
                    <ul baslimscroll="" class="al-sidebar-list" id="al-sidebar-list" style="overflow: hidden; width: auto; height: 127px;" ng-reflect-ba-slim-scroll-options="[object Object]">
                        <ba-menu-item ng-reflect-menu-item="[object Object]"> //baMenuItem.ts selector + (baMenu.html ngfor)
                        <li class="al-sidebar-list-item selected" title="Dashboard"> //baMenuItem.html
                            <a class="al-sidebar-list-link" ng-reflect-router-link="/,pages,dashboard" ng-reflect-href="#/pages/dashboard" href="#/pages/dashboard">
                            <i ng-reflect-class-name="ion-android-home" class="ion-android-home"></i><span>Dashboard</span>
                            </a>
                        </li>
                        </ba-menu-item>
                        <ba-menu-item ng-reflect-menu-item="[object Object]"> //baMenuItem.ts selector + (baMenu.html ngfor)
                        <li class="al-sidebar-list-item selected" title="Produk">  //baMenuItem.html
                            <a class="al-sidebar-list-link" ng-reflect-router-link="/,pages,dashboard" ng-reflect-href="#/pages/dashboard" href="#/pages/dashboard">
                            <i ng-reflect-class-name="ion-android-home" class="ion-android-home"></i><span>Dashboard</span>
                            </a>
                        </li>
                        </ba-menu-item>
                      </ul>
                </div>
            </aside>
        </ba-menu>
    </aside>
</ba-sidebar>