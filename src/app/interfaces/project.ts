export interface Project {
        id?: string;
        projectId: number;
        customer: string;
        article: string;
        deliveryDate: number;
        scheduledTime: number;
        usedMachine: string;
        status: 'active' | 'paused' | 'finished' | 'awaiting';
        notification: string;
    
}
