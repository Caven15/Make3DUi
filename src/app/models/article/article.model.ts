export class Article {
    id : number;
    id_utilisateur : number;
    nomCreateur: string;
    nom : string;  
    description : string;
    date_envoi: Date;
    date_modif: Date;
    id_fichiers: number[] = [];
}