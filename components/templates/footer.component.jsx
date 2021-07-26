import React from 'react'

const Footer = () => {
    return (
        <>
            {/* // <!--begin::Footer--> */}
            <div className="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
                {/* // <!--begin::Container--> */}
                <div
                    className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                    {/* // <!--begin::Copyright--> */}
                    <div className="text-dark order-2 order-md-1">
                        <span className="text-muted font-weight-bold mr-2">2021©</span>
                        <a href="https://dendyjuliano.github.io" rel='noreferrer' target="_blank"
                            className="text-dark-75 text-hover-primary">Dendy</a>
                    </div>
                    {/* // <!--end::Copyright--> */}

                </div>
                {/* // <!--end::Container--> */}
            </div>
            {/* // <!--end::Footer--> */}
        </>
    )
}

export default Footer