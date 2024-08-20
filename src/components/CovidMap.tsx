import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { HashLoader } from "react-spinners";

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const fetchCovidData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  return data;
};

function CovidMap() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["covidData"],
    queryFn: fetchCovidData,
  });

  return (
    <React.Fragment>
      {isLoading && (
        <div className="w-auto h-full flex items-center justify-center">
          <HashLoader size={150} color="#3B82F6" />
        </div>
      )}
      {!isLoading && !error && (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {data.map((country: any) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>
                    <strong>Active Cases:</strong> {country.active}
                  </p>
                  <p>
                    <strong>Recovered:</strong> {country.recovered}
                  </p>
                  <p>
                    <strong>Deaths:</strong> {country.deaths}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {error && (
        <div className="w-auto h-full flex flex-col items-center justify-center gap-5">
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-red-500 w-10 h-10"
          />
          <label className="text-lg text-white font-semibold">
            Error in getting the data
          </label>
          <Button
            sx={"w-[10%] h-10 bg-red-500 hover:bg-red-400"}
            onClick={refetch}
            placeholder={"Retry"}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default CovidMap;
