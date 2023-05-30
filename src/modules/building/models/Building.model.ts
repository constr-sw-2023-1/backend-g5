import { Types } from 'mongoose';

export interface Building {
  _id: Types.ObjectId;
  active: boolean;
  building_num: number;
  name: string;
  campus: string;
}
