import { Container, Title } from "./styles"
import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet"

export default function Tracker() {

    return(
        <Container>
            <Title>Welcome to ISS Tracker</Title>

            <MapContainer 
            center={[-20.2,-40.2]} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ minHeight: "80vh", minWidth: "80vw" }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-20.2,-40.2]}>
                    <Popup>Nova Localização</Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}