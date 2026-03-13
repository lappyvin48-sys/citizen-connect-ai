import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { supabase } from "../supabaseClient";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25,41],
  iconAnchor: [12,41]
});

const ComplaintMap = () => {

  const [complaints,setComplaints] = useState<any[]>([]);

  useEffect(()=>{

    fetchComplaints();

  },[]);


  const fetchComplaints = async () => {

    const { data,error } = await supabase
      .from("complaints")
      .select("*");

    if(!error){
      setComplaints(data);
    }

  };


  return(

    <div style={{height:"90vh"}}>

      <h2 style={{padding:"10px"}}>
        Smart City Complaint Map
      </h2>

      <MapContainer
        center={[20.5937,78.9629]}
        zoom={5}
        style={{height:"80vh"}}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((c,index)=>{

          if(!c.latitude || !c.longitude) return null;

          return(

            <Marker
              key={index}
              position={[c.latitude,c.longitude]}
              icon={icon}
            >

              <Popup>

                <b>{c.title}</b>

                <p>{c.description}</p>

                <p>
                  Department: {c.department}
                </p>

                <p>
                  Category: {c.category}
                </p>

              </Popup>

            </Marker>

          );

        })}

      </MapContainer>

    </div>
  );

};

export default ComplaintMap;