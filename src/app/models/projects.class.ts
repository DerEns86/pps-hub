export interface IProject {
    projectId: number;
    customer: string;
    article: string;
    deliveryDate: string | Date;
    scheduledTime: number;
    usedMachines: string[];
    status: 'active' | 'paused' | 'finished' | 'awaiting';
    notification: string;
}

export class Project implements IProject {
    public projectId: number;
    public customer: string;
    public article: string;
    public deliveryDate: string | Date;
    public scheduledTime: number;
    public usedMachines: string[];
    public status: 'active' | 'paused' | 'finished' | 'awaiting';
    public notification: string;
    constructor(
        projectId: number,
        customer: string,
        article: string,
        deliveryDate: string | Date,
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
    getDeliveryDate(): string {
        return this.deliveryDate.toString();
    }
    getUsedMachines(): string {
        return this.usedMachines.join(', ');
    }
    getNotification(): string {
        return this.notification;
    }
    setCustomer(customer: string): void {
        this.customer = customer;
    }
    setArticle(article: string): void {
        this.article = article;
    }
    setDeliveryDate(deliveryDate: string | Date): void {
        this.deliveryDate = deliveryDate;
    }
    setScheduledTime(scheduledTime: number): void {
        this.scheduledTime = scheduledTime;
    }
    setUsedMachines(usedMachines: string[]): void {
        this.usedMachines = usedMachines;
    }
    setStatus(status: 'active' | 'paused' | 'finished' | 'awaiting'): void {
        this.status = status;
    }
    setNotification(notification: string): void {
        this.notification = notification;
    }
}