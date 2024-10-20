// src/components/BjelovarMap.tsx

import { useEffect } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import CommunityHomeMarker from "./CommunityHomeMarker";
import { CommunityHome } from "../mocks/communityHomes";

interface BjelovarMapProps {
    homes: CommunityHome[];
    mapTarget: google.maps.LatLngLiteral | null;
    onMarkerClick: (homeId: string) => void;
}

const MapFocusHandler: React.FC<{ mapTarget: google.maps.LatLngLiteral | null }> = ({
    mapTarget,
}) => {
    const map = useMap();

    useEffect(() => {
        if (map && mapTarget) {
            map.panTo(mapTarget);
            map.setZoom(15);
        }
    }, [map, mapTarget]);

    return null;
};

const BjelovarMap: React.FC<BjelovarMapProps> = ({ homes, mapTarget, onMarkerClick }) => {
    return (
        <Map
            mapId="bjelovar-community-homes"
            defaultCenter={{ lat: 45.8989, lng: 16.8422 }} // Centar Bjelovara
            defaultZoom={13}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            style={{ width: "100%", height: "400px" }} // Prilagodite visinu prema potrebi
        >
            <MapFocusHandler mapTarget={mapTarget} />
            {homes.map(home => (
                <CommunityHomeMarker
                    key={home.id}
                    position={home.location}
                    onClick={() => onMarkerClick(home.id)}
                />
            ))}
        </Map>
    );
};

export default BjelovarMap;
