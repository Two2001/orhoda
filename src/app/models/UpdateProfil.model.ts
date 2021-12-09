export class UpdateProfil {
    constructor(public id: number, public first_name: string, public last_name: string, public address: string, 
                public email: string, public cni: string, public phone: string, public birthday: string) {}
}