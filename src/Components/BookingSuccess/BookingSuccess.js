import React, { useState } from 'react';
import './BookingSuccess.css';
import { useParams } from 'react-router-dom';
import places from '../../PlacesData';

const BookingSuccess = () => {
    const mapImg =[
        {
          link:"coxbazar",
          url:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.24477526043!2d91.93286109396425!3d21.451043355914965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc81572d90847%3A0x81c28caa853a6117!2sRadiant%20Fish%20World!5e0!3m2!1sen!2sbd!4v1601039430910!5m2!1sen!2sbd"
        },
        {
          link:"sreemangal",
          url:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29087.557862298087!2d91.70753465184656!3d24.313562805550472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37517a7a9ac91745%3A0x50f827893a88c955!2sSreemangal!5e0!3m2!1sen!2sbd!4v1601039052786!5m2!1sen!2sbd"

        },
        {
          link:"sundarban",
          url:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946889.9058659249!2d88.72647396135285!3d22.019405971040776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a004caac2c7b315%3A0x4716abcfbb16c93c!2sSundarbans!5e0!3m2!1sen!2sbd!4v1601038980646!5m2!1sen!2sbd"
        }
      ];

    const {linkSuccess} = useParams();
    const placeName = places.find(pn => pn.link === linkSuccess);
    const [placeInfo,setPlaceInfo] = useState(placeName);
    const mapName = mapImg.find(img => img.link === linkSuccess);
    const [mapUrl,setmapUrl] = useState(mapName);
    return (
        <div className="mb-3">
            <div className="row text-white p-3">
                <div className="col">
                    <h4>Stay in {placeInfo.name}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">

                    <div className="card mb-2 p-2">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={placeInfo.hotel[1].img} alt="" className="img-fluid p-2" />
                            </div>
                            <div className="col-md-8">
                                <div>
                                    <h4>{placeInfo.hotel[1].hotelname}</h4>
                                    <p><small>{placeInfo.hotel[1].guests}</small></p>
                                    <p><small>{placeInfo.hotel[1].feature}</small></p>
                                    <p><small>{placeInfo.hotel[1].rating}</small><span><small> {placeInfo.hotel[1].price}</small></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-2 p-2">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={placeInfo.hotel[2].img} alt="" className="img-fluid p-2" />
                            </div>
                            <div className="col-md-8">
                                <div>
                                    <h4>{placeInfo.hotel[2].hotelname}</h4>
                                    <p><small>{placeInfo.hotel[2].guests}</small></p>
                                    <p><small>{placeInfo.hotel[2].feature}</small></p>
                                    <p><small>{placeInfo.hotel[2].rating}</small><span><small> {placeInfo.hotel[2].price}</small></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-2 p-2">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={placeInfo.hotel[3].img} alt="" className="img-fluid p-2" />
                            </div>
                            <div className="col-md-8">
                                <div>
                                    <h4>{placeInfo.hotel[3].hotelname}</h4>
                                    <p><small>{placeInfo.hotel[3].guests}</small></p>
                                    <p><small>{placeInfo.hotel[3].feature}</small></p>
                                    <p><small>{placeInfo.hotel[3].rating}</small><span><small> {placeInfo.hotel[3].price}</small></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <iframe src={mapUrl.url} height="500" frameborder="0" allowfullscreen="false" aria-hidden="false" tabindex="0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;