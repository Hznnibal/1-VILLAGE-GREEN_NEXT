import React from 'react';

const Card: React.FC = () => {
    return (
        <div className="container">
            <div className="parent">
                <div className="card card2">
                    <div className="date-box">
                        <span className="date">20</span>
                    </div>
                    <div className="card-content">
                        <h3>Card Title</h3>
                        <p>Some text here...</p>
                    </div>
                </div>

                <div className="card card3">
                    <div className="date-box">
                        <span className="date">21</span>
                    </div>
                    <div className="card-content">
                        <h3>Card Title</h3>
                        <p>Some text here...</p>
                    </div>
                </div>

                <div className="card card4">
                    <div className="date-box">
                        <span className="date">22</span>
                    </div>
                    <div className="card-content">
                        <h3>Card Title</h3>
                        <p>Some text here...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

