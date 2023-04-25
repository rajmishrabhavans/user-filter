import React from 'react'

export const UserCard = ({ userData }) => {

    return (
        // card used to display advertisements
        <section className="row">
            {userData.map((currElem, index) => {
                const { id, first_name, last_name, email, gender, income, city, car, quote, phone_price } = currElem;
                return (
                    <div key={index} className='col-md-5 col-11 col-lg-4 ms-sm-1 ms-lg-0 my-2' >
                        <div className="card" style={{ width: '18rem', height: '500px' }}>
                            <h5 className="card-header">{id}</h5>
                            <div className="card-body">
                                <div className="card-body d-flex flex-column h-100">
                                    <p className="card-text text-muted">{email}</p>
                                    <p className="card-text"><span className='fw-bold'>Name:</span> {first_name} {last_name}</p>
                                    <p className="card-text"><span className='fw-bold'>Gender:</span> {gender}</p>
                                    <p className="card-text"><span className='fw-bold'>Income:</span> {income}</p>
                                    <p className="card-text"><span className='fw-bold'>City:</span> {city}</p>
                                    <p className="card-text"><span className='fw-bold'>Car:</span> {car}</p>
                                    <p className="card-text"><span className='fw-bold'>Quote:</span> {quote}</p>
                                    <p className="card-text"><span className='fw-bold'>Phone price:</span> {phone_price}</p>
                                </div>
                            </div>
                        </div>
                    </div>)
            })}
        </section>
    )
};
export const GroupCard = ({ groupData }) => {

    return (
        // card used to display advertisements
        <section className="row">
            {groupData.map((currElem, index) => {
                const { _id, avgIncome, count } = currElem;
                return (
                    <div key={index} className='col-md-5 col-11 col-lg-4 ms-sm-1 ms-lg-0 my-2' >
                        <div className="card" style={{ width: '18rem', height: '200px' }}>
                            <h5 className="card-header">City: {_id}</h5>
                            <div className="card-body">
                                <div className="card-body d-flex flex-column h-100">
                                    <p className="card-text"><span className='fw-bold'>Avg Income:</span> {parseInt(avgIncome*1000)/1000}</p>
                                    <p className="card-text"><span className='fw-bold'>Count:</span> {count}</p>
                                </div>
                            </div>
                        </div>
                    </div>)
            })}
        </section>
    )
};

