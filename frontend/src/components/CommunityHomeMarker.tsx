// src/components/CommunityHomeMarker.tsx

import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Home } from "lucide-react"; // Uvozimo Home ikonu iz lucide-react

interface CommunityHomeMarkerProps {
    position: google.maps.LatLngLiteral;
    onClick: () => void;
}

const CommunityHomeMarker: React.FC<CommunityHomeMarkerProps> = ({ position, onClick }) => (
    <AdvancedMarker position={position} onClick={onClick}>
        <Pin background={"#4285F4"} borderColor={"#FFF"} scale={1.2}>
            <Home className="w-5 h-5 text-white" /> {/* Koristimo Home ikonu */}
        </Pin>
    </AdvancedMarker>
);

export default CommunityHomeMarker;
