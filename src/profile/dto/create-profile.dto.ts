import { IsNotEmpty, IsString, IsEmail, IsNumber, IsNumberString } from "class-validator";

export class CreateProfileDto {

    firstname: string;

    
    lastname: string;


    age: string;


    city: string;


    phone: string;

}