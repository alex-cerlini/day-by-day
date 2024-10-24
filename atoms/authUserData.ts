import { ProfileResponseApiProps } from "@/hooks/useProfile/types";
import { atom } from "jotai";

export const authUserDataAtom = atom<ProfileResponseApiProps>({
    "id": 777,
    "name": "Alexander Cerlini",
    "username": "alexcerlini",
    "email": "contato@alexcerlini.com.br",
    "address": {
        "street": "Rua Miguel José de Freitas",
        "suite": "Suite 280",
        "city": "Joinville",
        "zipcode": "89220-531",
        "geo": {
            "lat": "72.2918",
            "lng": "12.8784"
        }
    },
    "phone": "555-1234",
    "website": "alexcerlini.com.br",
    "company": {
        "name": "Kolab",
        "catchPhrase": "Sua empresa mais atraente com experiências que encantam",
        "bs": "generate enterprise e-tailers"
    }
})