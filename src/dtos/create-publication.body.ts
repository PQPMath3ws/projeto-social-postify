import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserPublicationBody {
  @IsNotEmpty({
    message: "'image' não pode estar vazio",
  })
  @IsString({
    message: "'image' tem que ser uma string",
  })
  @IsUrl(
    {},
    {
      message: "'image' tem que ser uma url válida",
    },
  )
  image: string;

  @IsNotEmpty({
    message: "'title' não pode estar vazio",
  })
  @IsString({
    message: "'title' tem que ser uma string",
  })
  title: string;

  @IsNotEmpty({
    message: "'text' não pode estar vazio",
  })
  @IsString({
    message: "'text' tem que ser uma string",
  })
  text: string;

  @IsNotEmpty({
    message: "'dateToPublish' não pode estar vazio",
  })
  @IsString({
    message: "'dateToPublish' tem que ser uma string",
  })
  @IsDateString(
    {},
    {
      message: "'dateToPublish' tem que estar no formato ISO8601",
    },
  )
  dateToPublish: string;

  @IsNotEmpty({
    message: "'published' não pode estar vazio",
  })
  @IsBoolean({
    message: "'published' tem de ser um valor booleano",
  })
  published = false;

  @IsNotEmpty({
    message: "'socialMedia' não pode estar vazio",
  })
  @IsString({
    message: "'socialMedia' tem que ser uma string",
  })
  socialMedia: string;
}
