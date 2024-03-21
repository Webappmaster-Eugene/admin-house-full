import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PropertyType, UserType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

export class HomeRequestDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsPositive()
  numberOfBedrooms: number;

  @IsNumber()
  @IsPositive()
  numberOfBathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  landSize: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;
}

export class HomeResponseDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  address: string;

  @Exclude()
  @IsNumber()
  @IsPositive()
  number_of_bedrooms: number;

  @Expose({ name: 'numberOfBedrooms' })
  numberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Exclude()
  @IsNumber()
  @IsPositive()
  number_of_bathrooms: number;

  @Expose({ name: 'numberOfBathrooms' })
  numberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  @IsString()
  city: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  image: string;

  @Exclude()
  @IsNumber()
  @IsPositive()
  land_size: number;

  @Expose({ name: 'landSize' })
  landSize() {
    return this.land_size;
  }

  @Exclude()
  @IsDate()
  listed_date: Date;

  @Expose({ name: 'listedDate' })
  listedDate() {
    return this.listed_date;
  }

  @Exclude()
  @IsEnum(PropertyType)
  property_type: PropertyType;

  @Expose({ name: 'propertyType' })
  propertyType() {
    return this.property_type;
  }

  @Exclude()
  @IsDate()
  created_at: Date;

  @Exclude()
  @IsDate()
  updated_at: Date;

  @Exclude()
  @IsNumber()
  realtor_id: number;

  constructor(partialData: Partial<HomeResponseDto>) {
    Object.assign(this, partialData);
  }
}

class Image {
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class UpdateHomeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBedrooms?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  numberOfBathrooms?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  landSize?: number;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;
}

export class InquireDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
