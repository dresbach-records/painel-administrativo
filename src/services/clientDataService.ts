export const clientDataService = {
    async getMeetings() {
        return [
            {
                title: 'Reunião de Alinhamento',
                date: '2024-07-26',
                time: '10:00',
                status: 'Agendado',
            },
        ];
    },
};

export interface Meeting {
    title: string;
    date: string;
    time: string;
    status: string;
}