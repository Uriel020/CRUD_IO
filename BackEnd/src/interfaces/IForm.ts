import { JsonValue } from "@prisma/client/runtime/library";

export interface IForm {
  idForm: string;
  idUser: string;
  title: string;
  inputs: JsonValue;
  endpoint: string;
  active: boolean;
}
