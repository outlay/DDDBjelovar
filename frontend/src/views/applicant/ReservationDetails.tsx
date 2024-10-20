import React from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContractsTable = () => {
    const contracts = [
        { id: 1, name: "Ugovor 1", date: "2024-10-20", status: "Potpisan" },
        { id: 2, name: "Ugovor 2", date: "2024-10-21", status: "Čeka potpis" },
        { id: 3, name: "Ugovor 3", date: "2024-10-22", status: "U pripremi" },
    ];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Naziv</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contracts.map(contract => (
                    <TableRow key={contract.id}>
                        <TableCell>{contract.name}</TableCell>
                        <TableCell>{contract.date}</TableCell>
                        <TableCell>{contract.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const RecordsUpload = () => {
    const [images, setImages] = React.useState<string[]>([]);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleUpload} accept="image/*" />
            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-32 object-cover"
                    />
                ))}
            </div>
        </div>
    );
};

const ReservationDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const reservation = {
        id,
        name: `Rezervacije #${id}`,
        status: "U procesu",
        communityHouse: "Dom I MO HRGOVLJANI",
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
                    <div className="space-y-6 w-full">
                        {reservation.status === "U procesu" && (
                            <Card className="w-[75vw]">
                                <CardHeader>
                                    <CardTitle>Moji ugovori</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ContractsTable />
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Zapisnici</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RecordsUpload />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default ReservationDetails;
