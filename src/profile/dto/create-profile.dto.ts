import { IsNotEmpty, IsString, IsEmail, IsNumber, IsNumberString } from "class-validator";

export class CreateProfileDto {

    firstname: string;

    
    lastname: string;


    

    gender: string;


    age: string;

    


    city: string;

  
    address: string;


    phone: string;

}