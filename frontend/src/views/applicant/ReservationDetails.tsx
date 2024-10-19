import { useNavigate, useParams } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const ReservationDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const reservation = {
        id,
        name: `Rezervacije #${id}`,
        status: "U procesu",
        communityHouse: "Dom Kulture",
    };

    const headerHeight = 80;
    const sidebarStyle = {
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
    };

    const showAllReservations = () => {
        navigate("/rezervacije");
    };

    return (
        <SidebarProvider>
            <div className="flex">
                <Sidebar style={sidebarStyle}>
                    <SidebarHeader>
                        <h2 className="text-2xl ml-2 font-bold">{reservation.name}</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Detalji</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <span>Status</span>
                                            <Badge
                                                variant={
                                                    reservation.status === "pending"
                                                        ? "outline"
                                                        : "default"
                                                }
                                            >
                                                {reservation.status}
                                            </Badge>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <span>Društveni dom</span>
                                            <span>{reservation.communityHouse}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Akcije</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>Otkaži rezervaciju</SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={showAllReservations}>
                                    Sve rezervacije
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-4">Detalji rezervacije</h2>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default ReservationDetails;
