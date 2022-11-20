import { DataTypes as Sequelize } from "sequelize";

const ProfileModel = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profession: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DECIMAL(12, 2),
  },
  type: {
    type: Sequelize.ENUM("client", "contractor"),
  },
};

const ProfileOptions = {
  timestamps: true,
  schema: "public",
  freezeTableName: true,
};

const ProfileAssociation = (models) => {
  models.Profiles.hasMany(models.Contracts, {
    as: "Client",
    foreignKey: "ClientId",
  });
  models.Profiles.hasMany(models.Contracts, {
    as: "Contractor",
    foreignKey: "ContractorId",
  });
};

export const getModel = (seq) => {
  const model = seq.define("Profiles", ProfileModel, ProfileOptions);
  model.associate = ProfileAssociation;
  return model;
};
