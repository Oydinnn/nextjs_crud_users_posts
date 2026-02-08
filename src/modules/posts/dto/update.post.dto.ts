import { IsString, IsNotEmpty, MaxLength} from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsNotEmpty()
  content?: string;

}