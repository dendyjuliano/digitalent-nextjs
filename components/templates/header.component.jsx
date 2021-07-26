import React from 'react'
import Image from 'next/image'

const Header = () => {
    return (
        <>
            {/* <!--begin::Header--> */}
            <div id="kt_header" className="header header-fixed">
                {/* <!--begin::Container--> */}
                <div className="container-fluid d-flex align-items-stretch justify-content-between">
                    {/* <!--begin::Header Menu Wrapper--> */}
                    <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                        {/* <!--begin::Header Menu--> */}
                        <div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">


                            {/* <!--begin::Header Nav--> */}
                            <ul className="menu-nav">
                                <li className="menu-item menu-item-submenu menu-item-rel menu-item-active"
                                    data-menu-toggle="click" aria-haspopup="true">
                                    <a href="javascript:;" className="menu-link menu-toggle">
                                        <span className="menu-text">Dashboard</span>
                                        <i className="menu-arrow"></i>
                                    </a>
                                </li>
                            </ul>
                            {/* <!--end::Header Nav--> */}


                        </div>
                        {/* <!--end::Header Menu--> */}
                    </div>
                    {/* <!--end::Header Menu Wrapper--> */}
                    {/* <!--begin::Topbar--> */}
                    <div className="topbar">
                        {/* <!--begin::Search--> */}
                        <div className="dropdown" id="kt_quick_search_toggle">
                            {/* <!--begin::Toggle--> */}
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                                        <Image alt='search-icon' src='/assets/icon/Search.svg' width={24} height={24} />
                                    </span>
                                </div>
                            </div>
                            {/* <!--end::Toggle--> */}
                            {/* <!--begin::Dropdown--> */}
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                                <div className="quick-search quick-search-dropdown" id="kt_quick_search_dropdown">
                                    {/* <!--begin:Form--> */}
                                    <form method="get" className="quick-search-form">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <span className="svg-icon svg-icon-lg">
                                                        <Image alt='search-icon' src='/assets/icon/Search.svg' width={24} height={24} />
                                                    </span>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Search..." />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="quick-search-close ki ki-close icon-sm text-muted"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    {/* <!--end::Form--> */}
                                    {/* <!--begin::Scroll--> */}
                                    <div className="quick-search-wrapper scroll" data-scroll="true" data-height="325"
                                        data-mobile-height="200"></div>
                                    {/* <!--end::Scroll--> */}
                                </div>
                            </div>
                            {/* <!--end::Dropdown--> */}
                        </div>
                        {/* <!--end::Search--> */}
                        {/* <!--begin::Notifications--> */}
                        <div className="dropdown">
                            {/* <!--begin::Toggle--> */}
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                                        <Image alt='notif-icon' src='/assets/icon/kotak-kotak.svg' width={24} height={24} />
                                    </span>
                                    <span className="pulse-ring"></span>
                                </div>
                            </div>
                            {/* <!--end::Toggle--> */}
                            {/* <!--begin::Dropdown--> */}
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                                <form>
                                    {/* <!--begin::Header--> */}
                                    <div className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                                        style={{ backgroundImage: 'url(assets/media/misc/bg-1.jpg)' }}>
                                        {/* <!--begin::Title--> */}
                                        <h4 className="d-flex flex-center rounded-top">
                                            <span className="text-white">User Notifications</span>
                                            <span
                                                className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">23
                                                new</span>
                                        </h4>
                                        {/* <!--end::Title--> */}
                                        {/* <!--begin::Tabs--> */}
                                        <ul className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                                            role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active show" data-toggle="tab"
                                                    href="#topbar_notifications_notifications">Alerts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab"
                                                    href="#topbar_notifications_events">Events</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab"
                                                    href="#topbar_notifications_logs">Logs</a>
                                            </li>
                                        </ul>
                                        {/* <!--end::Tabs--> */}
                                    </div>
                                    {/* <!--end::Header--> */}

                                    {/* <!--begin::Content--> */}
                                    <div className="tab-content">
                                        {/* <!--begin::Tabpane--> */}
                                        <div className="tab-pane active show p-8"
                                            id="topbar_notifications_notifications" role="tabpanel">
                                            {/* <!--begin::Scroll--> */}
                                            <div className="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                                data-mobile-height="200">
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-primary mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <rect fill="#000000" opacity="0.3"
                                                                    transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
                                                                    x="16.3255682" y="2.94551858" width="3"
                                                                    height="18" rx="1" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Cool
                                                            App</a>
                                                        <span className="text-muted">Marketing campaign planning</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-warning mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-warning">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Write.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark-75 text-hover-primary mb-1 font-size-lg">Awesome
                                                            SAAS</a>
                                                        <span className="text-muted">Project status update
                                                            meeting</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-success">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Group-chat.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Claudy
                                                            Sys</a>
                                                        <span className="text-muted">Project Deployment &amp;
                                                            Launch</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-danger mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-danger">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/General/Attachment2.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Trilo
                                                            Service</a>
                                                        <span className="text-muted">Analytics &amp; Requirement
                                                            Study</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-info mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-info">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Shield-user.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Bravia
                                                            SAAS</a>
                                                        <span className="text-muted">Reporting Application</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-danger mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-danger">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-notification.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <circle fill="#000000" opacity="0.3" cx="19.5"
                                                                    cy="17.5" r="2.5" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Express
                                                            Wind</a>
                                                        <span className="text-muted">Software Analytics &amp;
                                                            Design</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <div className="d-flex align-items-center mb-6">
                                                    {/* <!--begin::Symbol--> */}
                                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-success">
                                                                {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Design/Bucket.svg--> */}
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                {/* <!--end::Svg Icon--> */}
                                                            </span>
                                                        </span>
                                                    </div>
                                                    {/* <!--end::Symbol--> */}
                                                    {/* <!--begin::Text--> */}
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Bruk
                                                            Fitness</a>
                                                        <span className="text-muted">Web Design &amp; Development</span>
                                                    </div>
                                                    {/* <!--end::Text--> */}
                                                </div>
                                                {/* <!--end::Item--> */}
                                            </div>
                                            {/* <!--end::Scroll--> */}
                                            {/* <!--begin::Action--> */}
                                            <div className="d-flex flex-center pt-7">
                                                <a href="#"
                                                    className="btn btn-light-primary font-weight-bold text-center">See
                                                    All</a>
                                            </div>
                                            {/* <!--end::Action--> */}
                                        </div>
                                        {/* <!--end::Tabpane--> */}
                                        {/* <!--begin::Tabpane--> */}
                                        <div className="tab-pane" id="topbar_notifications_events" role="tabpanel">
                                            {/* <!--begin::Nav--> */}
                                            <div className="navi navi-hover scroll my-4" data-scroll="true"
                                                data-height="300" data-mobile-height="200">
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-line-chart text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New report has been
                                                                received</div>
                                                            <div className="text-muted">23 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-paper-plane text-danger"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">Finance report has been
                                                                generated</div>
                                                            <div className="text-muted">25 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i
                                                                className="flaticon2-user flaticon2-line- text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New order has been
                                                                received</div>
                                                            <div className="text-muted">2 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-pin text-primary"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New customer is registered
                                                            </div>
                                                            <div className="text-muted">3 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-sms text-danger"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">Application has been
                                                                approved</div>
                                                            <div className="text-muted">3 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-pie-chart-3 text-warning"></i>
                                                        </div>
                                                        <div className="navinavinavi-text">
                                                            <div className="font-weight-bold">New file has been uploaded
                                                            </div>
                                                            <div className="text-muted">5 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon-pie-chart-1 text-info"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New user feedback received
                                                            </div>
                                                            <div className="text-muted">8 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-settings text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">System reboot has been
                                                                successfully completed</div>
                                                            <div className="text-muted">12 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i
                                                                className="flaticon-safe-shield-protection text-primary"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New order has been placed
                                                            </div>
                                                            <div className="text-muted">15 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-notification text-primary"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">Company meeting canceled
                                                            </div>
                                                            <div className="text-muted">19 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-fax text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New report has been
                                                                received</div>
                                                            <div className="text-muted">23 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon-download-1 text-danger"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">Finance report has been
                                                                generated</div>
                                                            <div className="text-muted">25 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon-security text-warning"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New customer comment
                                                                recieved</div>
                                                            <div className="text-muted">2 days ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                                {/* <!--begin::Item--> */}
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-analytics-1 text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New customer is registered
                                                            </div>
                                                            <div className="text-muted">3 days ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                                {/* <!--end::Item--> */}
                                            </div>
                                            {/* <!--end::Nav--> */}
                                        </div>
                                        {/* <!--end::Tabpane--> */}
                                        {/* <!--begin::Tabpane--> */}
                                        <div className="tab-pane" id="topbar_notifications_logs" role="tabpanel">
                                            {/* <!--begin::Nav--> */}
                                            <div className="d-flex flex-center text-center text-muted min-h-200px">All
                                                caught up!
                                                <br />No new notifications.
                                            </div>
                                            {/* <!--end::Nav--> */}
                                        </div>
                                        {/* <!--end::Tabpane--> */}
                                    </div>
                                    {/* <!--end::Content--> */}
                                </form>
                            </div>
                            {/* <!--end::Dropdown--> */}
                        </div>
                        {/* <!--end::Notifications--> */}

                        {/* <!--begin::Languages--> */}
                        <div className="dropdown">
                            {/* <!--begin::Toggle--> */}
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                                    <Image width={20} height={20} className="h-20px w-20px rounded-sm"
                                        src="/assets/media/svg/flags/226-united-states.svg" alt="us" />
                                </div>
                            </div>
                            {/* <!--end::Toggle--> */}
                            {/* <!--begin::Dropdown--> */}
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
                                {/* <!--begin::Nav--> */}
                                <ul className="navi navi-hover py-4">
                                    {/* <!--begin::Item--> */}
                                    <li className="navi-item">
                                        <a href="#" className="navi-link">
                                            <span className="symbol symbol-20 mr-3">
                                                <Image width={20} height={20} src="/assets/media/svg/flags/226-united-states.svg" alt="english" />
                                            </span>
                                            <span className="navi-text">English</span>
                                        </a>
                                    </li>
                                    {/* <!--end::Item--> */}
                                </ul>
                                {/* <!--end::Nav--> */}
                            </div>
                            {/* <!--end::Dropdown--> */}
                        </div>
                        {/* <!--end::Languages--> */}

                        {/* <!--begin::User--> */}
                        <div className="topbar-item">
                            <div className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
                                id="kt_quick_user_toggle">
                                <span
                                    className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
                                <span
                                    className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">Dendy</span>
                                <span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
                                    <span className="symbol-label font-size-h5 font-weight-bold">D</span>
                                </span>
                            </div>
                        </div>
                        {/* <!--end::User--> */}
                    </div>
                    {/* <!--end::Topbar--> */}
                </div>
                {/* <!--end::Container--> */}
            </div>
            {/* <!--end::Header--> */}

        </>
    )
}

export default Header