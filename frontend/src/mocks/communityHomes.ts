// src/mocks/communityHomes.ts

export interface CommunityHome {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
}

export const mockCommunityHomes: CommunityHome[] = [
    {
        id: "1",
        name: "I MO HRGOVLJANI",
        location: { lat: 45.9039, lng: 16.8408 },
    },
    {
        id: "2",
        name: "Dom kulture Bjelovar",
        location: { lat: 45.8989, lng: 16.8422 },
    },
    {
        id: "3",
        name: "Dom kralja Tomislava",
        location: { lat: 45.9102, lng: 16.8456 },
    },
    {
        id: "4",
        name: "Društveni dom Petra Krešimira IV",
        location: { lat: 45.8934, lng: 16.8367 },
    },
    {
        id: "5",
        name: "Centar kralja Zvonimira",
        location: { lat: 45.9056, lng: 16.8289 },
    },
    {
        id: "6",
        name: "Dom bana Josipa Jelačića",
        location: { lat: 45.8912, lng: 16.8511 },
    },
    {
        id: "7",
        name: "Kulturni centar Petra Zrinskog",
        location: { lat: 45.9167, lng: 16.8378 },
    },
    {
        id: "8",
        name: "Dom Stjepana Radića",
        location: { lat: 45.8876, lng: 16.8244 },
    },
    {
        id: "9",
        name: "Društveni dom kralja Petra Svačića",
        location: { lat: 45.9201, lng: 16.8533 },
    },
    {
        id: "10",
        name: "Centar kneza Branimira",
        location: { lat: 45.8845, lng: 16.8589 },
    },
    {
        id: "11",
        name: "Dom bana Petra Berislavića",
        location: { lat: 45.9123, lng: 16.8211 },
    },
    {
        id: "12",
        name: "Kulturni dom Nikole Šubića Zrinskog",
        location: { lat: 45.8801, lng: 16.8478 },
    },
    {
        id: "13",
        name: "Društveni centar Matije Gupca",
        location: { lat: 45.9234, lng: 16.8322 },
    },
    {
        id: "14",
        name: "Dom kneza Domagoja",
        location: { lat: 45.8767, lng: 16.8344 },
    },
    {
        id: "15",
        name: "Centar kralja Dmitra Zvonimira",
        location: { lat: 45.9178, lng: 16.8567 },
    },
    {
        id: "16",
        name: "Dom bana Josipa Šokčevića",
        location: { lat: 45.8823, lng: 16.8189 },
    },
    {
        id: "17",
        name: "Kulturni dom Eugena Kvaternika",
        location: { lat: 45.9267, lng: 16.8456 },
    },
    {
        id: "18",
        name: "Društveni centar Ljudevita Gaja",
        location: { lat: 45.8734, lng: 16.8522 },
    },
    {
        id: "19",
        name: "Dom kneza Trpimira",
        location: { lat: 45.9145, lng: 16.8144 },
    },
    {
        id: "20",
        name: "Centar bana Ivana Mažuranića",
        location: { lat: 45.8701, lng: 16.8411 },
    },
    {
        id: "21",
        name: "Društveni dom Ante Starčevića",
        location: { lat: 45.9289, lng: 16.8378 },
    },
    {
        id: "22",
        name: "Kulturni centar Ivana Gundulića",
        location: { lat: 45.8678, lng: 16.8544 },
    },
];
