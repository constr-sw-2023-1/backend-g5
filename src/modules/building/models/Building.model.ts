import { Types } from 'mongoose';

export interface Building {
  _id: Types.ObjectId;
  building_num: number;
  name: string;
  campus: string;
}
