import { UserPublique } from "../utilisateur/userPublique.model";

export class Commentaire{
    id: number;
    id_article: number;
    id_utilisateur: number;
    nomCreateur: string;
    commentaire: string;
    date_envoi: Date;
    date_modif: Date;
}

