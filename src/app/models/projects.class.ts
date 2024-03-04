export interface IProject {
    projectId: number;
    customer: string;
    article: string;
    deliveryDate: number | Date;
    scheduledTime: number;
    usedMachines: string[];
    status: 'active' | 'paused' | 'finished' | 'awaiting';
    notification: string;
}

export class Project implements IProject {
    public projectId: number;
    public customer: string;
    public article: string;
    public deliveryDate: number | Date;
    public scheduledTime: number;
    public usedMachines: string[];
    public status: 'active' | 'paused' | 'finished' | 'awaiting';
    public notification: string;
    constructor(
        projectId: number,
        customer: string,
        article: string,
        deliveryDate: number | Date,
        scheduledTime: number,
        usedMachines: string[],
        status: 'active' | 'paused' | 'finished' | 'awaiting',
        notification: string
    ) {
        this.projectId = projectId;
        this.customer = customer;
        this.article = article;
        this.deliveryDate = deliveryDate;
        this.scheduledTime = scheduledTime;
        this.usedMachines = usedMachines;
        this.status = status;
        this.notification = notification;
    }
    
   public toJson() {
        return {
            projectId: this.projectId,
            customer: this.customer,
            article: this.article,
            deliveryDate: this.deliveryDate,
            scheduledTime: this.scheduledTime,
            usedMachines: this.usedMachines,
            status: this.status,
            notification: this.notification
        };
    }
}