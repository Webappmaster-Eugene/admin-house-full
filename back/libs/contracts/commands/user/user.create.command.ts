import { z } from 'zod';

const UserCreateRequestSchema = z.object({
    firstName: string;

    @IsOptional()
        @MinLength(1)
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
            example: 'Ivanov',
            description: 'Фамилия пользователя (опционально)',
        })
    secondName?: string;

    @IsOptional()
        @IsPhoneNumber()
        @Matches(
            /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        )
        @ApiProperty({
            example: '+79200808999',
            description: 'Номер телефона (опционально)',
        })
    phone?: string;

    @IsEmail()
        @Matches(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        )
        @ApiProperty({ example: 'example@mail.ru', description: 'Электронная почта' })
    email: string;

    @IsString()
        @IsNotEmpty()
        @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        @ApiProperty({
            example: '!Qwerty8',
            description:
                'Пароль с следующими требованиями: Has minimum 8 characters in length.\n' +
                'At least one uppercase English letter.\n' +
                'At least one lowercase English letter.\n' +
                'At least one digit.\n' +
                'At least one special character',
        })
    password: string;

    @IsOptional()
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
            example: 'г.Москва, ул.Иванова, д.7',
            description: 'Адрес местонахождения',
        })
    address?: string;

    @IsOptional()
        @IsString()
        @IsNotEmpty()
        @ApiProperty({
            example: 'Additional info',
            description: 'Дополнительная информация',
        })
    info?: string;

    documents?: z.string()

    roleId: z.number().positive().gte(1).lte(3).default(1).optional()
});
const UserCreateResponseSchema = z.object({
    email: z.string().email(),
    accessToken: z.string(),
});

export namespace UserLoginCommand {
    export const RequestSchema = UserLoginRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UserLoginResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

@IsString()
@MinLength(1)
@IsNotEmpty()
@ApiProperty({ example: 'Ivan', description: 'Имя пользователя' })
firstName: string;

@IsOptional()
@MinLength(1)
@IsString()
@IsNotEmpty()
@ApiProperty({
    example: 'Ivanov',
    description: 'Фамилия пользователя (опционально)',
})
secondName?: string;

@IsOptional()
@IsPhoneNumber()
@Matches(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
)
@ApiProperty({
    example: '+79200808999',
    description: 'Номер телефона (опционально)',
})
phone?: string;

@IsEmail()
@Matches(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
)
@ApiProperty({ example: 'example@mail.ru', description: 'Электронная почта' })
email: string;

@IsString()
@IsNotEmpty()
@Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
@ApiProperty({
    example: '!Qwerty8',
    description:
        'Пароль с следующими требованиями: Has minimum 8 characters in length.\n' +
        'At least one uppercase English letter.\n' +
        'At least one lowercase English letter.\n' +
        'At least one digit.\n' +
        'At least one special character',
})
password: string;

@IsOptional()
@IsString()
@IsNotEmpty()
@ApiProperty({
    example: 'г.Москва, ул.Иванова, д.7',
    description: 'Адрес местонахождения',
})
address?: string;

@IsOptional()
@IsString()
@IsNotEmpty()
@ApiProperty({
    example: 'Additional info',
    description: 'Дополнительная информация',
})
info?: string;

@IsOptional()
@IsString()
@IsNotEmpty()
@ApiProperty({ example: '5533 225522', description: 'Номер документов' })
documents?: string;

@IsOptional()
@IsNumber()
@IsNotEmpty()
roleId?: number;
