import { Container, Title } from "./styles"
import { Marker, Popup, TileLayer, MapContainer, useMap } from "react-leaflet"
import { useEffect, useState } from "react"

interface ISSPosition {
    latitude: number;
    longitude: number;
}
  
interface ISSResponse {
    message: string;
    iss_position: ISSPosition;
    timestamp: number;
}

function RecenterAutomatically(props: any | null) {
    const map = useMap();
     useEffect(() => {
       map.setView([props.lat, props.lng],5);
     }, [props.lat, props.lng]);
     return null;
}

export default function Tracker() {
    const [position, setPosition] = useState<ISSPosition>({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        getISSPosition();
        const interval = setInterval(() => {
            getISSPosition();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    async function getISSPosition() {
        fetch('http://api.open-notify.org/iss-now.json')
            .then(response => response.json())
            .then((data: ISSResponse) => {
                setPosition(data.iss_position);
            });
    }

    return(
        <Container>
            <Title>Welcome to ISS Tracker</Title>

            <MapContainer 
            center={[0,0]} 
            zoom={2} 
            scrollWheelZoom={true} 
            style={{ minHeight: "80vh", minWidth: "80vw" }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {(position.latitude !== 0 && position.longitude !== 0) ? 
                    <Marker position={[position.latitude, position.longitude]}>
                        <Popup>ISS Location <br/> lat:{position.latitude} lng:{position.longitude}</Popup>
                    </Marker>
                    : null }
                <RecenterAutomatically lat={position.latitude} lng={position.longitude} />
            </MapContainer>
        </Container>
    )
}