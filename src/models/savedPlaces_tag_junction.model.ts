import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";
import { SavedPlaces_Tag_JunctionAttributes } from "../interfaces";

interface SavedPlacesCreation_Tag_JunctionAttributes {}

export class SavedPlaces_Tag_Junction
  extends Model<
    SavedPlaces_Tag_JunctionAttributes,
    SavedPlacesCreation_Tag_JunctionAttributes
  >
  implements SavedPlaces_Tag_JunctionAttributes
{
  public savedPlaceId?: string;
  public tagName?: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

SavedPlaces_Tag_Junction.init(
  {
    savedPlaceId: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    tagName: {
      type: new DataTypes.STRING(),

      allowNull: false,
    },
  },
  {
    tableName: "saved_places_tag_junction",
    sequelize,
  }
);
