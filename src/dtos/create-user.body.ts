import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({
    message: "'name' não pode estar vazio",
  })
  @IsString({
    message: "'name' tem que ser uma string",
  })
  name: string;

  @IsNotEmpty({
    message: "'email' não pode estar vazio",
  })
  @IsEmail(
    {},
    {
      message: "'email' tem que ser um email válido",
    },
  )
  @IsString({
    message: "'email' tem que ser uma string",
  })
  email: string;

  @IsNotEmpty({
    message: "'password' não pode estar vazio",
  })
  @Length(6, 20, {
    message: "'password' tem que ter entre 6 a 20 caracteres",
  })
  @IsString({
    message: "'password' tem que ser uma string",
  })
  password: string;

  @IsNotEmpty({
    message: "'avatar' não pode estar vazio",
  })
  @IsString({
    message: "'avatar' tem que ser uma string",
  })
  @IsUrl(
    {},
    {
      message: "'avatar' tem que ser uma url válida",
    },
  )
  avatar: string;
}
