import { PartialType } from "@nestjs/swagger";
import { CreateSportVenueDto } from "./create-sprot-venue.dto";

export class UpdateSprotVenueDto extends PartialType(CreateSportVenueDto) {}
