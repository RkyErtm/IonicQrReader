export interface QrCode {
    id: number;
    userId: number;
    title: string;
    file: string;
    formFile: any
    creationDate: Date | null
    updatedDate: Date | null
    isActive: boolean
    userFullName: string;
}