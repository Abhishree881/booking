import React from 'react'
import "@/styles/loader.css"

const Loader = () => {
    return (
        <div className="loader-container">
            <main className="container">
                <div className="item">
                    <i className="loader --2"></i>
                </div>
                <div className="item">
                    <i className="loader --9"></i>
                </div>
                <div className="item">
                    <i className="loader --3"></i>
                </div>

                <div className="item">
                    <i className="loader --4"></i>
                </div>
                <div className="item">
                    <i className="loader --1"></i>
                </div>
                <div className="item">
                    <i className="loader --5"></i>
                </div>

                <div className="item">
                    <i className="loader --6"></i>
                </div>
                <div className="item">
                    <i className="loader --8"></i>
                </div>
                <div className="item">
                    <i className="loader --7"></i>
                </div>
            </main>
        </div>
    )
}

export default Loader