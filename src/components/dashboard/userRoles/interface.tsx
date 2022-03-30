import { iPermission } from "../userPermissions/interface";

export interface iuserRoles {
  uuid: string
  name: string
  permissions: iPermission[]
}